const moment = require("moment");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const constants = require("../../../constants/index");
const exportFile = require("../../../utils/exportFile");
const importFile = require("../../../utils/importFile");
const { getPaginateUrl } = require("../../../utils/url");
const validate = require("../../../utils/validate");
const permissionUtils = require("../../../utils/permissionUtils");

const model = require("../../../models/index");
const User = model.User;
const Type = model.Type;

const moduleName = "Giảng viên";

module.exports = {
    index: async (req, res) => {
        const title = "Danh sách giảng viên, trợ giảng";
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
                {
                    email: {
                        [Op.like]: `%${keyword}%`,
                    },
                },
            ];
        }

        // Lấy tổng số bản ghi
        const totalCountObj = await User.findAndCountAll({
            include: {
                model: Type,
                where: {
                    name: {
                        [Op.or]: ["Teacher", "TA"],
                    },
                },
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
        const teachers = await User.findAll({
            include: {
                model: Type,
                where: {
                    name: {
                        [Op.or]: ["Teacher", "TA"],
                    },
                },
            },
            where: filters,
            attributes: [
                "id",
                "name",
                "email",
                "phone",
                "typeId",
                "address",
                "createdAt",
            ],
            limit: +recordNumber,
            offset: offset,
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/teacher/index", {
            req,
            teachers,
            moment,
            title,
            moduleName,
            totalPage,
            page,
            recordNumber,
            permissionUser,
            permissionUtils,
            getPaginateUrl,
            userName,
        });
    },

    add: async (req, res) => {
        const title = "Thêm giảng viên, trợ giảng";
        const userName = req.user.name;
        const errors = req.flash("errors");

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/teacher/add", {
            title,
            moduleName,
            errors,
            validate,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    store: async (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            const { name, email, phone, address, typeName } = req.body;
            const type = await Type.findOne({
                where: {
                    name: typeName,
                },
            });
            await User.create({
                name: name,
                email: email,
                phone: phone,
                address: address,
                typeId: type.id,
            });
            return res.redirect("/admin/teachers");
        }
        req.flash("errors", result.errors);
        res.redirect("/admin/teachers/add");
    },

    edit: async (req, res) => {
        const { id } = req.params;
        const userName = req.user.name;
        const title = "Sửa giảng viên, trợ giảng";
        const errors = req.flash("errors");

        const teacher = await User.findOne({
            include: {
                model: Type,
            },
            where: {
                id: id,
            },
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/teacher/edit", {
            teacher,
            title,
            moduleName,
            errors,
            validate,
            permissionUtils,
            permissionUser,
            userName,
        });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { name, email, phone, address, typeName } = req.body;

        const result = validationResult(req);
        console.log(result);
        if (result.isEmpty()) {
            const type = await Type.findOne({
                where: {
                    name: typeName,
                },
            });
            await User.update(
                {
                    name: name,
                    email: email,
                    phone: phone,
                    address: address,
                    typeId: type.id,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );

            return res.redirect(`/admin/teachers/edit/${id}`);
        }

        console.log("Lỗi", result);

        req.flash("errors", result.errors);
        res.redirect(`/admin/teachers/edit/${id}`);
    },

    destroy: async (req, res) => {
        const { id } = req.params;
        const teacher = await User.findOne({
            where: {
                id: id,
            },
        });
        if (teacher) {
            await User.destroy({
                where: {
                    id: id,
                },
            });
        }
        res.redirect("/admin/teachers");
    },

    destroyAll: async (req, res) => {
        const { listTeacherDelete } = req.body;
        const listIdTeacher = listTeacherDelete.split(",");
        await User.destroy({
            where: {
                id: {
                    [Op.in]: listIdTeacher,
                },
            },
        });
        res.redirect("/admin/teachers");
    },

    detail: async (req, res) => {
        const title = "Chi tiết giảng viên/trợ giảng";
        const userName = req.user.name;
        const { id } = req.params;

        const teacher = await User.findOne({
            include: {
                model: Type,
            },
            where: {
                id: id,
            },
        });
        const classes = await teacher.getClasses();

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/teacher/detail", {
            title,
            moduleName,
            teacher,
            classes,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    export: async (req, res) => {
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
        teachers.forEach((teacher, index) => {
            if (teacher.Type.name === "Teacher") {
                teachers[index].dataValues.typeName = "Giảng viên";
            } else {
                teachers[index].dataValues.typeName = "Trợ giảng";
            }
        });
        const columns = constants.teacherColumnFile;
        const date = new Date().getTime();
        const fileName = `user_teacher_${date}.xlsx`;
        exportFile(res, teachers, "User_Teacher", fileName, columns);
    },

    import: async (req, res) => {
        const title = "Import File Teacher";
        const userName = req.user.name;

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/teacher/import", {
            title,
            moduleName,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    handleImport: async (req, res) => {
        const file = req.file;
        console.log("Tên file", file);
        const data = await importFile(file.path);
        for (let index = 0; index < data.length; index++) {
            if (data[index].column_4 === "Giảng viên") {
                data[index].column_4 = "Teacher";
            } else {
                data[index].column_4 = "TA";
            }
            const type = await Type.findOne({
                where: {
                    name: data[index].column_4,
                },
            });
            console.log(type);
            await User.create({
                name: data[index].column_1,
                email: data[index].column_2.text,
                phone: data[index].column_3,
                typeId: type.id,
                address: data[index].column_5,
            });
        }
        res.redirect("/admin/teachers");
    },
};
