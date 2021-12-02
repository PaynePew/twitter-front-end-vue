<template>
  <div class="container">
    <section class="header">
      <NavBar v-show="conditionalRender" />
    </section>
    <section class="main">
      <section class="content">
        <AppBar v-show="conditionalRender" />
        <router-view />
        <Modal v-show="isShow" />
      </section>
      <section class="sidebar" >
        <PopularList v-show="conditionalRender" v-if="!isAdminPage"/>
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
      isRender: true,
      route: "",
    };
  },
  // beforeMount() {
  //   this.conditionalRender();
  // },
  // beforeRouteEnter(to, from) {
  //   console.log("hello");
  //   console.log(to);
  //   console.log(from);
  // },

  computed: {
    conditionalRender() {
      const currentURL = this.$route;
      console.log("URL", currentURL);
      const pathWithoutSideRender = ["Login", "Signup"];
      if (pathWithoutSideRender.includes(currentURL.name)) {
        return false;
      }
      return true;
    },
    isAdminPage() {
      const currentURL = this.$route;
      console.log("URL.name", currentURL.name);
      const pathWithoutSideRender = ["AdminUsers", "AdminArticles"];
      if (pathWithoutSideRender.includes(currentURL.name)) {
        return true;
      }
      return false;
    }
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
