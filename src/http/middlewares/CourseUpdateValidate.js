const { body } = require("express-validator");
const { Op } = require("sequelize");

const model = require("../../models/index");
const Course = model.Course;

module.exports = () => {
    return [
        body("courseName", "Tên khóa học không được để trống").notEmpty(),
        body("courseName").custom(async (value, { req }) => {
            const { id } = req.params;
            const course = await Course.findOne({
                where: {
                    name: value,
                    [Op.not]: [
                        {
                            id: id,
                        },
                    ],
                },
            });

            if (course) {
                throw new Error("Tên khóa học đã tồn tại");
            }
        }),
        body("tryLearn", "Học thử không được để trống").notEmpty(),
        body("coursePrice", "Học phí không được để trống").notEmpty(),
        body("teacherId", "Vui lòng chọn giảng viên").notEmpty(),
        body("courseQuantity", "Sĩ số lớp học không được để trống").notEmpty(),
        body("courseDuration", "Thời gian không được để trống").notEmpty(),
    ];
};
