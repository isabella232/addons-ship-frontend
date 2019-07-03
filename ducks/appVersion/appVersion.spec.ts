jest.mock('@/services/ship-api');
jest.mock('@/utils/file');

import configureMockStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mockAppVersion } from '@/mocks';
import { AppVersion } from '@/models';
import api from '@/services/ship-api';

import reducer, { fetchAppVersion, updateAppVersion, uploadScreenshots, publishAppVersion } from '.';
import { uploadFileToS3 } from '@/utils/file';

describe('appVersion', () => {
  let mockStore: MockStoreCreator, store: MockStoreEnhanced;
  beforeEach(() => {
    mockStore = configureMockStore([thunk]);
    store = mockStore({ auth: { token: 'some-token' } });
  });

  describe('reducer', () => {
    it('loads an app version', () => {
      const state = reducer(undefined, fetchAppVersion.complete(mockAppVersion));

      expect(state).toMatchSnapshot();
    });
  });

  describe('fetchAppVersion', () => {
    it('fetches an app version', async () => {
      await store.dispatch(fetchAppVersion('app-slug', 'version-id') as any);

      expect(store.getActions()).toMatchSnapshot();
    });

    it("can't fetch an app version", async () => {
      (api.getAppVersion as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(fetchAppVersion('app-slug', 'version-id') as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('updateAppVersion', () => {
    const updatedAppVersion: AppVersion = { ...mockAppVersion, description: 'Some different description' };

    it('updates an app version', async () => {
      await store.dispatch(updateAppVersion(updatedAppVersion) as any);

      expect(store.getActions()).toMatchSnapshot();
    });

    it("can't update an app version", async () => {
      (api.updateAppVersion as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(updateAppVersion(updatedAppVersion) as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('uploadScreenshots', () => {
    it('uploads screenshots', async () => {
      const filename = 'a-file.jpg',
        bits = 'whatever',
        uploadUrl = 'http://some.url?token';
      (api.uploadScreenshots as jest.Mock).mockResolvedValueOnce([
        {
          filename,
          filesize: bits.length,
          uploadUrl
        }
      ]);

      const file = new File([bits], filename);
      await store.dispatch(uploadScreenshots('app-slug', 'version-id', [], [file]) as any);

      expect(api.uploadScreenshots).toHaveBeenCalledWith('app-slug', 'version-id', []);
      expect(uploadFileToS3).toHaveBeenCalledWith(file, uploadUrl);
      expect(api.uploadedScreenshots).toHaveBeenCalledWith('app-slug', 'version-id');
      expect(store.getActions()).toMatchSnapshot();
    });

    it("can't upload screenshots", async () => {
      (api.uploadScreenshots as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(uploadScreenshots('app-slug', 'version-id', [], []) as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('publishAppVersion', () => {
    it('publishes an app version', async () => {
      await store.dispatch(publishAppVersion(mockAppVersion) as any);

      expect(store.getActions()).toMatchSnapshot();
    });

    it("can't publishe an app version", async () => {
      (api.publishAppVersion as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(publishAppVersion(mockAppVersion) as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
