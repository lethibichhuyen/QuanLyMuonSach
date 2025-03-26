<template>
  <div class="container">
    <h2>👨‍💼 Quản Lý Nhân Viên</h2>

    <!-- Nút dấu cộng để hiển thị form -->
    <button @click="showForm = !showForm" class="btn-add">
      +
    </button>

    <!-- Form nhập nhân viên -->
    <form v-if="showForm" @submit.prevent="saveEmployee">
      <div class="form-group">
        <input
          type="text"
          v-model="employee.HoTenNV"
          placeholder="Họ tên nhân viên"
          required
        />
        <input
          type="password"
          v-model="employee.Password"
          placeholder="Mật khẩu"
          :disabled="isEditing"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          v-model="employee.ChucVu"
          placeholder="Chức vụ"
          required
        />
        <input
          type="text"
          v-model="employee.DiaChi"
          placeholder="Địa chỉ"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          v-model="employee.SoDienThoai"
          placeholder="Số điện thoại"
          required
        />
      </div>
      <div class="button-group">
        <button type="submit" class="btn-primary">
          {{ isEditing ? "Cập nhật" : "Thêm" }}
        </button>
        <button
          v-if="isEditing"
          @click="cancelEdit"
          type="button"
          class="btn-secondary"
        >
          Hủy
        </button>
      </div>
    </form>

    <!-- Bảng danh sách nhân viên -->
    <table>
      <thead>
        <tr>
          <th>📌 Mã NV</th>
          <th>👨‍💼 Họ Tên</th>
          <th>🛠️ Chức Vụ</th>
          <th>📍 Địa Chỉ</th>
          <th>📞 SĐT</th>
          <th>⚙️ Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="nv in employees" :key="nv.MSNV">
          <td>{{ nv.MSNV }}</td>
          <td>{{ nv.HoTenNV }}</td>
          <td>{{ nv.ChucVu }}</td>
          <td>{{ nv.DiaChi }}</td>
          <td>{{ nv.SoDienThoai }}</td>
          <td class="action-buttons">
            <button @click="editEmployee(nv)" class="btn-edit">✏️ Sửa</button>
            <button @click="deleteEmployee(nv.MSNV)" class="btn-delete">
              🗑️ Xóa
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
      employees: [],
      employee: this.getEmptyEmployee(),
      isEditing: false,
      editMSNV: null,
      showForm: false,  // Biến điều khiển hiển thị form
    };
  },

  mounted() {
    this.fetchEmployees();
  },

  methods: {
    getEmptyEmployee() {
      return {
        HoTenNV: "",
        Password: "",
        ChucVu: "",
        DiaChi: "",
        SoDienThoai: "",
      };
    },

    async fetchEmployees() {
      try {
        const response = await axios.get("http://localhost:5000/api/nhan-vien");
        this.employees = response.data;
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách nhân viên:", error);
      }
    },

    async saveEmployee() {
      try {
        Object.keys(this.employee).forEach((key) => {
          if (!this.employee[key]) this.employee[key] = "";
        });

        if (this.isEditing) {
          await axios.put(
            `http://localhost:5000/api/nhan-vien/${this.editMSNV}`,
            this.employee
          );
        } else {
          await axios.post(
            "http://localhost:5000/api/nhan-vien",
            this.employee
          );
        }

        this.resetForm();
        this.fetchEmployees();
      } catch (error) {
        console.error(
          "❌ Lỗi khi lưu nhân viên:",
          error.response?.data || error
        );
      }
    },

    editEmployee(nv) {
      this.employee = { ...this.getEmptyEmployee(), ...nv };
      this.isEditing = true;
      this.editMSNV = nv.MSNV;
      this.showForm = true;  // Hiển thị form khi chỉnh sửa
    },

    cancelEdit() {
      this.resetForm();
    },

    async deleteEmployee(msnv) {
      if (confirm("Bạn có chắc muốn xóa nhân viên này?")) {
        try {
          await axios.delete(`http://localhost:5000/api/nhan-vien/${msnv}`);
          this.fetchEmployees();
        } catch (error) {
          console.error("❌ Lỗi khi xóa nhân viên:", error);
        }
      }
    },

    resetForm() {
      this.employee = this.getEmptyEmployee();
      this.isEditing = false;
      this.editMSNV = null;
      this.showForm = false;  // Ẩn form sau khi thêm/xóa
      this.$nextTick(() => {
        this.employee = this.getEmptyEmployee();
      });
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
