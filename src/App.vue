<template>
  <div class="container">
    <section class="header">
      <router-view name="nav" @after-click="toggleModal" />
    </section>
    <section class="main">
      <section class="content">
        <AppBar v-show="conditionalRender" :users="users" />
        <router-view />
        <Modal v-show="isShow" @close="isShow = false" :users="users" />
      </section>
      <section class="sidebar">
        <router-view name="side" />
      </section>
    </section>
  </div>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import Modal from "./components/Modal.vue";
import { usersDummy } from "@/store/dummy/usersDummy";

export default {
  components: {
    AppBar,
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
    toggleModal() {
      this.isShow = !this.isShow;
    },
    fetchUsers() {
      this.users = usersDummy;
    },
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
}
</style>
