import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NavBar from "../components/NavBar.vue";
import PopularList from "../components/PopularList.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/login",
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
    redirect: "/admin/login",
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    components: {
      default: () => import("../views/LogIn.vue"),
    },
  },
  {
    path: "/admin/users",
    name: "AdminUsers",
    components: {
      default: () => import("../views/AdminUsers.vue"),
      nav: NavBar,
    },
  },
  {
    path: "/admin/articles",
    name: "AdminArticles",
    components: {
      default: () => import("../views/AdminArticles.vue"),
      nav: NavBar,
    },
  },
  {
    path: "/home",
    name: "Home",
    components: { default: Home, nav: NavBar, side: PopularList },
  },
  {
    path: "/:account",
    name: "UserInfo",
    components: {
      default: () => import("../views/UserInfo.vue"),
      nav: NavBar,
      side: PopularList,
    },
  },
  {
    path: "/:account/with_replies",
    name: "UserInfoWithReply",
    exact: true,
    components: {
      default: () => import("../views/UserInfo.vue"),
      nav: NavBar,
      side: PopularList,
    },
  },
  {
    path: "/:account/likes",
    name: "UserInfoWithLike",
    exact: true,
    components: {
      default: () => import("../views/UserInfo.vue"),
      nav: NavBar,
      side: PopularList,
    },
  },

  {
    path: "/:account/status/:articleId",
    name: "ArticleShow",
    components: {
      default: () => import("../views/ArticleShow.vue"),
      nav: NavBar,
      side: PopularList,
    },
  },
  {
    path: "/settings",
    name: "Setting",
    redirect: "/settings/account",
  },
  {
    path: "/settings/account",
    name: "SettingAccount",
    components: {
      default: () => import("../views/UserSetting.vue"),
      nav: NavBar,
    },
  },
  {
    path: "/:account/follower",
    name: "Follower",
    components: {
      default: () => import("../views/Follower.vue"),
      nav: NavBar,
      side: PopularList,
    },
  },
  {
    path: "/:account/following",
    name: "Following",
    components: {
      default: () => import("../views/Following.vue"),
      nav: NavBar,
      side: PopularList,
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    components: { default: NotFound, nav: NavBar, side: PopularList },
  },
];
// eslint-disable-next-line no-unused-vars
const baseURL =
  process.env.NODE_ENV === "production" ? "/twitter-front-end-vue/" : "/";

const router = createRouter({
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  history: createWebHistory(baseURL),
  routes,
});

export default router;
