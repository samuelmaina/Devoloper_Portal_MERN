exports.ensureEqual = (actual, expected) => {
  expect(actual).toEqual(expected);
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
