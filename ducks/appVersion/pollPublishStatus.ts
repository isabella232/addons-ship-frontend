import { createAction, ActionType, ofType } from 'deox';
import { Observable, interval } from 'rxjs';
import { exhaustMap, map, takeUntil, mergeMap } from 'rxjs/operators';

import { RootState } from '@/store';
import { ShipAPIService } from '@/services/ship-api';
import { AppVersion, AppVersionEvent } from '@/models';

import { $ } from './common';

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
      interval(1000).pipe(
        mergeMap(() => shipApi.getAppVersionEvents(payload)),
        map(events => pollPublishStatus.complete(events)),
        takeUntil(action$.pipe(ofType(pollPublishStatus.cancel)))
      )
    )
  );

export default pollPublishStatus;
