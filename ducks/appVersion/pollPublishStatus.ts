import { createAction, ActionType, ofType } from 'deox';
import { Observable, interval } from 'rxjs';
import { exhaustMap, map, takeUntil, mergeMap } from 'rxjs/operators';
import getConfig from 'next/config';

import { RootState } from '@/store';
import { ShipAPIService } from '@/services/ship-api';
import { AppVersion, AppVersionEvent } from '@/models';

import { $ } from './common';

const {
  publicRuntimeConfig: { POLL_INTERVAL }
} = getConfig();
const pollInterval = Number(POLL_INTERVAL) || 5000;

const pollPublishStatus = {
  start: createAction($`POLL_START`, resolve => (appVersion: AppVersion) => resolve(appVersion)),
  cancel: createAction($`POLL_CANCEL`),
  error: createAction($`POLL_ERROR`, resolve => (error: Error) => resolve(error)),
  complete: createAction($`POLL_COMPLETE`, resolve => (events: AppVersionEvent[]) => resolve(events))
};

export type PollPublishStatusAction = ActionType<
  | typeof pollPublishStatus.start
  | typeof pollPublishStatus.cancel
  | typeof pollPublishStatus.error
  | typeof pollPublishStatus.complete
>;

export const pollPublishStatusEpic = (
  action$: Observable<PollPublishStatusAction>,
  _state$: Observable<RootState>,
  { shipApi }: { shipApi: ShipAPIService }
) =>
  action$.pipe(
    ofType(pollPublishStatus.start),
    exhaustMap(({ payload }) =>
      interval(pollInterval).pipe(
        // Should try this with `backoff-rxjs/intervalBackoff`
        mergeMap(() => shipApi.getAppVersionEvents(payload.appSlug, payload.id as string)),
        map(events => pollPublishStatus.complete(events)),
        takeUntil(action$.pipe(ofType(pollPublishStatus.cancel)))
      )
    )
  );

export default pollPublishStatus;
