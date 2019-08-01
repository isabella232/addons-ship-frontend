import { Dispatch } from 'redux';
import { createAction } from 'deox';

import { ShipAPIService } from '@/services/ship-api';
import { AppVersion } from '@/models';
import { RootState } from '@/store';

import { $ } from './common';

const _publishAppVersion = (appVersion: AppVersion) => async (
  dispatch: Dispatch,
  _getState: () => RootState,
  { shipApi }: { shipApi: ShipAPIService }
) => {
  dispatch(publishAppVersion.next());

  try {
    await shipApi.publishAppVersion(appVersion);

    dispatch(publishAppVersion.complete());
  } catch (error) {
    console.error('publishAppVersion', error);
    dispatch(publishAppVersion.error(error));
  }
};

const publishAppVersion = Object.assign(_publishAppVersion, {
  next: createAction($`PUBLISH_NEXT`),
  complete: createAction($`PUBLISH_COMPLETE`),
  error: createAction($`PUBLISH_ERROR`, resolve => (error: Error) => resolve(error))
});

export default publishAppVersion;
