import { shipApiConfig } from '@/config';
import { AppVersion, AppVersionEvent } from '@/models';
import { APIConfig } from '@/models/services';
import { Uploadable } from '@/models/uploadable';
import { snakifyKeys, camelizeKeys, camelizeKeysDeep } from '@/utils';
import { patch, post, get, put } from '@/utils/request';
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

  async getAppVersionEvents({ appSlug, id: versionId }: AppVersion): Promise<AppVersionEvent[]> {
    this.checkToken();

    const url = `${this.config.url}/apps/${appSlug}/versions/${versionId}/events`;

    const { data } = await get(url, this.token).then(res => res.json());

    return data.map(camelizeKeys).map(({ createdAt, updatedAt, ...event }: AppVersionEvent) => ({
      ...event,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt)
    }));
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

  async updateSettings(settings: Settings): Promise<void> {
    this.checkToken();

    return await new Promise(resolve => setTimeout(resolve, 500)).then(() => {});
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
}

export default new ShipAPIService(shipApiConfig);
