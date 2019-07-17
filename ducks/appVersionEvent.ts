import { createReducer } from 'deox';

import { AppVersionEvent } from '@/models';
import fetchAppVersionEvents from './appVersion/fetchAppVersionEvents';

const defaultState: AppVersionEventsState = [];

export type AppVersionEventsState = AppVersionEvent[];
export const appVersionEvents = createReducer(defaultState, handleAction => [
  handleAction(fetchAppVersionEvents.complete, (_, { payload }) => payload)
]);
