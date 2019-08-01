import { Dispatch } from 'redux';
import { createAction } from 'deox';

import { RootState } from '@/store';
import { AppContact } from '@/models/settings';
import { ShipAPIService } from '@/services/ship-api';

import { $ } from './common';
const _deleteAppContact = (appSlug: string, appContact: AppContact) => async (
  dispatch: Dispatch,
  _getState: () => RootState,
  { shipApi }: { shipApi: ShipAPIService }
) => {
  dispatch(deleteAppContact.next());

  try {
    await shipApi.deleteAppContact(appSlug, appContact);

    dispatch(deleteAppContact.complete(appContact.id));
  } catch (error) {
    console.error('deleteAppContact', error);
    dispatch(deleteAppContact.error(error));
  }
};

const deleteAppContact = Object.assign(_deleteAppContact, {
  next: createAction($`DELETE_APP_CONTACT_NEXT`),
  complete: createAction($`DELETE_APP_CONTACT_COMPLETE`, resolve => (appContactId: string) => resolve(appContactId)),
  error: createAction($`DELETE_APP_CONTACT_ERROR`, resolve => (error: Error) => resolve(error))
});

export default deleteAppContact;
