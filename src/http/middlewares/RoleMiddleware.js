const model = require("../../models/index");
const Type = model.Type;
/**
 * type.name: [Admin, Student, Teacher]
 */
module.exports = async (req, res, next) => {
    const type = await Type.findOne({
        where: {
            id: req.user.typeId,
        },
    });

    // Nếu người dùng là trợ giảng thì sẽ có vai trò như giảng viên
    if (type.name === "TA") {
        type.name = "Teacher";
    }

    // Tạo đường dẫn cho vai trò của người dùng.
    const rolePath = `/${type.name.toLowerCase()}`;

    // Kiểm tra xem URL hiện tại có phải là URL dành riêng cho vai trò của người dùng không.
    if (req.originalUrl.startsWith(rolePath)) {
        // Nếu đúng, thì cho phép người dùng tiếp tục truy cập.
        return next();
    } else {
        // Nếu không, thì kiểm tra xem người dùng có phải là học sinh không.
        const isNotStudent = /\/(teacher|admin)/.test(req.originalUrl);

        if (isNotStudent) {
            // Nếu người dùng không phải là học sinh, thì kiểm tra xem người dùng có đang vào quản trị viên hoặc giáo viên không.
            if (type.name === "Student") {
                // Nếu người dùng là học sinh, thì hiển thị trang lỗi 404.
                return res.render("error/404.ejs", {
                    layout: "layouts/auth.layout.ejs",
                });
            } else {
                // Nếu người dùng là quản trị viên hoặc giáo viên, thì chuyển hướng người dùng đến trang chủ của vai trò tương ứng.
                return res.redirect(rolePath); // if admin can use path /teacher
            }
        } else {
            // Nếu người dùng là học sinh, thì kiểm tra xem người dùng có đang cố truy cập trang chủ không.
            if (req.originalUrl === "/" && !(type.name === "Student")) {
                // Nếu người dùng không phải là học sinh và đang cố truy cập trang chủ, thì chuyển hướng người dùng đến trang chủ của vai trò tương ứng.
                return res.redirect(rolePath);
            } else {
                // Nếu người dùng là học sinh và đang truy cập các trang khác, thì cho phép người dùng tiếp tục truy cập.
                return next();
            }
        }
    }
};
