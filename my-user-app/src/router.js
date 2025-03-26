import { createRouter, createWebHistory } from "vue-router";
import BookList from "@/views/Books.vue";
import BorrowBook from "@/views/BorrowBook.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Account from "@/views/Account.vue"; // Import trang Account
import GioiThieu from './views/GioiThieu.vue'; // Đảm bảo đường dẫn này chính xác
import Home from './views/Home.vue'; // Trang chủ hoặc các trang khác của bạn

const routes = [
  { path: "/", component: BookList },
  { path: "/borrow", component: BorrowBook, meta: { requiresAuth: true } },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/account", component: Account, meta: { requiresAuth: true } }, // Trang tài khoản cần đăng nhập
  {
    path: '/gioithieu',
    name: 'GioiThieu',
    component: GioiThieu
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Điều hướng kiểm tra trạng thái đăng nhập
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("user"); // Kiểm tra người dùng đã đăng nhập chưa
  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login"); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  } else {
    next(); // Nếu đã đăng nhập, tiếp tục điều hướng
  }
});

export default router;
