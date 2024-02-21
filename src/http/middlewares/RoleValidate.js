const { body } = require("express-validator");

const model = require("../../models/index");
const Role = model.Role;

module.exports = () => {
    return [
        body("nameRole", "Tên role không được để trống").notEmpty(),
        body("nameRole").custom(async (value) => {
            const role = await Role.findOne({
                where: {
                    name: value,
                },
            });

            if (role) {
                throw new Error("Tên role đã tồn tại");
            }
        }),
    ];
};
