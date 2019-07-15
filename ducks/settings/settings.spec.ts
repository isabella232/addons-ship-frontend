jest.mock('@/services/ship-api');
jest.mock('@/utils/file');

import configureMockStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mockSettings } from '@/mocks';
import { Settings, IosSettings } from '@/models/settings';
import shipApi from '@/services/ship-api';

import settings, { fetchSettings, updateSettings } from '.';

describe('settings', () => {
  let mockStore: MockStoreCreator, store: MockStoreEnhanced;
  beforeEach(() => {
    mockStore = configureMockStore([thunk.withExtraArgument({ shipApi })]);
    store = mockStore();
  });

  describe('reducer', () => {
    it('loads settings', () => {
      const state = settings(undefined, fetchSettings.complete(mockSettings));

      expect(state).toMatchSnapshot();
    });
  });

  describe('fetchSettings', () => {
    it('fetches settings', async () => {
      const appSlug = 'app-slug';
      await store.dispatch(fetchSettings(appSlug) as any);

      expect(store.getActions()).toMatchSnapshot();
      expect(shipApi.getSettings).toHaveBeenCalledWith(appSlug);
    });

    it("can't fetch settings", async () => {
      (shipApi.getSettings as jest.Mock).mockRejectedValueOnce('api had some issue');
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
      (shipApi.updateSettings as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(updateSettings(updatedSettings) as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
