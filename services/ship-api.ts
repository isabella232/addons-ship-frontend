import fetch from 'node-fetch';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';

import { AppVersion, AppVersionList } from '@/models';
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
      publicInstallPageURL
    };
  }

  async getAppVersionList(appSlug: string): Promise<AppVersionList> {
    const resp = await {
      data: mockAppVersions.map(snakifyKeys)
    };

    const { data } = resp;

    return map(groupBy(data, 'version'), (apps, version) => ({
      apps: apps.map(camelizeKeys),
      version
    })) as AppVersionList;
  }
}

export default new ShipAPIService(fetch, {
  url: 'todo: get from config'
});
