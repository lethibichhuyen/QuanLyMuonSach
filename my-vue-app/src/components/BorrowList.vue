<template>
  <div class="borrow-list-container">
    <!-- <h1>Quản Lý Mượn Sách</h1> -->
    <div v-if="loading" class="loading">Đang tải danh sách...</div>
    <div v-else-if="borrowList.length === 0" class="no-data">
      Không có dữ liệu.
    </div>
    <table v-else>
      <thead>
        <tr>
          <th>Mã Độc Giả</th>
          <th>Tên Độc Giả</th>
          <th>Mã Sách</th>
          <th>Tên Sách</th>
          <th>Ngày Mượn</th>
          <th>Ngày Trả</th>
          <th>Trạng Thái</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="borrow in borrowList" :key="borrow._id">
          <td>{{ borrow.MaDocGia }}</td>
          <td>{{ findReaderName(borrow.MaDocGia) }}</td>
          <td>{{ borrow.MaSach }}</td>
          <td>{{ findBookName(borrow.MaSach) }}</td>
          <td>{{ formatDate(borrow.NgayMuon) }}</td>
          <td>{{ formatDate(borrow.NgayTra) }}</td>
          <td
            :class="borrow.status === 'Trả rồi' ? 'returned' : 'not-returned'"
          >
            {{ getStatus(borrow.status) }}
          </td>
          <td>
            <button
              v-if="borrow.status !== 'Trả rồi'"
              @click="updateStatus(borrow._id)"
              class="update-btn"
            >
              Cập nhật
            </button>
            <button @click="deleteBorrow(borrow._id)" class="delete-btn">
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      borrowList: [],
      readers: {},
      books: {},
      loading: true,
    };
  },
  async created() {
    try {
      const [borrowRes, readersRes, booksRes] = await Promise.all([
        axios.get("http://localhost:5000/api/theo-doi-muon-sach"),
        axios.get("http://localhost:5000/api/doc-gia"),
        axios.get("http://localhost:5000/api/sach"),
      ]);
      this.borrowList = borrowRes.data;
      this.readers = Object.fromEntries(
        readersRes.data.map((reader) => [reader.MaDocGia, reader.Ten])
      );
      this.books = Object.fromEntries(
        booksRes.data.map((book) => [book.MaSach, book.TenSach])
      );
    } catch (error) {
      console.error("❌ Lỗi tải dữ liệu:", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    formatDate(date) {
      return date
        ? new Date(date).toLocaleDateString("vi-VN")
        : "Không có dữ liệu";
    },
    findReaderName(maDocGia) {
      return this.readers[maDocGia] || "Chưa cập nhật";
    },
    findBookName(maSach) {
      return this.books[maSach] || "Chưa cập nhật";
    },
    getStatus(status) {
      return status === "Trả rồi" ? "Trả rồi" : "Chưa trả";
    },
    async updateStatus(id) {
      if (confirm("Xác nhận cập nhật trạng thái trả sách?")) {
        try {
          await axios.patch(
            "http://localhost:5000/api/theo-doi-muon-sach/return",
            { id }
          );
          const borrow = this.borrowList.find((b) => b._id === id);
          if (borrow) borrow.status = "Trả rồi";
        } catch (error) {
          console.error("❌ Lỗi cập nhật trạng thái:", error);
        }
      }
    },
    async deleteBorrow(id) {
      if (confirm("Bạn có chắc muốn xóa không?")) {
        try {
          await axios.delete(
            `http://localhost:5000/api/theo-doi-muon-sach/${id}`
          );
          this.borrowList = this.borrowList.filter(
            (borrow) => borrow._id !== id
          );
        } catch (error) {
          console.error("❌ Lỗi xóa mượn sách:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.borrow-list-container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.342);
}
th, td {
  border: 1px solid #37755d;
  padding: 12px;
  text-align: center;
}
th {
  background-color: #a5ccbe;
  font-weight: bold;
}
tr:hover {
  background-color:#e7fff6;
  transition: background 0.3s ease;
}
tbody tr:hover {
  background-color: #f8f9fa;
}

.returned {
  color: #28a745;
  font-weight: bold;
}

.not-returned {
  color: #dc3545;
  font-weight: bold;
}

button {
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
}

.update-btn {
  background-color: #28a745;
  color: white;
  margin-right: 5px;
}

.update-btn:hover {
  background-color: #218838;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
