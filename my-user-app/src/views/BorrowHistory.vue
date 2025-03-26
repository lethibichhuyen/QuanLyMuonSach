<template>
  <div class="borrow-history-container">
    <h1>Lịch sử mượn sách</h1>

    <!-- Trạng thái tải -->
    <div v-if="loading">Đang tải dữ liệu...</div>

    <!-- Bảng hiển thị lịch sử mượn sách -->
    <div v-else>
      <!-- Nếu có lịch sử mượn sách -->
      <table v-if="borrowHistory.length">
        <thead>
          <tr>
            <th>Tên sách</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in borrowHistory" :key="index">
            <td>{{ record.MaSach.TenSach }}</td>
            <!-- Hiển thị tên sách -->
            <td>{{ formatDate(record.NgayMuon) }}</td>
            <!-- Hiển thị ngày mượn -->
            <td>{{ formatDate(record.NgayTra) }}</td>
            <!-- Hiển thị ngày trả -->
            <td>{{ record.TrangThai }}</td>
            <!-- Hiển thị trạng thái mượn -->
          </tr>
        </tbody>
      </table>
      <!-- Nếu không có lịch sử mượn sách -->
      <div v-else>Không có lịch sử mượn sách.</div>
    </div>

    <!-- Hiển thị thông báo lỗi nếu có -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      borrowHistory: [], // Lịch sử mượn sách
      loading: false, // Trạng thái tải dữ liệu
      errorMessage: "", // Lỗi nếu có khi tải dữ liệu
    };
  },
  mounted() {
    this.fetchBorrowHistory();
  },
  methods: {
    async fetchBorrowHistory() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.MaDocGia) {
        this.errorMessage = "Không tìm thấy thông tin người dùng!";
        return; // Nếu không có thông tin người dùng, không tải lịch sử
      }

      this.loading = true;
      try {
        // Gọi API để lấy lịch sử mượn sách của người dùng
        const response = await axios.get(
          `http://localhost:5000/api/lich-su-muon-sach/${user.MaDocGia}`
        );
        if (response.data.length === 0) {
          this.errorMessage = "Không có lịch sử mượn sách!";
        } else {
          this.borrowHistory = response.data;
        }
      } catch (error) {
        console.error("Lỗi khi tải lịch sử mượn sách:", error);
        this.errorMessage = "Có lỗi xảy ra khi tải lịch sử mượn sách!";
      } finally {
        this.loading = false;
      }
    },

    // Hàm format ngày
    formatDate(date) {
      const d = new Date(date);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    },
  },
};
</script>

<style scoped>
.borrow-history-container {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}

th {
  background-color: #f4f4f4;
}

td {
  background-color: #f9f9f9;
}

.error-message {
  color: red;
  margin-top: 20px;
}
</style>
