import { createReducer } from 'deox';

import { AppVersion } from '@/models';

import fetchAppVersion from './fetchAppVersion';
import updateAppVersion from './updateAppVersion';
import uploadScreenshots from './uploadScreenshots';

export type AppVersionState = null | AppVersion;

const defaultState = null as AppVersionState;

export { fetchAppVersion, updateAppVersion, uploadScreenshots };
export default createReducer(defaultState, handleAction => [
  handleAction([fetchAppVersion.complete, updateAppVersion.complete], (_, { payload }) => payload)
]);
