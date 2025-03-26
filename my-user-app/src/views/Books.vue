<template>
  <div class="books-container">
    <h1>📚 Danh sách Sách</h1>
    <div v-if="loading" class="loading">⏳ Đang tải sách...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="book-list">
      <div v-for="book in books" :key="book.MaSach" class="book-card">
        <h3>{{ book.TenSach }}</h3>
        <p><strong>🖊 Tác giả:</strong> {{ book.TacGia }}</p>
        <p><strong>📅 Năm xuất bản:</strong> {{ book.NamXuatBan }}</p>
        <p><strong>🏢 Nhà xuất bản:</strong> {{ book.MaNXB.TenNXB }}</p>
        <p><strong>💰 Giá:</strong> {{ book.DonGia.toLocaleString() }} VND</p>
        <p><strong>📦 Số lượng:</strong> {{ book.SoQuyen }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      books: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:5000/api/sach");
      this.books = response.data;
    } catch (err) {
      this.error = "❌ Lỗi khi tải sách!";
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
/* Giao diện tổng thể */
.books-container {
  text-align: center;
  padding: 30px;
  background: #f4f4f9;
  min-height: 100vh;
}

/* Loading & Error */
.loading,
.error {
  font-size: 18px;
  font-weight: bold;
  color: red;
}

/* Bố cục danh sách sách */
.book-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* Hiển thị mỗi hàng 5 khung */
  gap: 25px;
  margin-top: 20px;
}

/* Thẻ sách */
.book-card {
  /* background: white; */
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ddd; /* Thêm viền cho thẻ sách */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  border-color: #077966;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-color: #37755d; /* Thêm hiệu ứng hover viền màu */
  background-color: #c1d8cf
}

/* Thông tin sách */
.book-card h3 {
  font-size: 23px;
  color: #000000;
  margin-bottom: 8px;
}

.book-card p {
  font-size: 16px;
  color: #302f2f;
  margin: 5px 0;
}

/* Nút Mượn Sách */
.borrow-button {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 12px;
  background: #007bff;
  /* color: white; */
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background 0.3s;
}

.borrow-button:hover {
  background: #37755d;
  background-color: #a5ccbe;
  font-weight: bold;
}

</style>
