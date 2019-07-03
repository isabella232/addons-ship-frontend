import { Dispatch } from 'redux';
import { createAction } from 'deox';

import api from '@/services/ship-api';
import { AppVersion } from '@/models';
import { RootState } from '@/store';

import { $ } from './common';

const _fetchAppVersion = (appSlug: string, versionId: string) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const {
    auth: { token }
  } = getState();

  api.setToken(token);
  dispatch(fetchAppVersion.next());

  try {
    const appVersion = await api.getAppVersion(appSlug, versionId);

    dispatch(fetchAppVersion.complete(appVersion));
  } catch (error) {
    dispatch(fetchAppVersion.error(error));
  }
};

const fetchAppVersion = Object.assign(_fetchAppVersion, {
  next: createAction($`GET_NEXT`),
  complete: createAction($`GET_COMPLETE`, resolve => (appVersion: AppVersion) => resolve(appVersion)),
  error: createAction($`GET_ERROR`, resolve => (error: Error) => resolve(error))
});

export default fetchAppVersion;
