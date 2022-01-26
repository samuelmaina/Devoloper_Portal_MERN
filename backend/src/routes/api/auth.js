const { auth } = require("../../controllers");

const { signUp, verifyEmail } = auth;

const router = require("express").Router();

router.route("/sign-up/:type").post(signUp);
router.route("/verify/:token").get(verifyEmail);

module.exports = router;
