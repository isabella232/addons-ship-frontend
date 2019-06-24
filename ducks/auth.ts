import { createAction, createReducer } from 'deox';

import { actionTypeCreator } from '@/utils';

const $ = actionTypeCreator('AUTH');

export const setToken = createAction($`SET_TOKEN`, resolve => (token: string) => resolve(token));

type AuthState = {
  token: string | null;
};

const defaultState: AuthState = {
  token: null
};

export default createReducer(defaultState, handleAction => [
  handleAction(setToken, (_, { payload }) => ({ token: payload }))
]);
