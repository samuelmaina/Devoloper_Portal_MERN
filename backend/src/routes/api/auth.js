const { auth } = require("../../controllers");

const router = require("express").Router();

router.route("/sign-up").post(auth.signUp);

module.exports = router;
