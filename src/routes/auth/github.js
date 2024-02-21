var express = require("express");
var router = express.Router();
const passport = require("passport");

const AuthController = require("../../http/controllers/auth/AuthController");

router.get("/github/redirect", passport.authenticate("github"));

router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/auth/login",
        failureMessage: true,
    }),
    AuthController.loginGithub
);

module.exports = router;
