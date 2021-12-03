import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";

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
    path: "/admin/articles",
    name: "AdminArticles",
    component: () => import("../views/AdminArticles.vue"),
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
    children: [
      {
        path: "with_replies",
        name: "UserInfoWithReplies",
        component: () => import("../components/UserInfoReplies.vue"),
      },
      {
        path: "likes",
        name: "UserInfoLikes",
        component: () => import("../components/UserInfoLikes.vue"),
      },
    ],
  },
  {
    path: "/:userName/status/:articleId",
    name: "ArticleShow",
    component: () => import("../views/ArticleShow.vue"),
  },
  {
    path: "/:userName/follower",
    name: "Follower",
    component: () => import("../views/Follower.vue"),
  },
  {
    path: "/:userName/following",
    name: "Following",
    component: () => import("../views/Following.vue"),
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
  {
    path: "/admin",
    exact: true,
    redirect: "/admin/users",
  },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: NotFound,
  },
];

const router = createRouter({
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  history: createWebHistory(),
  routes,
});

export default router;
