import { createReducer } from 'deox';

import { AppVersion } from '@/models';

import fetchAppVersion from './fetchAppVersion';
import updateAppVersion from './updateAppVersion';
import uploadScreenshots from './uploadScreenshots';
import pollPublishStatus, { pollPublishStatusEpic } from './pollPublishStatus';

export type AppVersionState = null | AppVersion;

const defaultState = null as AppVersionState;

export { fetchAppVersion, updateAppVersion, uploadScreenshots, pollPublishStatusEpic };
export default createReducer(defaultState, handleAction => [
  handleAction([fetchAppVersion.complete, updateAppVersion.complete], (_, { payload }) => payload)
]);
