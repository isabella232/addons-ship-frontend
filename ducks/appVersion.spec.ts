jest.mock('@/services/ship-api');

import configureMockStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mockAppVersion } from '@/mocks';
import { AppVersion } from '@/models';
import api from '@/services/ship-api';

import { appVersion, fetchAppVersion, updateAppVersion } from './appVersion';

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
});
