exports.auth = {
  name: {
    minlength: 2,
    maxlenght: 20,
  },
  email: {
    minlength: 5,
    maxlength: 50,
  },
};

exports.token = {
  requester: {
    maxlength: 50,
    minlength: 2,
  },
  howLong: {
    exact: 128,
  },
};
