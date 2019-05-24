import mapKeys from 'lodash/mapKeys';
import camelCase from 'lodash/camelCase';

export const actionTypeCreator = (prefix: string) => (actionType: TemplateStringsArray) => `${prefix}_${actionType}`;

export const camelizeKeys = <T>(input: Object): T =>
  (mapKeys(input, (_, key: string) => camelCase(key)) as unknown) as T;
