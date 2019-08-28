import { shipApiConfig } from '@/config';
import { AppVersion, AppVersionEvent, Screenshot, ScreenshotResponse } from '@/models';
import { APIConfig, AppConfig } from '@/models/services';
import { Uploadable } from '@/models/uploadable';
import { App } from '@/models/app';
import { snakifyKeys, camelizeKeys, camelizeKeysDeep, snakifyKeysDeep } from '@/utils';
import { patch, post, get, put, del, request } from '@/utils/request';
import lodashGet from 'lodash/get';
import { Settings, AppContact } from '@/models/settings';
import { TestDevice } from '@/models/test-device';

export class ShipAPIService {
  constructor(private config: APIConfig & AppConfig) {}

  // @ts-ignore TypeScript has no guard for throwing unfortunately, `token` *can* be null
  private token: string = null;
  setToken(token: string) {
    this.token = token;
  }

  checkToken() {
    if (this.token === null) {
      throw new Error('Token not set');
    }
  }

  // GET /apps/{app-slug}/versions
  async getAppVersionList(appSlug: string): Promise<AppVersion[]> {
    this.checkToken();

    const url = `${this.config.url}/apps/${appSlug}/versions`;

    const { data } = await get(url, this.token).then(res => res.json());

    return data.map((version: any) => {
      const camelizedAppVersionData: any = camelizeKeys(version);
      const camelizedAppInfo: any = camelizeKeys(camelizedAppVersionData.appInfo);
      return {
        appSlug,
        appName: camelizedAppInfo.title,
        iconUrl: camelizedAppInfo.appIconUrl,
        ...camelizedAppVersionData
      };
    }) as AppVersion[];
  }

  // GET /apps/{app-slug}/versions/{version-id}
  async getAppVersion(appSlug: string, versionId: string): Promise<AppVersion> {
    this.checkToken();

    const url = `${this.config.url}/apps/${appSlug}/versions/${versionId}`;
    const { data } = await get(url, this.token).then(res => res.json());

    const publicInstallPageURL = data.public_install_page_url;
    data.public_install_page_url = undefined;

    let {
      appStoreInfo: { fullDescription: description, ...appStoreInfo },
      appInfo,
      ...appVersionData
    } = camelizeKeysDeep(data);
    appStoreInfo = { ...appStoreInfo, description };
    appVersionData = {
      ...appVersionData,
      ...appStoreInfo,
      appName: appInfo.title,
      iconUrl: appInfo.appIconUrl,
      appSlug,
      publicInstallPageURL
    };
    if (!appVersionData.supportedDeviceTypes) {
      appVersionData.supportedDeviceTypes = [];
    }

    return appVersionData as AppVersion;
  }

  // PUT /apps/{app-slug}/versions/{version-id}
  async updateAppVersion(appVersion: AppVersion): Promise<AppVersion> {
    this.checkToken();

    let {
      shortDescription,
      description: fullDescription,
      whatsNew,
      promotionalText,
      keywords,
      reviewNotes,
      supportUrl,
      marketingUrl,
      ...appVersionData
    } = appVersion;

    const { appSlug, id: versionId } = appVersion;
    const url = `${this.config.url}/apps/${appSlug}/versions/${versionId}`,
      body = JSON.stringify(
        snakifyKeysDeep({
          ...appVersionData,
          appStoreInfo: {
            shortDescription,
            fullDescription,
            whatsNew,
            promotionalText,
            keywords,
            reviewNotes,
            supportUrl,
            marketingUrl
          }
        })
      );

    const { data } = await put(url, this.token, body).then(res => res.json());
    return await camelizeKeys(data);
  }

  async getAppVersionEvents(appSlug: string, versionId: string): Promise<AppVersionEvent[]> {
    this.checkToken();

    const url = `${this.config.url}/apps/${appSlug}/versions/${versionId}/events`;

    const { data } = await get(url, this.token).then(res => res.json());

    return data.map(camelizeKeys).map(
      ({ createdAt, updatedAt, eventText, ...event }: any) =>
        ({
          ...event,
          text: eventText,
          createdAt: new Date(createdAt),
          updatedAt: new Date(updatedAt)
        } as AppVersionEvent)
    );
  }

  // GET /apps/{app-slug}/versions/{version-id}/screenshots

  async getScreenshots(appSlug: string, versionId: string): Promise<ScreenshotResponse[]> {
    this.checkToken();

    const url = `${this.config.url}/apps/${appSlug}/versions/${versionId}/screenshots`;

    const { data } = await get(url, this.token).then(res => res.json());

    return data.map(camelizeKeys).map(
      ({ createdAt, updatedAt, ...screenshotData }: any) =>
        ({
          ...screenshotData,
          createdAt: new Date(createdAt),
          updatedAt: new Date(updatedAt)
        } as ScreenshotResponse)
    );
  }

  // POST /apps/{app-slug}/versions/{version-id}/screenshots
  async uploadScreenshots(appSlug: string, versionId: string, screenshots: Uploadable[]): Promise<Uploadable[]> {
    this.checkToken();

    const url = `${this.config.url}/apps/${appSlug}/versions/${versionId}/screenshots`,
      body = JSON.stringify({
        screenshots: screenshots.map(snakifyKeys)
      });

    const { data } = await post(url, this.token, body).then(res => res.json());

    return data.map(camelizeKeys);
  }

  async deleteScreenshot(appSlug: string, versionId: string, screenshotId: string): Promise<void> {
    this.checkToken();

    const url = `${this.config.url}/apps/${appSlug}/versions/${versionId}/screenshots/${screenshotId}`;

    await del(url, this.token);
  }

  // POST /apps/{app-slug}/versions/{version-id}/publish
  async publishAppVersion(appVersion: AppVersion): Promise<AppVersion> {
    this.checkToken();

    const { appSlug, id: versionId } = appVersion;
    const url = `${this.config.url}/apps/${appSlug}/versions/${versionId}/publish`;

    return await post(url, this.token, undefined).then(res => res.json());
  }

  // PATCH /apps/{app-slug}/versions/{version-id}/screenshots/uploaded
  uploadedScreenshots(appSlug: string, versionId: string) {
    this.checkToken();

    const url = `${this.config.url}/apps/${appSlug}/versions/${versionId}/screenshots/uploaded`;

    return patch(url, this.token);
  }

  async getSettings(appSlug: string): Promise<Settings> {
    this.checkToken();

    const url = `${this.config.url}/apps/${appSlug}/settings`;

    const { data } = await get(url, this.token).then(res => res.json());

    let settings: any = camelizeKeysDeep(data);
    settings.provProfiles = lodashGet(settings, 'iosSettings.availableProvisioningProfiles') || [];
    settings.certificates = lodashGet(settings, 'iosSettings.availableCodeSigningIdentities') || [];
    settings.keystoreFiles = lodashGet(settings, 'androidSettings.availableKeystoreFiles') || [];
    settings.serviceAccountJsonFiles = lodashGet(settings, 'androidSettings.availableServiceAccountFiles') || [];

    settings.provProfiles = settings.provProfiles.map((provProfile: any) => ({
      name: provProfile.upload_file_name
    }));
    settings.certificates = settings.certificates.map((certificate: any) => ({
      name: certificate.upload_file_name
    }));
    settings.keystoreFiles = settings.keystoreFiles.map((keystoreFile: any) => ({
      name: keystoreFile.upload_file_name
    }));
    settings.serviceAccountJsonFiles = settings.serviceAccountJsonFiles.map((serviceAccountJsonFile: any) => ({
      name: serviceAccountJsonFile.upload_file_name
    }));

    if (settings.iosSettings) {
      delete settings.iosSettings['availableProvisioningProfiles'];
      delete settings.iosSettings['availableCodeSigningIdentities'];
    }
    if (settings.androidSettings) {
      delete settings.androidSettings['availableKeystoreFiles'];
      delete settings.androidSettings['availableServiceAccountFiles'];
    }

    return settings;
  }

  async updateSettings(appSlug: string, settings: Settings): Promise<Settings> {
    this.checkToken();

    const { iosWorkflow, androidWorkflow, iosSettings, androidSettings } = settings;

    const url = `${this.config.url}/apps/${appSlug}/settings`,
      body = JSON.stringify(
        snakifyKeysDeep({
          iosWorkflow,
          androidWorkflow,
          iosSettings,
          androidSettings
        })
      );

    const { data } = await patch(url, this.token, body).then(res => res.json());

    return camelizeKeysDeep(data);
  }

  async addAppContact(
    appSlug: string,
    email: string,
    notificationPreferences: AppContact['notificationPreferences'] = {
      newVersion: true,
      failedPublish: true,
      successfulPublish: true
    }
  ): Promise<AppContact> {
    this.checkToken();

    const url = `${this.config.url}/apps/${appSlug}/contacts`,
      body = JSON.stringify({
        email,
        notification_preferences: snakifyKeys(notificationPreferences)
      });
    const { data } = await post(url, this.token, body).then(res => res.json());

    return camelizeKeysDeep(data);
  }

  async listAppContacts(appSlug: string): Promise<AppContact[]> {
    this.checkToken();

    const url = `${this.config.url}/apps/${appSlug}/contacts`;
    const { data } = await get(url, this.token).then(res => res.json());

    const appContacts: AppContact[] = data.map(camelizeKeysDeep);

    return appContacts.map(({ confirmedAt, ...contact }) => ({
      ...contact,
      isConfirmed: !!confirmedAt && !confirmedAt.startsWith('0001') && new Date(confirmedAt).getTime() > 0
    }));
  }

  async updateAppContactNotificationPreferences(appSlug: string, appContact: AppContact): Promise<AppContact> {
    this.checkToken();

    const url = `${this.config.url}/apps/${appSlug}/contacts/${appContact.id}`,
      body = JSON.stringify(snakifyKeys(appContact.notificationPreferences));

    const { data } = await put(url, this.token, body).then(res => res.json());

    return camelizeKeysDeep(data);
  }

  async deleteAppContact(appSlug: string, appContact: AppContact): Promise<void> {
    this.checkToken();

    const url = `${this.config.url}/apps/${appSlug}/contacts/${appContact.id}`;

    await del(url, this.token);
  }

  async confirmEmail(confirmToken: string): Promise<{ app: App; appContact: AppContact }> {
    const url = `${this.config.url}/confirm_email`,
      body = JSON.stringify({ confirmation_token: confirmToken });

    const { data } = await request({ url, method: 'PATCH', body }).then(res => res.json());

    return camelizeKeysDeep(data);
  }

  async getResource<T>(reourcePath: string): Promise<T> {
    this.checkToken();

    const { data } = await get(
      `${this.config.baseUrl}/api/resources?path=${encodeURIComponent(reourcePath)}`,
      this.token
    ).then(res => res.json());

    return data;
  }

  async getApp(appSlug: string): Promise<App> {
    const data = await this.getResource<any>(`apps/${appSlug}`);

    return camelizeKeysDeep({ ...data, appSlug });
  }

  async getTestDevices(appSlug: string): Promise<TestDevice[]> {
    const data = await this.getResource<any[]>(`apps/${appSlug}/test-devices`);

    return data.map(camelizeKeysDeep) as TestDevice[];
  }
}

export default new ShipAPIService(shipApiConfig);
