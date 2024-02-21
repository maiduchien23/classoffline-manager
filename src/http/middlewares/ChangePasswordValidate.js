const { body } = require("express-validator");
const { Op } = require("sequelize");

const model = require("../../models/index");
const User = model.User;

module.exports = () => {
    return [
        body("passwordOld", "Vui lòng nhập mật khẩu cũ").notEmpty(),
        body("passwordNew", "Mật khẩu mới không được để trống").notEmpty(),
        body("passwordNew", "Mật khẩu mới tối thiểu 8 ký tự").isLength({
            min: 8,
        }),
    ];
};
