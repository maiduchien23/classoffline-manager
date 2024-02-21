const { Op } = require("sequelize");
const moment = require("moment");

const { getPaginateUrl } = require("../../../utils/url");
const model = require("../../../models/index");
const ScheduleClass = model.ScheduleClass;
const StudentsClass = model.StudentsClass;
const Class = model.Class;

const moduleName = "Lớp học";

module.exports = {
    index: async (req, res) => {
        const title = "Danh sách lớp học";
        const { id: studentId, name: userName } = req.user;
        const filters = {};
        let classIdList = [];

        const studentClassList = await StudentsClass.findAll({
            where: {
                studentId: studentId,
            },
        });

        studentClassList.forEach(({ classId }) => {
            classIdList.push(classId);
        });

        filters.id = { [Op.or]: classIdList };

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
            where: filters,
            limit: +recordNumber,
            offset: offset,
        });

        res.render("student/class/index", {
            req,
            title,
            moduleName,
            userName,
            classes,
            scheduleClass,
            recordNumber,
            page,
            totalPage,
            moment,
            getPaginateUrl,
            layout: "layouts/student.layout.ejs",
        });
    },
};
