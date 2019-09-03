import { createReducer } from 'deox';

import { fetchApp } from './app';
import { fetchAppVersionList } from './appVersionList';
import { fetchTestDevices } from './testDevices';
import {
  fetchSettings,
  updateSettings,
  addAppContact,
  listAppContacts,
  updateAppContact,
  deleteAppContact
} from './settings';
import {
  fetchAppVersion,
  updateAppVersion,
  uploadScreenshots,
  deleteScreenshot,
  uploadFeatureGraphic,
  deleteFeatureGraphic,
  publishAppVersion,
  pollPublishStatus
} from './appVersion';

export const errorActions = [
  fetchAppVersionList,
  fetchApp,
  fetchTestDevices,
  fetchSettings,
  updateSettings,
  addAppContact,
  listAppContacts,
  updateAppContact,
  deleteAppContact,
  fetchAppVersion,
  updateAppVersion,
  uploadScreenshots,
  deleteScreenshot,
  uploadFeatureGraphic,
  deleteFeatureGraphic,
  publishAppVersion,
  pollPublishStatus
].map(action => action.error);

export type ErrorsState = Error | null;
export default createReducer(null as ErrorsState, handleAction => [
  handleAction(errorActions, (_, { payload }) => payload)
]);
