import express from "express";

import { auth } from "../../controllers";

const router = express.Router();

const { signUp, verifyEmail, login } = auth;

router.route("/sign-up/:type").post(signUp);
router.route("/verify/:token").get(verifyEmail);
router.route("/log-in/:type/").post(login);
export default router;
