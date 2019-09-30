import { Dispatch } from 'redux';
import { createAction, createReducer } from 'deox';

import { ShipAPIService } from '@/services/ship-api';
import { App } from '@/models/app';
import { Platform } from '@/models';

import { $ } from './common';
import { selectPlatform } from './selectPlatform';
import { getIcon } from '@/utils/placeholder-icon';

const _fetchApp = (appSlug: string) => async (
  dispatch: Dispatch,
  _getState: any,
  { shipApi }: { shipApi: ShipAPIService }
) => {
  dispatch(fetchApp.next());

  try {
    const app = await shipApi.getApp(appSlug);

    dispatch(fetchApp.complete(app));
  } catch (error) {
    console.error('fetchApp', error);
    dispatch(fetchApp.error(error));
  }
};

export const fetchApp = Object.assign(_fetchApp, {
  next: createAction($`GET_NEXT`),
  complete: createAction($`GET_COMPLETE`, resolve => (app: App | null) => resolve(app)),
  error: createAction($`GET_ERROR`, resolve => (error: Error) => resolve(error))
});

export { selectPlatform };

const defaultState: AppState = { app: null };

export type AppState = { app: App | null; selectedPlatform?: Platform };
export default createReducer(defaultState, handleAction => [
  handleAction(fetchApp.complete, (state, { payload }) => {
    if (payload) {
      const avatarUrl = getIcon(payload.avatarUrl, payload.projectType);

      const { androidErrors, iosErrors } = payload;
      return {
        ...state,
        selectedPlatform: 'ios',
        app: {
          ...payload,
          androidErrors: androidErrors || [],
          iosErrors: iosErrors || [],
          avatarUrl
        }
      } as any;
    }

    return null;
  }),
  handleAction(selectPlatform, (state, { payload }) => ({ ...state, selectedPlatform: payload }))
]);
