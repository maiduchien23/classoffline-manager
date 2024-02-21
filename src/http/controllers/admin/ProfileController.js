const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const validate = require("../../../utils/validate");
const permissionUtils = require("../../../utils/permissionUtils");
const model = require("../../../models/index");
const User = model.User;
const UserSocial = model.UserSocial;

const saltRounds = 10;
const moduleName = "Tài khoản";

module.exports = {
    profile: async (req, res) => {
        const title = "Thông tin tài khoản";
        const moduleName = "Tài Khoản";
        const userName = req.user.name;
        const { id } = req.user;

        const user = await User.findOne({
            where: {
                id: id,
            },
        });
        const userSocials = await UserSocial.findAll({
            where: {
                userId: id,
            },
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/profile/index", {
            user,
            userSocials,
            title,
            moduleName,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    changePassword: async (req, res) => {
        const title = "Đổi mật khẩu";
        const userName = req.user.name;
        const message = req.flash("message");
        const errors = req.flash("errors");

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/profile/changePassword", {
            message,
            title,
            moduleName,
            errors,
            validate,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    handleChangePassword: async (req, res) => {
        const { id } = req.user;
        const { passwordOld, passwordNew, repasswordNew } = req.body;
        const result = validationResult(req);

        if (result.isEmpty()) {
            const user = await User.findOne({
                where: {
                    id: id,
                },
            });

            const passwordStatus = bcrypt.compareSync(
                passwordOld,
                user.password
            );

            if (!passwordStatus) {
                req.flash("message", "Mật khẩu cũ không chính xác!");
                res.redirect("/admin/changePassword");
                return;
            }
            if (passwordNew !== repasswordNew) {
                req.flash("message", "Mật khẩu mới nhập lại không khớp!");
                res.redirect("/admin/changePassword");
                return;
            }

            const password = bcrypt.hashSync(passwordNew, saltRounds);

            await User.update(
                { password: password },
                {
                    where: {
                        id: id,
                    },
                }
            );
            req.flash("message", "Đổi mật khẩu thành công!");
            return res.redirect("/admin/changePassword");
        }

        req.flash("errors", result.errors);
        res.redirect("/admin/changePassword");
    },

    edit: async (req, res) => {
        const title = "Cập nhật tài khoản";
        const userName = req.user.name;
        const { id } = req.user;
        const errors = req.flash("errors");

        const user = await User.findOne({
            where: {
                id: id,
            },
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/profile/update", {
            title,
            moduleName,
            user,
            errors,
            validate,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    update: async (req, res) => {
        const { id } = req.user;
        const { nameUser, emailUser, phoneUser, addressUser } = req.body;

        const result = validationResult(req);
        if (result.isEmpty()) {
            await User.update(
                {
                    name: nameUser,
                    email: emailUser,
                    phone: phoneUser,
                    address: addressUser,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );

            return res.redirect("/admin/profile/update");
        }

        req.flash("errors", result.errors);
        res.redirect("/admin/profile/update");
    },
};
