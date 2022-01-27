const { auth } = require("../../controllers");

const { signUp, verifyEmail, login } = auth;

const router = require("express").Router();

router.route("/sign-up/:type").post(signUp);
router.route("/verify/:type/:token").get(verifyEmail);
router.route("/log-in/:type/").post(login);

module.exports = router;
