jest.mock('@/services/ship-api');

import configureMockStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import shipApi from '@/services/ship-api';

import reducer, { setToken } from './auth';

describe('auth', () => {
  describe('reducer', () => {
    it('sets the token', () => {
      const state = reducer(undefined, setToken.set('some-token'));

      expect(state).toMatchSnapshot();
    });
  });

  describe('setToken', () => {
    it('fetches an app version', async () => {
      const mockStore: MockStoreCreator = configureMockStore([thunk.withExtraArgument({ shipApi })]);
      const store: MockStoreEnhanced = mockStore();

      const token = 'tokenke';

      await store.dispatch(setToken(token) as any);

      expect(store.getActions()).toMatchSnapshot();
      expect(shipApi.setToken).toHaveBeenCalledWith(token);
    });
  });
});
