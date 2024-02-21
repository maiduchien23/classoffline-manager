module.exports = async (req, res, next) => {
    if (req.user) {
        console.log("GuestMiddleware");
        res.redirect("/");
        return;
    }
    next();
};
