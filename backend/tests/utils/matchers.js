exports.ensureEqual = (actual, expected) => {
  expect(expected).toEqual(actual);
};

exports.ensureTruthy = (predicate) => {
  expect(predicate).toBeTruthy();
};

exports.ensureFalsy = (predicate) => {
  expect(predicate).toBeFalsy();
};
