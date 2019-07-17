import { Dispatch } from 'redux';
import { createAction } from 'deox';

import { RootState } from '@/store';
import { Settings } from '@/models/settings';
import { ShipAPIService } from '@/services/ship-api';

import { $ } from './common';
const _updateSettings = (settings: Settings) => async (
  dispatch: Dispatch,
  _getState: () => RootState,
  { shipApi }: { shipApi: ShipAPIService }
) => {
  dispatch(updateSettings.next());

  try {
    await shipApi.updateSettings(settings);

    dispatch(updateSettings.complete(settings));
  } catch (error) {
    dispatch(updateSettings.error(error));
  }
};

const updateSettings = Object.assign(_updateSettings, {
  next: createAction($`UPDATE_NEXT`),
  complete: createAction($`UPDATE_COMPLETE`, resolve => (settings: Settings) => resolve(settings)),
  error: createAction($`UPDATE_ERROR`, resolve => (error: Error) => resolve(error))
});

export default updateSettings;
