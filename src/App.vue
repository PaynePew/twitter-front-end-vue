<template>
  <section class="header">
    <NavBar />
  </section>
  <section class="main">
    <AppBar />
    <router-view />
    <Modal />
    <section class="sidebar">
      <PopularList />
    </section>
  </section>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import AppBar from "./components/AppBar.vue";
import Modal from "./components/Modal.vue";
import PopularList from "./components/PopularList.vue";

export default {
  components: {
    NavBar,
    AppBar,
    Modal,
    PopularList,
  },
};
</script>

<style lang="scss">
@import "./assets/scss/vendor/__vendor-dir";
</style>
