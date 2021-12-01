<template>
  <div class="container">
    <section class="header">
      <NavBar />
    </section>
    <section class="main">
      <section class="content">
        <AppBar />
        <router-view />
        <Modal />
      </section>
      <section class="sidebar">
        <PopularList />
      </section>
    </section>
  </div>
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

.container {
  display: flex;
  outline: solid red;
}
.header {
  padding: 0 20px;
  min-width: 275px;
  outline: solid red;
}

.main {
  display: flex;
  outline: solid red;
  flex: 1 1 auto;
}
.content {
  display: flex;
  flex-direction: column;
  min-width: 600px;
  outline: solid red;
}
.sidebar {
}
</style>
