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
        cb(null, `User_Student_${dateNow}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

const StudentController = require("../../http/controllers/admin/StudentController");
const StudentValidate = require("../../http/middlewares/StudentValidate");
const StudentUpdateValidate = require("../../http/middlewares/StudentUpdateValidate");

router.get("/", StudentController.index);
router.get("/add", StudentController.add);
router.post("/add", StudentValidate(), StudentController.store);

router.get("/edit/:id", StudentController.edit);
router.patch("/edit/:id", StudentUpdateValidate(), StudentController.update);

router.delete("/delete/:id", StudentController.destroy);
router.delete("/deleteAll", StudentController.destroyAll);

router.get("/detail/:id", StudentController.detail);

router.post("/export", StudentController.export);

router.get("/import", StudentController.import);
router.post(
    "/import",
    upload.single("fileStudent"),
    StudentController.handleImport
);

module.exports = router;
