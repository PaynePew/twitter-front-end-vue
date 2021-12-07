<template>
  <div class="container">
    <section class="header">
      <router-view name="nav" @after-click="TOGGLE_MODAL" />
    </section>
    <section class="main">
      <section class="content" :class="{ 'content--admin': isAdmin }">
        <router-view />
        <Modal v-show="isShow" @close="TOGGLE_MODAL" :users="users" />
      </section>
      <section class="sidebar">
        <router-view name="side" />
      </section>
    </section>
  </div>
</template>

<script>
import Modal from "./components/Modal.vue";
import { usersDummy } from "@/store/dummy/usersDummy";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    ...mapMutations(["TOGGLE_MODAL"]),
    fetchUsers() {
      this.users = usersDummy;
    },
  },
  computed: {
    isAdmin() {
      const currentURL = this.$route.name;
      const contentWithoutMax = ["AdminUsers", "AdminArticles"];
      if (contentWithoutMax.includes(currentURL)) {
        return true;
      }
      return false;
    },
    ...mapState({
      isShow: (state) => state.modalArticle.isShow,
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
  padding: 0 20px;
  flex: 1 0 auto;
  justify-content: flex-end;
}
.main {
  display: flex;
  flex: 1 1 auto;
}
.content {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  border: 1px solid $clr-border;
  &--admin {
    max-width: none;
  }
}
</style>
