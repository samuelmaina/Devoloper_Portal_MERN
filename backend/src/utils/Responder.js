class Responder {
  constructor(res) {
    this._res = res;
    this._body = {};
  }
  withStatusCode(status) {
    this._status = status;
    return this;
  }
  attachFieldToBody(field, value) {
    this._body[field] = value;
    return this;
  }
  withMessage(msg) {
    return this.attachFieldToBody("message", msg);
  }

  withError(err) {
    return this.attachFieldToBody("error", err);
  }
  /** Attaches many fields in an object to the res body. */
  attachDataToResBody(data) {
    for (const field in data) {
      if (data.hasOwnProperty.call(data, field)) {
        this.attachFieldToBody(field, data[field]);
      }
    }
    return this;
  }

  send() {
    //reject if the res and the status code are not set.
    rejectIfIsNullOrUndefinedWithMessage(this._res, "Res is required.");
    rejectIfIsNullOrUndefinedWithMessage(
      this._status,
      "Status code is required. "
    );
    const { _res, _status, _body } = this;
    return _res.status(_status).json(_body);
  }
}

const rejectIfIsNullOrUndefinedWithMessage = (value, message) => {
  if (typeof value === "undefined" || value === null) {
    throw new Error(message);
  }
};

module.exports = Responder;
