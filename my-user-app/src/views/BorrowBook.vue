<template>
  <div class="borrow-book-container">
    <div v-if="loading">Đang xử lý...</div>
    <div v-else class="form-container">
      <input v-model="userName" disabled />
      <input v-model="bookName" placeholder="Nhập tên sách" />
      <button @click="borrowBook" :disabled="!userId || !bookName">
        Mượn sách
      </button>
      <div v-if="message" :class="messageClass">{{ message }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userId: "", // Mã độc giả (ẩn, chỉ dùng để xử lý)
      userName: "", // Tên độc giả hiển thị
      bookName: "", // Tên sách nhập vào
      loading: false,
      message: null,
      messageClass: "",
    };
  },
  mounted() {
    // Lấy thông tin độc giả từ localStorage (hoặc từ API nếu cần)
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.userId = user.MaDocGia; // Lưu mã độc giả để xử lý
      this.userName = user.Ten; // Hiển thị tên độc giả
    }
  },
  methods: {
    async borrowBook() {
      if (!this.userId || !this.bookName) {
        this.message = "Vui lòng nhập tên sách!";
        this.messageClass = "error";
        return;
      }

      this.loading = true;
      this.message = null;

      try {
        // Gọi API để lấy danh sách sách
        const bookResponse = await axios.get("http://localhost:5000/api/sach");

        // Lọc sách theo tên
        const books = bookResponse.data;
        const book = books.find(
          (b) => b.TenSach.toLowerCase() === this.bookName.toLowerCase()
        );

        if (!book) {
          throw new Error("Không tìm thấy sách!");
        }

        const bookId = book.MaSach;

        // Gửi yêu cầu mượn sách
        const response = await axios.post(
          "http://localhost:5000/api/theo-doi-muon-sach",
          {
            MaDocGia: this.userId, // Vẫn cần gửi mã độc giả để xử lý
            MaSach: bookId,
            NgayMuon: new Date().toISOString().split("T")[0], // YYYY-MM-DD
            NgayTra: new Date(new Date().setDate(new Date().getDate() + 14))
              .toISOString()
              .split("T")[0], // Trả sau 14 ngày
          }
        );

        this.message = response.data.message || "Mượn sách thành công!";
        this.messageClass = "success";
        this.bookName = "";
      } catch (err) {
        this.message =
          err.response?.data?.message || "Lỗi! Không thể mượn sách.";
        this.messageClass = "error";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.borrow-book-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f4f9;
  margin: 0;
  background: url('E:\BICHHUYEN\QLMS\images\nen2.jpg');
}

/* Bố cục form */
.form-container {
  background: linear-gradient(to right, #74ebd5, #acb6e5);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  
}

/* Các input */
input {
  display: block;
  margin-bottom: 20px;
  padding: 12px 15px;
  width: 90%;
  border: 1px solid #cccccc;
  border-radius: 8px;
  font-size: 18px;
  background: #fafafa;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  border-color: #077966;
}

input:focus {
  border-color: #077966;
  box-shadow: 0 0 5px rgba(0, 77, 64, 0.2);
}

input[disabled] {
  background: #fffdda;
  color: #082c24;
  border-color: #077966;
}


/* Nút Mượn Sách */
button {
  display: inline-block;
  width: 100%;
  padding: 12px 15px;
  background: #004d40;
  color: white;
  font-size: 16px;
  /* border: none; */
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
  border-color: #050505;
}

button:hover {
  background: #00796b;
}

button:disabled {
  background: #888888;
  cursor: not-allowed;
}

/* Thông báo thành công hoặc lỗi */
.success {
  color: green;
  font-weight: bold;
  margin-top: 15px;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 15px;
}

/* Tăng độ hấp dẫn của form */
h1 {
  font-size: 30px;
  color: #004d40;
  font-weight: bold;
  margin-bottom: 20px;
}

</style>
