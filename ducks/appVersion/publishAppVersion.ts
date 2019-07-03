import { Dispatch } from 'redux';
import { createAction } from 'deox';

import api from '@/services/ship-api';
import { AppVersion } from '@/models';
import { RootState } from '@/store';

import { $ } from './common';

const _publishAppVersion = (appVersion: AppVersion) => async (dispatch: Dispatch, getState: () => RootState) => {
  const {
    auth: { token }
  } = getState();

  api.setToken(token);

  dispatch(publishAppVersion.next());

  try {
    await api.publishAppVersion(appVersion);

    dispatch(publishAppVersion.complete());
  } catch (error) {
    dispatch(publishAppVersion.error(error));
  }
};

const publishAppVersion = Object.assign(_publishAppVersion, {
  next: createAction($`PUBLISH_NEXT`),
  complete: createAction($`PUBLISH_COMPLETE`, resolve => () => resolve()),
  error: createAction($`PUBLISH_ERROR`, resolve => (error: Error) => resolve(error))
});

export default publishAppVersion;
