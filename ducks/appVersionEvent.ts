import { Dispatch } from 'redux';
import { createAction, createReducer } from 'deox';

import api from '@/services/ship-api';
import { actionTypeCreator } from '@/utils';
import { AppVersionEvent } from '@/models';

const $ = actionTypeCreator('TEST_DEVICES');

const _fetchAppVersionEvents = (appSlug: string, versionId: string) => async (dispatch: Dispatch) => {
  dispatch(fetchAppVersionEvents.next());

  try {
    const appVersionEvents = await api.getAppVersionEvents(appSlug, versionId);

    dispatch(fetchAppVersionEvents.complete(appVersionEvents));
  } catch (error) {
    dispatch(fetchAppVersionEvents.error(error));
  }
};

export const fetchAppVersionEvents = Object.assign(_fetchAppVersionEvents, {
  next: createAction($`GET_NEXT`),
  complete: createAction($`GET_COMPLETE`, resolve => (appVersionEvents: AppVersionEvent[]) => resolve(appVersionEvents)),
  error: createAction($`GET_ERROR`, resolve => (error: Error) => resolve(error))
});

const defaultState: AppVersionEventsState = [];

export type AppVersionEventsState = AppVersionEvent[];
export const appVersionEvents = createReducer(defaultState, handleAction => [
  handleAction(fetchAppVersionEvents.complete, (_, { payload }) => payload)
]);
