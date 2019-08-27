import { Dispatch } from 'redux';
import { createAction } from 'deox';

import { ShipAPIService } from '@/services/ship-api';
import { RootState } from '@/store';

import { $ } from './common';

const _deleteFeatureGraphic = (appSlug: string, versionId: string) => async (
  dispatch: Dispatch,
  _getState: () => RootState,
  { shipApi }: { shipApi: ShipAPIService }
) => {
  dispatch(deleteFeatureGraphic.next());

  try {
    await shipApi.deleteFeatureGraphic(appSlug, versionId);

    dispatch(deleteFeatureGraphic.complete());
  } catch (error) {
    console.error('deleteFeatureGraphic', error);
    dispatch(deleteFeatureGraphic.error(error));
  }
};

const deleteFeatureGraphic = Object.assign(_deleteFeatureGraphic, {
  next: createAction($`DELETE_FEATURE_GRAPHIC_NEXT`),
  complete: createAction($`DELETE_FEATURE_GRAPHIC_COMPLETE`),
  error: createAction($`DELETE_FEATURE_GRAPHIC_ERROR`, resolve => (error: Error) => resolve(error))
});

export default deleteFeatureGraphic;
