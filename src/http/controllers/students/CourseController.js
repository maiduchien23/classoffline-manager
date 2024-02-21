const { Op } = require("sequelize");

const { getPaginateUrl } = require("../../../utils/url");
const model = require("../../../models/index");
const Course = model.Course;
const StudentsClass = model.StudentsClass;
const User = model.User;
const Class = model.Class;
const ModuleDocument = model.ModuleDocument;
const CourseModule = model.CourseModule;

const moduleName = "Khóa học";

module.exports = {
    index: async (req, res) => {
        const title = "Danh sách khóa học";
        const { id: studentId, name: userName } = req.user;
        const filters = {};

        const studentClassList = await StudentsClass.findAll({
            include: {
                model: Class,
            },
            where: {
                studentId: studentId,
            },
        });

        let courseIdList = [];

        for (let i = 0; i < studentClassList.length; i++) {
            courseIdList.push(studentClassList[i].Class.courseId);
        }

        filters.id = { [Op.or]: courseIdList };

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
                {
                    "$User.name$": {
                        [Op.like]: `%${keyword}%`,
                    },
                },
            ];
        }

        // Lấy tổng số bản ghi
        const totalCountObj = await Course.findAndCountAll({
            include: {
                model: User,
            },
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

        const courses = await Course.findAll({
            include: {
                model: User,
            },
            where: filters,
            limit: +recordNumber,
            offset: offset,
        });
        console.log("Filters", filters);
        console.log("Khóa học", courses);

        res.render("student/course/index", {
            req,
            title,
            moduleName,
            userName,
            courses,
            recordNumber,
            page,
            totalPage,
            getPaginateUrl,
            layout: "layouts/student.layout.ejs",
        });
    },

    detail: async (req, res) => {
        const title = "Chi tiết khóa học";
        const { name: userName } = req.user;
        const { id } = req.params;
        let moduleArr = [];

        const course = await Course.findOne({
            include: {
                model: User,
            },
            where: {
                id: id,
            },
        });
        const modules = await CourseModule.findAll({
            include: {
                model: Course,
                where: {
                    id: id,
                },
            },
        });

        const moduleDocument = modules.map(async (moduleVal) => {
            const documentList = await ModuleDocument.findAll({
                where: {
                    moduleId: moduleVal.id,
                },
            });
            return {
                id: moduleVal.dataValues.id,
                documentList,
            };
        });
        await Promise.all(moduleDocument).then((result) => {
            moduleArr = result;
        });
        res.render("student/course/detail", {
            title,
            moduleName,
            userName,
            course,
            modules,
            moduleArr,
            layout: "layouts/student.layout.ejs",
        });
    },
};
