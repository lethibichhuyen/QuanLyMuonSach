const express = require("express");
const router = express.Router();
const nhanVienController = require("../controllers/nhanVienController");

router.get("/", nhanVienController.getAll);
router.get("/:msnv", nhanVienController.getById);
router.post("/", nhanVienController.create);
router.put("/:msnv", nhanVienController.update);
router.delete("/:msnv", nhanVienController.delete);
router.post("/login", nhanVienController.login);
router.get("/me", nhanVienController.getMe);

module.exports = router;
