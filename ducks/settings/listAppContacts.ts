import { Dispatch } from 'redux';
import { createAction } from 'deox';

import { RootState } from '@/store';
import { AppContact } from '@/models/settings';
import { ShipAPIService } from '@/services/ship-api';

import { $ } from './common';

const _listAppContacts = (appSlug: string) => async (
  dispatch: Dispatch,
  _getState: () => RootState,
  { shipApi }: { shipApi: ShipAPIService }
) => {
  dispatch(listAppContacts.next());

  try {
    const appContacts = await shipApi.listAppContacts(appSlug);

    dispatch(listAppContacts.complete(appContacts));
  } catch (error) {
    dispatch(listAppContacts.error(error));
  }
};

const listAppContacts = Object.assign(_listAppContacts, {
  next: createAction($`LIST_APP_CONTACTS_NEXT`),
  complete: createAction($`LIST_APP_CONTACTS_COMPLETE`, resolve => (appContacts: AppContact[]) => resolve(appContacts)),
  error: createAction($`LIST_APP_CONTACTS_ERROR`, resolve => (error: Error) => resolve(error))
});

export default listAppContacts;
