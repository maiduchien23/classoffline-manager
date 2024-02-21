const { body } = require("express-validator");

const model = require("../../models/index");
const User = model.User;

module.exports = () => {
    return [
        body("name", "Tên người dùng không được để trống").notEmpty(),
        body("name", "Tên người dùng nên có 2 - 30 ký tự").isLength({
            min: 2,
            max: 30,
        }),
        body("email", "Email không được để trống").notEmpty(),
        body("email").custom(async (value) => {
            const user = await User.findOne({
                where: {
                    email: value,
                },
            });
            if (user) {
                throw new Error("Email đã tồn tại");
            }
        }),
        body("email", "Email không hợp lệ").isEmail(),
        body("phone", "Số điện thoại không được để trống").notEmpty(),
        body("phone", "Số điện thoại không hợp lệ").isLength({
            min: 10,
            max: 11,
        }),
        body("phone", "Số điện thoại không hợp lệ").isMobilePhone("vi-VN"),
        body("address", "Địa chỉ không được để trống").notEmpty(),
    ];
};
