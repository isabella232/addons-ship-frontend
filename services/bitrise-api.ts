import fetch from 'node-fetch';

import { TestDevice } from '@/models/test-device';
import { Fetch, APIConfig } from '@/models/services';
import { camelizeKeys } from '@/utils';

class BitriseAPIService {
  constructor(private fetch: Fetch, private config: APIConfig) {}

  // /v0.1/apps/{app-slug}/test-devices
  async getTestDevices(appSlug: string): Promise<TestDevice[]> {
    const resp = await {
      data: [
        { device_id: 'some-device-id-01', device_type: 'ios', owner: 'test-user-1' },
        { device_id: 'some-device-id-02', device_type: 'android', owner: 'test-user-1' },
        { device_id: 'some-device-id-03', device_type: 'ios', owner: 'test-user-2' }
      ]
    };

    const { data: devices } = resp;

    return devices.map(d => camelizeKeys<TestDevice>(d));
  }
}

export default new BitriseAPIService(fetch, {
  url: 'todo: get from config'
});
