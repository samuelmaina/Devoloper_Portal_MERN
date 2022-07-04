const router = require("express").Router();

const { profile } = require("../../controllers");
const { auth } = require("../../middlewares");

const { ensureUserIsAuth } = auth;
const { getUserProfile, updateProfile } = profile;

router.route("/").get(ensureUserIsAuth, getUserProfile);
router.route("/").post(ensureUserIsAuth, updateProfile);

module.exports = router;
