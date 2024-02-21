const { body } = require("express-validator");
const { Op } = require("sequelize");

const model = require("../../models/index");
const Class = model.Class;

module.exports = () => {
    return [
        body("className", "Tên khóa học không được để trống").notEmpty(),
        body("className").custom(async (value, { req }) => {
            const { id } = req.params;
            const classVal = await Class.findOne({
                where: {
                    name: value,
                    [Op.not]: [
                        {
                            id: id,
                        },
                    ],
                },
            });
            if (classVal) {
                throw new Error("Tên lớp học đã tồn tại");
            }
        }),
        body("classQuantity", "Sĩ số không được để trống").notEmpty(),
        body("classStartDate", "Vui lòng chọn ngày khai giảng").notEmpty(),
        body("classSchedule", "Lịch học không được để trống").notEmpty(),
        body("courseId", "Vui lòng chọn khóa học").notEmpty(),
    ];
};
