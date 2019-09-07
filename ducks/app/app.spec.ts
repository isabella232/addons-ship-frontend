jest.mock('@/services/ship-api');

import configureMockStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import shipApi from '@/services/ship-api';
import { mockApp } from '@/mocks';

import reducer, { fetchApp, selectPlatform } from '.';

describe('app', () => {
  let mockStore: MockStoreCreator;
  beforeEach(() => {
    mockStore = configureMockStore([thunk.withExtraArgument({ shipApi })]);
  });

  describe('reducer', () => {
    it('loads an app', () => {
      const state = reducer(undefined, fetchApp.complete(mockApp));

      expect(state).toMatchSnapshot();
    });

    it('selects a platform', () => {
      const state = reducer(undefined, selectPlatform('ios'));

      expect(state).toMatchSnapshot();
    });
  });

  describe('fetchApp', () => {
    let store: MockStoreEnhanced;

    beforeEach(() => {
      store = mockStore();
    });

    it('fetches app version events', async () => {
      const appSlug = 'balatonon';
      (shipApi.getApp as jest.Mock).mockResolvedValueOnce(mockApp);
      await store.dispatch(fetchApp(appSlug) as any);

      expect(shipApi.getApp).toHaveBeenCalledWith(appSlug);
      expect(store.getActions()).toMatchSnapshot();
      expect(store.getState()).toMatchSnapshot();
    });

    it("can't fetch an app", async () => {
      (shipApi.getApp as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(fetchApp('froccsozok') as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
