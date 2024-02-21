var express = require("express");
var router = express.Router();
const passport = require("passport");

const AuthController = require("../../http/controllers/auth/AuthController");

router.get(
    "/facebook/redirect",
    passport.authenticate("facebook", { authType: "reauthenticate" })
);

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        failureRedirect: "/auth/login",
        failureMessage: true,
    }),
    AuthController.loginFacebook
);

module.exports = router;
