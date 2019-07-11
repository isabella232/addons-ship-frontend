import { createAction, createReducer } from 'deox';
import { Dispatch } from 'redux';

import { actionTypeCreator } from '@/utils';
import { ShipAPIService } from '@/services/ship-api';

const $ = actionTypeCreator('AUTH');

const _setToken = (token: string) => (dispatch: Dispatch, _getState: any, { shipApi }: { shipApi: ShipAPIService }) => {
  shipApi.setToken(token);

  dispatch(setToken.set(token));
};

export const setToken = Object.assign(_setToken, {
  set: createAction($`SET_TOKEN`, resolve => (token: string) => resolve(token))
});

export type AuthState = {
  token: string | null;
};

const defaultState: AuthState = {
  token: null
};

export default createReducer(defaultState, handleAction => [
  handleAction(setToken.set, (_, { payload }) => ({ token: payload }))
]);
