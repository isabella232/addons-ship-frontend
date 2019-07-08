import { Dispatch } from 'redux';
import { createAction } from 'deox';

import { ShipAPIService } from '@/services/ship-api';
import { AppVersion } from '@/models';
import { RootState } from '@/store';

import { $ } from './common';

const _updateAppVersion = (appVersion: AppVersion) => async (
  dispatch: Dispatch,
  _getState: () => RootState,
  { shipApi }: { shipApi: ShipAPIService }
) => {
  dispatch(updateAppVersion.next());

  try {
    const newAppVersion = await shipApi.updateAppVersion(appVersion);

    dispatch(updateAppVersion.complete(newAppVersion));
  } catch (error) {
    dispatch(updateAppVersion.error(error));
  }
};

const updateAppVersion = Object.assign(_updateAppVersion, {
  next: createAction($`UPDATE_NEXT`),
  complete: createAction($`UPDATE_COMPLETE`, resolve => (appVersion: AppVersion) => resolve(appVersion)),
  error: createAction($`UPDATE_ERROR`, resolve => (error: Error) => resolve(error))
});

export default updateAppVersion;
