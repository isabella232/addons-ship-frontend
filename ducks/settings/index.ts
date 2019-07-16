import { createReducer } from 'deox';

import { Settings, AppContact } from '@/models/settings';

import fetchSettings from './fetchSettings';
import updateSettings from './updateSettings';
import addAppContact from './addAppContact';
import listAppContacts from './listAppContacts';
import updateAppContact from './updateAppContact';

const defaultState: SettingsState = {
  settings: {
    projectType: 'other'
  },
  appContacts: []
};

export { fetchSettings, updateSettings, addAppContact, listAppContacts, updateAppContact };

export type SettingsState = { settings: Settings; appContacts: AppContact[] };
export default createReducer(defaultState, handleAction => [
  handleAction(fetchSettings.complete, (state, { payload }) => ({ ...state, settings: payload })),
  handleAction(addAppContact.complete, (state, { payload }) => ({
    ...state,
    appContacts: state.appContacts.concat(payload)
  })),
  handleAction(listAppContacts.complete, (state, { payload }) => ({
    ...state,
    appContacts: payload
  })),
  handleAction(updateAppContact.complete, ({ appContacts, ...state }, { payload }) => ({
    ...state,
    appContacts: appContacts.map(appContact => {
      if (appContact.id === payload.id) {
        return payload;
      }

      return appContact;
    })
  }))
]);
