import { Dispatch } from 'redux';
import { createAction } from 'deox';

import api from '@/services/ship-api';
import { AppVersion } from '@/models';
import { RootState } from '@/store';

import { $ } from './common';

const _updateAppVersion = (appVersion: AppVersion) => async (dispatch: Dispatch, getState: () => RootState) => {
  const {
    auth: { token }
  } = getState();

  api.setToken(token);

  dispatch(updateAppVersion.next());

  try {
    const newAppVersion = await api.updateAppVersion(appVersion);

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
