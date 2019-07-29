import { bitriseApiConfig } from '@/config';
import { TestDevice } from '@/models/test-device';
import { APIConfig } from '@/models/services';
import { App } from '@/models/app';
import { camelizeKeysDeep } from '@/utils';
import { get } from '@/utils/request';
import { mockApp } from '@/mocks';

export class BitriseAPIService {
  constructor(private config: APIConfig) {}

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

  // /v0.1/apps/{app-slug}/test-devices
  async getTestDevices(appSlug: string): Promise<TestDevice[]> {
    this.checkToken();

    const { data } = await get(`${this.config.url}/apps/${appSlug}/test-devices`, this.token).then(res => res.json());

    return data.map(camelizeKeysDeep);
  }

  async getApp(appSlug: string): Promise<App> {
    // TODO replace with `checkToken` and proper implementation, tests
    if (this.token) {
      const { data } = await get(`${this.config.url}/apps/${appSlug}`, this.token).then(res => res.json());

      return camelizeKeysDeep(data);
    }

    return mockApp;
  }
}

export default new BitriseAPIService(bitriseApiConfig);
