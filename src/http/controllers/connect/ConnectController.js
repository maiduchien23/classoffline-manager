const model = require("../../../models/index");
const Type = model.Type;
const UserSocial = model.UserSocial;

module.exports = {
    connectFacebook: async (req, res) => {
        const typeName = await Type.findOne({
            where: {
                id: req.user.typeId,
            },
        });

        if (typeName.name === "Admin") {
            return res.redirect("/admin/profile");
        } else if (typeName.name === "Teacher" || typeName.name === "TA") {
            return res.redirect("/teacher/profile");
        } else {
            return res.redirect("/profile");
        }
    },

    connectGoogle: async (req, res) => {
        const typeName = await Type.findOne({
            where: {
                id: req.user.typeId,
            },
        });

        if (typeName.name === "Admin") {
            res.redirect("/admin/profile");
        } else if (typeName.name === "Teacher" || typeName.name === "TA") {
            res.redirect("/teacher/profile");
        } else {
            res.redirect("/profile");
        }
    },

    disconnectFacebook: async (req, res) => {
        const userId = req.user.id;
        const provider = "facebook";
        await UserSocial.destroy({
            where: {
                userId: userId,
                provider: provider,
            },
        });

        const typeName = await Type.findOne({
            where: {
                id: req.user.typeId,
            },
        });

        if (typeName.name === "Admin") {
            res.redirect("/admin/profile");
        } else if (typeName.name === "Teacher" || typeName.name === "TA") {
            res.redirect("/teacher/profile");
        } else {
            res.redirect("/profile");
        }
    },

    disconnectGoogle: async (req, res) => {
        const userId = req.user.id;
        const provider = "google";
        await UserSocial.destroy({
            where: {
                userId: userId,
                provider: provider,
            },
        });

        const typeName = await Type.findOne({
            where: {
                id: req.user.typeId,
            },
        });

        if (typeName.name === "Admin") {
            return res.redirect("/admin/profile");
        } else if (typeName.name === "Teacher" || typeName.name === "TA") {
            return res.redirect("/teacher/profile");
        } else {
            return res.redirect("/profile");
        }
    },

    disconnectGithub: async (req, res) => {
        const userId = req.user.id;
        const provider = "github";
        await UserSocial.destroy({
            where: {
                userId: userId,
                provider: provider,
            },
        });

        const typeName = await Type.findOne({
            where: {
                id: req.user.typeId,
            },
        });

        if (typeName.name === "Admin") {
            return res.redirect("/admin/profile");
        } else if (typeName.name === "Teacher" || typeName.name === "TA") {
            return res.redirect("/teacher/profile");
        } else {
            return res.redirect("/profile");
        }
    },
};
