jest.mock('@/services/ship-api');
jest.mock('@/utils/file');

import configureMockStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mockAppVersions } from '@/mocks';
import api from '@/services/ship-api';

import { fetchAppVersionList, appVersionList } from './appVersionList';

describe('appVersionList', () => {
  let mockStore: MockStoreCreator, store: MockStoreEnhanced;
  beforeEach(() => {
    mockStore = configureMockStore([thunk]);
    store = mockStore({ auth: { token: 'most-tokenish' } });
  });

  describe('reducer', () => {
    it('loads an app version', () => {
      const state = appVersionList(undefined, fetchAppVersionList.complete(mockAppVersions));

      expect(state).toMatchSnapshot();
    });
  });

  describe('fetchAppVersionList', () => {
    it('fetches an app version', async () => {
      await store.dispatch(fetchAppVersionList('app-slug') as any);

      expect(api.getAppVersionList).toHaveBeenCalledWith('app-slug');

      expect(store.getActions()).toMatchSnapshot();
    });

    it("can't fetch an app version", async () => {
      (api.getAppVersionList as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(fetchAppVersionList('app-slug') as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
