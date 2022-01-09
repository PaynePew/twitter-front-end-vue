import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NavBar from "../components/NavBar.vue";
import PopularList from "../components/PopularList.vue";
import NotFound from "../views/NotFound.vue";
import store from "./../store";

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
    meta: {
      keepAlive: true,
    },
    components: { default: Home, nav: NavBar, side: PopularList },
  },
  {
    path: "/message/public",
    name: "ChatPublic",
    components: {
      default: () => import("../views/ChatPublic.vue"),
      nav: NavBar,
    },
  },
  {
    path: "/message/private",
    name: "ChatPrivate",
    components: {
      default: () => import("../views/ChatPrivate.vue"),
      nav: NavBar,
    },
  },
  {
    path: "/:userId",
    name: "UserInfo",
    components: {
      default: () => import("../views/UserInfo.vue"),
      nav: NavBar,
      side: PopularList,
    },
  },
  {
    path: "/:userId/with_replies",
    name: "UserInfoWithReply",
    exact: true,
    components: {
      default: () => import("../views/UserInfo.vue"),
      nav: NavBar,
      side: PopularList,
    },
  },
  {
    path: "/:userId/likes",
    name: "UserInfoWithLike",
    exact: true,
    components: {
      default: () => import("../views/UserInfo.vue"),
      nav: NavBar,
      side: PopularList,
    },
  },

  {
    path: "/:userId/status/:articleId",
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
    path: "/:userId/follower",
    name: "Follower",
    components: {
      default: () => import("../views/Follower.vue"),
      nav: NavBar,
      side: PopularList,
    },
  },
  {
    path: "/:userId/following",
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

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");
  const tokenInStore = store.state.authentication.token;
  let isAuthenticated = store.state.authentication.isAuthenticated;

  if (token && token !== tokenInStore) {
    isAuthenticated = await store.dispatch("authentication/fetchCurrentUser");
  }

  const pathWithoutAuthentication = ["Login", "Signup", "AdminLogin"];

  if (!isAuthenticated && !pathWithoutAuthentication.includes(to.name)) {
    next("/login");
    return;
  }

  if (isAuthenticated && pathWithoutAuthentication.includes(to.name)) {
    next("/home");
  }

  next();
});

export default router;
