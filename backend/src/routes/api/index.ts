import express, { Router } from "express";
import auth from "./auth";

const router: Router = express.Router();

// const profile = require("./profile");

// const post = require("./posts");s

router.use("/auth", auth);
// router.use("/post", post);
// router.use("/profile", profile);
export default router;
