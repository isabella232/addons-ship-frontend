jest.mock('@/services/bitrise-api');

import configureMockStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import api from '@/services/bitrise-api';

import { testDevices, fetchTestDevices } from './testDevices';
import { mockTestDevices } from '@/mocks';

describe('appVersion', () => {
  let mockStore: MockStoreCreator;
  beforeEach(() => {
    mockStore = configureMockStore([thunk]);
  });

  describe('reducer', () => {
    it('loads devices', () => {
      const state = testDevices(undefined, fetchTestDevices.complete(mockTestDevices));

      expect(state).toMatchSnapshot();
    });
  });

  describe('fetchTestDevices', () => {
    let store: MockStoreEnhanced;

    beforeEach(() => {
      store = mockStore();
    });

    it('fetches test devices', async () => {
      await store.dispatch(fetchTestDevices('app-slug') as any);

      expect(store.getActions()).toMatchSnapshot();
    });

    it("can't fetch test devices", async () => {
      (api.getTestDevices as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(fetchTestDevices('app-slug') as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
