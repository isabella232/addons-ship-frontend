jest.mock('@/services/bitrise-api');

import configureMockStore, { MockStoreCreator } from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fetchTestDevices } from './testDevices';

describe('appVersion', () => {
  let mockStore: MockStoreCreator;
  beforeEach(() => {
    mockStore = configureMockStore([thunk]);
  });

  it('should update the state', async () => {
    const store = mockStore();

    await store.dispatch(fetchTestDevices('app-slug') as any);

    expect(store.getActions()).toMatchSnapshot();
  });
});
