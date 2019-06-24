import reducer, { setToken } from './auth';

describe('auth', () => {
  describe('reducer', () => {
    it('sets the token', () => {
      const state = reducer(undefined, setToken('some-token'));

      expect(state).toMatchSnapshot();
    });
  });
});
