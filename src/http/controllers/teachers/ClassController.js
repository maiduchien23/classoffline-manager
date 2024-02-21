const moment = require("moment");

const { getPaginateUrl } = require("../../../utils/url");
const model = require("../../../models/index");
const User = model.User;
const Class = model.Class;
const ScheduleClass = model.ScheduleClass;

const moduleName = "Lớp học";

module.exports = {
    index: async (req, res) => {
        const title = "Danh sách lớp học";
        const filters = {};

        // filters.teacherId = req.user.id;

        let { keyword, page, recordNumber } = req.query;
        if (!recordNumber) {
            recordNumber = 5;
        }

        if (keyword) {
            filters[Op.or] = [
                {
                    name: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
            ];
        }

        // Lấy tổng số bản ghi
        const totalCountObj = await Class.findAndCountAll({
            where: filters,
        });

        // Lấy tổng số trang
        const totalCount = totalCountObj.count;
        const totalPage = Math.ceil(totalCount / recordNumber);
        // Lấy số trang
        if (!page || page < 1) {
            page = 1;
        }
        if (page > totalPage && page > 1) {
            page = totalPage;
        }
        const offset = (page - 1) * recordNumber;

        const scheduleClass = await ScheduleClass.findAll({
            include: {
                model: Class,
            },
        });
        const classes = await Class.findAll({
            include: {
                model: User,
                where: {
                    id: req.user.id,
                },
            },
            where: filters,
            limit: +recordNumber,
            offset: offset,
        });
        res.render("teacher/class/index", {
            req,
            title,
            moduleName,
            moment,
            scheduleClass,
            classes,
            recordNumber,
            page,
            totalPage,
            getPaginateUrl,
            layout: "layouts/teacher.layout.ejs",
        });
    },

    detail: async (req, res) => {
        const title = "Chi tiết lớp học";
        const { id } = req.params;

        const classInfor = await Class.findOne({
            where: {
                id: id,
            },
        });
        const scheduleClass = await ScheduleClass.findAll({
            where: {
                classId: id,
            },
        });

        res.render("teacher/class/detail", {
            title,
            moduleName,
            classInfor,
            scheduleClass,
            layout: "layouts/teacher.layout.ejs",
        });
    },
};
