const { auth } = require("../../controllers");

const router = require("express").Router();

router.route("/sign-up/:type").post(auth.signUp);

module.exports = router;
