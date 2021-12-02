import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/login",
  },
  {
    path: "/admin",
    exact: true,
    redirect: "/admin/users",
  },
  {
    path: "/admin/users",
    name: "AdminUsers",
    component: () => import("../views/AdminUsers.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/:userName",
    name: "UserInfo",
    component: () => import("../views/UserInfo.vue"),
  },
  {
    path: "/:userName/:articleId",
    name: "ArticleShow",
    component: () => import("../views/ArticleShow.vue"),
  },
  {
    path: "/:userName/follower",
    name: "Follower",
    component: () => import("../views/Follower.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LogIn.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/SignUp.vue"),
  },
];

const router = createRouter({
  linkExactActiveClass: "active",
  history: createWebHashHistory(),
  routes,
});

export default router;
