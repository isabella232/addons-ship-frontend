export const actionTypeCreator = (prefix: string) => (actionType: TemplateStringsArray) => `${prefix}_${actionType}`;
