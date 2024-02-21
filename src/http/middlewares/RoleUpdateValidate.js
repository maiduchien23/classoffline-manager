const { body } = require("express-validator");
const { Op } = require("sequelize");

const model = require("../../models/index");
const Role = model.Role;

module.exports = () => {
    return [
        body("nameRole", "Tên role không được để trống").notEmpty(),
        body("nameRole").custom(async (value, { req }) => {
            const { id } = req.params;

            const role = await Role.findOne({
                where: {
                    name: value,
                    [Op.not]: [
                        {
                            id: id,
                        },
                    ],
                },
            });
            if (role) {
                throw new Error("Tên role đã tồn tại");
            }
        }),
    ];
};
