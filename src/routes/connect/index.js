var express = require("express");
var routes = express.Router();
const passport = require("passport");

const ConnectController = require("../../http/controllers/connect/ConnectController");

routes.get(
    "/facebook/redirect",
    passport.authenticate("connectFacebook", { authType: "reauthenticate" })
);

routes.get(
    "/facebook/callback",
    passport.authenticate("connectFacebook", {
        failureRedirect: "/auth/login",
        failureMessage: true,
    }),
    ConnectController.connectFacebook
);

routes.get(
    "/google/redirect",
    passport.authenticate("connectGoogle", {
        prompt: "select_account",
    })
);

routes.get(
    "/google/callback",
    passport.authenticate("connectGoogle", {
        failureRedirect: "/auth/login",
        failureMessage: true,
    }),
    ConnectController.connectGoogle
);

routes.get("/facebook/destroy", ConnectController.disconnectFacebook);
routes.get("/google/destroy", ConnectController.disconnectGoogle);
routes.get("/github/destroy", ConnectController.disconnectGithub);

module.exports = routes;
