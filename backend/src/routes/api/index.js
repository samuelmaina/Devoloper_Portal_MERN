const router = require("express").Router();

const auth = require("./auth");

const profile = require("./profile");

const post = require("./posts");

router.use("/auth", auth);
router.use("/post", post);
router.use("/profile", profile);
module.exports = router;
