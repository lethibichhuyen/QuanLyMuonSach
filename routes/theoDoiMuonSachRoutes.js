const express = require("express");
const router = express.Router();
const {
  borrowBook,
  getBorrowList,
  deleteBorrow,
  returnBook,
} = require("../controllers/theoDoiMuonSachController");

// 📌 API mượn sách
router.post("/", borrowBook);

// 📌 API lấy danh sách mượn sách
router.get("/", getBorrowList);

// 📌 API xóa thông tin mượn sách theo ID
router.delete("/:id", deleteBorrow);

// 📌 API cập nhật trạng thái trả sách
router.patch("/return", returnBook);

module.exports = router;
