const { DocGia } = require("../models/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "your_secret_key"; // 🔑 Thay thế bằng key bảo mật thực tế

// 🛠 Hàm tạo mã độc giả tự động (DG001, DG002, ...)
async function generateMaDocGia() {
  const lastDocGia = await DocGia.aggregate([
    { $match: { MaDocGia: /^DG\d+$/ } },
    { $sort: { MaDocGia: -1 } },
    { $limit: 1 },
  ]);

  if (!lastDocGia.length) return "DG001";

  const lastNumber = parseInt(lastDocGia[0].MaDocGia.replace("DG", ""), 10);
  return `DG${(lastNumber + 1).toString().padStart(3, "0")}`;
}

// 🛠 Hàm chung để tạo độc giả
async function createDocGia(data) {
  const { HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai, Password } = data;

  if (
    !HoLot ||
    !Ten ||
    !NgaySinh ||
    !Phai ||
    !DiaChi ||
    !DienThoai ||
    !Password
  ) {
    throw new Error("Vui lòng nhập đầy đủ thông tin");
  }

  const existingPhone = await DocGia.findOne({ DienThoai });
  if (existingPhone) {
    throw new Error("Số điện thoại đã tồn tại");
  }

  const hashedPassword = await bcrypt.hash(Password, 10);
  const newMaDocGia = await generateMaDocGia();

  return new DocGia({
    MaDocGia: newMaDocGia,
    HoLot: HoLot.trim(),
    Ten: Ten.trim(),
    NgaySinh,
    Phai,
    DiaChi: DiaChi.trim(),
    DienThoai: DienThoai.trim(),
    Password: hashedPassword,
  });
}

// ✅ Lấy danh sách độc giả
exports.getAll = async (req, res) => {
  try {
    const data = await DocGia.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh sách độc giả", error });
  }
};

// ✅ Lấy độc giả theo mã
exports.getById = async (req, res) => {
  try {
    const { madocgia } = req.params;
    const data = await DocGia.findOne({ MaDocGia: madocgia });

    if (!data)
      return res.status(404).json({ message: "Không tìm thấy độc giả" });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy thông tin độc giả", error });
  }
};

// ✅ Thêm mới độc giả
exports.create = async (req, res) => {
  try {
    const newDocGia = await createDocGia(req.body);
    await newDocGia.save();
    res.status(201).json({ message: "Độc giả đã được thêm", newDocGia });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Đăng ký độc giả (dùng chung createDocGia)
exports.registerDocGia = async (req, res) => {
  try {
    console.log("Dữ liệu nhận từ frontend:", req.body); // 🔍 Debug ở đây
    const newDocGia = await createDocGia(req.body);
    await newDocGia.save();
    res.status(201).json({ message: "Đăng ký thành công!", newDocGia });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Đăng nhập độc giả
exports.loginDocGia = async (req, res) => {
  try {
    const { DienThoai, Password } = req.body;

    // Kiểm tra đầu vào
    if (!DienThoai || !Password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập số điện thoại và mật khẩu" });
    }

    // Tìm độc giả theo số điện thoại
    const docGia = await DocGia.findOne({ DienThoai });
    if (!docGia) {
      return res.status(404).json({ message: "Số điện thoại không tồn tại" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(Password, docGia.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không đúng" });
    }

    // Trả về thông tin đăng nhập thành công (có thể thêm JWT nếu cần)
    res.status(200).json({ message: "Đăng nhập thành công!", docGia });
  } catch (error) {
    res.status(500).json({ message: "Lỗi đăng nhập", error });
  }
};

// ✅ Cập nhật thông tin độc giả
exports.update = async (req, res) => {
  try {
    const { madocgia } = req.params;
    const updateData = req.body;

    if (updateData.Password) {
      updateData.Password = await bcrypt.hash(updateData.Password, 10);
    } else {
      delete updateData.Password;
    }

    const updatedDocGia = await DocGia.findOneAndUpdate(
      { MaDocGia: madocgia },
      updateData,
      { new: true }
    );

    if (!updatedDocGia)
      return res.status(404).json({ message: "Không tìm thấy độc giả" });

    res.json({ message: "Cập nhật thành công", updatedDocGia });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật độc giả", error });
  }
};

// ✅ Xóa độc giả
exports.delete = async (req, res) => {
  try {
    const { madocgia } = req.params;
    const deletedDocGia = await DocGia.findOneAndDelete({ MaDocGia: madocgia });

    if (!deletedDocGia)
      return res.status(404).json({ message: "Không tìm thấy độc giả" });

    res.json({ message: "Độc giả đã bị xóa", deletedDocGia });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa độc giả", error });
  }
};
