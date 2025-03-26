<template>
  <div id="app">
    <!-- Thanh điều hướng, chỉ hiển thị khi người dùng đã đăng nhập -->
    <nav v-if="isLoggedIn">
      <div class="logo">
        <img src="E:\BICHHUYEN\QLMS\images\Logo.png" alt="Logo" />
      </div>
      <router-link to="/home" active-class="active"> 🏠 </router-link>
      <router-link to="/books" active-class="active">
        Quản lý Sách
      </router-link>
      <router-link to="/employees" active-class="active">
        Quản lý Nhân viên
      </router-link>
      <router-link to="/readers" active-class="active">
        Quản lý Độc giả
      </router-link>
      <router-link to="/publishers" active-class="active">
        Quản lý Nhà xuất bản
      </router-link>
      <router-link to="/borrow-list" active-class="active">
        Theo dõi Mượn sách
      </router-link>
      <router-link to="/account" active-class="active"> 🧑 Admin </router-link>
    </nav>

    <!-- Thanh điều hướng, chỉ hiển thị khi người dùng chưa đăng nhập -->
    <nav v-if="!isLoggedIn">
      <router-link to="/login">Đăng Nhập</router-link>
    </nav>

    <!-- Nội dung trang -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false, // Trạng thái đăng nhập
    };
  },
  created() {
    // Kiểm tra trạng thái đăng nhập khi ứng dụng khởi tạo
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      // Kiểm tra token trong localStorage
      this.isLoggedIn = !!localStorage.getItem("token");
    },
    logout() {
      // Xóa token khi người dùng đăng xuất
      localStorage.removeItem("token");
      this.checkLoginStatus(); // Cập nhật lại trạng thái đăng nhập
      this.$router.push("/login"); // Chuyển hướng về trang đăng nhập
    },
  },
};
</script>
<style scoped>
/* Tổng thể */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  width: 100%;
  font-family: "Arial", sans-serif;
  background: #f4f7f6;
  color: #333;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

/* Tiêu đề */
header {
  background: linear-gradient(to right, #4caf50, #2e7d32);
  color: white;
  text-align: center;
  padding: 20px;
  font-size: 28px;
  font-weight: bold;
}

/* Thanh điều hướng */
nav {
  display: flex;
  align-items: center;
  background: linear-gradient(
    to right,
    #054d31,
    #30ac7c
  ); /* Nền đậm chuyển nhạt */
  padding: 15px 40px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

nav .logo img {
  width: 250px; /* Điều chỉnh kích thước logo */
  height: auto;
  margin-right: 20px;
}

nav a,
nav .user-info {
  text-decoration: none;
  color: #f8e3a1; /* Màu vàng sữa */
  font-weight: bold;
  padding: 12px 25px;
  border-radius: 20px;
  margin: 0 10px;
  font-size: 20px;
  transition: all 0.3s ease;
}

nav a:hover,
nav .user-info:hover {
  background: #42bd5c;
  color: white;
  transform: scale(1.1);
}

nav .user-info {
  display: flex;
  align-items: center;
}

nav .user-info span {
  margin-right: 10px;
}

nav .user-info button {
  padding: 5px 12px;
  background-color: #ff5722;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

nav .user-info button:hover {
  background-color: #e64a19;
}

/* Nội dung chính */
main {
  flex: 1;
  padding: 80px 20px 20px; /* Để nội dung không bị che bởi thanh điều hướng */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #444;
}
/* Mục đang được chọn */
nav a.active {
  background: #7fc0a5; /* Màu nổi bật khi đang ở trang đó */
  color: #000000;
  font-weight: bold;
}
</style>
