<template>
  <div class="container">
    <section class="header">
      <NavBar />
    </section>
    <section class="main">
      <section class="content">
        <AppBar />
        <router-view />
        <Modal v-show="isShow" />
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
  data() {
    return {
      isShow: false,
    };
  },
};
</script>

<style lang="scss">
@import "./assets/scss/vendor/__vendor-dir";

.container {
  display: flex;
  position: relative;
  justify-content: center;
  outline: solid red;
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
  outline: solid red;
  flex: 1 1 auto;
}
.content {
  display: flex;
  flex-direction: column;
  min-width: 600px;
  outline: solid red;
}
</style>
