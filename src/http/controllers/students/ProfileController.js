const bcrypt = require("bcrypt");
const model = require("../../../models/index");
const User = model.User;
const UserSocial = model.UserSocial;

const saltRounds = 10;
const moduleName = "Tài khoản";

module.exports = {
    index: async (req, res) => {
        const title = "Thông tin tài khoản";
        const moduleName = "Tài Khoản";
        const { id, name: userName } = req.user;
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
        res.render("student/profile/index", {
            user,
            userSocials,
            userName,
            title,
            moduleName,
            layout: "layouts/student.layout.ejs",
        });
    },

    edit: async (req, res) => {
        const title = "Cập nhật tài khoản";
        const { id, name: userName } = req.user;
        const user = await User.findOne({
            where: {
                id: id,
            },
        });
        await res.render("student/profile/edit", {
            title,
            moduleName,
            user,
            userName,
            layout: "layouts/student.layout.ejs",
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

        res.redirect("/profile/edit");
    },

    changePassword: (req, res) => {
        const title = "Đổi mật khẩu";
        const message = req.flash("message");
        const userName = req.user.name;
        res.render("student/profile/changePassword", {
            message,
            title,
            userName,
            moduleName,
            layout: "layouts/student.layout.ejs",
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
            res.redirect("/change-password");
            return;
        }
        if (passwordNew !== repasswordNew) {
            req.flash("message", "Mật khẩu mới nhập lại không khớp!");
            res.redirect("/change-password");
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
        res.redirect("/change-password");
    },
};
