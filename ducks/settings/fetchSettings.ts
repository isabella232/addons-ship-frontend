import { Dispatch } from 'redux';
import { createAction } from 'deox';

import { RootState } from '@/store';
import { Settings } from '@/models/settings';
import { ShipAPIService } from '@/services/ship-api';

import { $ } from './common';

const _fetchSettings = (appSlug: string) => async (
  dispatch: Dispatch,
  _getState: () => RootState,
  { shipApi }: { shipApi: ShipAPIService }
) => {
  dispatch(fetchSettings.next());

  try {
    const settings = await shipApi.getSettings(appSlug);

    dispatch(fetchSettings.complete(settings));
  } catch (error) {
    dispatch(fetchSettings.error(error));
  }
};

const fetchSettings = Object.assign(_fetchSettings, {
  next: createAction($`GET_NEXT`),
  complete: createAction($`GET_COMPLETE`, resolve => (settings: Settings) => resolve(settings)),
  error: createAction($`GET_ERROR`, resolve => (error: Error) => resolve(error))
});

export default fetchSettings;
