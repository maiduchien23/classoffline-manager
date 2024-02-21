const model = require("../../models/index");
const LoginToken = model.LoginToken;

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    const { id } = req.user;
    // if (!token && req.user) {
    //     req.logout(function (err) {
    //         if (err) {
    //             return next(err);
    //         }
    //         res.redirect("/");
    //     });
    //     return;
    // }

    if (token) {
        const tokenUser = await LoginToken.findOne({
            where: {
                token: token,
                userId: id,
            },
        });
        if (tokenUser) {
            next();
            return;
        } else {
            req.logout(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect("/");
            });
            return;
        }
    }

    next();
};
