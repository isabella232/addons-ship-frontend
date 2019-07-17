import { Dispatch } from 'redux';
import { createAction } from 'deox';

import { RootState } from '@/store';
import { AppContact } from '@/models/settings';
import { ShipAPIService } from '@/services/ship-api';

import { $ } from './common';
const _updateAppContact = (appSlug: string, appContact: AppContact) => async (
  dispatch: Dispatch,
  _getState: () => RootState,
  { shipApi }: { shipApi: ShipAPIService }
) => {
  dispatch(updateAppContact.next());

  try {
    const newAppContact = await shipApi.updateAppContactNotificationPreferences(appSlug, appContact);

    dispatch(updateAppContact.complete(newAppContact));
  } catch (error) {
    dispatch(updateAppContact.error(error));
  }
};

const updateAppContact = Object.assign(_updateAppContact, {
  next: createAction($`UPDATE_APP_CONTACT_NEXT`),
  complete: createAction($`UPDATE_APP_CONTACT_COMPLETE`, resolve => (appContact: AppContact) => resolve(appContact)),
  error: createAction($`UPDATE_APP_CONTACT_ERROR`, resolve => (error: Error) => resolve(error))
});

export default updateAppContact;
