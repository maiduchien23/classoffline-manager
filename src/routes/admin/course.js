var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync("./public/uploads/file")) {
            fs.mkdirSync("./public/uploads/file");
        }
        cb(null, "./public/uploads/file/");
    },
    filename: function (req, file, cb) {
        const dateNow = Date.now();
        cb(null, `Course_${dateNow}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });
const CourseController = require("../../http/controllers/admin/CourseController");
const CourseValidate = require("../../http/middlewares/CourseValidate");
const CourseUpdateValidate = require("../../http/middlewares/CourseUpdateValidate");

router.get("/", CourseController.index);

router.get("/add", CourseController.add);
router.post("/add", CourseValidate(), CourseController.store);

router.get("/edit/:id", CourseController.edit);
router.patch("/edit/:id", CourseUpdateValidate(), CourseController.update);

router.delete("/delete/:id", CourseController.destroy);
router.delete("/deleteAll", CourseController.destroyAll);

router.get("/detail/:id", CourseController.detail);

router.post("/export", CourseController.export);

router.get("/import", CourseController.import);
router.post(
    "/import",
    upload.single("fileCourse"),
    CourseController.handleImport
);

module.exports = router;
