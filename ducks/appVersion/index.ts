import { createReducer } from 'deox';

import { AppVersion, AppVersionEvent } from '@/models';

import fetchAppVersion from './fetchAppVersion';
import updateAppVersion from './updateAppVersion';
import uploadScreenshots from './uploadScreenshots';
import deleteScreenshot from './deleteScreenshot';
import uploadFeatureGraphic from './uploadFeatureGraphic';
import deleteFeatureGraphic from './deleteFeatureGraphic';
import publishAppVersion from './publishAppVersion';
import pollPublishStatus, { pollPublishStatusEpic } from './pollPublishStatus';
import fetchAppVersionEvents from './fetchAppVersionEvents';
import { placeholderAppIcon } from '@/config';

export type AppVersionState = {
  appVersion: AppVersion | null;
  isPublishInProgress?: boolean;
  events: AppVersionEvent[];
  isSaving: boolean;
};

const defaultState: AppVersionState = { appVersion: null, isPublishInProgress: false, events: [], isSaving: false };

export {
  fetchAppVersion,
  updateAppVersion,
  uploadScreenshots,
  deleteScreenshot,
  uploadFeatureGraphic,
  deleteFeatureGraphic,
  publishAppVersion,
  pollPublishStatus,
  pollPublishStatusEpic
};
export default createReducer(defaultState, handleAction => [
  handleAction([fetchAppVersion.complete, updateAppVersion.complete], ({ appVersion, ...state }, { payload }) => ({
    ...state,
    appVersion: {
      ...appVersion,
      ...payload,
      iconUrl: (appVersion && appVersion.iconUrl) || payload.iconUrl || placeholderAppIcon
    },
    isSaving: false
  })),
  handleAction(publishAppVersion.next, state => ({ ...state, isPublishInProgress: true })),
  handleAction([publishAppVersion.complete, publishAppVersion.error], state => ({
    ...state,
    isPublishInProgress: false
  })),
  handleAction([pollPublishStatus.complete, fetchAppVersionEvents.complete], (state, { payload }) => ({
    ...state,
    events: payload.map((appVersionEvent: AppVersionEvent) => {
      appVersionEvent.createdAt = new Date(appVersionEvent.createdAtTimestamp);
      appVersionEvent.updatedAt = appVersionEvent.updatedAtTimestamp
        ? new Date(appVersionEvent.updatedAtTimestamp)
        : null;

      return appVersionEvent;
    })
  })),
  handleAction(updateAppVersion.next, state => ({
    ...state,
    isSaving: true
  }))
]);
