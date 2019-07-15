import { createReducer } from 'deox';

import { Settings } from '@/models/settings';

import fetchSettings from './fetchSettings';
import updateSettings from './updateSettings';

const defaultState: SettingsState = {
  projectType: 'other'
};
export { fetchSettings, updateSettings };

export type SettingsState = Settings;
export default createReducer(defaultState, handleAction => [
  handleAction(fetchSettings.complete, (_, { payload }) => payload)
]);
