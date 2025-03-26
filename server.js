const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") }); // Đảm bảo tải .env đúng cách

// Kiểm tra biến môi trường
if (!process.env.SECRET_KEY) {
  console.error("❌ Lỗi: SECRET_KEY chưa được cấu hình trong .env");
  process.exit(1);
}

// Kiểm tra và import middleware
let errorMiddleware;
try {
  errorMiddleware = require(path.join(
    __dirname,
    "middlewares",
    "errorMiddleware"
  ));
} catch (err) {
  console.error(
    "❌ Không tìm thấy file errorMiddleware.js trong thư mục middlewares."
  );
  errorMiddleware = (req, res, next) =>
    res.status(500).json({ message: "Lỗi máy chủ" });
}

// Kiểm tra và import routes
let docGiaRoutes,
  sachRoutes,
  nhaXuatBanRoutes,
  theoDoiMuonSachRoutes,
  nhanVienRoutes;
try {
  docGiaRoutes = require(path.join(__dirname, "routes", "docGiaRoutes"));
  sachRoutes = require(path.join(__dirname, "routes", "sachRoutes"));
  nhaXuatBanRoutes = require(path.join(
    __dirname,
    "routes",
    "nhaXuatBanRoutes"
  ));
  theoDoiMuonSachRoutes = require(path.join(
    __dirname,
    "routes",
    "theoDoiMuonSachRoutes"
  ));
  nhanVienRoutes = require(path.join(__dirname, "routes", "nhanVienRoutes"));
} catch (err) {
  console.error("❌ Lỗi khi import routes:", err.message);
}

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Kết nối MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/QLMS";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch((err) => {
    console.error("❌ Lỗi kết nối MongoDB:", err);
    process.exit(1);
  });

// Định nghĩa API routes (Chỉ thêm nếu route tồn tại)
if (docGiaRoutes) app.use("/api/doc-gia", docGiaRoutes);
if (sachRoutes) app.use("/api/sach", sachRoutes);
if (nhaXuatBanRoutes) app.use("/api/nha-xuat-ban", nhaXuatBanRoutes);
if (theoDoiMuonSachRoutes)
  app.use("/api/theo-doi-muon-sach", theoDoiMuonSachRoutes);
if (nhanVienRoutes) app.use("/api/nhan-vien", nhanVienRoutes);

// Middleware xử lý lỗi
if (errorMiddleware) app.use(errorMiddleware);

// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`)
);
