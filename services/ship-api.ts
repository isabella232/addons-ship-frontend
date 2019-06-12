import fetch from 'node-fetch';

import { shipApiConfig } from '@/config';
import { AppVersion } from '@/models';
import { APIConfig } from '@/models/services';
import { mockAppVersion, mockAppVersions } from '@/mocks';
import { snakifyKeys, camelizeKeys } from '@/utils';
import { Uploadable } from '@/models/uploadable';

export class ShipAPIService {
  constructor(private config: APIConfig) {}

  async getAppVersion(appSlug: string, versionId: string): Promise<AppVersion> {
    const resp = await {
      data: snakifyKeys<any>(mockAppVersion)
    };

    const { data } = resp;
    const publicInstallPageURL = data.public_install_page_url;
    data.public_install_page_url = undefined;
    return {
      ...camelizeKeys(data),
      appSlug,
      publicInstallPageURL
    };
  }

  async updateAppVersion(appVersion: AppVersion): Promise<AppVersion> {
    // const {appSlug, id: versionId } = appVersion;
    // const url = `${rootUrl}/apps/${appSlug}/versions/${versionId}`;

    return await appVersion;
  }

  async getAppVersionList(appSlug: string): Promise<AppVersion[]> {
    const resp = await {
      data: mockAppVersions.map(snakifyKeys)
    };

    const { data } = resp;

    return data.map(camelizeKeys) as AppVersion[];
  }

  async uploadScreenshots(appSlug: string, versionId: string, screenshots: Uploadable[]): Promise<Uploadable[]> {
    const url = `${this.config.url}/apps/${appSlug}/versions/${versionId}/screenshots`;

    const body = JSON.stringify({
      screenshots: screenshots.map(snakifyKeys)
    });

    const { data } = await fetch(url, {
      method: 'post',
      headers: {
        Authorization: 'test-api-token-1' // todo
      },
      body
    }).then(res => res.json());

    return data.map(camelizeKeys);
  }

  async uploadedScreenshots(appSlug: string, versionId: string) {
    const url = `${this.config.url}/apps/${appSlug}/versions/${versionId}/screenshots/uploaded`;

    await fetch(url, {
      method: 'patch',
      headers: {
        Authorization: 'test-api-token-1' // todo
      }
    });
  }
}

export default new ShipAPIService(shipApiConfig);
