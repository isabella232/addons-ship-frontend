jest.mock('@/utils/request');

import { Uploadable } from '@/models/uploadable';
import { patch, post, get, put, del, request } from '@/utils/request';
import { mockAppVersion } from '@/mocks';
import { Settings, AppContact } from '@/models/settings';

import { ShipAPIService } from './ship-api';

describe('Ship API service', () => {
  const apiUrl = 'http://ship.api',
    baseAppUrl = 'http://ship.app';
  let api: ShipAPIService;
  beforeEach(() => {
    api = new ShipAPIService({ url: apiUrl, baseUrl: baseAppUrl });
    ([patch, post, get, put, del, request] as jest.Mock[]).forEach(m => m.mockReset());
  });

  const testTokenNotSet = (fn: Function) => {
    it('throws an error if token was not set', () => {
      expect(fn()).rejects.toEqual(new Error('Token not set'));
    });
  };

  describe('getAppVersion', () => {
    testTokenNotSet(() => api.getAppVersion('slug', 'version'));

    it('fetches a version for an app', async () => {
      (get as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: {
            id: 123,
            app_slug: appSlug,
            build_number: '456',
            public_install_page_url: 'def.a.valid.url',
            app_store_info: {
              full_description: 'A description',
              short_description: 'A short description',
              whats_new: 'Something new'
            },
            app_info: {
              title: 'App title',
              appIconUrl: 'icon.url'
            }
          }
        })
      });

      const appSlug = 'an-app-slug',
        versionId = 'a-version-id',
        token = 'very-token';

      api.setToken(token);

      const appVersion = await api.getAppVersion(appSlug, versionId);

      const url = `${apiUrl}/apps/${appSlug}/versions/${versionId}`;
      expect(get).toHaveBeenCalledWith(url, token);

      expect(appVersion).toMatchSnapshot();
    });
  });

  describe('updateAppVersion', () => {
    testTokenNotSet(() => api.updateAppVersion(mockAppVersion));

    it('updates a version for an app', async () => {
      (put as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: { id: 123, app_slug: appSlug, build_number: '456' }
        })
      });

      const appSlug = 'an-app-slug',
        id = 'a-version-id',
        token = 'very-token',
        buildNumber = 123,
        appStoreInfo = {
          description: 'A description',
          shortDescription: 'A short description',
          whatsNew: 'Something new'
        };

      api.setToken(token);

      const url = `${apiUrl}/apps/${appSlug}/versions/${id}`;
      const appVersion = await api.updateAppVersion({ appSlug, id, buildNumber, ...appStoreInfo } as any);
      expect(put).toHaveBeenCalledWith(
        url,
        token,
        `{"app_slug":"${appSlug}","id":"${id}","build_number":${buildNumber},"app_store_info":{"short_description":"${appStoreInfo.shortDescription}","full_description":"${appStoreInfo.description}","whats_new":"${appStoreInfo.whatsNew}"}}`
      );

      expect(appVersion).toMatchSnapshot();
    });
  });

  describe('getAppVersionList', () => {
    testTokenNotSet(() => api.getAppVersionList('slug'));

    it('fetches a list of versions for an app', async () => {
      (get as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: [
            {
              id: 123,
              app_slug: appSlug,
              build_number: '456',
              app_info: { title: 'An app', app_icon_url: 'https://www.bitrise.io/assets/svg/logo-bitrise.svg' }
            }
          ]
        })
      });

      const appSlug = 'an-app-slug',
        token = 'so-token';
      api.setToken(token);

      const appVersions = await api.getAppVersionList(appSlug);

      expect(get).toHaveBeenCalledWith(`${apiUrl}/apps/${appSlug}/versions`, token);
      expect(appVersions).toMatchSnapshot();
    });
  });

  describe('getScreenshots', () => {
    testTokenNotSet(() => api.getScreenshots('slug', 'version'));

    it('fetches screenshots of an app', async () => {
      (get as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: [
            {
              created_at: '2018-09-26T12:42:31Z',
              device_type: 'iPhone 6.5”',
              download_url: 'https://www.bitrise.io/assets/svg/logo-bitrise.svg',
              filename: 'screenshot-1.jpg',
              filesize: 1000,
              id: 'test-id-1',
              screen_size: '1024x768',
              updated_at: '2018-09-27T12:42:31Z',
              uploaded: true
            }
          ]
        })
      });

      const appSlug = 'an-app-slug',
        versionId = 'a-version-id',
        token = 'very-token';

      api.setToken(token);

      const screenshotsData = await api.getScreenshots(appSlug, versionId);

      const url = `${apiUrl}/apps/${appSlug}/versions/${versionId}/screenshots`;
      expect(get).toHaveBeenCalledWith(url, token);

      expect(screenshotsData).toMatchSnapshot();
    });
  });

  describe('uploadScreenshots', () => {
    testTokenNotSet(() => api.uploadScreenshots('slug', 'version', []));

    it('calls the api', async () => {
      (post as jest.Mock).mockResolvedValueOnce({
        json: () => ({ data: [{ filename: 'some-file.png', upload_url: 'http://some.url?token=123' }] })
      });

      const appSlug = 'an-app-slug',
        versionId = 'a-version-id',
        screenshots: Uploadable[] = [
          { filename: 'some-file.png', deviceType: 'device type', filesize: 123, screenSize: '6.5"' }
        ],
        token = 'such-token';

      api.setToken(token);

      const result = await api.uploadScreenshots(appSlug, versionId, screenshots);

      const expectedBody = JSON.stringify({
        screenshots: [{ filename: 'some-file.png', device_type: 'device type', filesize: 123, screen_size: '6.5"' }]
      });

      expect(result).toMatchSnapshot();
      expect(post).toHaveBeenLastCalledWith(
        `${apiUrl}/apps/${appSlug}/versions/${versionId}/screenshots`,
        token,
        expectedBody
      );
    });
  });

  describe('deleteScreenshot', () => {
    testTokenNotSet(() => api.deleteScreenshot('slug', 'version', 'screenshot-id'));

    it('calls the api', async () => {
      // (del as jest.Mock).mockResolvedValueOnce({
      //   json: () => ({ data: [{ filename: 'some-file.png', upload_url: 'http://some.url?token=123' }] })
      // });

      const appSlug = 'an-app-slug',
        versionId = 'a-version-id',
        screenshotId = 'screenshot-id',
        token = 'such-token';

      api.setToken(token);

      const result = await api.deleteScreenshot(appSlug, versionId, screenshotId);

      expect(result).toMatchSnapshot();
      expect(del).toHaveBeenLastCalledWith(
        `${apiUrl}/apps/${appSlug}/versions/${versionId}/screenshots/${screenshotId}`,
        token
      );
    });
  });

  describe('uploadedScreenshots', () => {
    testTokenNotSet(async () => await api.uploadedScreenshots('slug', 'version'));

    it('calls the api', async () => {
      const appSlug = 'an-app-slug',
        versionId = 'a-version-id',
        token = 'some-token';
      api.setToken(token);

      await api.uploadedScreenshots(appSlug, versionId);

      const url = `${apiUrl}/apps/${appSlug}/versions/${versionId}/screenshots/uploaded`;
      expect(patch).toHaveBeenLastCalledWith(url, token);
    });
  });

  describe('getFeatureGraphic', () => {
    testTokenNotSet(() => api.getFeatureGraphic('slug', 'version'));

    it('fetches the feature graphic for an app', async () => {
      (get as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: {
            id: 'test-id-1',
            created_at: '2019-09-26T12:42:31Z',
            updated_at: '2019-09-27T12:42:31Z',
            download_url: 'some.url',
            filename: 'screenshot-1.jpg',
            filesize: 1234,
            uploaded: true
          }
        })
      });

      const appSlug = 'an-app-slug',
        versionId = 'a-version-id',
        token = 'very-token';

      api.setToken(token);

      const featureGraphic = await api.getFeatureGraphic(appSlug, versionId);

      const url = `${apiUrl}/apps/${appSlug}/versions/${versionId}/feature-graphic`;
      expect(get).toHaveBeenCalledWith(url, token);

      expect(featureGraphic).toMatchSnapshot();
    });
  });

  describe('uploadFeatureGraphic', () => {
    testTokenNotSet(() => api.uploadFeatureGraphic('slug', 'version', { filename: 'aaa', filesize: 10 }));

    it('calls the api', async () => {
      (post as jest.Mock).mockResolvedValueOnce({
        json: () => ({ data: { filename: 'some-file.png', upload_url: 'http://some.url?token=123' } })
      });

      const appSlug = 'an-app-slug',
        versionId = 'a-version-id',
        featureGraphic: Uploadable = { filename: 'some-file.png', filesize: 123 },
        token = 'such-token';

      api.setToken(token);

      const result = await api.uploadFeatureGraphic(appSlug, versionId, featureGraphic);

      const expectedBody = JSON.stringify({ filename: 'some-file.png', filesize: 123 });

      expect(result).toMatchSnapshot();
      expect(post).toHaveBeenLastCalledWith(
        `${apiUrl}/apps/${appSlug}/versions/${versionId}/feature-graphic`,
        token,
        expectedBody
      );
    });
  });

  describe('uploadedFeatureGraphic', () => {
    testTokenNotSet(async () => await api.uploadedFeatureGraphic('slug', 'version'));

    it('calls the api', async () => {
      const appSlug = 'an-app-slug',
        versionId = 'a-version-id',
        token = 'some-token';
      api.setToken(token);

      await api.uploadedFeatureGraphic(appSlug, versionId);

      const url = `${apiUrl}/apps/${appSlug}/versions/${versionId}/feature-graphic/uploaded`;
      expect(patch).toHaveBeenLastCalledWith(url, token);
    });
  });

  describe('getSettings', () => {
    testTokenNotSet(() => api.getSettings('slug'));

    it('fetches settings for an app', async () => {
      (get as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: {
            project_type: 'android',
            android_settings: {
              selectedKeystoreFile: 'whatever',
              selectedServiceAccount: 'does not matter'
            }
          }
        })
      });

      const appSlug = 'an-app-slug',
        token = 'very-token';
      api.setToken(token);
      const settings = await api.getSettings(appSlug);

      const url = `${apiUrl}/apps/${appSlug}/settings`;
      expect(get).toHaveBeenCalledWith(url, token);

      expect(settings).toMatchSnapshot();
    });
  });

  describe('updateSettings', () => {
    testTokenNotSet(() => api.updateSettings('app-321', {} as Settings));

    it('updates settings for an app', async () => {
      (patch as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: {
            ios_workflow: 'All',
            android_workflow: 'All',
            ios_settings: {
              apple_developer_account_email: 'some.email@addr.ess',
              app_sku: 'Fill',
              app_specific_password: 'Fill',
              selected_app_store_provisioning_profile: 'prov-profile-id',
              selected_code_signing_identity: 'code-signing-identity-id',
              include_bit_code: true
            },
            android_settings: {
              track: 'Release',
              selected_keystore_file: 'keystore-filename',
              selected_service_account: 'service-account-filename'
            }
          }
        })
      });

      const appSlug = 'an-app-slug',
        token = 'very-token';

      api.setToken(token);

      const url = `${apiUrl}/apps/${appSlug}/settings`;

      const settings = await api.updateSettings(appSlug, {
        iosWorkflow: 'All',
        androidWorkflow: 'All',
        iosSettings: {
          appleDeveloperAccountEmail: 'some.email@addr.ess',
          appSku: 'Fill',
          appSpecificPassword: 'Fill',
          selectedAppStoreProvisioningProfile: 'prov-profile-id',
          selectedCodeSigningIdentity: 'code-signing-identity-id',
          includeBitCode: true
        },
        androidSettings: {
          track: 'Release',
          selectedKeystoreFile: 'keystore-filename',
          selectedServiceAccount: 'service-account-filename'
        }
      });

      expect(patch).toHaveBeenCalledWith(
        url,
        token,
        '{"ios_workflow":"All","android_workflow":"All","ios_settings":{"apple_developer_account_email":"some.email@addr.ess","app_sku":"Fill","app_specific_password":"Fill","selected_app_store_provisioning_profile":"prov-profile-id","selected_code_signing_identity":"code-signing-identity-id","include_bit_code":true},"android_settings":{"track":"Release","selected_keystore_file":"keystore-filename","selected_service_account":"service-account-filename"}}'
      );

      expect(settings).toMatchSnapshot();
    });
  });

  describe('publishAppVersion', () => {
    testTokenNotSet(() => api.publishAppVersion(mockAppVersion));

    it('publishes a version for an app', async () => {
      (post as jest.Mock).mockResolvedValueOnce({
        json: () => {}
      });

      const appSlug = 'an-app-slug',
        id = 'a-version-id',
        token = 'very-token',
        buildNumber = 123;

      api.setToken(token);

      const url = `${apiUrl}/apps/${appSlug}/versions/${id}/publish`;
      await api.publishAppVersion({ appSlug, id, buildNumber } as any);
      expect(post).toHaveBeenCalledWith(url, token, undefined);
    });
  });

  describe('getAppVersionEvents', () => {
    testTokenNotSet(() => api.getAppVersionEvents(mockAppVersion.appSlug, mockAppVersion.version));

    it('fetches the events for an app version', async () => {
      (get as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: [
            {
              id: 'an-id',
              status: 'in-progress',
              event_text: 'some-string',
              created_at: '2019-10-10',
              updated_at: '2019-10-11',
              log_download_url: 'http://log.url'
            }
          ]
        })
      });
      const appSlug = 'an-app-slug',
        id = 'a-version-id',
        token = 'best-token';

      api.setToken(token);

      const url = `${apiUrl}/apps/${appSlug}/versions/${id}/events`;
      const resp = await api.getAppVersionEvents(appSlug, id);

      expect(get).toHaveBeenCalledWith(url, token);
      expect(resp).toMatchSnapshot();
    });
  });

  describe('addAppContact', () => {
    testTokenNotSet(() => api.addAppContact('app-slug', 'john@do.e'));

    it('posts a new app contact', async () => {
      const token = 'best-token',
        appSlug = 'aplikashun',
        email = 'josh@bend.er';
      (post as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: {
            email,
            is_confirmed: false,
            notification_preferences: { new_version: true, failed_publish: false, successful_publish: true }
          }
        })
      });

      api.setToken(token);

      const url = `${apiUrl}/apps/${appSlug}/contacts`;
      const resp = await api.addAppContact(appSlug, email);

      expect(post).toHaveBeenCalledWith(
        url,
        token,
        `{"email":"${email}","notification_preferences":{"new_version":true,"failed_publish":true,"successful_publish":true}}`
      );
      expect(resp).toMatchSnapshot();
    });
  });

  describe('listAppContacts', () => {
    testTokenNotSet(() => api.listAppContacts('app-slug'));

    it('lists all app contacts', async () => {
      const token = 'best-token',
        appSlug = 'aplikashun';

      (get as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: [{ email: 'aaa', notification_preferences: { new_version: true } }, { email: 'bbb' }, { email: 'ccc' }]
        })
      });

      api.setToken(token);

      const url = `${apiUrl}/apps/${appSlug}/contacts`;
      const resp = await api.listAppContacts(appSlug);

      expect(get).toHaveBeenCalledWith(url, token);
      expect(resp).toMatchSnapshot();
    });

    it('fills isConfimed properly', async () => {
      (get as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: [
            { email: 'not confirmed 1' },
            { email: 'not confirmed 2', confirmed_at: '0001-01-01 00:00:00+00' },
            { email: 'not confirmed 3', confirmed_at: '0001' },
            { email: 'confirmed', confirmed_at: '2019-08-03' }
          ]
        })
      });

      api.setToken('yes');
      const resp = await api.listAppContacts('app-slug');
      expect(resp).toMatchSnapshot();
    });
  });

  describe('updateAppContactNotificationPreferences', () => {
    testTokenNotSet(() => api.updateAppContactNotificationPreferences('app-slug', {} as AppContact));

    it("updates an app contact's notification preferences", async () => {
      const token = 'noicest-token',
        appSlug = 'my-app-slug',
        appContactId = 'abc-123';

      (put as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: {
            id: appContactId,
            notification_preferences: { new_version: true, failed_publish: false, successful_publish: false }
          }
        })
      });

      api.setToken(token);

      const url = `${apiUrl}/apps/${appSlug}/contacts/${appContactId}`;
      const resp = await api.updateAppContactNotificationPreferences(appSlug, {
        id: appContactId,
        notificationPreferences: { newVersion: true, failedPublish: false, successfulPublish: false }
      } as AppContact);

      expect(put).toHaveBeenCalledWith(
        url,
        token,
        '{"new_version":true,"failed_publish":false,"successful_publish":false}'
      );
      expect(resp).toMatchSnapshot();
    });
  });

  describe('deleteAppContact', () => {
    testTokenNotSet(() => api.deleteAppContact('app-slug', {} as AppContact));

    it("updates an app contact's notification preferences", async () => {
      const token = 'bestest-token',
        appSlug = 'my-app-slug',
        appContactId = 'abc-123';

      api.setToken(token);

      const url = `${apiUrl}/apps/${appSlug}/contacts/${appContactId}`;
      await api.deleteAppContact(appSlug, { id: appContactId } as AppContact);

      expect(del).toHaveBeenCalledWith(url, token);
    });
  });

  describe('confirmEmail', () => {
    it('calls the API with the confirm token', async () => {
      (request as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: {
            app: { id: 'app-id', app_slug: 'app-slug' },
            app_contact: {
              id: 'app-contact-id',
              email: 'some-email',
              notification_preferences: { new_version: true, failed_publish: false, successful_publish: false }
            }
          }
        })
      });

      const confirmToken = 'a-noice-confirm-token',
        url = `${apiUrl}/confirm_email`;

      const response = await api.confirmEmail(confirmToken);

      expect(request).toHaveBeenCalledWith({ url, method: 'PATCH', body: `{"confirmation_token":"${confirmToken}"}` });
      expect(response).toMatchSnapshot();
    });
  });

  describe('getTestDevices', () => {
    testTokenNotSet(() => api.getTestDevices('app-slug'));

    it('fetches test devices for an app', async () => {
      const appSlug = 'an-app-slug',
        token = 'such-token';

      (get as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: [
            {
              device_id: 'some-device-id-01',
              device_type: 'ios',
              owner: 'test-user-1'
            },
            {
              device_id: 'some-device-id-02',
              device_type: 'android',
              owner: 'test-user-1'
            },
            {
              device_id: 'some-device-id-03',
              device_type: 'ios',
              owner: 'test-user-2'
            }
          ]
        })
      });

      api.setToken(token);

      const testDevices = await api.getTestDevices(appSlug);

      const url = `${baseAppUrl}/api/resources?path=apps%2F${appSlug}%2Ftest-devices`;
      expect(get).toHaveBeenCalledWith(url, token);

      expect(testDevices).toMatchSnapshot();
    });
  });

  describe('getApp', () => {
    testTokenNotSet(() => api.getApp('app-slug'));

    it('fetches a version for an app', async () => {
      const appSlug = 'such-a-nice-app',
        token = 'very-token';

      (get as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: { app_slug: appSlug }
        })
      });

      api.setToken(token);

      const app = await api.getApp(appSlug);

      const url = `${baseAppUrl}/api/resources?path=apps%2F${appSlug}`;
      expect(get).toHaveBeenCalledWith(url, token);
      expect(app).toMatchSnapshot();
    });
  });
});
