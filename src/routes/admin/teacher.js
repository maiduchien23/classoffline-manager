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
        cb(null, `User_Teacher_${dateNow}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

const TeacherController = require("../../http/controllers/admin/TeacherController");
const TeacherValidate = require("../../http/middlewares/TeacherValidate");
const TeacherUpdateValidate = require("../../http/middlewares/TeacherUpdateValidate");

router.get("/", TeacherController.index);
router.get("/add", TeacherController.add);
router.post("/add", TeacherValidate(), TeacherController.store);

router.get("/edit/:id", TeacherController.edit);
router.patch("/edit/:id", TeacherUpdateValidate(), TeacherController.update);

router.delete("/delete/:id", TeacherController.destroy);
router.delete("/deleteAll", TeacherController.destroyAll);

router.get("/detail/:id", TeacherController.detail);

router.post("/export", TeacherController.export);

router.get("/import", TeacherController.import);
router.post(
    "/import",
    upload.single("fileTeacher"),
    TeacherController.handleImport
);

module.exports = router;
