<template>
  <div class="container">
    <!-- <h2>🧑 Quản Lý Độc Giả</h2> -->

    <!-- Bảng danh sách độc giả -->
    <table>
      <thead>
        <tr>
          <th>📌 Mã Độc Giả</th>
          <th>👤 Họ Lót</th>
          <th>👤 Tên</th>
          <th>🎂 Ngày Sinh</th>
          <th>⚥ Giới Tính</th>
          <th>📍 Địa Chỉ</th>
          <th>📞 SĐT</th>
          <th>⚙️ Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dg in readers" :key="dg.MaDocGia">
          <td>{{ dg.MaDocGia }}</td>
          <td>{{ dg.HoLot }}</td>
          <td>{{ dg.Ten }}</td>
          <td>{{ formatDate(dg.NgaySinh) }}</td>
          <td>{{ dg.Phai }}</td>
          <td>{{ dg.DiaChi }}</td>
          <td>{{ dg.DienThoai }}</td>
          <td class="action-buttons">
            <button @click="editReader(dg)" class="btn-edit">✏️ Sửa</button>
            <button @click="deleteReader(dg.MaDocGia)" class="btn-delete">
              🗑️ Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Form sửa độc giả -->
    <div v-if="editingReader" class="edit-form">
      <h3>✏️ Chỉnh Sửa Độc Giả</h3>
      <label>Họ Lót:</label>
      <input v-model="editingReader.HoLot" type="text" />

      <label>Tên:</label>
      <input v-model="editingReader.Ten" type="text" />

      <label>Ngày Sinh:</label>
      <input v-model="editingReader.NgaySinh" type="date" />

      <label>Giới Tính:</label>
      <select v-model="editingReader.Phai">
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
      </select>

      <label>Địa Chỉ:</label>
      <input v-model="editingReader.DiaChi" type="text" />

      <label>SĐT:</label>
      <input v-model="editingReader.DienThoai" type="text" />

      <button @click="updateReader" class="btn-update">💾 Lưu</button>
      <button @click="cancelEdit" class="btn-cancel">❌ Hủy</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      readers: [],
      editingReader: null, // Lưu độc giả đang chỉnh sửa
    };
  },

  mounted() {
    this.fetchReaders();
  },

  methods: {
    // 📌 Lấy danh sách độc giả từ API
    async fetchReaders() {
      try {
        const response = await axios.get("http://localhost:5000/api/doc-gia");
        this.readers = response.data;
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách độc giả:", error);
      }
    },

    // 🗑️ Xóa độc giả
    async deleteReader(MaDocGia) {
      if (confirm("Bạn có chắc muốn xóa độc giả này?")) {
        try {
          await axios.delete(`http://localhost:5000/api/doc-gia/${MaDocGia}`);
          this.fetchReaders();
        } catch (error) {
          console.error("❌ Lỗi khi xóa độc giả:", error);
        }
      }
    },

    // ✏️ Chọn độc giả để sửa
    editReader(reader) {
      this.editingReader = { ...reader }; // Sao chép dữ liệu để tránh sửa trực tiếp
    },

    // 💾 Cập nhật độc giả
    async updateReader() {
      try {
        await axios.put(
          `http://localhost:5000/api/doc-gia/${this.editingReader.MaDocGia}`,
          this.editingReader
        );
        this.fetchReaders();
        this.editingReader = null;
      } catch (error) {
        console.error("❌ Lỗi khi cập nhật độc giả:", error);
      }
    },

    // ❌ Hủy sửa
    cancelEdit() {
      this.editingReader = null;
    },

    // 🎂 Định dạng ngày tháng
    formatDate(date) {
      return new Date(date).toLocaleDateString("vi-VN");
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


.btn-primary { background-color: #007bff; color: white; }
.btn-primary:hover { background-color: #0056b3; }
.btn-secondary { background-color: #ccc; color: black; }
.btn-secondary:hover { background-color: #bbb; }
.btn-edit { background-color: #ffc107; color: black; }
.btn-edit:hover { background-color: #e0a800; }
.btn-delete { background-color: #dc3545; color: white; }
.btn-delete:hover { background-color: #c82333; }

.form-box {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
