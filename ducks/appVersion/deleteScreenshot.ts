import { Dispatch } from 'redux';
import { createAction } from 'deox';

import { ShipAPIService } from '@/services/ship-api';
import { RootState } from '@/store';

import { $ } from './common';

const _deleteScreenshot = (appSlug: string, versionId: string, screenshotId: string) => async (
  dispatch: Dispatch,
  _getState: () => RootState,
  { shipApi }: { shipApi: ShipAPIService }
) => {
  dispatch(deleteScreenshot.next());

  try {
    await shipApi.deleteScreenshot(appSlug, versionId, screenshotId);

    dispatch(deleteScreenshot.complete());
  } catch (error) {
    console.error(deleteScreenshot, error);
    dispatch(deleteScreenshot.error(error));
  }
};

const deleteScreenshot = Object.assign(_deleteScreenshot, {
  next: createAction($`DELETE_SCREENSHOTS_NEXT`),
  complete: createAction($`DELETE_SCREENSHOTS_COMPLETE`),
  error: createAction($`DELETE_SCREENSHOTS_ERROR`, resolve => (error: Error) => resolve(error))
});

export default deleteScreenshot;
