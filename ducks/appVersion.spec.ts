jest.mock('@/services/ship-api');

import configureMockStore, { MockStoreCreator } from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fetchAppVersion } from './appVersion';

describe('appVersion', () => {
  let mockStore: MockStoreCreator;
  beforeEach(() => {
    mockStore = configureMockStore([thunk]);
  });

  it('should update the state', async () => {
    const store = mockStore();

    await store.dispatch(fetchAppVersion('app-slug', 'version-id') as any);

    expect(store.getActions()).toMatchSnapshot();
  });
});
