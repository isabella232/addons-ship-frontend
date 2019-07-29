jest.mock('@/services/bitrise-api');

import configureMockStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import bitriseApi from '@/services/bitrise-api';
import { mockApp } from '@/mocks';

import reducer, { fetchApp } from './app';

describe('app', () => {
  let mockStore: MockStoreCreator;
  beforeEach(() => {
    mockStore = configureMockStore([thunk.withExtraArgument({ bitriseApi })]);
  });

  describe('reducer', () => {
    it('loads an app', () => {
      const state = reducer(undefined, fetchApp.complete(mockApp));

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
      (bitriseApi.getApp as jest.Mock).mockResolvedValueOnce(mockApp);
      await store.dispatch(fetchApp(appSlug) as any);

      expect(bitriseApi.getApp).toHaveBeenCalledWith(appSlug);
      expect(store.getActions()).toMatchSnapshot();
      expect(store.getState()).toMatchSnapshot();
    });

    it("can't fetch an app", async () => {
      (bitriseApi.getApp as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(fetchApp('froccsozok') as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
