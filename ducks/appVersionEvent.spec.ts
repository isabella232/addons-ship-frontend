jest.mock('@/services/ship-api');

import configureMockStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import api from '@/services/ship-api';

import { appVersionEvents } from './appVersionEvent';
import fetchAppVersionEvents from './appVersion/fetchAppVersionEvents';
import { mockAppVersionEvents } from '@/mocks';

describe('appVersion', () => {
  let mockStore: MockStoreCreator;
  beforeEach(() => {
    mockStore = configureMockStore([thunk]);
  });

  describe('reducer', () => {
    it('loads app version events', () => {
      const state = appVersionEvents(undefined, fetchAppVersionEvents.complete(mockAppVersionEvents));

      expect(state).toMatchSnapshot();
    });
  });

  describe('fetchAppVersionEvents', () => {
    let store: MockStoreEnhanced;

    beforeEach(() => {
      store = mockStore();
    });

    it('fetches app version events', async () => {
      (api.getAppVersionEvents as jest.Mock).mockResolvedValueOnce([]);
      await store.dispatch(fetchAppVersionEvents('app-slug', 'app-version') as any);

      expect(api.getAppVersionEvents).toHaveBeenCalledWith('app-slug', 'app-version');
      expect(store.getActions()).toMatchSnapshot();
    });

    it("can't fetch app version events", async () => {
      (api.getAppVersionEvents as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(fetchAppVersionEvents('app-slug', 'app-version') as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
