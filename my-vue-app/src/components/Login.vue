<template>
  <div class="login-container">
    <h2>ĐĂNG NHẬP</h2>
    <form @submit.prevent="login">
      <label for="msnv">Mã số nhân viên:</label>
      <input type="text" v-model="msnv" id="msnv" required autofocus />

      <label for="password">Mật khẩu:</label>
      <div class="password-container">
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          id="password"
          required
        />
        <span class="toggle-password" @click="showPassword = !showPassword">
          {{ showPassword ? "👁️" : "👁️‍🗨️" }}
        </span>
      </div>

      <button type="submit" :disabled="loading">
        <span v-if="!loading">Đăng nhập</span>
        <span v-else class="spinner"></span>
      </button>
    </form>

    <!-- Hiển thị thông báo lỗi -->
    <div v-if="errorMessage" class="error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      msnv: "",
      password: "",
      errorMessage: "",
      loading: false,
      showPassword: false, // Toggle hiển thị mật khẩu
    };
  },
  methods: {
    async login() {
      this.errorMessage = "";
      this.loading = true;

      try {
        const response = await axios.post(
          "http://localhost:5000/api/nhan-vien/login",
          {
            MSNV: this.msnv,
            Password: this.password,
          }
        );

        console.log("Response từ API:", response.data); // Kiểm tra dữ liệu API trả về

        if (response.data.token && response.data.nhanVien) {
          // Lưu thông tin vào localStorage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("MSNV", response.data.nhanVien.MSNV);
          localStorage.setItem("HoTenNV", response.data.nhanVien.HoTenNV);
          localStorage.setItem("ChucVu", response.data.nhanVien.ChucVu);

          this.$router.push("/dashboard"); // Điều hướng đến trang chính
        } else {
          this.errorMessage =
            "Lỗi: Không nhận được thông tin nhân viên từ server.";
        }
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Lỗi kết nối đến máy chủ!";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Căn chỉnh form đẹp và to hơn */
.login-container {
  max-width: 500px; /* Tăng chiều rộng */
  margin: 80px auto; /* Tăng khoảng cách từ trên xuống */
  padding: 40px;
  border-radius: 12px;
  background-color: #93bbaf;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
}

h2 {
  text-align: center;
  margin-bottom: 30px; /* Tăng khoảng cách dưới tiêu đề */
  font-family: 'Arial', sans-serif;
  color: #333;
  font-weight: bold;
  
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 12px; /* Tăng khoảng cách giữa label và input */
  color: #333;
  font-size: 18px; /* Tăng kích thước font chữ */
}

input {
  width: 100%; /* Đảm bảo input chiếm toàn bộ chiều rộng */
  padding: 15px; /* Tăng kích thước padding */
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 25px; /* Tăng khoảng cách dưới input */
  font-size: 18px; /* Tăng kích thước chữ trong input */
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #28a745;
  outline: none;
}

/* Hiển thị toggle mật khẩu */
.password-container {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 24px; /* Tăng kích thước icon */
  color: #007bff;
}

/* Nút đăng nhập */
button {
  width: 100%;
  padding: 20px; /* Tăng padding nút */
  background-color: #1b6634;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px; /* Tăng kích thước chữ nút */
  font-weight: bold;
  transition: 0.3s;
  margin-top: 20px; /* Tăng khoảng cách giữa nút và input */
}

button:hover {
  background-color: #dd9222;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Spinner khi loading */
.spinner {
  display: inline-block;
  width: 24px; /* Tăng kích thước spinner */
  height: 24px;
  border: 3px solid white;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Hiển thị lỗi */
.error {
  color: red;
  font-size: 18px; /* Tăng kích thước chữ lỗi */
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
}
</style>
