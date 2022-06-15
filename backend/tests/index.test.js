const app = require("../src/app");

describe("Index tests", () => {
  it("should connect to the database without a problem", (done) => {
    //the file excutes automatically hence no need for function call.
    //the passing of this test is that it does not throw an error.
    server = require("../src/index");
    done();
  });
});
