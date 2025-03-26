const express = require("express");
const router = express.Router();
const nhaXuatBanController = require("../controllers/nhaXuatBanController");

router.get("/", nhaXuatBanController.getAll);
router.get("/:id", nhaXuatBanController.getById);
router.post("/", nhaXuatBanController.create);
router.put("/:id", nhaXuatBanController.update);
router.delete("/:id", nhaXuatBanController.delete);

module.exports = router;
