import { actionTypeCreator, camelizeKeys, snakifyKeys, snakifyKeysDeep } from './';

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

describe('camelizeKeys', () => {
  it('shallow converts keys to camelCase', () => {
    const input = {
      CONSTANT_CASE: 'aaa',
      snake_case: 123,
      PascalCase: 'bbb'
    };

    const expected = {
      constantCase: 'aaa',
      snakeCase: 123,
      pascalCase: 'bbb'
    };

    expect(camelizeKeys(input)).toEqual(expected);
  });
});

describe('snakifyKeys', () => {
  it('shallow converts keys to snake_case', () => {
    const input = {
      CONSTANT_CASE: 'aaa',
      snake_case: 123,
      PascalCase: 'bbb',
      camelCase: 456
    };

    const expected = {
      constant_case: 'aaa',
      snake_case: 123,
      pascal_case: 'bbb',
      camel_case: 456
    };

    expect(snakifyKeys(input)).toEqual(expected);
  });
});

describe('snakifyKeysDeep', () => {
  it('deep converts keys to snake_case', () => {
    const input = {
      CONSTANT_CASE: 'aaa',
      snake_case: 123,
      PascalCase: 'bbb',
      camelCase: 456,
      deep: {
        nestedObject: {
          soDeep: 123
        }
      }
    };

    const expected = {
      constant_case: 'aaa',
      snake_case: 123,
      pascal_case: 'bbb',
      camel_case: 456,
      deep: {
        nested_object: { so_deep: 123 }
      }
    };

    expect(snakifyKeysDeep(input)).toEqual(expected);
  });
});
