const mongoose = require("mongoose");
const { Sach, NhaXuatBan } = require("../models/model");

// 📌 Lấy tất cả sách
exports.getAll = async (req, res) => {
  try {
    const data = await Sach.find().populate("MaNXB", "MaNXB TenNXB");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh sách sách", error });
  }
};

// 📌 Lấy sách theo ID
exports.getById = async (req, res) => {
  try {
    const data = await Sach.findById(req.params.id).populate(
      "MaNXB",
      "MaNXB TenNXB"
    );
    if (!data) {
      return res.status(404).json({ message: "Không tìm thấy sách" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy sách", error });
  }
};

// 📌 Tạo sách mới
exports.create = async (req, res) => {
  try {
    console.log("📌 Dữ liệu nhận từ frontend:", req.body);

    const { TenSach, TacGia, DonGia, SoQuyen, NamXuatBan, MaNXB } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!TenSach || !TacGia || !DonGia || !SoQuyen || !NamXuatBan || !MaNXB) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    // Tìm nhà xuất bản bằng `MaNXB`
    const nxb = await NhaXuatBan.findOne({ MaNXB });
    if (!nxb) {
      return res
        .status(400)
        .json({ message: `Nhà xuất bản với MaNXB: ${MaNXB} không tồn tại!` });
    }

    // Tạo mã sách tự động
    const lastBook = await Sach.findOne().sort({ MaSach: -1 }).select("MaSach");
    let newMaSach = "S001";
    if (lastBook && lastBook.MaSach) {
      const lastNumber = parseInt(lastBook.MaSach.slice(1), 10);
      newMaSach = `S${String(lastNumber + 1).padStart(3, "0")}`;
    }

    // Tạo sách mới
    const newSach = new Sach({
      MaSach: newMaSach,
      TenSach,
      TacGia,
      DonGia,
      SoQuyen,
      NamXuatBan,
      MaNXB: nxb._id,
    });

    const data = await newSach.save();
    console.log("✅ Sách đã lưu:", data);
    res.status(201).json(data);
  } catch (error) {
    console.error("❌ Lỗi tạo sách:", error);
    res.status(500).json({ message: "Lỗi tạo sách", error: error.message });
  }
};

// 📌 Cập nhật sách
exports.update = async (req, res) => {
  try {
    console.log("📌 Dữ liệu cập nhật:", req.body);

    let updatedData = { ...req.body };

    if (req.body.MaNXB) {
      const nxb = await NhaXuatBan.findOne({ MaNXB: req.body.MaNXB });
      if (!nxb) {
        return res.status(400).json({
          message: `Nhà xuất bản với MaNXB: ${req.body.MaNXB} không tồn tại`,
        });
      }
      updatedData.MaNXB = nxb._id;
    }

    const data = await Sach.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    }).populate("MaNXB", "MaNXB TenNXB");

    if (!data) {
      return res.status(404).json({ message: "Không tìm thấy sách" });
    }

    res.json(data);
  } catch (error) {
    console.error("❌ Lỗi cập nhật sách:", error);
    res
      .status(500)
      .json({ message: "Lỗi cập nhật sách", error: error.message });
  }
};

// 📌 Xóa sách
exports.delete = async (req, res) => {
  try {
    const sach = await Sach.findById(req.params.id);
    if (!sach) {
      return res.status(404).json({ message: "Không tìm thấy sách để xóa" });
    }

    await Sach.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa sách thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa sách", error });
  }
};
