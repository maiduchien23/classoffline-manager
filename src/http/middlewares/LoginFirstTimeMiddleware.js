module.exports = (req, res, next) => {
    console.log("Userrrr", req.user.firstLogin);

    if (!req.user.firstLogin) {
        return res.redirect("/auth/first-login");
    }

    next();
};
