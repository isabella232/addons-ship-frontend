jest.mock('@/utils/request');

import { BitriseAPIService } from './bitrise-api';
import { get } from '@/utils/request';

describe('Bitrise API service', () => {
  const apiUrl = 'http://bitrise.api';
  let api: BitriseAPIService;
  beforeEach(() => {
    api = new BitriseAPIService({ url: apiUrl });
    ([get] as jest.Mock[]).forEach(m => m.mockReset());
  });

  const testTokenNotSet = (fn: Function) => {
    it('throws an error if token was not set', () => {
      expect(fn()).rejects.toEqual(new Error('Token not set'));
    });
  };

  describe('getTestDevices', () => {
    testTokenNotSet(() => api.getTestDevices('app-slug'));
  });

  it('fetches test devices for an app', async () => {
    const appSlug = 'an-app-slug',
      token = 'such-token';

    (get as jest.Mock).mockResolvedValueOnce({
      json: () => ({
        data: [
          {
            device_id: 'some-device-id-01',
            device_type: 'ios',
            owner: 'test-user-1'
          },
          {
            device_id: 'some-device-id-02',
            device_type: 'android',
            owner: 'test-user-1'
          },
          {
            device_id: 'some-device-id-03',
            device_type: 'ios',
            owner: 'test-user-2'
          }
        ]
      })
    });

    api.setToken(token);

    const testDevices = await api.getTestDevices(appSlug);

    const url = `${apiUrl}/apps/${appSlug}/test-devices`;
    expect(get).toHaveBeenCalledWith(url, token);

    expect(testDevices).toMatchSnapshot();
  });

  describe('getApp', () => {
    it.skip('throws an error if token was not set', () => {});

    it('fetches a version for an app', async () => {
      const appSlug = 'such-a-nice-app',
        token = 'very-token';

      (get as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: { app_slug: appSlug }
        })
      });

      api.setToken(token);

      const app = await api.getApp(appSlug);

      const url = `${apiUrl}/apps/${appSlug}`;
      expect(get).toHaveBeenCalledWith(url, token);
      expect(app).toMatchSnapshot();
    });
  });
});
