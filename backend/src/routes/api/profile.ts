import express from "express";

import { profile } from "../../controllers";

const router = express.Router();

const { getUserProfile, updateProfile } = profile;

router.route("/").get(getUserProfile).post(updateProfile);

export default router;
