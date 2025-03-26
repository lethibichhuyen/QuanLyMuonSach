<template>
  <div class="login-container">
    <div class="login-form">
      <h2>ĐĂNG NHẬP</h2>
      <form @submit.prevent="login">
        <input
          v-model="DienThoai"
          type="text"
          placeholder="Số điện thoại"
          required
          autocomplete="off"
        />
        <input
          v-model="Password"
          type="password"
          placeholder="Mật khẩu"
          required
          autocomplete="new-password"
        />
        <span v-if="loginError" class="error">{{ loginError }}</span>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      DienThoai: "",
      Password: "",
      loginError: "",
    };
  },
  methods: {
    async login() {
      this.loginError = ""; // Xóa lỗi trước khi gửi request
      try {
        const response = await axios.post(
          "http://localhost:5000/api/doc-gia/login",
          {
            DienThoai: this.DienThoai,
            Password: this.Password,
          }
        );

        console.log("Phản hồi từ server:", response.data); // Debug phản hồi từ API

        // Kiểm tra điều kiện đúng với API
        if (
          response.data.message &&
          response.data.message.includes("Đăng nhập thành công")
        ) {
          alert("Đăng nhập thành công!");

          // Lưu thông tin đăng nhập vào LocalStorage hoặc Vuex (nếu cần)
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.docGia));

          // Chuyển hướng đến trang dashboard
          this.$router.push("/");
        } else {
          this.loginError = "Sai số điện thoại hoặc mật khẩu!";
        }
      } catch (error) {
        console.error("Lỗi API:", error);
        this.loginError = "Lỗi máy chủ, vui lòng thử lại!";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* background: linear-gradient(to right, #74ebd5, #acb6e5); */
  background: url('E:\BICHHUYEN\QLMS\images\nen2.jpg');
}

.login-form {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 380px;
  text-align: center;
  background: linear-gradient(to right, #74ebd5, #acb6e5);
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font: 20px "Arial", sans-serif;
  font-weight: bold;
}

input {
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 90%;
  transition: border 0.3s ease;
}

input:focus {
  border-color: #063d31;
  outline: none;
}

button {
  background: #007bff;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #0056b3;
}

.error {
  color: red;
  font-size: 12px;
  text-align: left;
  margin-bottom: 5px;
}
</style>
