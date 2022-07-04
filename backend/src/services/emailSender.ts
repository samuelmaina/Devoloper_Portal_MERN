import sgMail from "@sendgrid/mail";

import { SENDGRID_API_KEY, EMAIL_SENDER } from "../config";

sgMail.setApiKey(SENDGRID_API_KEY);

export default async (msg: any) => {
  try {
    msg.from = EMAIL_SENDER;
    await sgMail.send(msg);
  } catch (error: any) {
    throw new Error(error);
  }
};
