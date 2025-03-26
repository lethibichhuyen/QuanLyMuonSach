import { createRouter, createWebHistory } from "vue-router";
import BookList from "./components/BookList.vue";
import EmployeeList from "./components/EmployeeList.vue";
import ReaderList from "./components/ReaderList.vue";
import PublisherList from "./components/PublisherList.vue";
import Login from "./components/Login.vue";
import BorrowList from "./components/BorrowList.vue";
import Account from "./components/Account.vue";
import Home from "./components/Home.vue";

const routes = [
  { path: "/books", component: BookList },
  { path: "/employees", component: EmployeeList },
  { path: "/readers", component: ReaderList },
  { path: "/publishers", component: PublisherList },
  { path: "/login", component: Login },
  { path: "/borrow-list", component: BorrowList },
  { path: "/account", component: Account, meta: { requiresAuth: true } }, 
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


export default router;
