import { createReducer } from 'deox';
import { DeepImmutableObject } from 'deox/dist/types';

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

export type AppVersionState = {
  appVersion: AppVersion | null;
  isPublishInProgress?: boolean;
  events: AppVersionEvent[];
  isLoadingEvents?: boolean;
  isSaving: number;
};

const defaultState: AppVersionState = {
  appVersion: null,
  isPublishInProgress: false,
  events: [],
  isSaving: 0,
  isLoadingEvents: true
};

export {
  fetchAppVersion,
  updateAppVersion,
  uploadScreenshots,
  deleteScreenshot,
  uploadFeatureGraphic,
  deleteFeatureGraphic,
  publishAppVersion,
  pollPublishStatus,
  pollPublishStatusEpic,
  fetchAppVersionEvents
};

const reduceAppVersion = ({ appVersion, ...state }: DeepImmutableObject<AppVersionState>, payload: AppVersion) => ({
  ...state,
  appVersion: {
    ...appVersion,
    ...payload,
    publicInstallPageURL: (appVersion && appVersion.publicInstallPageURL) || payload.publicInstallPageURL,
    supportedDeviceTypes: (appVersion && appVersion.supportedDeviceTypes) || payload.supportedDeviceTypes
  }
});
export default createReducer(defaultState, handleAction => [
  handleAction(fetchAppVersion.complete, (state, { payload }) => reduceAppVersion(state, payload)),
  handleAction(updateAppVersion.complete, (state, { payload }) => ({
    ...reduceAppVersion(state, payload),
    isSaving: state.isSaving - 1
  })),
  handleAction(publishAppVersion.next, state => ({ ...state, isPublishInProgress: true })),
  handleAction([publishAppVersion.error], state => ({
    ...state,
    isPublishInProgress: false
  })),
  handleAction(fetchAppVersionEvents.next, state => ({
    ...state,
    isLoadingEvents: true
  })),
  handleAction([pollPublishStatus.complete, fetchAppVersionEvents.complete], (state, { payload }) => ({
    ...state,
    isLoadingEvents: false,
    events: payload.map((appVersionEvent: AppVersionEvent) => {
      appVersionEvent.createdAt = new Date(appVersionEvent.createdAtTimestamp);
      appVersionEvent.updatedAt = appVersionEvent.updatedAtTimestamp
        ? new Date(appVersionEvent.updatedAtTimestamp)
        : null;

      return appVersionEvent;
    })
  })),
  handleAction(
    [updateAppVersion.next, uploadScreenshots.next, uploadFeatureGraphic.next],
    ({ isSaving, ...state }) => ({
      ...state,
      isSaving: isSaving + 1
    })
  ),
  handleAction(uploadFeatureGraphic.complete, ({ isSaving, appVersion, ...state }, { payload }) => ({
    ...state,
    appVersion: {
      ...appVersion!,
      featureGraphicData: payload
    },
    isSaving: isSaving - 1
  })),
  handleAction(uploadScreenshots.complete, ({ isSaving, appVersion, ...state }, { payload }) => ({
    ...state,
    appVersion: {
      ...appVersion!,
      screenshotDatas: payload
    },
    isSaving: isSaving - 1
  })),
  handleAction(
    [updateAppVersion.error, uploadScreenshots.error, uploadFeatureGraphic.error],
    ({ isSaving, ...state }) => ({
      ...state,
      isSaving: isSaving - 1
    })
  )
]);
