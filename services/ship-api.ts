import fetch from 'node-fetch';

import { AppVersion } from '@/models';
import { Fetch, APIConfig } from '@/models/services';
import { mockAppVersion, mockAppVersions } from '@/mocks';
import { snakifyKeys, camelizeKeys } from '@/utils';

class ShipAPIService {
  constructor(private fetch: Fetch, private config: APIConfig) {}

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
}

export default new ShipAPIService(fetch, {
  url: 'todo: get from config'
});
