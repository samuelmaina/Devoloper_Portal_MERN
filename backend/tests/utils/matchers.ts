export const ensureEqual = (actual: any, expected: any) => {
  expect(actual).toEqual(expected);
};

export const ensureIdsEqual = (actual: string, expected: string) => {
  expect(actual.toString()).toBe(expected.toString());
};

export const ensureTruthy = (predicate: boolean) => {
  expect(predicate).toBeTruthy();
};

export const ensureFalsy = (predicate: boolean) => {
  expect(predicate).toBeFalsy();
};

export const ensureNull = (value: any) => {
  expect(value).toBeNull();
};
export const ensureNotNull = (value: any) => {
  expect(value).not.toBeNull();
  expect(value).not.toBeUndefined();
};

export const ensureValueGreaterThanOrEqual = (
  value1: number,
  value2: number
) => {
  expect(value1).toBeGreaterThanOrEqual(value2);
};
