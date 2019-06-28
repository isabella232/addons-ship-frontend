jest.mock('@/services/ship-api');
jest.mock('@/utils/file');

import configureMockStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mockSettings } from '@/mocks';
import { Settings, IosSettings } from '@/models';
import api from '@/services/ship-api';

import { settings, fetchSettings, updateSettings } from './settings';

describe('settings', () => {
  let mockStore: MockStoreCreator, store: MockStoreEnhanced;
  beforeEach(() => {
    mockStore = configureMockStore([thunk]);
    store = mockStore({ auth: { token: 'some-token' } });
  });

  describe('reducer', () => {
    it('loads settings', () => {
      const state = settings(undefined, fetchSettings.complete(mockSettings));

      expect(state).toMatchSnapshot();
    });
  });

  describe('fetchSettings', () => {
    it('fetches settings', async () => {
      await store.dispatch(fetchSettings('app-slug') as any);

      expect(store.getActions()).toMatchSnapshot();
    });

    it("can't fetch settings", async () => {
      (api.getSettings as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(fetchSettings('app-slug') as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('updateSettings', () => {
    const updatedSettings: Settings = {
      ...mockSettings,
      iosSettings: { ...(mockSettings.iosSettings as IosSettings), artifactExposingWorkflows: 'Primary' }
    };

    it('updates settings', async () => {
      await store.dispatch(updateSettings(updatedSettings) as any);

      expect(store.getActions()).toMatchSnapshot();
    });

    it("can't update settings", async () => {
      (api.updateSettings as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(updateSettings(updatedSettings) as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
