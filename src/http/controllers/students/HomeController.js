const moduleName = "Trang chủ";

module.exports = {
    index: (req, res) => {
        const title = "";
        const userName = req.user.name;
        res.render("student/home/index", {
            title,
            moduleName,
            userName,
            layout: "layouts/student.layout.ejs",
        });
    },
};
