const { NhaXuatBan } = require("../models/model.js"); // ✅ Import NXB đúng cách

// Hàm lấy danh sách nhà xuất bản
exports.getAll = async (req, res) => {
  try {
    const data = await NhaXuatBan.find(); // 👈 Sử dụng NXB.find()
    res.json(data);
  } catch (error) {
    console.error("❌ Lỗi lấy danh sách nhà xuất bản:", error);
    res.status(500).json({
      message: "Lỗi lấy danh sách nhà xuất bản",
      error: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    // Populate để lấy thông tin MaNXB từ bảng NXB
    const data = await Sach.findById(req.params.id).populate("MaNXB", "MaNXB");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy sách", error });
  }
};

exports.create = async (req, res) => {
  try {
    console.log("📌 Dữ liệu nhận từ frontend:", req.body);

    if (!req.body.TenNXB || !req.body.DiaChi) {
      return res.status(400).json({ message: "Thiếu thông tin nhà xuất bản" });
    }

    // 🔹 Lấy mã NXB lớn nhất
    const lastNXB = await NhaXuatBan.findOne().sort({ MaNXB: -1 });

    let newMaNXB = "NXB01"; // Nếu database chưa có dữ liệu

    if (lastNXB && lastNXB.MaNXB) {
      // Lấy số cuối cùng của MaNXB (VD: "NXB12" => 12)
      const lastNumber = parseInt(lastNXB.MaNXB.replace("NXB", ""), 10);
      newMaNXB = `NXB${String(lastNumber + 1).padStart(2, "0")}`; // Tăng số lên 1
    }

    // Tạo mới Nhà Xuất Bản
    const newNXB = new NhaXuatBan({
      MaNXB: newMaNXB,
      TenNXB: req.body.TenNXB,
      DiaChi: req.body.DiaChi,
    });

    await newNXB.save();
    res.status(201).json(newNXB);
  } catch (error) {
    console.error("❌ Lỗi khi tạo nhà xuất bản:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    console.log("📌 Dữ liệu nhận từ frontend:", req.body);

    // Kiểm tra xem nhà xuất bản có tồn tại không
    const nxb = await NhaXuatBan.findById(req.params.id);
    if (!nxb) {
      return res.status(404).json({ message: "Nhà xuất bản không tồn tại" });
    }

    // Cập nhật thông tin nhà xuất bản
    const updatedNXB = await NhaXuatBan.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Trả về dữ liệu sau khi cập nhật
        runValidators: true, // Kiểm tra validation
      }
    );

    res.json(updatedNXB);
  } catch (error) {
    console.error("❌ Lỗi cập nhật nhà xuất bản:", error);
    res
      .status(500)
      .json({ message: "Lỗi cập nhật nhà xuất bản", error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await NhaXuatBan.findByIdAndDelete(req.params.id);
    res.json({ message: "Xóa NXB thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa nhà xuất bản", error });
  }
};
