const moduleName = "Khóa học";

module.exports = {
    index: (req, res) => {
        const title = "Danh sách khóa học";
        res.render("teacher/course/index", {
            title,
            moduleName,
            layout: "layouts/teacher.layout.ejs",
        });
    },
};
