<template>
  <div class="container">
    <section
      class="header"
      :class="[
        { 'header--width': noSideBar.includes($route.name) },
        { 'header--login': signURL.includes($route.name) },
      ]"
    >
      <router-view class="nav" name="nav" @after-click="TOGGLE_MODAL" />
      <Notice />
    </section>
    <section class="main">
      <section
        class="content"
        :class="[
          {
            'content--fit-content': isWide,
          },
          { 'content--login': signURL.includes($route.name) },
          { 'content--setting': $route.name === 'SettingAccount' },
        ]"
      >
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <component :is="Component" v-if="!$route.meta.keepAlive" />
        </router-view>
        <Modal v-show="isShow" @close="TOGGLE_MODAL" :users="currentUser" />
      </section>
      <section class="sidebar">
        <router-view name="side" />
      </section>
    </section>
  </div>
</template>

<script>
import Modal from "./components/Modal.vue";
import Notice from "./components/Notice.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    Modal,
    Notice,
  },
  data() {
    return {
      users: [],
      noSideBar: [
        "Login",
        "Signup",
        "AdminLogin",
        "AdminUsers",
        "AdminArticles",
        "SettingAccount",
      ],
      signURL: ["Login", "Signup", "AdminLogin"],
      chatURL: ["ChatPublic", "ChatPrivate"],
    };
  },
  created() {},
  methods: {
    ...mapMutations("modalArticle", ["TOGGLE_MODAL"]),
  },
  computed: {
    isWide() {
      const currentURL = this.$route.name;
      const contentWithoutMax = [
        "AdminUsers",
        "AdminArticles",
        "ChatPublic",
        "ChatPrivate",
      ];
      if (contentWithoutMax.includes(currentURL)) {
        return true;
      }
      return false;
    },

    ...mapState({
      isShow: (state) => state.modalArticle.isShow,
      currentUser: (state) => state.authentication.currentUser,
    }),
  },
};
</script>

<style lang="scss">
@import "./assets/scss/vendor/__vendor-dir";

.container {
  display: flex;
  position: relative;
  justify-content: center;
}
.header {
  display: flex;
  position: relative;
  padding-right: 30px;
  flex: 1 0 auto;
  justify-content: flex-end;
  border-right: 1px solid $clr-border;
  &--width {
    padding-right: 40px;
  }
  &--login {
    border-right: none;
  }
}
.main {
  display: flex;
  flex: 1 1 auto;
}
.content {
  display: flex;
  flex-direction: column;
  width: 600px;
  border-right: 1px solid $clr-border;
  &--fit-content {
    width: fit-content;
    width: none;
  }
  &--login {
    border: none;
  }
  &--setting {
    flex: 1;
    border: none;
    margin-right: 371px;
  }
}
</style>
