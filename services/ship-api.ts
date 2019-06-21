import { shipApiConfig } from '@/config';
import { AppVersion } from '@/models';
import { APIConfig } from '@/models/services';
import { Uploadable } from '@/models/uploadable';
import { snakifyKeys, camelizeKeys } from '@/utils';
import { patch, post, get, put } from '@/utils/request';

export class ShipAPIService {
  constructor(private config: APIConfig) {}

  private token: string | null = null;
  setToken(token: string) {
    this.token = token;
  }

  // GET /apps/{app-slug}/versions
  async getAppVersionList(appSlug: string): Promise<AppVersion[]> {
    if (this.token === null) {
      throw new Error('Token not set');
    }

    const url = `${this.config.url}/apps/${appSlug}/versions`;

    const { data } = await get(url, this.token).then(res => res.json());

    return data.map(camelizeKeys) as AppVersion[];
  }

  // GET /apps/{app-slug}/versions/{version-id}
  async getAppVersion(appSlug: string, versionId: string): Promise<AppVersion> {
    if (this.token === null) {
      throw new Error('Token not set');
    }

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
    if (this.token === null) {
      throw new Error('Token not set');
    }

    const { appSlug, id: versionId } = appVersion;
    const url = `${this.config.url}/apps/${appSlug}/versions/${versionId}`,
      body = JSON.stringify(snakifyKeys(appVersion));

    const { data } = await put(url, this.token, body).then(res => res.json());
    return await camelizeKeys(data);
  }

  // POST /apps/{app-slug}/versions/{version-id}/screenshots
  async uploadScreenshots(appSlug: string, versionId: string, screenshots: Uploadable[]): Promise<Uploadable[]> {
    if (this.token === null) {
      throw new Error('Token not set');
    }

    const url = `${this.config.url}/apps/${appSlug}/versions/${versionId}/screenshots`,
      body = JSON.stringify({
        screenshots: screenshots.map(snakifyKeys)
      });

    const { data } = await post(url, this.token, body).then(res => res.json());

    return data.map(camelizeKeys);
  }

  // PATCH /apps/{app-slug}/versions/{version-id}/screenshots/uploaded
  uploadedScreenshots(appSlug: string, versionId: string) {
    if (this.token === null) {
      throw new Error('Token not set');
    }

    const url = `${this.config.url}/apps/${appSlug}/versions/${versionId}/screenshots/uploaded`;

    return patch(url, this.token);
  }
}

export default new ShipAPIService(shipApiConfig);
