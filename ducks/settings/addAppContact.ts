import { Dispatch } from 'redux';
import { createAction } from 'deox';

import { RootState } from '@/store';
import { AppContact } from '@/models/settings';
import { ShipAPIService } from '@/services/ship-api';

import { $ } from './common';

const _addAppContact = (
  appSlug: string,
  email: string,
  notificationPreferences?: AppContact['notificationPreferences']
) => async (dispatch: Dispatch, _getState: () => RootState, { shipApi }: { shipApi: ShipAPIService }) => {
  dispatch(addAppContact.next());

  try {
    const appContact = await shipApi.addAppContact(appSlug, email, notificationPreferences);

    dispatch(addAppContact.complete(appContact));
  } catch (error) {
    console.error('addAppContact', error);
    dispatch(addAppContact.error(error));
  }
};

const addAppContact = Object.assign(_addAppContact, {
  next: createAction($`ADD_CONTACT_NEXT`),
  complete: createAction($`ADD_CONTACT_COMPLETE`, resolve => (appContact: AppContact) => resolve(appContact)),
  error: createAction($`ADD_CONTACT_ERROR`, resolve => (error: Error) => resolve(error))
});

export default addAppContact;
