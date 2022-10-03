import request from "supertest";

import app from "../../src/app";

import { connectToTestDb, disconnectFromTestDb } from "../models/utils";

import { ensureEqual } from "../utils/matchers";

let server: any;

exports.startApp = async (PORT: number) => {
  await connectToTestDb();
  server = app.listen(PORT);
  return server;
};
exports.closeApp = async () => {
  if (!server) {
    throw new Error("Server not started, hence can't close it");
  }
  server.close((err: string) => {
    if (err) {
      throw new Error(err);
      //although the server unlistened from the current port, it is still running,
      //and jest will warn of some unstopped operations.
    }
  });
  await disconnectFromTestDb();
};

exports.ensureResHasStatusCodeAndFieldData = (
  res: Response,
  statusCode: number,
  key: string,
  value: any
) => {
  ensureEqual(res.status, statusCode);
  expect(res.body).toHaveProperty(key, value);
};

exports.ensureResHasStatusCodeAndProp = (
  res: Response,
  statusCode: number,
  prop: any
) => {
  ensureHasStatus(res, statusCode);
  expect(res.body).toHaveProperty(prop);
};

exports.ensureHasStatusAndError = (
  res: any,
  statusCode: number,
  error: string
) => {
  ensureEqual(res.body.error, error);
  ensureHasStatus(res, statusCode);
};

exports.ensureHasStatusAndMessage = (
  res: any,
  statusCode: number,
  msg: string
) => {
  ensureEqual(res.body.message, msg);
  ensureHasStatus(res, statusCode);
};
function ensureHasStatus(res: any, status: number) {
  ensureEqual(res.status, status);
}

class Requester {
  app: any;
  constructor(app: any) {
    this.app = app;
  }
  async makePostRequest(url: string, body: any) {
    return await request(this.app).post(url).send(body);
  }
  async makeGetRequest(url: string) {
    return await request(this.app).get(url);
  }

  async makeAuthorizedPostRequest(url: string, token: string, body: any) {
    return await request(this.app)
      .post(url)
      .set("Authorization", token)
      .send(body);
  }

  async makeAuthorizedGetRequest(url: string, token: string) {
    return await request(this.app).get(url).set("Authorization", token);
  }
}

exports.Requester = Requester;
