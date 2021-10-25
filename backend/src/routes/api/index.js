const router = require("express").Router();

const user = require("./user");

const profile = require("./profile");

const post = require("./posts");

router.use("/user", user);
router.use("/post", post);
router.use("/profile", profile);
module.exports = router;
