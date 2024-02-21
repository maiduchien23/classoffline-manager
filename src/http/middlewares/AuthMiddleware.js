module.exports = (req, res, next) => {
    if (!req.user) {
        console.log("Auth Middleware");
        res.redirect("/auth/login");
        return;
    }
    next();
};
