export const auth = {
  name: {
    minlength: 2,
    maxlength: 20,
  },
  email: {
    minlength: 5,
    maxlength: 50,
  },
};

export const token = {
  requester: {
    maxlength: 50,
    minlength: 2,
  },
  howLong: {
    exact: 128,
  },
};
