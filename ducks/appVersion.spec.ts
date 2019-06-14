jest.mock('@/services/ship-api');
jest.mock('@/utils/file');

import configureMockStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mockAppVersion } from '@/mocks';
import { AppVersion } from '@/models';
import api from '@/services/ship-api';

import { appVersion, fetchAppVersion, updateAppVersion, uploadScreenshots } from './appVersion';
import { uploadFileToS3 } from '@/utils/file';

describe('appVersion', () => {
  let mockStore: MockStoreCreator;
  beforeEach(() => {
    mockStore = configureMockStore([thunk]);
  });

  describe('reducer', () => {
    it('loads an app version', () => {
      const state = appVersion(undefined, fetchAppVersion.complete(mockAppVersion));

      expect(state).toMatchSnapshot();
    });
  });

  describe('fetchAppVersion', () => {
    let store: MockStoreEnhanced;

    beforeEach(() => {
      store = mockStore();
    });

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
    let store: MockStoreEnhanced;
    const updatedAppVersion: AppVersion = { ...mockAppVersion, description: 'Some different description' };

    beforeEach(() => {
      store = mockStore();
    });

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
    let store: MockStoreEnhanced;

    beforeEach(() => {
      store = mockStore();
    });

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
});
