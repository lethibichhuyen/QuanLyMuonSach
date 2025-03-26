const mongoose = require("mongoose");

// Kết nối MongoDB
mongoose
  .connect("mongodb://localhost:27017/QLMS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🎉 Kết nối MongoDB thành công!"))
  .catch((err) => console.log("❌ Lỗi kết nối MongoDB:", err));

// 📌 1️⃣ Định nghĩa Schema (Cấu trúc bảng)

// Bảng Độc Giả
// const docGiaSchema = new mongoose.Schema({
//   MaDocGia: { type: Number, unique: true, required: true },
//   HoLot: String,
//   Ten: String,
//   NgaySinh: Date,
//   Phai: { type: String, enum: ["Nam", "Nữ"] },
//   DiaChi: String,
//   DienThoai: String,
// });

// Bảng Sách
// const sachSchema = new mongoose.Schema({
//   MaSach: { type: Number, unique: true, required: true },
//   TenSach: String,
//   DonGia: Number,
//   SoQuyen: Number,
//   NamXuatBan: Number,
//   MaNXB: { type: mongoose.Schema.Types.ObjectId, ref: "NhaXuatBan" },
//   TacGia: String,
// });

// Bảng Nhà Xuất Bản
// const nhaXuatBanSchema = new mongoose.Schema({
//   MaNXB: { type: String, unique: true, required: true },
//   TenNXB: String,
//   DiaChi: String,
// });

// Bảng Theo Dõi Mượn Sách
const theoDoiMuonSachSchema = new mongoose.Schema({
  MaDocGia: { type: String, ref: "DocGia" },
  MaSach: { type: String, ref: "Sach" },
  NgayMuon: Date,
  NgayTra: Date,
});

// Bảng Nhân Viên
// const nhanVienSchema = new mongoose.Schema({
//   MSNV: { type: Number, unique: true, required: true },
//   HoTenNV: String,
//   Password: String,
//   ChucVu: String,
//   DiaChi: String,
//   SoDienThoai: String,
// });

// 📌 2️⃣ Tạo Model từ Schema
// const DocGia = mongoose.model("DocGia", docGiaSchema, "DocGia");
// const Sach = mongoose.model("Sach", sachSchema, "Sach");
// const NhaXuatBan = mongoose.model("NhaXuatBan", nhaXuatBanSchema, "NhaXuatBan");
const TheoDoiMuonSach = mongoose.model(
  "TheoDoiMuonSach",
  theoDoiMuonSachSchema,
  "TheoDoiMuonSach"
);
//const NhanVien = mongoose.model("NhanVien", nhanVienSchema, "NhanVien");

// Chèn Dữ Liệu Mẫu

// const insertSampleData = async () => {
//   try {
//     //Thêm 5 Nhà Xuất Bản
//     const nhaXuatBan = await NhaXuatBan.insertMany([
//       { MaNXB: 1, TenNXB: "NXB Kim Đồng", DiaChi: "Hà Nội" },
//       { MaNXB: 2, TenNXB: "NXB Trẻ", DiaChi: "TP. Hồ Chí Minh" },
//       { MaNXB: 3, TenNXB: "NXB Văn Học", DiaChi: "Hà Nội" },
//       { MaNXB: 4, TenNXB: "NXB Giáo Dục", DiaChi: "Hà Nội" },
//       { MaNXB: 5, TenNXB: "NXB Khoa Học", DiaChi: "TP. Hồ Chí Minh" },
//     ]);

//     // Lấy ID của Nhà Xuất Bản
//     const nxbIds = nhaXuatBan.map((nxb) => nxb._id);

//     // Thêm 5 Sách
//     await Sach.insertMany([
//       {
//         MaSach: 1001,
//         TenSach: "Doraemon",
//         DonGia: 25000,
//         SoQuyen: 100,
//         NamXuatBan: 2020,
//         MaNXB: nxbIds[0],
//         TacGia: "Fujiko F. Fujio",
//       },
//       {
//         MaSach: 1002,
//         TenSach: "Harry Potter",
//         DonGia: 150000,
//         SoQuyen: 50,
//         NamXuatBan: 2005,
//         MaNXB: nxbIds[1],
//         TacGia: "J.K. Rowling",
//       },
//       {
//         MaSach: 1003,
//         TenSach: "Thép đã tôi thế đấy",
//         DonGia: 70000,
//         SoQuyen: 30,
//         NamXuatBan: 1980,
//         MaNXB: nxbIds[2],
//         TacGia: "Nikolai Ostrovsky",
//       },
//       {
//         MaSach: 1004,
//         TenSach: "Số đỏ",
//         DonGia: 50000,
//         SoQuyen: 40,
//         NamXuatBan: 1995,
//         MaNXB: nxbIds[3],
//         TacGia: "Vũ Trọng Phụng",
//       },
//       {
//         MaSach: 1005,
//         TenSach: "Lược sử thời gian",
//         DonGia: 120000,
//         SoQuyen: 25,
//         NamXuatBan: 1988,
//         MaNXB: nxbIds[4],
//         TacGia: "Stephen Hawking",
//       },
//     ]);

//     // await DocGia.insertMany([
//     //   {
//     //     MaDocGia: 1,
//     //     HoLot: "Nguyễn Văn",
//     //     Ten: "An",
//     //     NgaySinh: new Date("2000-05-15"),
//     //     Phai: "Nam",
//     //     DiaChi: "Hà Nội",
//     //     DienThoai: "0123456789",
//     //   },
//     //   {
//     //     MaDocGia: 2,
//     //     HoLot: "Trần Thị",
//     //     Ten: "Bích",
//     //     NgaySinh: new Date("1998-08-25"),
//     //     Phai: "Nữ",
//     //     DiaChi: "TP. Hồ Chí Minh",
//     //     DienThoai: "0987654321",
//     //   },
//     //   {
//     //     MaDocGia: 3,
//     //     HoLot: "Lê Quang",
//     //     Ten: "Huy",
//     //     NgaySinh: new Date("2002-03-10"),
//     //     Phai: "Nam",
//     //     DiaChi: "Đà Nẵng",
//     //     DienThoai: "0909123456",
//     //   },
//     //   {
//     //     MaDocGia: 4,
//     //     HoLot: "Phạm Thị",
//     //     Ten: "Nhung",
//     //     NgaySinh: new Date("2001-12-20"),
//     //     Phai: "Nữ",
//     //     DiaChi: "Cần Thơ",
//     //     DienThoai: "0911223344",
//     //   },
//     //   {
//     //     MaDocGia: 5,
//     //     HoLot: "Đinh Văn",
//     //     Ten: "Tùng",
//     //     NgaySinh: new Date("1999-07-05"),
//     //     Phai: "Nam",
//     //     DiaChi: "Hải Phòng",
//     //     DienThoai: "0922334455",
//     //   },
//     // ]);

//     console.log("✅ Dữ liệu mẫu đã được thêm thành công!");
//   } catch (error) {
//     console.log("❌ Lỗi khi thêm dữ liệu mẫu:", error);
//   } finally {
//     mongoose.connection.close(); // Đóng kết nối sau khi chèn dữ liệu xong
//   }
// };

// // Gọi hàm chèn dữ liệu
// insertSampleData();
