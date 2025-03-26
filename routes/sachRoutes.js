const express = require("express");
const router = express.Router();
const sachController = require("../controllers/sachController"); // Đảm bảo đường dẫn đúng

// Định nghĩa các API
router.get("/", sachController.getAll);
router.get("/:id", sachController.getById);
router.post("/", sachController.create);
router.put("/:id", sachController.update);
router.delete("/:id", sachController.delete);

module.exports = router;
