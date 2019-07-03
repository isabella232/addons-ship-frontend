import { createAction, ActionType, ofType } from 'deox';
import { Observable, interval } from 'rxjs';
import { exhaustMap, map, takeUntil } from 'rxjs/operators';

import { RootState } from '@/store';

import { $ } from './common';

const pollPublishStatus = {
  next: createAction($`POLL_NEXT`),
  cancel: createAction($`POLL_CANCEL`),
  error: createAction($`POLL_ERROR`, resolve => (error: Error) => resolve(error)),
  complete: createAction($`POLL_COMPLETE`, resolve => (dunno: any) => resolve(dunno))
};

// isPollingReducer ?

export type PollPublishStatusAction = ActionType<
  | typeof pollPublishStatus.next
  | typeof pollPublishStatus.cancel
  | typeof pollPublishStatus.error
  | typeof pollPublishStatus.complete
>;

export const pollPublishStatusEpic = (action$: Observable<PollPublishStatusAction>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(pollPublishStatus.next),
    exhaustMap(() =>
      interval(1000).pipe(
        map(idx => pollPublishStatus.complete(`cica ${idx}`)),
        takeUntil(action$.pipe(ofType(pollPublishStatus.cancel)))
      )
    )
  );

export default pollPublishStatus;
