<template>
  <div class="account-container">
    <h2><i class="fas fa-user-circle"></i>ADMIN</h2>

    <!-- Kiểm tra nếu có thông tin nhân viên thì hiển thị -->
    <div v-if="user && user.MSNV" class="account-info">
      <p><i class="fas fa-id-badge"></i><strong>Mã số nhân viên:</strong> {{ user.MSNV }}</p>
      <p><i class="fas fa-user"></i><strong>Họ tên:</strong> {{ user.HoTenNV }}</p>
      <p><strong>🛠️ Chức vụ:</strong> {{ user.ChucVu }}</p>
      <p><strong>📞Số điện thoại:</strong> {{ user.SoDienThoai }}</p>
    </div>

    <!-- Nếu chưa có dữ liệu nhân viên, hiển thị thông báo -->
    <p v-else class="error">Không thể tải thông tin tài khoản.</p>

    <!-- Đăng xuất -->
    <button class="logout" @click="logout">Đăng xuất</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null, // Chứa thông tin nhân viên
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      errorMessage: "",
      successMessage: "",
      loading: false,
    };
  },
  mounted() {
    this.getUserInfo(); // Lấy thông tin nhân viên khi vào trang
  },
  methods: {
    async getUserInfo() {
      try {
        const token = localStorage.getItem("token");
        const msnv = localStorage.getItem("MSNV"); // Lấy MSNV từ localStorage

        if (!token || !msnv) {
          console.warn("Không có token hoặc MSNV! Điều hướng về login.");
          return this.$router.push("/login");
        }

        const response = await axios.get(
          "http://localhost:5000/api/nhan-vien",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Dữ liệu API trả về:", response.data);

        if (Array.isArray(response.data)) {
          // Tìm nhân viên có MSNV khớp với người đang đăng nhập
          this.user = response.data.find((nv) => nv.MSNV === msnv) || null;
        }

        if (!this.user) {
          console.warn("Không tìm thấy nhân viên với MSNV:", msnv);
          this.$router.push("/login");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin nhân viên:", error);
        this.$router.push("/login");
      }
    },

    async changePassword() {
      this.errorMessage = "";
      this.successMessage = "";
      this.loading = true;

      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Mật khẩu xác nhận không khớp!";
        this.loading = false;
        return;
      }

      try {
        const token = localStorage.getItem("token");
        await axios.post(
          "http://localhost:5000/api/nhan-vien/change-password",
          {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        this.successMessage = "Cập nhật mật khẩu thành công!";
        this.oldPassword = "";
        this.newPassword = "";
        this.confirmPassword = "";
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Có lỗi xảy ra khi đổi mật khẩu!";
      } finally {
        this.loading = false;
      }
    },

    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
.account-container {
  max-width: 450px;
  margin: 50px auto;
  padding: 25px;
  border-radius: 12px;
  background: rgba(115, 177, 156, 0.95);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  text-align: center;
}

h2 {
  font-size: 23px;
  color: #1d1c1c;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

h2::before {
  
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #007bff;
  font-size: 24px;
}

.account-info {
  text-align: left;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: inset 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.account-info p {
  font-size: 16px;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.account-info p::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #007bff;
}

.error {
  color: red;
  font-size: 15px;
  font-weight: bold;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}


button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

button.logout {
  background-color: #dc3545;
}

button.logout:hover {
  background-color: #b52b3a;

}
</style>
