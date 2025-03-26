const { Sach, TheoDoiMuonSach, DocGia } = require("../models/model");
const jwt = require("jsonwebtoken");

exports.borrowBook = async (req, res) => {
  console.log("📥 Dữ liệu nhận được:", req.body); // Debug

  const { MaDocGia, MaSach } = req.body;
  if (!MaDocGia || !MaSach) {
    return res.status(400).json({ message: "Thiếu mã độc giả hoặc mã sách!" });
  }

  try {
    // 🔹 Kiểm tra độc giả tồn tại
    const docGia = await DocGia.findOne({ MaDocGia });
    if (!docGia) {
      return res.status(400).json({ message: "Độc giả không tồn tại!" });
    }

    // 🔹 Kiểm tra sách có sẵn không
    const sach = await Sach.findOne({ MaSach });
    if (!sach || sach.SoQuyen <= 0) {
      return res.status(400).json({ message: "Sách này hiện không có sẵn!" });
    }

    // 🔹 Tạo bản ghi mượn sách
    const ngayMuon = new Date();
    const ngayTra = new Date();
    ngayTra.setDate(ngayMuon.getDate() + 7); // 7 ngày

    const newBorrow = new TheoDoiMuonSach({
      MaDocGia,
      MaSach,
      NgayMuon: ngayMuon,
      NgayTra: ngayTra,
      TrangThai: "Đang mượn", // Mặc định trạng thái là đang mượn
    });

    await newBorrow.save();

    // 🔹 Giảm số lượng sách
    await Sach.updateOne({ MaSach }, { $inc: { SoQuyen: -1 } });

    res.json({ message: "Mượn sách thành công!", ngayTra });
  } catch (error) {
    console.error("❌ Lỗi khi mượn sách:", error);
    res.status(500).json({ message: "Lỗi mượn sách!", error: error.message });
  }
};

// 📌 Lấy danh sách mượn sách
exports.getBorrowList = async (req, res) => {
  try {
    const borrowList = await TheoDoiMuonSach.find()
      .populate("MaDocGia", "TenDocGia") // Lấy tên độc giả
      .populate("MaSach", "TenSach") // Lấy tên sách
      .sort({ NgayMuon: -1 }); // Sắp xếp theo ngày mượn (mới nhất trước)

    res.json(borrowList);
  } catch (error) {
    console.error("❌ Lỗi lấy danh sách mượn sách:", error);
    res.status(500).json({ message: "Lỗi lấy danh sách mượn sách!" });
  }
};

// 📌 Xóa thông tin mượn sách
exports.deleteBorrow = async (req, res) => {
  const { id } = req.params;

  try {
    const borrow = await TheoDoiMuonSach.findById(id);
    if (!borrow) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin mượn sách!" });
    }

    // ❌ Không cập nhật số lượng sách ở đây nữa
    // Nếu sách đã trả, số lượng đã tăng trong `returnBook`, không cần tăng lại khi xóa

    // Xóa bản ghi
    await TheoDoiMuonSach.findByIdAndDelete(id);

    res.json({ message: "Xóa thành công!" });
  } catch (error) {
    console.error("❌ Lỗi khi xóa thông tin mượn sách:", error);
    res.status(500).json({ message: "Lỗi khi xóa thông tin mượn sách!" });
  }
};

exports.returnBook = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Thiếu ID mượn sách!" });
  }

  try {
    const borrow = await TheoDoiMuonSach.findById(id);
    if (!borrow) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bản ghi mượn sách!" });
    }

    if (borrow.TrangThai === "Trả rồi") {
      return res
        .status(400)
        .json({ message: "Sách này đã được trả trước đó!" });
    }

    // Cập nhật trạng thái trả sách
    borrow.TrangThai = "Trả rồi";
    borrow.NgayTra = new Date();
    await borrow.save();

    // 📌 Chỉ tăng số lượng sách khi sách chưa được trả
    await Sach.updateOne({ MaSach: borrow.MaSach }, { $inc: { SoQuyen: 1 } });

    res.json({
      message: "Cập nhật trạng thái thành công và số lượng sách đã tăng!",
      borrow,
    });
  } catch (error) {
    console.error("❌ Lỗi cập nhật trạng thái:", error);
    res.status(500).json({ message: "Lỗi cập nhật trạng thái!" });
  }
};

