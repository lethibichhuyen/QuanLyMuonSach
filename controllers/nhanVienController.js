const { NhanVien } = require("../models/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 🆕 Lấy mã nhân viên mới tự động (NV001, NV002...)
async function generateMSNV() {
  const lastEmployee = await NhanVien.findOne().sort({ MSNV: -1 });

  if (!lastEmployee) return "NV001"; // Nếu chưa có nhân viên nào

  const lastNumber = parseInt(lastEmployee.MSNV.replace("NV", ""), 10);
  const newNumber = (lastNumber + 1).toString().padStart(3, "0");

  return `NV${newNumber}`;
}

// ✅ Lấy danh sách nhân viên
exports.getAll = async (req, res) => {
  try {
    const data = await NhanVien.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh sách nhân viên", error });
  }
};

// ✅ Lấy nhân viên theo MSNV
exports.getById = async (req, res) => {
  try {
    const data = await NhanVien.findOne({ MSNV: req.params.msnv });
    if (!data)
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy thông tin nhân viên", error });
  }
};

// ✅ Thêm nhân viên (Mã tự động, Mật khẩu mã hóa)
exports.create = async (req, res) => {
  try {
    const { HoTenNV, Password, ChucVu, DiaChi, SoDienThoai } = req.body;
    if (!HoTenNV || !Password || !ChucVu || !DiaChi || !SoDienThoai) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const newMSNV = await generateMSNV();

    const newNhanVien = new NhanVien({
      MSNV: newMSNV,
      HoTenNV,
      Password: hashedPassword,
      ChucVu,
      DiaChi,
      SoDienThoai,
    });

    await newNhanVien.save();
    res.status(201).json({ message: "Nhân viên đã được thêm", newNhanVien });
  } catch (error) {
    res.status(500).json({ message: "Lỗi thêm nhân viên", error });
  }
};

// ✅ Cập nhật nhân viên (Có kiểm tra mật khẩu)
exports.update = async (req, res) => {
  try {
    const { msnv } = req.params;
    const updateData = req.body;

    if (updateData.Password) {
      updateData.Password = await bcrypt.hash(updateData.Password, 10);
    }

    const updatedNhanVien = await NhanVien.findOneAndUpdate(
      { MSNV: msnv },
      updateData,
      { new: true }
    );

    if (!updatedNhanVien) {
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    }

    res.json({ message: "Cập nhật thành công", updatedNhanVien });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật nhân viên", error });
  }
};

// ✅ Xóa nhân viên
exports.delete = async (req, res) => {
  try {
    const { msnv } = req.params;
    const deletedNhanVien = await NhanVien.findOneAndDelete({ MSNV: msnv });

    if (!deletedNhanVien) {
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    }

    res.json({ message: "Nhân viên đã bị xóa", deletedNhanVien });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa nhân viên", error });
  }
};

//✅ Đăng nhập nhân viên
exports.login = async (req, res) => {
  try {
    const { MSNV, Password } = req.body;

    if (!MSNV || !Password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    const nhanVien = await NhanVien.findOne({ MSNV });

    if (!nhanVien) {
      return res.status(404).json({ message: "Mã số nhân viên không tồn tại" });
    }

    const isMatch = await bcrypt.compare(Password, nhanVien.Password);

    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không chính xác" });
    }

    // Kiểm tra xem có tồn tại khóa bí mật trong biến môi trường không
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      return res
        .status(500)
        .json({ message: "Khóa bí mật chưa được cấu hình" });
    }

    const token = jwt.sign(
      { MSNV: nhanVien.MSNV, HoTenNV: nhanVien.HoTenNV },
      secretKey,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Đăng nhập thành công",
      nhanVien: {
        MSNV: nhanVien.MSNV,
        HoTenNV: nhanVien.HoTenNV,
        ChucVu: nhanVien.ChucVu,
        SoDienThoai: nhanVien.SoDienThoai,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi đăng nhập, vui lòng thử lại sau." });
  }
};
exports.getMe = async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Bạn chưa đăng nhập" });
    }

    const token = authHeader.replace("Bearer ", "");
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      return res
        .status(500)
        .json({ message: "Khóa bí mật chưa được cấu hình" });
    }

    const decoded = jwt.verify(token, secretKey);
    const nhanVien = await NhanVien.findOne({ MSNV: decoded.MSNV });

    if (!nhanVien) {
      return res.status(404).json({ message: "Nhân viên không tồn tại" });
    }

    res.json({
      MSNV: nhanVien.MSNV,
      HoTenNV: nhanVien.HoTenNV,
      ChucVu: nhanVien.ChucVu,
      SoDienThoai: nhanVien.SoDienThoai,
    });
  } catch (error) {
    res.status(401).json({ message: "Phiên đăng nhập không hợp lệ", error });
  }
};
