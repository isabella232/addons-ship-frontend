import { createReducer } from 'deox';

import { Settings, AppContact } from '@/models/settings';

import fetchSettings from './fetchSettings';
import updateSettings from './updateSettings';
import addAppContact from './addAppContact';

const defaultState: SettingsState = {
  settings: {
    projectType: 'other'
  },
  appContacts: []
};

export { fetchSettings, updateSettings, addAppContact };

export type SettingsState = { settings: Settings; appContacts: AppContact[] };
export default createReducer(defaultState, handleAction => [
  handleAction(fetchSettings.complete, (state, { payload }) => ({ ...state, settings: payload })),
  handleAction(addAppContact.complete, (state, { payload }) => ({
    ...state,
    appContacts: state.appContacts.concat(payload)
  }))
]);
