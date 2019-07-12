import fetch from 'node-fetch';

import { TestDevice } from '@/models/test-device';
import { Fetch, APIConfig } from '@/models/services';
import { camelizeKeys, snakifyKeys } from '@/utils';
import { mockTestDevices } from '@/mocks';

class BitriseAPIService {
  constructor(private fetch: Fetch, private config: APIConfig) {}

  // /v0.1/apps/{app-slug}/test-devices
  async getTestDevices(appSlug: string): Promise<TestDevice[]> {
    const resp = await {
      data: mockTestDevices.map(snakifyKeys)
    };

    const { data } = resp;

    return data.map((device: any) => camelizeKeys<TestDevice>(device));
  }
}

export default new BitriseAPIService(fetch, {
  url: 'todo: get from config'
});
