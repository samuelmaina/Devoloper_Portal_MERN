import express, { Router } from "express";

import { ensureUserAuth } from "../../middlewares/auth";

import profile from "./profile";

import auth from "./auth";

const router = express.Router();

// const profile = require("./profile");

// const post = require("./posts");s

router.use("/auth", auth);
// router.use("/post", post);
router.use("/profile", ensureUserAuth, profile);
export default router;
