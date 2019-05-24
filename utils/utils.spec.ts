import { actionTypeCreator } from './';

describe('actionTypeCreator', () => {
  it('returns a function', () => {
    const a = actionTypeCreator('PREFIX');

    expect(a).toEqual(expect.any(Function));
  });

  it('generates proper action types', () => {
    const a = actionTypeCreator('PREFIX');

    expect(a`SOME_ACTION`).toBe('PREFIX_SOME_ACTION');
    expect(a`OTHER_ACTION`).toBe('PREFIX_OTHER_ACTION');
  });
});
