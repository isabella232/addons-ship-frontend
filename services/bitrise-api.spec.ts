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

  it('fetches test devices for an app', async () => {
    const appSlug = 'an-app-slug';
    const testDevices = await api.getTestDevices(appSlug);

    // expect(fetch).toHaveBeenCalledWith(`/v0.1/apps/${appSlug}/test-devices`);

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
