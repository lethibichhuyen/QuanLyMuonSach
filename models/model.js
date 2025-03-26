const mongoose = require("mongoose");

// Schema Độc Giả
const docGiaSchema = new mongoose.Schema({
  MaDocGia: { type: String, unique: true, required: true },
  HoLot: String,
  Ten: String,
  NgaySinh: Date,
  Phai: { type: String, enum: ["Nam", "Nữ"] },
  DiaChi: String,
  DienThoai: { type: String, unique: true, required: true },
  Password: { type: String, required: true }, // 🆕 Thêm trường Password
});

const DocGia = mongoose.model("DocGia", docGiaSchema, "DocGia");

// Schema Sách

const sachSchema = new mongoose.Schema({
  MaSach: {
    type: String,
    required: true,
    unique: true,
  },
  TenSach: { type: String, required: true },
  DonGia: { type: Number, required: true },
  SoQuyen: { type: Number, required: true, min: 0 },
  NamXuatBan: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear(),
  },
  MaNXB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NhaXuatBan",
    required: true,
  },
  TacGia: { type: String, required: true },
  HinhAnh: { type: String, required: false },
});

const Sach = mongoose.model("Sach", sachSchema, "Sach");

//Schema Nhà Xuất Bản
const nhaXuatBanSchema = new mongoose.Schema({
  MaNXB: { type: String, required: true, unique: true },
  TenNXB: { type: String, required: true },
  DiaChi: { type: String, required: true },
});

const NhaXuatBan = mongoose.model("NhaXuatBan", nhaXuatBanSchema, "NhaXuatBan");

// Schema Theo Dõi Mượn Sách
const theoDoiMuonSachSchema = new mongoose.Schema({
  MaDocGia: { type: String, required: true }, // Đảm bảo là String
  MaSach: { type: String, required: true },
  NgayMuon: { type: Date, required: true },
  NgayTra: { type: Date, required: true },
});

const TheoDoiMuonSach = mongoose.model(
  "TheoDoiMuonSach",
  theoDoiMuonSachSchema,
  "TheoDoiMuonSach"
);

// Schema Nhân Viên
const nhanVienSchema = new mongoose.Schema({
  MSNV: { type: String, unique: true, required: true },
  HoTenNV: String,
  Password: String,
  ChucVu: String,
  DiaChi: String,
  SoDienThoai: String,
});

const NhanVien = mongoose.model("NhanVien", nhanVienSchema, "NhanVien");

module.exports = { DocGia, Sach, NhaXuatBan, TheoDoiMuonSach, NhanVien };
