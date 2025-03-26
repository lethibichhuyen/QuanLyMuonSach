<template>
  <div class="container">
    <h2>🏢 Quản Lý Nhà Xuất Bản</h2>

    <!-- Nút cộng để hiển thị form thêm -->
    <button @click="toggleForm" class="btn-add"> + </button>

    <!-- Form thêm hoặc cập nhật nhà xuất bản -->
    <form v-if="showingForm" @submit.prevent="savePublisher">
      <input
        type="text"
        v-model="publisher.TenNXB"
        placeholder="Tên NXB"
        required
      />
      <input
        type="text"
        v-model="publisher.DiaChi"
        placeholder="Địa chỉ"
        required
      />

      <button type="submit">{{ isEditing ? "Cập nhật" : "Thêm" }}</button>
      <button v-if="isEditing" @click="cancelEdit">Hủy</button>
    </form>

    <!-- Bảng nhà xuất bản -->
    <table>
      <thead>
        <tr>
          <th>📌 Mã NXB</th>
          <th>🏢 Tên NXB</th>
          <th>📍 Địa chỉ</th>
          <th>⚙️ Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in publishers" :key="p._id">
          <td>{{ p.MaNXB }}</td>
          <td>{{ p.TenNXB }}</td>
          <td>{{ p.DiaChi }}</td>
          <td class="action-buttons">
            <!-- Nút Sửa và Xóa -->
            <button @click="editPublisher(p)" class="btn-edit">✏️ Sửa</button>
            <button @click="deletePublisher(p._id)" class="btn-delete">🗑️ Xóa</button>
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
      publishers: [],
      publisher: {
        TenNXB: "",
        DiaChi: "",
      },
      isEditing: false,
      editId: null,
      showingForm: false, // Biến để điều khiển việc hiển thị form
    };
  },
  mounted() {
    this.fetchPublishers();
  },
  methods: {
    async fetchPublishers() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/nha-xuat-ban"
        );
        this.publishers = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nhà xuất bản:", error);
      }
    },

    async savePublisher() {
      try {
        if (this.isEditing) {
          await axios.put(
            `http://localhost:5000/api/nha-xuat-ban/${this.editId}`,
            this.publisher
          );
        } else {
          await axios.post(
            "http://localhost:5000/api/nha-xuat-ban",
            this.publisher
          );
        }

        this.resetForm();
        this.fetchPublishers();
      } catch (error) {
        console.error("Lỗi khi lưu nhà xuất bản:", error);
      }
    },

    editPublisher(publisher) {
      this.publisher = { ...publisher };
      this.isEditing = true;
      this.editId = publisher._id;
      this.showingForm = true;
    },

    cancelEdit() {
      this.resetForm();
    },

    async deletePublisher(id) {
      if (confirm("Bạn có chắc muốn xóa nhà xuất bản này?")) {
        try {
          await axios.delete(`http://localhost:5000/api/nha-xuat-ban/${id}`);
          this.fetchPublishers();
        } catch (error) {
          console.error("Lỗi khi xóa nhà xuất bản:", error);
        }
      }
    },

    resetForm() {
      this.publisher = {
        TenNXB: "",
        DiaChi: "",
      };
      this.isEditing = false;
      this.editId = null;
      this.showingForm = false; // Ẩn form sau khi hủy
    },

    toggleForm() {
      this.showingForm = !this.showingForm;
      if (!this.showingForm) {
        this.resetForm(); // Đảm bảo form sạch khi đóng
      }
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

.btn-edit, .btn-delete {
  padding: 5px 12px;
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
</style>
