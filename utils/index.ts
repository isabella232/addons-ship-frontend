import mapKeys from 'lodash/mapKeys';
import mapValues from 'lodash/mapValues';
import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';
import isPlainObject from 'lodash/isPlainObject';

export const actionTypeCreator = (prefix: string) => (actionType: TemplateStringsArray) => `${prefix}_${actionType}`;

export const camelizeKeys = <T>(input: Object): T =>
  (mapKeys(input, (_, key: string) => camelCase(key)) as unknown) as T;

export const camelizeKeysDeep = <T>(input: Object): T =>
  mapValues(camelizeKeys(input), (value: any) => (isPlainObject(value) ? camelizeKeysDeep(value) : value)) as T;

export const snakifyKeys = <T>(input: Object): T =>
  (mapKeys(input, (_, key: string) => snakeCase(key)) as unknown) as T;

export const snakifyKeysDeep = <T>(input: Object): T =>
  mapValues(snakifyKeys(input), (value: any) => (isPlainObject(value) ? snakifyKeysDeep(value) : value)) as T;
