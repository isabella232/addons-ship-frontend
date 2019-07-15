jest.mock('@/utils/request');

import { Uploadable } from '@/models/uploadable';
import { patch, post, get, put } from '@/utils/request';
import { mockAppVersion, mockSettings } from '@/mocks';
import { Settings } from '@/models/settings';

import { ShipAPIService } from './ship-api';

describe('Ship API service', () => {
  const apiUrl = 'http://ship.api';
  let api: ShipAPIService;
  beforeEach(() => {
    api = new ShipAPIService({ url: apiUrl });
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
          data: { id: 123, app_slug: appSlug, build_number: '456', public_install_page_url: 'def.a.valid.url' }
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
        buildNumber = 123;

      api.setToken(token);

      const url = `${apiUrl}/apps/${appSlug}/versions/${id}`;
      const appVersion = await api.updateAppVersion({ appSlug, id, buildNumber } as any);
      expect(put).toHaveBeenCalledWith(
        url,
        token,
        `{"app_slug":"${appSlug}","id":"${id}","build_number":${buildNumber}}`
      );

      expect(appVersion).toMatchSnapshot();
    });
  });

  describe('getAppVersionList', () => {
    testTokenNotSet(() => api.getAppVersionList('slug'));

    it('fetches a list of versions for an app', async () => {
      (get as jest.Mock).mockResolvedValueOnce({
        json: () => ({ data: [{ id: 123, app_slug: appSlug, build_number: '456' }] })
      });

      const appSlug = 'an-app-slug',
        token = 'so-token';
      api.setToken(token);

      const appVersions = await api.getAppVersionList(appSlug);

      expect(get).toHaveBeenCalledWith(`${apiUrl}/apps/${appSlug}/versions`, token);
      expect(appVersions).toMatchSnapshot();
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

  describe('getSettings', () => {
    testTokenNotSet(() => api.getSettings('slug'));

    it('fetches settings for an app', async () => {
      (get as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: { project_type: 'android' }
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
    testTokenNotSet(() => api.updateSettings({} as Settings));

    it('updates settings for an app', async () => {
      api.setToken('very-token');
      const settings = await api.updateSettings(mockSettings);

      // expect(fetch).toHaveBeenCalledWith(`/v0.1/apps/${appSlug}/settings`);

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
    testTokenNotSet(() => api.getAppVersionEvents(mockAppVersion));

    it('fetches the events for an app version', async () => {
      (get as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: [
            {
              id: 'an-id',
              status: 'in-progress',
              text: 'some-string',
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
      const resp = await api.getAppVersionEvents({ appSlug, id } as any);

      expect(get).toHaveBeenCalledWith(url, token);
      expect(resp).toMatchSnapshot();
    });
  });

  describe('addAppContact', () => {
    testTokenNotSet(() => api.addAppContact('app-slug', 'john@do.e'));

    it('post a new app contact', async () => {
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

      expect(post).toHaveBeenCalledWith(url, token, `{"email":"${email}"}`);
      expect(resp).toMatchSnapshot();
    });
  });
});
