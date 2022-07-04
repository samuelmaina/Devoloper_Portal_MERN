exports.ensureEqual = (actual, expected) => {
  expect(actual).toEqual(expected);
};

exports.ensureIdsEqual = (actual, expected) => {
  expect(actual.toString()).toBe(expected.toString());
};

exports.ensureTruthy = (predicate) => {
  expect(predicate).toBeTruthy();
};

exports.ensureFalsy = (predicate) => {
  expect(predicate).toBeFalsy();
};

exports.ensureNull = (value) => {
  expect(value).toBeNull();
};
exports.ensureNotNull = (value) => {
  expect(value).not.toBeNull();
  expect(value).not.toBeUndefined();
};

exports.ensureValueGreaterThanOrEqual = (value1, value2) => {
  expect(value1).toBeGreaterThanOrEqual(value2);
};
