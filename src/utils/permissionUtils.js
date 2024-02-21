const model = require("../models/index");
const User = model.User;
const Role = model.Role;
const Permission = model.Permission;

module.exports = {
    get: (permissionList, permission) => {
        const permissionData = permissionList.find(
            ({ values }) => values === permission
        );
        if (permissionData) {
            return permissionData.values;
        }
    },

    isRole: (roleUser, roleId) => {
        return roleUser.find((role) => {
            return +role.id === +roleId;
        });
    },

    roleUser: async (req) => {
        const { id } = req.user;

        const user = await User.findOne({
            include: {
                model: Role,
            },
            where: {
                id: id,
            },
        });

        const userPermission = await User.findOne({
            include: {
                model: Permission,
            },
            where: {
                id: id,
            },
        });

        const permissionUserPlus = userPermission.Permissions.map(
            ({ values }) => {
                return values;
            }
        );

        const roles = user.Roles;
        let permissions = await Promise.all(
            roles.map(async ({ id }) => {
                const role = await Role.findOne({
                    include: {
                        model: Permission,
                    },
                    where: {
                        id: id,
                    },
                });
                return role.Permissions;
            })
        );
        permissions = permissions.map((permission) => {
            return permission.map(({ values }) => values);
        });

        permissions = [...new Set(permissions.flat(Infinity))];

        let permissionsUser = permissions.concat(permissionUserPlus);

        return permissionsUser;
    },

    getPermissionUser: (permissionUser, permission) => {
        if (permissionUser.includes(permission)) {
            return true;
        }
        return false;
    },
};
