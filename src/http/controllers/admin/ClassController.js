const moment = require("moment");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const constants = require("../../../constants/index");
const exportFile = require("../../../utils/exportFile");
const importFile = require("../../../utils/importFile");
const { getPaginateUrl } = require("../../../utils/url");
const validate = require("../../../utils/validate");
const date = require("../../../utils/date");
// const getDate = require("../../../helpers/getDate");
const checkAttendance = require("../../../utils/checkAttendance");
const permissionUtils = require("../../../utils/permissionUtils");

const model = require("../../../models/index");
const Course = model.Course;
const Class = model.Class;
const ScheduleClass = model.ScheduleClass;
const User = model.User;
const Type = model.Type;
const StudentsClass = model.StudentsClass;
const StudentsAttendance = model.StudentsAttendance;
const Comment = model.Comment;
const Exercise = model.Exercise;
const ExercisesSubmit = model.ExercisesSubmit;

const moduleName = "Lớp học";

module.exports = {
    index: async (req, res) => {
        const title = "Danh sách lớp học";
        const userName = req.user.name;
        const filters = {};

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

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/class/index", {
            req,
            title,
            moduleName,
            moment,
            scheduleClass,
            classes,
            recordNumber,
            page,
            totalPage,
            permissionUser,
            permissionUtils,
            getPaginateUrl,
            userName,
        });
    },

    add: async (req, res) => {
        const title = "Thêm lớp học";
        const userName = req.user.name;
        const errors = req.flash("errors");

        const courses = await Course.findAll();
        const permissionUser = await permissionUtils.roleUser(req);
        res.render("admin/class/add", {
            title,
            moduleName,
            courses,
            errors,
            validate,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    store: async (req, res) => {
        const {
            className,
            classQuantity,
            classStartDate,
            classSchedule,
            courseId,
            timeLearnStart,
            timeLearnEnd,
        } = req.body;

        const result = validationResult(req);
        if (result.isEmpty()) {
            const course = await Course.findOne({
                where: {
                    id: courseId,
                },
            });

            const classEndDate = date.getEndDate(
                classStartDate, // Ngày bắt đầu
                course.duration, // Tổng số buổi học của 1 khóa
                classSchedule.length // Tổng số buổi học trong 1 tuần
            );

            const statusClass = await Class.create({
                name: className,
                quantity: classQuantity,
                startDate: classStartDate,
                endDate: classEndDate,
                courseId: courseId,
            });

            if (classSchedule.length === 1) {
                await ScheduleClass.create({
                    schedule: classSchedule,
                    timeLearn: `${timeLearnStart} - ${timeLearnEnd}`,
                    classId: statusClass.id,
                });
            } else {
                for (let index = 0; index < classSchedule.length; index++) {
                    await ScheduleClass.create({
                        schedule: classSchedule[index],
                        timeLearn: `${timeLearnStart[index]} - ${timeLearnEnd[index]}`,
                        classId: statusClass.id,
                    });
                }
            }

            return res.redirect("/admin/classes");
        }
        req.flash("errors", result.errors);
        res.redirect("/admin/classes/add");
    },

    edit: async (req, res) => {
        const title = "Sửa lớp học";
        const userName = req.user.name;
        const { id } = req.params;
        const errors = req.flash("errors");
        let scheduleVal = [];
        let scheduleValStart = [];
        let scheduleValEnd = [];

        const classVal = await Class.findOne({
            where: {
                id: id,
            },
        });

        const courses = await Course.findAll();

        const scheduleClass = await ScheduleClass.findAll({
            where: {
                classId: id,
            },
        });

        scheduleClass.forEach(({ schedule, timeLearn }) => {
            scheduleVal.push(schedule);
            scheduleValStart.push(`${schedule} - ${timeLearn.split(" - ")[0]}`);
            scheduleValEnd.push(`${schedule} - ${timeLearn.split(" - ")[1]}`);
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/class/edit", {
            title,
            moduleName,
            classVal,
            courses,
            moment,
            scheduleVal,
            scheduleValStart,
            scheduleValEnd,
            errors,
            validate,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const {
            className,
            classQuantity,
            classStartDate,
            classSchedule,
            courseId,
            timeLearnStart,
            timeLearnEnd,
        } = req.body;

        const result = validationResult(req);
        if (result.isEmpty()) {
            const course = await Course.findOne({
                where: {
                    id: courseId,
                },
            });

            const classEndDate = date.getEndDate(
                classStartDate, // Ngày bắt đầu
                course.duration, // Tổng số buổi học của 1 khóa
                classSchedule.length // Tổng số buổi học trong 1 tuần
            );

            await Class.update(
                {
                    name: className,
                    quantity: classQuantity,
                    startDate: classStartDate,
                    endDate: classEndDate,
                    courseId: courseId,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            await ScheduleClass.destroy({
                where: {
                    classId: id,
                },
            });
            if (classSchedule.length === 1) {
                await ScheduleClass.create({
                    schedule: classSchedule,
                    timeLearn: `${timeLearnStart} - ${timeLearnEnd}`,
                    classId: id,
                });
            } else {
                for (let index = 0; index < classSchedule.length; index++) {
                    await ScheduleClass.create({
                        schedule: classSchedule[index],
                        timeLearn: `${timeLearnStart[index]} - ${timeLearnEnd[index]}`,
                        classId: id,
                    });
                }
            }

            return res.redirect(`/admin/classes/edit/${id}`);
        }

        req.flash("errors", result.errors);
        res.redirect(`/admin/classes/edit/${id}`);
    },

    destroy: async (req, res) => {
        const { id } = req.params;
        const classVal = await Class.findOne({
            where: {
                id: id,
            },
        });

        if (classVal) {
            await Class.destroy({
                where: {
                    id: id,
                },
            });
        }
        res.redirect("/admin/classes");
    },

    destroyAll: async (req, res) => {
        const { listClassDelete } = req.body;
        const listIdClass = listClassDelete.split(",");
        await Class.destroy({
            where: {
                id: {
                    [Op.in]: listIdClass,
                },
            },
        });
        res.redirect("/admin/classes");
    },

    export: async (req, res) => {
        const scheduleClass = await ScheduleClass.findAll({
            include: {
                model: Class,
            },
        });
        scheduleClass.forEach((value, index) => {
            scheduleClass[index].dataValues.className = value.Class.name;
            scheduleClass[index].dataValues.quantity = value.Class.quantity;
            scheduleClass[index].dataValues.startDate = value.Class.startDate;
            scheduleClass[index].dataValues.endDate = value.Class.endDate;
        });
        const columns = constants.classColumnFile;
        const date = new Date().getTime();
        const fileName = `classes_${date}.xlsx`;
        exportFile(res, scheduleClass, "Classes", fileName, columns);
    },

    import: async (req, res) => {
        const title = "Import File Class";
        const userName = req.user.name;

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/class/import", {
            title,
            moduleName,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    handleImport: async (req, res) => {
        const file = req.file;
        const data = await importFile(file.path);

        for (let index = 0; index < data.length; index++) {
            const course = await Course.findOne({
                where: {
                    name: data[index].column_5,
                },
            });
            if (course) {
                const classInfor = await Class.findOne({
                    where: {
                        name: data[index].column_1,
                    },
                });
                if (!classInfor) {
                    await Class.create({
                        name: data[index].column_1,
                        quantity: data[index].column_2,
                        startDate: data[index].column_3,
                        endDate: data[index].column_4,
                        courseId: course.id,
                    });
                }
                const classVal = await Class.findOne({
                    where: {
                        name: data[index].column_1,
                    },
                });
                await ScheduleClass.create({
                    schedule: data[index].column_6,
                    timeLearn: data[index].column_7,
                    classId: classVal.id,
                });
            }
        }
        res.redirect("/admin/classes");
    },

    detail: async (req, res) => {
        const title = "Chi tiết lớp học";
        const userName = req.user.name;
        const { id } = req.params;
        req.flash("classId", id);

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

        const students = await StudentsClass.findAll({
            include: {
                model: User,
            },
            where: {
                classId: id,
            },
        });

        const typeTeacher = await Type.findOne({
            where: {
                name: "Teacher",
            },
        });

        const typeTA = await Type.findOne({
            where: {
                name: "TA",
            },
        });

        const teacherList = await User.findAll({
            include: {
                model: Class,
                where: {
                    id: id,
                },
            },
            where: {
                typeId: typeTeacher.id,
            },
        });

        const taList = await User.findAll({
            include: {
                model: Class,
                where: {
                    id: id,
                },
            },
            where: {
                typeId: typeTA.id,
            },
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/class/detail", {
            title,
            moduleName,
            classInfor,
            students,
            moment,
            scheduleClass,
            teacherList,
            taList,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    calendar: async (req, res) => {
        const title = "Lịch học";
        const userName = req.user.name;
        const { id } = req.params;

        const scheduleClass = await ScheduleClass.findAll({
            include: {
                model: Class,
            },
            where: {
                classId: id,
            },
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/class/calendar", {
            title,
            moduleName,
            scheduleClass,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    listTeacher: async (req, res) => {
        const title = "Danh sách giảng viên, trợ giảng";
        const userName = req.user.name;
        const { id } = req.params;

        const classVal = await Class.findOne({
            where: {
                id: id,
            },
        });

        const teachers = await User.findAll({
            include: {
                model: Type,
                where: {
                    name: {
                        [Op.or]: ["Teacher", "TA"],
                    },
                },
            },
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/class/teacherList", {
            classVal,
            title,
            moduleName,
            teachers,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    addTeacher: async (req, res) => {
        const { id } = req.params;
        const { teacherId } = req.body;

        const classVal = await Class.findOne({
            where: {
                id: id,
            },
        });

        if (teacherId) {
            let teacherIdList = [];
            if (typeof teacherId === "string") {
                teacherIdList.push(+teacherId);
            } else {
                teacherIdList = teacherId.map(async (value) => +value);
            }

            await Promise.all(
                teacherIdList.map(async (value) => {
                    console.log(value);
                    await classVal.addUser(value);
                })
            );
        }

        res.redirect(`/admin/classes/teachers/add/${id}`);
    },

    listStudent: async (req, res) => {
        const title = "Danh sách học viên";
        const userName = req.user.name;
        const error = req.flash("error");

        const students = await User.findAll({
            include: {
                model: Type,
                where: {
                    name: "Student",
                },
            },
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/class/studentList", {
            title,
            moduleName,
            error,
            students,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    addStudent: async (req, res) => {
        const { listUser } = req.body;
        const classId = req.flash("classId").slice(-1);
        if (listUser.length === 1) {
            await StudentsClass.create({
                studentId: listUser,
                classId: classId,
                statusId: 1,
            });
        } else if (listUser.length > 1) {
            listUser.forEach(async (userId) => {
                await StudentsClass.create({
                    studentId: userId,
                    classId: classId,
                    statusId: 1,
                });
            });
        } else {
            const error = "Chưa có học viên trong hệ thống";
            req.flash("error", error);
            return res.redirect("/admin/classes/students");
        }
        res.redirect(`/admin/classes/detail/${classId}`);
    },

    attendance: async (req, res) => {
        const title = "Điểm danh";
        const userName = req.user.name;
        const { id } = req.params;
        const daysSchedule = [];

        const students = await StudentsClass.findAll({
            include: {
                model: User,
            },
            where: {
                classId: id,
            },
        });

        const classInfor = await Class.findOne({
            where: {
                id: id,
            },
        });

        const classSchedule = await ScheduleClass.findAll({
            where: {
                classId: id,
            },
        });

        classSchedule.forEach(({ schedule }) => {
            daysSchedule.push(schedule);
        });
        const dateLearn = date.getDateLearn(
            classInfor.startDate,
            classInfor.endDate,
            daysSchedule
        );

        const attendanceList = await StudentsAttendance.findAll({
            where: {
                classId: id,
            },
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/class/attendance", {
            title,
            moduleName,
            students,
            dateLearn,
            moment,
            classInfor,
            attendanceList,
            checkAttendance,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    handleAttendance: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        await Promise.all(
            status.map(async (value) => {
                if (value) {
                    const status = await StudentsClass.findOne({
                        where: {
                            studentId: value.split(" - ")[1],
                            classId: id,
                        },
                    });
                    await StudentsAttendance.destroy({
                        where: {
                            dateLearn: value.split(" - ")[0],
                            studentId: value.split(" - ")[1],
                            classId: id,
                        },
                    });

                    return await StudentsAttendance.create({
                        dateLearn: value.split(" - ")[0],
                        studentId: value.split(" - ")[1],
                        classId: id,
                        statusId: status.id,
                        status: value.split(" - ")[2],
                    });
                }
            })
        );

        res.redirect(`/admin/classes/attendance/${id}`);
    },

    question: async (req, res) => {
        const title = "Câu hỏi";
        const userName = req.user.name;
        const { id } = req.params;

        const classVal = await Class.findOne({
            where: {
                id: id,
            },
        });

        const comments = await Comment.findAll({
            where: {
                classId: id,
            },
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render(`admin/class/question`, {
            title,
            moduleName,
            classVal,
            comments,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    makeQuestion: async (req, res) => {
        const title = "Đặt câu hỏi mới";
        const userName = req.user.name;
        const { id } = req.params;

        const classVal = await Class.findOne({
            where: {
                id: id,
            },
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/class/makeQuestion", {
            title,
            moduleName,
            classVal,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    handleMakeQuestion: async (req, res) => {
        const { id } = req.params;
        const { title, content, attachment } = req.body;

        const comment = await Comment.create({
            classId: id,
            title: title,
            content: content,
            parentId: 0,
            studentId: req.user.id,
            attachment: attachment,
        });

        res.redirect(`/admin/classes/question-answer/${comment.id}`);
    },

    questionAnswer: async (req, res) => {
        const title = "Hỏi đáp";
        const userName = req.user.name;
        const { id } = req.params;

        const comment = await Comment.findOne({
            include: {
                model: User,
            },
            where: {
                id: id,
            },
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/class/questionAnswer", {
            title,
            moduleName,
            comment,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    exercise: async (req, res) => {
        const title = "Bài tập";
        const userName = req.user.name;
        const { id } = req.params;

        const classVal = await Class.findOne({
            where: {
                id: id,
            },
        });

        const exercises = await Exercise.findAll({
            classId: id,
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/class/exercise", {
            title,
            moduleName,
            classVal,
            exercises,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    addExercise: async (req, res) => {
        const title = "Thêm bài tập";
        const userName = req.user.name;
        const { id } = req.params;

        const classVal = await Class.findOne({
            where: {
                id: id,
            },
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/class/addExercise", {
            title,
            moduleName,
            classVal,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    createExercise: async (req, res) => {
        const { id } = req.params;
        const { title, content, attachment } = req.body;

        const exercise = await Exercise.create({
            classId: id,
            title: title,
            content: content,
            parentId: 0,
            studentId: req.user.id,
            attachment: attachment,
        });

        res.redirect(`/admin/classes/exercise-submit/${exercise.id}`);
    },

    submitExercise: async (req, res) => {
        const title = "Nộp bài tập";
        const userName = req.user.name;
        const { id } = req.params;

        const exercise = await Exercise.findOne({
            where: {
                id: id,
            },
        });

        const exerciseSubmits = await ExercisesSubmit.findAll({
            where: {
                exerciseId: id,
            },
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/class/exerciseSubmit", {
            title,
            moduleName,
            exercise,
            exerciseSubmits,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    handleSubmitExercise: async (req, res) => {
        const { id } = req.params;
        const { content, attachment } = req.body;

        await ExercisesSubmit.create({
            studentId: req.user.id,
            content: content,
            attachment: attachment,
            exerciseId: id,
        });
        res.redirect(`/admin/classes/exercise-submit/${id}`);
    },
};
