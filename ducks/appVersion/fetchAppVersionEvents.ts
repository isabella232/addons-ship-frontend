import { Dispatch } from 'redux';
import { createAction } from 'deox';

import api from '@/services/ship-api';
import { AppVersionEvent } from '@/models';

import { $ } from './common';

const _fetchAppVersionEvents = (appSlug: string, versionId: string) => async (dispatch: Dispatch) => {
  dispatch(fetchAppVersionEvents.next());

  try {
    const appVersionEvents = await api.getAppVersionEvents(appSlug, versionId);

    dispatch(fetchAppVersionEvents.complete(appVersionEvents));
  } catch (error) {
    dispatch(fetchAppVersionEvents.error(error));
  }
};

const fetchAppVersionEvents = Object.assign(_fetchAppVersionEvents, {
  next: createAction($`GET_EVENTS_NEXT`),
  complete: createAction($`GET_EVENTS_COMPLETE`, resolve => (appVersionEvents: AppVersionEvent[]) => resolve(appVersionEvents)),
  error: createAction($`GET_EVENTS_ERROR`, resolve => (error: Error) => resolve(error))
});

export default fetchAppVersionEvents;
