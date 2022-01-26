const { auth } = require("../../controllers");

const router = require("express").Router();

router.route("/sign-up/:type").post(auth.signUp);
router.route("/verify/:token").get(auth.verifyEmail);

module.exports = router;
