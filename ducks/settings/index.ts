import { createReducer } from 'deox';

import { Settings, AppContact } from '@/models/settings';

import fetchSettings from './fetchSettings';
import updateSettings from './updateSettings';
import addAppContact from './addAppContact';
import listAppContacts from './listAppContacts';
import updateAppContact from './updateAppContact';
import deleteAppContact from './deleteAppContact';

import merge from 'lodash/merge';

export type SettingsState = {
  settings: Settings;
  appContacts: AppContact[];
  isSavingSettings?: boolean;
  hasAppContactsLoaded?: boolean;
  savingAppContacts: number;
};

export { fetchSettings, updateSettings, addAppContact, listAppContacts, updateAppContact, deleteAppContact };

const defaultState: SettingsState = {
  settings: {
    projectType: 'other',
    iosWorkflow: '',
    androidWorkflow: ''
  },
  appContacts: [],
  isSavingSettings: false,
  hasAppContactsLoaded: false,
  savingAppContacts: 0
};
export default createReducer(defaultState, handleAction => [
  handleAction([fetchSettings.complete, updateSettings.complete], (state, { payload }) => ({
    ...state,
    settings: merge(state.settings, payload),
    isSavingSettings: false
  })),
  handleAction([addAppContact.next, updateAppContact.next], ({ savingAppContacts, ...state }) => ({
    ...state,
    savingAppContacts: savingAppContacts + 1
  })),
  handleAction(addAppContact.complete, ({ savingAppContacts, ...state }, { payload }) => ({
    ...state,
    savingAppContacts: savingAppContacts - 1,
    appContacts: state.appContacts.concat(payload)
  })),
  handleAction(listAppContacts.next, state => ({
    ...state,
    hasAppContactsLoaded: false
  })),
  handleAction(listAppContacts.complete, (state, { payload }) => ({
    ...state,
    hasAppContactsLoaded: true,
    appContacts: payload
  })),
  handleAction(updateAppContact.complete, ({ appContacts, savingAppContacts, ...state }, { payload }) => ({
    ...state,
    savingAppContacts: savingAppContacts - 1,
    appContacts: appContacts.map(appContact => {
      if (appContact.id === payload.id) {
        return payload;
      }

      return appContact;
    })
  })),
  handleAction(deleteAppContact.complete, ({ appContacts, ...state }, { payload }) => ({
    ...state,
    appContacts: appContacts.filter(({ id }) => id !== payload)
  })),
  handleAction(updateSettings.next, state => ({ ...state, isSavingSettings: true }))
]);
