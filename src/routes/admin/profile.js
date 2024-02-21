var express = require("express");
var router = express.Router();

const ProfileController = require("../../http/controllers/admin/ProfileController");
const ProfileUpdateValidate = require("../../http/middlewares/ProfileUpdateValidate");

router.get("/", ProfileController.profile);
router.get("/update", ProfileController.edit);
router.post("/update", ProfileUpdateValidate(), ProfileController.update);

module.exports = router;
