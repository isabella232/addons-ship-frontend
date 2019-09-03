import { RequestError } from '@/models/errors';

import reducer, { errorActions } from './error';

describe('reducer', () => {
  errorActions.map(action => {
    test(action.type, () => {
      const error = new RequestError(404, 'Not Found');
      const state = reducer(null, action(error));
      expect(state).toEqual(error);
    });
  });
});
