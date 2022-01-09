const { Responder } = require("../../src/utils");
const { ensureEqual } = require("../utils/matchers");

describe.skip("Responder", () => {
  it("should be able to attach the res object during intialization", () => {
    const res = {
      body: {
        name: "John Doe",
      },
    };
    const responder = new Responder(res);

    ensureEqual(responder._res, res);
  });
  it("withStatusCode should set the status code and the return an instance of Responder for chainability", () => {
    const responder = new Responder({
      body: {},
    });
    const status = 500;
    const newResponder = responder.withStatusCode(status);
    ensureEqual(newResponder._status, status);
    expect(newResponder).toBeInstanceOf(Responder);
  });

  it(" attachFieldToBody should attach a key -value pair to the body and return an instance of Responder for chainability", () => {
    const responder = new Responder({
      body: {},
    });
    const key = "name";
    const value = "John Doe";
    const newResponder = responder.attachFieldToBody(key, value);
    ensureEqual(newResponder.body[key], value);
    expect(newResponder).toBeInstanceOf(Responder);
  });
  it(" withMessage should attach  a message to the body and return an instance of Responder for chainability", () => {
    const responder = new Responder({
      body: {},
    });
    const msg = "Test message";
    const newResponder = responder.withMessage(msg);
    ensureEqual(newResponder.body.message, msg);
    expect(newResponder).toBeInstanceOf(Responder);
  });
  it(" withError should attach an error message to the body and return an instance of Responder for chainability", () => {
    const responder = new Responder({
      body: {},
    });
    const error = "Test Error Message";
    const newResponder = responder.withError(error);
    ensureEqual(newResponder.body.error, error);
    expect(newResponder).toBeInstanceOf(Responder);
  });

  it(" appendDataToResBody should attach an object with fields to the body and return an instance of Responder for chainability", () => {
    const responder = new Responder({ body: {} });
    const data = {
      name: "John Doe",
      email: "test@email.com",
    };
    const newResponder = responder.attachDataToResBody(data);
    expect(newResponder.body).toHaveProperty("name", data.name);
    expect(newResponder.body).toHaveProperty("email", data.email);

    expect(newResponder).toBeInstanceOf(Responder);
  });

  describe("send", () => {
    it(" should reject status code is not set. ", () => {
      const responder = new Responder({
        body: {},
      });
      const data = {
        name: "John Doe",
        email: "test@email.com",
      };
      responder.attachDataToResBody(data);

      expect(() => {
        responder.send();
      }).toThrowError("Status code is required.");
    });

    it(" should reject res is not set. ", () => {
      const responder = new Responder();
      const data = {
        name: "John Doe",
        email: "test@email.com",
      };
      responder.attachDataToResBody(data);

      expect(() => {
        responder.send();
      }).toThrowError("Res is required.");
    });

    it.only(" should call the send with the status code and convert the body into json together will al the fields set ", () => {
      const status = 500;
      const expectedBody = {
        name: "john doe",
      };

      const res = {
        status: function (code) {
          ensureEqual(code, status);
          return this;
        },
        json: function (body) {
          ensureEqual(body, expectedBody);
        },
      };

      const responder = new Responder(res);
      responder.withStatusCode(status);
      responder.attachDataToResBody(expectedBody);
      responder.send();
    });
  });
});
