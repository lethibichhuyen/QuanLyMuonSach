<template>
  <div class="container">
    <h2>📚 Quản Lý Sách</h2>
    
    <!-- Nút thêm sách -->
    <button @click="toggleForm" class="btn-add"> + </button>

    <!-- Form nhập sách (Ẩn/Hiện khi nhấn Thêm Sách) -->
    <form v-if="showForm" @submit.prevent="saveBook" class="form-box">
      <div class="form-group">
        <input type="text" v-model="book.TenSach" placeholder="Tên sách" required />
        <input type="text" v-model="book.TacGia" placeholder="Tác giả" required />
      </div>
      <div class="form-group">
        <input type="number" v-model="book.DonGia" placeholder="Giá (VNĐ)" required />
        <input type="number" v-model="book.SoQuyen" placeholder="Số lượng" required />
      </div>
      <div class="form-group">
        <input type="text" v-model="book.MaNXB" placeholder="NXB ID" required />
        <input type="number" v-model="book.NamXuatBan" placeholder="Năm XB" required />
      </div>
      <div class="button-group">
        <button type="submit" class="btn-primary">{{ isEditing ? "✏️ Cập nhật" : "Thêm" }}</button>
        <button v-if="isEditing" @click="cancelEdit" class="btn-secondary">❌ Hủy</button>
      </div>
    </form>

    <!-- Bảng hiển thị danh sách sách -->
    <table>
      <thead>
        <tr>
          <th>📌 Mã Sách</th>
          <th>📖 Tên Sách</th>
          <th>✍ Tác Giả</th>
          <th>💰 Giá</th>
          <th>📚 Số Lượng</th>
          <th>🏢 Mã NXB</th>
          <th>📅 Năm XB</th>
          <th>⚙️ Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in books" :key="b._id">
          <td>{{ b.MaSach }}</td>
          <td>{{ b.TenSach }}</td>
          <td>{{ b.TacGia }}</td>
          <td>{{ b.DonGia }} VNĐ</td>
          <td>{{ b.SoQuyen }}</td>
          <td>{{ b.MaNXB }}</td>
          <td>{{ b.NamXuatBan }}</td>
          <td class="action-buttons">
            <button @click="editBook(b)" class="btn-edit">✏️ Sửa</button>
            <button @click="deleteBook(b._id)" class="btn-delete">🗑️ Xóa</button>
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
      books: [],
      book: {
        MaSach: "",
        TenSach: "",
        TacGia: "",
        DonGia: "",
        SoQuyen: "",
        MaNXB: "",
        NamXuatBan: "",
      },
      isEditing: false,
      editId: null,
      showForm: false,
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) this.resetForm();
    },
    // 🛒 Lấy danh sách sách từ API
    async fetchBooks() {
      try {
        const response = await axios.get("http://localhost:5000/api/sach");
        this.books = response.data.map((book) => ({
          ...book,
          MaNXB: book.MaNXB?.MaNXB || book.MaNXB, // Đảm bảo lấy đúng Mã NXB
        }));
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách sách:", error);
      }
    },
    async saveBook() {
      try {
        if (this.isEditing) {
          await axios.put(`http://localhost:5000/api/sach/${this.editId}`, this.book);
        } else {
          await axios.post("http://localhost:5000/api/sach", this.book);
        }
        this.toggleForm();
        this.fetchBooks();
      } catch (error) {
        console.error("❌ Lỗi khi lưu sách:", error);
      }
    },
    editBook(book) {
      this.book = { ...book };
      this.isEditing = true;
      this.showForm = true;
      this.editId = book._id;
    },
    cancelEdit() {
      this.resetForm();
      this.showForm = false;
    },
    async deleteBook(id) {
      if (confirm("Bạn có chắc muốn xóa sách này?")) {
        await axios.delete(`http://localhost:5000/api/sach/${id}`);
        this.fetchBooks();
      }
    },
    resetForm() {
      this.book = { TenSach: "", TacGia: "", DonGia: "", SoQuyen: "", MaNXB: "", NamXuatBan: "" };
      this.isEditing = false;
      this.editId = null;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1400px;
  width: 100%; 
  margin: auto;
  text-align: center;
  font-family: Arial, sans-serif;
}


button {
  padding: 12px 18px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-add {
  background-color: #ff8080;
  color: white;
  font-size: 24px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.btn-add:hover {
  background-color: #218838;
  transform: scale(1.1);
}

.btn-primary { background-color: #007bff; color: white; }
.btn-primary:hover { background-color: #0056b3; }
.btn-secondary { background-color: #ccc; color: black; }
.btn-secondary:hover { background-color: #bbb; }
.btn-edit { background-color: #ffc107; color: black; }
.btn-edit:hover { background-color: #e0a800; }
.btn-delete { background-color: #dc3545; color: white; }
.btn-delete:hover { background-color: #c82333; }

.form-box {
  /* background: rgba(124, 184, 161, 0.9); */
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.form-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

input {
  padding: 10px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

/* Điều chỉnh style cho các nút */
.btn-edit, .btn-delete {
  padding: 5px 12px; /* Điều chỉnh kích thước nút */
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-edit {
  background-color: #f0c546;
  color: black;
}

.btn-edit:hover {
  background-color: #ffc412;
}

.btn-delete {
  background-color: #ff4f60;
  color: black;
}

.btn-delete:hover {
  background-color: #cf1d2f;
}


</style>
