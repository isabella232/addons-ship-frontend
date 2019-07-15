jest.mock('@/services/ship-api');
jest.mock('@/utils/file');

import configureMockStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mockSettings } from '@/mocks';
import { Settings, IosSettings, AppContact } from '@/models/settings';
import shipApi from '@/services/ship-api';

import settings, { fetchSettings, updateSettings, addAppContact } from '.';

describe('settings', () => {
  const mockAppContact: AppContact = {
    email: 'what@ev.er',
    isConfirmed: false,
    notificationPreferences: { newVersion: true, failedPublish: false, successfulPublish: true }
  };

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

    it('adds an app contact', () => {
      const state = settings(
        {
          settings: { projectType: 'other' },
          appContacts: [mockAppContact]
        },
        addAppContact.complete({ email: 'bit@bot' } as AppContact)
      );

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

  describe('addAppContact', () => {
    it('adds a new contact', async () => {
      const appSlug = 'app-slug',
        email = 'some@random.email';
      await store.dispatch(addAppContact(appSlug, email) as any);

      expect(store.getActions()).toMatchSnapshot();
      expect(shipApi.addAppContact).toHaveBeenCalledWith(appSlug, email);
    });

    it('fails to add a new contact', async () => {
      (shipApi.addAppContact as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(addAppContact('app-clug', 'an@email.adr') as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
