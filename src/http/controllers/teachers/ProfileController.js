const bcrypt = require('bcrypt');
const saltRounds = 10;

const model = require("../../../models/index");
const User = model.User;
const UserSocial = model.UserSocial;

const moduleName = "Tài khoản";

module.exports = {
    index: async (req, res) => {
        const title = "Thông tin tài khoản";
        const moduleName = "Tài Khoản";
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
        res.render("teacher/profile/index", {
            user,
            userSocials,
            title,
            moduleName,
        });
    },

    changePassword: (req, res) => {
        const title = "Đổi mật khẩu";
        const message = req.flash("message");
        res.render("teacher/profile/changePassword", {
            message,
            title,
            moduleName,
        });
    },

    handleChangePassword: async (req, res) => {
        const { id } = req.user;
        const { passwordOld, passwordNew, repasswordNew } = req.body;

        const user = await User.findOne({
            where: {
                id: id,
            },
        });

        const passwordStatus = bcrypt.compareSync(passwordOld, user.password);

        if (!passwordStatus) {
            req.flash("message", "Mật khẩu cũ không chính xác!");
            res.redirect("/teacher/change-password");
            return;
        }
        if (passwordNew !== repasswordNew) {
            req.flash("message", "Mật khẩu mới nhập lại không khớp!");
            res.redirect("/teacher/change-password");
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
        res.redirect("/teacher/change-password");
    },

    edit: async (req, res) => {
        const title = "Cập nhật tài khoản";
        const { id } = req.user;
        const user = await User.findOne({
            where: {
                id: id,
            },
        });
        await res.render("admin/profile/update", {
            title,
            moduleName,
            user,
        });
    },

    update: async (req, res) => {
        const { id } = req.user;
        const { nameUser, emailUser, phoneUser, addressUser } = req.body;

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

        res.redirect("/admin/profile/update");
    },
};
