const { body } = require("express-validator");
const { Op } = require("sequelize");

const model = require("../../models/index");
const User = model.User;

module.exports = () => {
    return [
        body("nameUser", "Tên người dùng không được để trống").notEmpty(),
        body("nameUser", "Tên người dùng nên có 2 - 30 ký tự").isLength({
            min: 2,
            max: 30,
        }),
        body("emailUser", "Email không được để trống").notEmpty(),
        body("emailUser").custom(async (value, { req }) => {
            const { id } = req.user;

            const user = await User.findOne({
                where: {
                    email: value,
                    [Op.not]: [
                        {
                            id: id,
                        },
                    ],
                },
            });

            if (user) {
                throw new Error("Email đã tồn tại");
            }
        }),
        body("emailUser", "Email không hợp lệ").isEmail(),
        body("phoneUser", "Số điện thoại không được để trống").notEmpty(),
        body("phoneUser", "Số điện thoại không hợp lệ").isLength({
            min: 10,
            max: 11,
        }),
        body("phoneUser", "Số điện thoại không hợp lệ").isMobilePhone("vi-VN"),
        body("addressUser", "Địa chỉ không được để trống").notEmpty(),
    ];
};
