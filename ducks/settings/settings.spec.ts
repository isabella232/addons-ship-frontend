jest.mock('@/services/ship-api');
jest.mock('@/utils/file');

import configureMockStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mockSettings } from '@/mocks';
import { Settings, IosSettings, AppContact } from '@/models/settings';
import shipApi from '@/services/ship-api';

import settings, {
  fetchSettings,
  updateSettings,
  addAppContact,
  listAppContacts,
  updateAppContact,
  deleteAppContact
} from '.';

describe('settings', () => {
  const mockAppContact: AppContact = {
    id: '123-abc',
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

    it('indicates if settings are being updated', () => {
      let { isSavingSettings } = settings(undefined, updateSettings.next() as any);
      expect(isSavingSettings).toBe(true);

      ({ isSavingSettings } = settings(undefined, updateSettings.complete(mockSettings)));
      expect(isSavingSettings).toBe(false);
    });

    it('adds an app contact', () => {
      const state = settings(
        {
          settings: { projectType: 'other', iosWorkflow: 'all', androidWorkflow: 'all' },
          appContacts: [mockAppContact],
          savingAppContacts: 2
        },
        addAppContact.complete({ email: 'bit@bot' } as AppContact)
      );

      expect(state).toMatchSnapshot();
    });

    it('loads app contacts', () => {
      const state = settings(
        undefined,
        listAppContacts.complete([{ email: 'purr@req.io' }, { email: 'bit@bot.io' }] as AppContact[])
      );

      expect(state).toMatchSnapshot();
    });

    it('updates an app contact', () => {
      const state = settings(
        {
          settings: { projectType: 'other', iosWorkflow: 'all', androidWorkflow: 'all' },
          appContacts: [
            mockAppContact,
            {
              id: '456-asd',
              notificationPreferences: { newVersion: true, failedPublish: true, successfulPublish: false }
            } as AppContact
          ],
          savingAppContacts: 3
        },
        updateAppContact.complete({
          ...mockAppContact,
          notificationPreferences: { newVersion: false, failedPublish: true, successfulPublish: true }
        } as AppContact)
      );

      expect(state).toMatchSnapshot();
    });

    it('removes an app contact', () => {
      const state = settings(
        {
          settings: { projectType: 'other', iosWorkflow: 'all', androidWorkflow: 'all' },
          appContacts: [
            mockAppContact,
            {
              id: '456-asd',
              notificationPreferences: { newVersion: true, failedPublish: true, successfulPublish: false }
            } as AppContact
          ],
          savingAppContacts: 4
        },
        deleteAppContact.complete('456-asd')
      );

      expect(state.appContacts).toHaveLength(1);
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
      iosSettings: { ...(mockSettings.iosSettings as IosSettings) }
    };

    it('updates settings', async () => {
      await store.dispatch(updateSettings('app-123', updatedSettings) as any);

      expect(store.getActions()).toMatchSnapshot();
    });

    it("can't update settings", async () => {
      (shipApi.updateSettings as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(updateSettings('app-123', updatedSettings) as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('addAppContact', () => {
    it('adds a new contact', async () => {
      const appSlug = 'app-slug',
        email = 'some@random.email';
      await store.dispatch(addAppContact(appSlug, email) as any);

      expect(store.getActions()).toMatchSnapshot();
      expect(shipApi.addAppContact).toHaveBeenCalledWith(appSlug, email, undefined);
    });

    it('fails to add a new contact', async () => {
      (shipApi.addAppContact as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(addAppContact('app-clug', 'an@email.adr') as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('listAppContacts', () => {
    it('lists app contacts', async () => {
      const appSlug = 'app-slug';
      await store.dispatch(listAppContacts(appSlug) as any);

      expect(store.getActions()).toMatchSnapshot();
      expect(shipApi.listAppContacts).toHaveBeenCalledWith(appSlug);
    });

    it('fails to list app contacts', async () => {
      (shipApi.listAppContacts as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(listAppContacts('app-slug') as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('updateAppContact', () => {
    it("updates an app contact's notification preferences", async () => {
      const appSlug = 'app-slug',
        appContact = {
          id: 'asd-456',
          notificationPreferences: { newVersion: true, failedPublish: true, successfulPublish: false }
        } as AppContact;
      await store.dispatch(updateAppContact(appSlug, appContact) as any);

      expect(store.getActions()).toMatchSnapshot();
      expect(shipApi.updateAppContactNotificationPreferences).toHaveBeenCalledWith(appSlug, appContact);
    });

    it("fails updates an app contact's notification preferences", async () => {
      (shipApi.updateAppContactNotificationPreferences as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(updateAppContact('app-slug', {} as AppContact) as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('deleteAppContact', () => {
    it('deletes an app contact', async () => {
      const appSlug = 'app-slug',
        appContact = { id: 'asd-456' } as AppContact;
      await store.dispatch(deleteAppContact(appSlug, appContact) as any);

      expect(store.getActions()).toMatchSnapshot();
      expect(shipApi.deleteAppContact).toHaveBeenCalledWith(appSlug, appContact);
    });

    it("fails updates an app contact's notification preferences", async () => {
      (shipApi.deleteAppContact as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(deleteAppContact('app-slug', {} as AppContact) as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
