import { Response } from "express";

class Responder {
  _res: Response;
  _body: any;
  _status: number = 200;
  constructor(res: Response) {
    this._res = res;
    this._body = {};
  }
  withStatusCode(status: number) {
    this._status = status;
    return this;
  }
  attachFieldToBody(field: string, value: any) {
    this._body[field] = value;
    return this;
  }
  withMessage(msg: string) {
    return this.attachFieldToBody("message", msg);
  }

  withError(err: string) {
    return this.attachFieldToBody("error", err);
  }
  /** Attaches many fields in an object to the res body. */
  attachDataToResBody(data: any) {
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

const rejectIfIsNullOrUndefinedWithMessage = (value: any, message: string) => {
  if (typeof value === "undefined" || value === null) {
    throw new Error(message);
  }
};

export default Responder;
