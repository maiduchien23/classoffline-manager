const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const validate = require("../../../utils/validate");
const { getPaginateUrl } = require("../../../utils/url");
const permissionUtils = require("../../../utils/permissionUtils");
const model = require("../../../models/index");
const Role = model.Role;
const Permission = model.Permission;

const moduleName = "Role";

module.exports = {
    index: async (req, res) => {
        const title = "Danh sách Role";
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
        const totalCountObj = await Role.findAndCountAll({
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

        const roles = await Role.findAll({
            where: filters,
            limit: +recordNumber,
            offset: offset,
        });

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/role/index", {
            req,
            title,
            moduleName,
            roles,
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
        const title = "Thêm role";
        const userName = req.user.name;
        const errors = req.flash("errors");

        const permissionUser = await permissionUtils.roleUser(req);
        res.render("admin/role/add", {
            title,
            moduleName,
            errors,
            validate,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    create: async (req, res) => {
        const { nameRole, permission } = req.body;
        const result = validationResult(req);
        if (result.isEmpty()) {
            const role = await Role.create({ name: nameRole });

            if (permission) {
                let dataPermission = [];
                if (typeof permission === "string") {
                    dataPermission.push({
                        values: permission,
                    });
                } else {
                    dataPermission = permission.map((item) => ({
                        values: item,
                    }));
                }

                await Promise.all(
                    dataPermission.map(async (item) => {
                        const permissionInstance = await Permission.findOne({
                            where: item,
                        });
                        if (permissionInstance) {
                            await role.addPermission(permissionInstance);
                        } else {
                            await role.createPermission(item);
                        }
                    })
                );
            }

            return res.redirect("/admin/roles");
        }

        req.flash("errors", result.errors);
        res.redirect("/admin/roles/add");
    },

    edit: async (req, res) => {
        const title = "Sửa role";
        const userName = req.user.name;
        const { id } = req.params;
        const errors = req.flash("errors");

        const role = await Role.findOne({
            where: {
                id: id,
            },
            include: {
                model: Permission,
            },
        });

        const { Permissions: permissions } = role;

        const permissionUser = await permissionUtils.roleUser(req);

        res.render("admin/role/edit", {
            title,
            moduleName,
            role,
            errors,
            validate,
            permissions,
            permissionUser,
            permissionUtils,
            userName,
        });
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { nameRole, permission } = req.body;
        const result = validationResult(req);
        if (result.isEmpty()) {
            await Role.update(
                {
                    name: nameRole,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            const role = await Role.findOne({
                where: {
                    id: id,
                },
            });

            if (permission) {
                let dataPermission = [];
                if (typeof permission === "string") {
                    dataPermission.push({
                        values: permission,
                    });
                } else {
                    dataPermission = permission.map((item) => ({
                        values: item,
                    }));
                }

                const permissionUpdate = await Promise.all(
                    dataPermission.map(async (item) => {
                        let permissionInstance = await Permission.findOne({
                            where: item,
                        });

                        if (!permissionInstance) {
                            permissionInstance = await role.createPermission(
                                item
                            );
                        }

                        return permissionInstance;
                    })
                );
                await role.setPermissions(permissionUpdate);
            }

            return res.redirect(`/admin/roles/edit/${id}`);
        }
        req.flash("errors", result.errors);
        res.redirect(`/admin/roles/edit/${id}`);
    },

    destroy: async (req, res) => {
        const { id } = req.params;
        // Lấy role cần xóa
        const role = await Role.findOne({
            where: {
                id,
            },
        });

        const permissions = await Permission.findAll();

        // Xóa tất cả Permission liên quan đến Role cần xóa
        role.removePermissions(permissions);

        await Role.destroy({
            where: {
                id,
            },
        });

        res.redirect("/admin/roles");
    },
};
