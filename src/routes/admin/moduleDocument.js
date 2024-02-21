var express = require("express");
var router = express.Router();

const ModuleDocumentController = require("../../http/controllers/admin/ModuleDocumentController");

router.get("/add", ModuleDocumentController.add);
router.post("/add", ModuleDocumentController.store);

router.get("/edit/:id", ModuleDocumentController.edit);
router.patch("/edit/:id", ModuleDocumentController.update);

router.delete("/delete/:id", ModuleDocumentController.destroy);

module.exports = router;
