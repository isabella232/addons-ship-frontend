import { Dispatch } from 'redux';
import { createAction, createReducer } from 'deox';

import { ShipAPIService } from '@/services/ship-api';
import { actionTypeCreator } from '@/utils';
import { TestDevice } from '@/models/test-device';

const $ = actionTypeCreator('TEST_DEVICES');

const _fetchTestDevices = (appSlug: string) => async (
  dispatch: Dispatch,
  _getState: any,
  { shipApi }: { shipApi: ShipAPIService }
) => {
  dispatch(fetchTestDevices.next());

  try {
    const testDevices = await shipApi.getTestDevices(appSlug);

    dispatch(fetchTestDevices.complete(testDevices));
  } catch (error) {
    console.error('fetchTestDevices', error);
    dispatch(fetchTestDevices.error(error));
  }
};

export const fetchTestDevices = Object.assign(_fetchTestDevices, {
  next: createAction($`GET_NEXT`),
  complete: createAction($`GET_COMPLETE`, resolve => (testDevices: TestDevice[]) => resolve(testDevices)),
  error: createAction($`GET_ERROR`, resolve => (error: Error) => resolve(error))
});

const defaultState: TestDevicesState = [];

export type TestDevicesState = TestDevice[];
export const testDevices = createReducer(defaultState, handleAction => [
  handleAction(fetchTestDevices.complete, (_, { payload }) => payload)
]);
