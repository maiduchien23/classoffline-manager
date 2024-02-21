const moduleName = "Trang chủ";

module.exports = {
    index: (req, res) => {
        const title = "";
        res.render("teacher/home/index", {moduleName, title,  layout: "layouts/teacher.layout.ejs"});
    }
}