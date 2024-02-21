var express = require("express");
var router = express.Router();

const HomeController = require("../../http/controllers/students/HomeController");
const CourseController = require("../../http/controllers/students/CourseController");
const ProfileController = require("../../http/controllers/students/ProfileController");
const ClassController = require("../../http/controllers/students/ClassController");

router.get("/", HomeController.index);
router.get("/courses", CourseController.index);
router.get("/courses/detail/:id", CourseController.detail);

router.get("/classes", ClassController.index);

router.get("/profile", ProfileController.index);

router.get("/profile/edit", ProfileController.edit);
router.post("/profile/edit", ProfileController.update);

router.get("/change-password", ProfileController.changePassword);
router.post("/change-password", ProfileController.handleChangePassword);

module.exports = router;
