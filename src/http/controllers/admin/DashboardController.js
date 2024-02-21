const permissionUtils = require("../../../utils/permissionUtils");
const model = require("../../../models/index");
const User = model.User;
const Course = model.Course;
const Class = model.Class;
const Type = model.Type;

const moduleName = "Tổng quan";

module.exports = {
    index: async (req, res) => {
        const title = "Dashboard";
        const userName = req.user.name;

        const studentQuantity = await User.count({
            include: {
                model: Type,
                where: {
                    name: "Student",
                },
            },
        });

        const courseQuantity = await Course.count();
        const classQuantity = await Class.count();
        const teacherQuantity = await User.count({
            include: {
                model: Type,
                where: {
                    name: "Teacher",
                },
            },
        });
        const teachingAssistantQuantity = await User.count({
            include: {
                model: Type,
                where: {
                    name: "TA",
                },
            },
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/dashboard/index", {
            title,
            moduleName,
            studentQuantity,
            courseQuantity,
            classQuantity,
            teacherQuantity,
            teachingAssistantQuantity,
            permissionUtils,
            permissionUser,
            userName,
        });
    },
};
