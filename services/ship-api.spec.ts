jest.mock('node-fetch');

import fetch from 'node-fetch';

import { Uploadable } from '@/models/uploadable';

import api, { ShipAPIService } from './ship-api';

describe('Ship API service', () => {
  const apiUrl = 'http://ship.api';
  let fakeApi: ShipAPIService;
  beforeAll(() => {
    fakeApi = new ShipAPIService({ url: apiUrl });
  });

  it('fetches a version for an app', async () => {
    const appSlug = 'an-app-slug';
    const versionId = 'a-version-id';
    const appVersion = await api.getAppVersion(appSlug, versionId);

    // expect(fetch).toHaveBeenCalledWith(`/apps/${appSlug}/versions/${versionId}`);

    expect(appVersion).toMatchSnapshot();
  });

  it('fetches a list of version for an app', async () => {
    const appSlug = 'an-app-slug';
    const appVersions = await api.getAppVersionList(appSlug);

    // expect(fetch).toHaveBeenCalledWith(`/apps/${appSlug}/versions/${versionId}`);

    expect(appVersions).toMatchSnapshot();
  });

  describe('uploadScreenshots', () => {
    it('calls the api', async () => {
      ((fetch as any) as jest.Mock).mockResolvedValueOnce({
        json: () => ({ data: [{ filename: 'some-file.png', upload_url: 'http://some.url?token=123' }] })
      });

      const appSlug = 'an-app-slug',
        versionId = 'a-version-id',
        screenshots: Uploadable[] = [
          { filename: 'some-file.png', deviceType: 'device type', filesize: 123, screenSize: '6.5"' }
        ];

      const result = await fakeApi.uploadScreenshots(appSlug, versionId, screenshots);

      expect(result).toMatchSnapshot();
      expect(fetch).toHaveBeenLastCalledWith(`${apiUrl}/apps/${appSlug}/versions/${versionId}/screenshots`, {
        method: 'post',
        headers: {
          Authorization: 'test-api-token-1'
        },
        body: JSON.stringify({
          screenshots: [{ filename: 'some-file.png', device_type: 'device type', filesize: 123, screen_size: '6.5"' }]
        })
      });
    });
  });

  describe('uploadedScreenshots', () => {
    it('calls the api', async () => {
      const appSlug = 'an-app-slug',
        versionId = 'a-version-id';

      await fakeApi.uploadedScreenshots(appSlug, versionId);

      expect(fetch).toHaveBeenLastCalledWith(`${apiUrl}/apps/${appSlug}/versions/${versionId}/screenshots/uploaded`, {
        method: 'patch',
        headers: {
          Authorization: 'test-api-token-1'
        }
      });
    });
  });
});
