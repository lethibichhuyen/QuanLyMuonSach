<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const isLoggedIn = ref(false);
const userInfo = ref({
  Ten: "",
  DienThoai: "",
  DiaChi: "",
});
const router = useRouter();

// Kiểm tra trạng thái đăng nhập khi trang được tải
onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) {
    isLoggedIn.value = true;
    userInfo.value = JSON.parse(user); // Lấy thông tin user từ localStorage
  } else {
    router.push("/login"); // Nếu chưa đăng nhập, chuyển về trang đăng nhập
  }
});

// Hàm đăng xuất
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  isLoggedIn.value = false;
  router.push("/login");
};
</script>

<template>
  <div class="account-container">
    <h1>Thông tin tài khoản</h1>

    <div v-if="isLoggedIn">
      <p>
        👤 Xin chào, <strong>{{ userInfo.Ten }}</strong
        >!
      </p>
      <p>
        📞 Số điện thoại: <strong>{{ userInfo.DienThoai }}</strong>
      </p>
      <p>
        🏠 Địa chỉ: <strong>{{ userInfo.DiaChi }}</strong>
      </p>
      <button @click="logout" class="logout-btn">Đăng xuất</button>
    </div>
  </div>
</template>

<style scoped>
.account-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  background-size: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  text-align: center;
  animation: fadeIn 1s ease-out;
  background:  linear-gradient(to right, #74ebd5, #acb6e5)
}

h1 {
  color: #000000;
  font-size: 28px;
  margin-bottom: 20px;
}

p {
  font-size: 22px;
  color: #000000;
  margin: 15px 0;
  font-weight: 500;
}

strong {
  color: #6e2f2f;
}

.logout-btn {
  background: #e63b3b;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
  transition: background 0.3s ease, transform 0.3s ease;
}

.logout-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

/* Thêm hiệu ứng fadeIn */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Thêm hiệu ứng khi hover lên các đoạn thông tin */
p:hover {
  color: #1abc9c;
  transform: scale(1.05);
  transition: color 0.3s ease, transform 0.3s ease;
}


</style>