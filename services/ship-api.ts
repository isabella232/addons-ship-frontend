import { shipApiConfig } from '@/config';
import { AppVersion, AppVersionEvent } from '@/models';
import { APIConfig } from '@/models/services';
import { Uploadable } from '@/models/uploadable';
import { App } from '@/models/app';
import { snakifyKeys, camelizeKeys, camelizeKeysDeep, snakifyKeysDeep } from '@/utils';
import { patch, post, get, put, del, request } from '@/utils/request';
import { mockSettings } from '@/mocks';
import { Settings, AppContact } from '@/models/settings';

export class ShipAPIService {
  constructor(private config: APIConfig) {}

  // private token: string | null = null;

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

    return data.map((version: any) => ({ appSlug, ...camelizeKeys(version) })) as AppVersion[];
  }

  // GET /apps/{app-slug}/versions/{version-id}
  async getAppVersion(appSlug: string, versionId: string): Promise<AppVersion> {
    this.checkToken();

    const url = `${this.config.url}/apps/${appSlug}/versions/${versionId}`;
    const { data } = await get(url, this.token).then(res => res.json());

    const publicInstallPageURL = data.public_install_page_url;
    data.public_install_page_url = undefined;

    return {
      ...camelizeKeys(data),
      appSlug,
      publicInstallPageURL
    };
  }

  // PUT /apps/{app-slug}/versions/{version-id}
  async updateAppVersion(appVersion: AppVersion): Promise<AppVersion> {
    this.checkToken();

    const { appSlug, id: versionId } = appVersion;
    const url = `${this.config.url}/apps/${appSlug}/versions/${versionId}`,
      body = JSON.stringify(snakifyKeys(appVersion));

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

    const {
      data: { project_type: projectType }
    } = await get(url, this.token).then(res => res.json());

    return { ...mockSettings, projectType };
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

    return data.map(camelizeKeysDeep);
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
}

export default new ShipAPIService(shipApiConfig);
