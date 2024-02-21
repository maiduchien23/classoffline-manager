var express = require("express");
var router = express.Router();

const CourseModuleController = require("../../http/controllers/admin/CourseModuleController");

router.get("/add", CourseModuleController.add);
router.post("/add", CourseModuleController.store);

router.get("/edit/:id", CourseModuleController.edit);
router.patch("/edit/:id", CourseModuleController.update);

router.delete("/delete/:id", CourseModuleController.destroy);

module.exports = router;
