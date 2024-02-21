var express = require("express");
var router = express.Router();

const HomePageController = require("../../http/controllers/teachers/HomePageController");
const ClassController = require("../../http/controllers/teachers/ClassController");
const CourseController = require("../../http/controllers/teachers/CourseController");
const ProfileController = require("../../http/controllers/teachers/ProfileController");

router.get("/", HomePageController.index);
router.get("/profile", ProfileController.index);

router.get("/change-password", ProfileController.changePassword);
router.post("/change-password", ProfileController.handleChangePassword);

router.get("/classes", ClassController.index);
router.get("/classes/detail/:id", ClassController.detail);

router.get("/courses", CourseController.index);

module.exports = router;
