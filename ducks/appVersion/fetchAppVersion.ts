import { Dispatch } from 'redux';
import { createAction } from 'deox';

import { ShipAPIService } from '@/services/ship-api';
import { AppVersion } from '@/models';
import { RootState } from '@/store';

import { $ } from './common';
import { RequestError } from '@/models/errors';

const _fetchAppVersion = (appSlug: string, versionId: string) => async (
  dispatch: Dispatch,
  _getState: () => RootState,
  { shipApi }: { shipApi: ShipAPIService }
) => {
  dispatch(fetchAppVersion.next());

  try {
    const appVersion = await shipApi.getAppVersion(appSlug, versionId);
    appVersion.screenshotDatas = await shipApi.getScreenshots(appSlug, versionId);

    if (appVersion.platform === 'android') {
      try {
        appVersion.featureGraphicData = await shipApi.getFeatureGraphic(appSlug, versionId);
      } catch (error) {
        if (!(error instanceof RequestError && error.status === 404)) {
          throw error;
        }
      }
    }

    dispatch(fetchAppVersion.complete(appVersion));
  } catch (error) {
    console.error('fetchAppVersion', error);
    dispatch(fetchAppVersion.error(error));
  }
};

const fetchAppVersion = Object.assign(_fetchAppVersion, {
  next: createAction($`GET_NEXT`),
  complete: createAction($`GET_COMPLETE`, resolve => (appVersion: AppVersion) => resolve(appVersion)),
  error: createAction($`GET_ERROR`, resolve => (error: Error) => resolve(error))
});

export default fetchAppVersion;
