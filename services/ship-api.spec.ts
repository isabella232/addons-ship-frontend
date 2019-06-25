jest.mock('@/utils/request');

import { Uploadable } from '@/models/uploadable';
import { patch, post, get, put } from '@/utils/request';

import { ShipAPIService } from './ship-api';
import { mockAppVersion, mockSettings } from '@/mocks';

describe('Ship API service', () => {
  const apiUrl = 'http://ship.api';
  let api: ShipAPIService;
  beforeEach(() => {
    api = new ShipAPIService({ url: apiUrl });
  });

  const testTokenNotSet = (fn: Function) => {
    it('throws an error if token was not set', () => {
      expect(fn()).rejects.toEqual(new Error('Token not set'));
    });
  };

  describe('getAppVersion', () => {
    testTokenNotSet(() => api.getAppVersion('slug', 'version'));

    it('fetches a version for an app', async () => {
      (get as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: { id: 123, app_slug: appSlug, build_number: '456', public_install_page_url: 'def.a.valid.url' }
        })
      });

      const appSlug = 'an-app-slug',
        versionId = 'a-version-id',
        token = 'very-token';

      api.setToken(token);

      const appVersion = await api.getAppVersion(appSlug, versionId);

      const url = `${apiUrl}/apps/${appSlug}/versions/${versionId}`;
      expect(get).toHaveBeenCalledWith(url, token);

      expect(appVersion).toMatchSnapshot();
    });
  });

  describe('updateAppVersion', () => {
    testTokenNotSet(() => api.updateAppVersion(mockAppVersion));

    it('updates a version for an app', async () => {
      (put as jest.Mock).mockResolvedValueOnce({
        json: () => ({
          data: { id: 123, app_slug: appSlug, build_number: '456' }
        })
      });

      const appSlug = 'an-app-slug',
        id = 'a-version-id',
        token = 'very-token',
        buildNumber = 123;

      api.setToken(token);

      const url = `${apiUrl}/apps/${appSlug}/versions/${id}`;
      const appVersion = await api.updateAppVersion({ appSlug, id, buildNumber } as any);
      expect(put).toHaveBeenCalledWith(
        url,
        token,
        `{"app_slug":"${appSlug}","id":"${id}","build_number":${buildNumber}}`
      );

      expect(appVersion).toMatchSnapshot();
    });
  });

  describe('getAppVersionList', () => {
    testTokenNotSet(() => api.getAppVersionList('slug'));

    it('fetches a list of versions for an app', async () => {
      (get as jest.Mock).mockResolvedValueOnce({
        json: () => ({ data: [{ id: 123, app_slug: appSlug, build_number: '456' }] })
      });

      const appSlug = 'an-app-slug',
        token = 'so-token';
      api.setToken(token);

      const appVersions = await api.getAppVersionList(appSlug);

      expect(get).toHaveBeenCalledWith(`${apiUrl}/apps/${appSlug}/versions`, token);
      expect(appVersions).toMatchSnapshot();
    });
  });

  describe('uploadScreenshots', () => {
    testTokenNotSet(() => api.uploadScreenshots('slug', 'version', []));

    it('calls the api', async () => {
      (post as jest.Mock).mockResolvedValueOnce({
        json: () => ({ data: [{ filename: 'some-file.png', upload_url: 'http://some.url?token=123' }] })
      });

      const appSlug = 'an-app-slug',
        versionId = 'a-version-id',
        screenshots: Uploadable[] = [
          { filename: 'some-file.png', deviceType: 'device type', filesize: 123, screenSize: '6.5"' }
        ],
        token = 'such-token';

      api.setToken(token);

      const result = await api.uploadScreenshots(appSlug, versionId, screenshots);

      const expectedBody = JSON.stringify({
        screenshots: [{ filename: 'some-file.png', device_type: 'device type', filesize: 123, screen_size: '6.5"' }]
      });

      expect(result).toMatchSnapshot();
      expect(post).toHaveBeenLastCalledWith(
        `${apiUrl}/apps/${appSlug}/versions/${versionId}/screenshots`,
        token,
        expectedBody
      );
    });
  });

  describe('uploadedScreenshots', () => {
    testTokenNotSet(async () => await api.uploadedScreenshots('slug', 'version'));

    it('calls the api', async () => {
      const appSlug = 'an-app-slug',
        versionId = 'a-version-id',
        token = 'some-token';
      api.setToken(token);

      await api.uploadedScreenshots(appSlug, versionId);

      const url = `${apiUrl}/apps/${appSlug}/versions/${versionId}/screenshots/uploaded`;
      expect(patch).toHaveBeenLastCalledWith(url, token);
    });
  });

  describe('getSettings', () => {
    testTokenNotSet(() => api.getSettings('slug'));

    it('fetches settings for an app', async () => {
      const appSlug = 'an-app-slug';
      api.setToken('very-token');
      const settings = await api.getSettings(appSlug);

      // expect(fetch).toHaveBeenCalledWith(`/v0.1/apps/${appSlug}/settings`);

      expect(settings).toMatchSnapshot();
    });
  });

  describe('updateSettings', () => {
    testTokenNotSet(() => api.getSettings('slug'));

    it('updates settings for an app', async () => {
      api.setToken('very-token');
      const settings = await api.updateSettings(mockSettings);

      // expect(fetch).toHaveBeenCalledWith(`/v0.1/apps/${appSlug}/settings`);

      expect(settings).toMatchSnapshot();
    });
  });
});
