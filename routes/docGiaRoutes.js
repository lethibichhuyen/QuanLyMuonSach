const express = require("express");
const router = express.Router();
const docGiaController = require("../controllers/docGiaController");

router.get("/", docGiaController.getAll);
router.get("/:madocgia", docGiaController.getById);
router.post("/", docGiaController.create);
router.post("/register", docGiaController.registerDocGia);
router.post("/login", docGiaController.loginDocGia);
router.put("/:madocgia", docGiaController.update);
router.delete("/:madocgia", docGiaController.delete);


module.exports = router;
