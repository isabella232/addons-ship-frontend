import { createReducer } from 'deox';

import { AppVersion } from '@/models';

import fetchAppVersion from './fetchAppVersion';
import updateAppVersion from './updateAppVersion';
import uploadScreenshots from './uploadScreenshots';
import publishAppVersion from './publishAppVersion';
import pollPublishStatus, { pollPublishStatusEpic } from './pollPublishStatus';

export type AppVersionState = {
  appVersion: AppVersion | null;
  isPublishInProgress?: boolean;
};

const defaultState: AppVersionState = { appVersion: null, isPublishInProgress: false };

export {
  fetchAppVersion,
  updateAppVersion,
  uploadScreenshots,
  publishAppVersion,
  pollPublishStatus,
  pollPublishStatusEpic
};
export default createReducer(defaultState, handleAction => [
  handleAction([fetchAppVersion.complete, updateAppVersion.complete], (state, { payload }) => ({
    ...state,
    appVersion: payload
  })),
  handleAction(publishAppVersion.next, state => ({ ...state, isPublishInProgress: true })),
  handleAction([publishAppVersion.complete, publishAppVersion.error], state => ({
    ...state,
    isPublishInProgress: false
  }))
]);
