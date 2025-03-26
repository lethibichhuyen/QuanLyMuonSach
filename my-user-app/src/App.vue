<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

// Biến lưu trạng thái đăng nhập
const isLoggedIn = ref(false);
const userName = ref("");
const router = useRouter();
const route = useRoute(); // Lấy thông tin đường dẫn hiện tại

// Kiểm tra khi component mount
onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) {
    isLoggedIn.value = true;
    userName.value = JSON.parse(user).Ten; // Lấy tên từ dữ liệu user
  }
});

// Hàm đăng xuất
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  isLoggedIn.value = false;
  router.push("/login");
};

// Kiểm tra nếu đang ở trang tài khoản
const isAccountPage = computed(() => route.path === "/account");
</script>
<template>
  <nav class="navbar">
      <div class="logo">
        <img src="E:\BICHHUYEN\QLMS\images\Logo.png" alt="Logo" />
      </div>
      <div class="nav-links">
        <RouterLink to="/gioithieu"active-class="active">Về Chúng Tôi</RouterLink>
        <RouterLink to="/home" active-class="active"> 🏠 Home</RouterLink>
        <RouterLink to="/"active-class="active">Danh mục Sách</RouterLink>
        <RouterLink to="/borrow"active-class="active">Mượn sách</RouterLink>

        <template v-if="isLoggedIn">
          <RouterLink to="/account" class="account-link"active-class="active">Hi,  {{ userName }} 👤</RouterLink>
        </template>
        <template v-else>
          <RouterLink to="/login"active-class="active">Đăng nhập</RouterLink>
          <RouterLink to="/register"active-class="active">Đăng ký</RouterLink>
        </template>
      </div>
  </nav>

  <main>
    <RouterView />
  </main>
</template>


<style scoped>

/* Thanh điều hướng */
.navbar {
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #054d31, #30ac7c); /* Nền đậm chuyển nhạt */
  padding: 15px 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

/* Container chứa nội dung thanh điều hướng */
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  
}

/* Logo */
.logo img {
  width: 250px; /* Điều chỉnh kích thước logo */
  height: auto;
  margin-right: 10px;
}

/* Danh sách link */
.nav-links {
  display: flex;
  gap: 30px;
}

.nav-links a {
  text-decoration: none;
  color: #f8e3a1; /* Màu vàng sữa */
  font-weight: bold;
  padding: 12px 25px;
  border-radius: 20px;
  margin: 0 35px;
  font-size: 20px;
  transition: all 0.3s ease;
  font: 20px "Arial", sans-serif;
  font-weight: bold;
}

/* Hiệu ứng hover */
.nav-links a:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}
/* Mục đang được chọn */
nav a.active {
  background: #7fc0a5; /* Màu nổi bật khi đang ở trang đó */
  color: #000000;
  font-weight: bold;
}
</style>
