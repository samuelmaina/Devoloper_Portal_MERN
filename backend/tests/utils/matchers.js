exports.ensureEqual = (actual, expected) => {
  expect(actual).toEqual(expected);
};

exports.ensureTruthy = (predicate) => {
  expect(predicate).toBeTruthy();
};

exports.ensureFalsy = (predicate) => {
  expect(predicate).toBeFalsy();
};
