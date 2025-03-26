<template>
  <div class="register-container">
    <div class="register-form">
      <h2>Đăng ký</h2>
      <form @submit.prevent="register" autocomplete="off">
        <div class="form-group">
          <input
            v-model="HoLot"
            placeholder="Họ lót"
            required
            autocomplete="off"
          />
          <input v-model="Ten" placeholder="Tên" required autocomplete="off" />
        </div>

        <input v-model="NgaySinh" type="date" required autocomplete="off" />

        <select v-model="Phai">
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>

        <input
          v-model="DiaChi"
          placeholder="Địa chỉ"
          required
          autocomplete="off"
        />

        <input
          v-model="DienThoai"
          placeholder="Số điện thoại"
          required
          @blur="validatePhone"
          autocomplete="new-password"
          readonly
          @focus="removeReadonly"
        />
        <span v-if="phoneError" class="error">{{ phoneError }}</span>

        <input
          v-model="Password"
          type="password"
          placeholder="Mật khẩu"
          required
          @blur="validatePassword"
          autocomplete="new-password"
          readonly
          @focus="removeReadonly"
        />
        <span v-if="passwordError" class="error">{{ passwordError }}</span>

        <button type="submit">Đăng ký</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      HoLot: "",
      Ten: "",
      NgaySinh: "",
      Phai: "Nam",
      DiaChi: "",
      DienThoai: "",
      Password: "",
      phoneError: "",
      passwordError: "",
    };
  },
  mounted() {
    this.resetForm();
  },
  methods: {
    async register() {
      if (!this.DienThoai || !this.Password) {
        this.validatePhone();
        this.validatePassword();
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/doc-gia/register",
          {
            HoLot: this.HoLot,
            Ten: this.Ten,
            NgaySinh: this.NgaySinh,
            Phai: this.Phai,
            DiaChi: this.DiaChi,
            DienThoai: this.DienThoai,
            Password: this.Password,
          }
        );

        alert(response.data.message);
        this.resetForm();
      } catch (error) {
        alert(
          "Đăng ký thất bại: " +
            (error.response?.data?.message || "Lỗi không xác định")
        );
      }
    },

    validatePhone() {
      const phonePattern = /^[0-9]{10}$/;
      this.phoneError = !this.DienThoai.match(phonePattern)
        ? "Số điện thoại không hợp lệ!"
        : "";
    },

    validatePassword() {
      this.passwordError =
        this.Password.length < 6 ? "Mật khẩu phải có ít nhất 6 ký tự!" : "";
    },

    resetForm() {
      this.HoLot = "";
      this.Ten = "";
      this.NgaySinh = "";
      this.Phai = "Nam";
      this.DiaChi = "";
      this.DienThoai = "";
      this.Password = "";
      this.phoneError = "";
      this.passwordError = "";
    },

    removeReadonly(event) {
      event.target.removeAttribute("readonly");
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('E:\BICHHUYEN\QLMS\images\nen2.jpg');
  /* background: linear-gradient(to right, #74ebd5, #acb6e5); */
}

.register-form {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 380px;
  text-align: center;
  background: linear-gradient(to right, #74ebd5, #acb6e5)
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  gap: 10px;
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


select {
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 97%;
  transition: border 0.3s ease;
}
input:focus,
select:focus {
  border-color: #007bff;
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
  text-align: center;
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
