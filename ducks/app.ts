import { Dispatch } from 'redux';
import { createAction, createReducer } from 'deox';

import { BitriseAPIService } from '@/services/bitrise-api';
import { actionTypeCreator } from '@/utils';
import { App } from '@/models/app';

const $ = actionTypeCreator('APP');

const _fetchApp = (appSlug: string) => async (
  dispatch: Dispatch,
  _getState: any,
  { bitriseApi }: { bitriseApi: BitriseAPIService }
) => {
  dispatch(fetchApp.next());

  try {
    const app = await bitriseApi.getApp(appSlug);

    dispatch(fetchApp.complete(app));
  } catch (error) {
    dispatch(fetchApp.error(error));
  }
};

export const fetchApp = Object.assign(_fetchApp, {
  next: createAction($`GET_NEXT`),
  complete: createAction($`GET_COMPLETE`, resolve => (app: App | null) => resolve(app)),
  error: createAction($`GET_ERROR`, resolve => (error: Error) => resolve(error))
});

const defaultState: AppState = null;

export type AppState = App | null;
export default createReducer(defaultState, handleAction => [
  handleAction(fetchApp.complete, (_, { payload }) => payload as any)
]);
