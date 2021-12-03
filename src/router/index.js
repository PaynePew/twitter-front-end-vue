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
    path: "/admin",
    exact: true,
    redirect: "/admin/users",
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
    path: "/:userName",
    name: "UserInfo",
    components: {
      default: () => import("../views/UserInfo.vue"),
      nav: NavBar,
      side: PopularList,
    },
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
    components: {
      default: () => import("../views/ArticleShow.vue"),
      nav: NavBar,
      side: PopularList,
    },
  },
  {
    path: "/:userName/follower",
    name: "Follower",
    components: {
      default: () => import("../views/Follower.vue"),
      nav: NavBar,
      side: PopularList,
    },
  },
  {
    path: "/:userName/following",
    name: "Following",
    components: {
      default: () => import("../views/Following.vue"),
      nav: NavBar,
      side: PopularList,
    },
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
