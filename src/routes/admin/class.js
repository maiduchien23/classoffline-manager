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
        cb(null, `Class_${dateNow}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });
const ClassController = require("../../http/controllers/admin/ClassController");
const ClassValidate = require("../../http/middlewares/ClassValidate");
const ClassUpdateValidate = require("../../http/middlewares/ClassUpdateValidate");

router.get("/", ClassController.index);
router.get("/add", ClassController.add);
router.post("/add", ClassValidate(), ClassController.store);

router.get("/edit/:id", ClassController.edit);
router.patch("/edit/:id", ClassUpdateValidate(), ClassController.update);

router.delete("/delete/:id", ClassController.destroy);

router.delete("/deleteAll", ClassController.destroyAll);

router.post("/export", ClassController.export);

router.get("/import", ClassController.import);
router.post(
    "/import",
    upload.single("fileClass"),
    ClassController.handleImport
);

router.get("/detail/:id", ClassController.detail);

router.get("/calendar/:id", ClassController.calendar);

router.get("/teachers/add/:id", ClassController.listTeacher);
router.post("/teachers/add/:id", ClassController.addTeacher);

router.get("/students", ClassController.listStudent);
router.post("/students", ClassController.addStudent);

router.get("/attendance/:id", ClassController.attendance);
router.post("/attendance/:id", ClassController.handleAttendance);

router.get("/questions/:id", ClassController.question);

router.get("/questions/add/:id", ClassController.makeQuestion);
router.post("/questions/add/:id", ClassController.handleMakeQuestion);

router.get("/question-answer/:id", ClassController.questionAnswer);

router.get("/exercises/:id", ClassController.exercise);

router.get("/exercises/add/:id", ClassController.addExercise);
router.post("/exercises/add/:id", ClassController.createExercise);

router.get("/exercise-submit/:id", ClassController.submitExercise);
router.post("/exercise-submit/:id", ClassController.handleSubmitExercise);

module.exports = router;
