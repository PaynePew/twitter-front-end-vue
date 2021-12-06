<template>
  <div class="login__container">
    <img class="login__logo" src="./../assets/img/logo@2x.png" alt="" />
    <h1 class="login__title">{{ isRouterAdmin ? "後台登入" : "登入 Alphitter" }}</h1>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "./../components/LoginForm.vue";

export default {
  name: "Login",
  components: {
    LoginForm,
  },

  computed: {
    isRouterAdmin() {
      const currentURL = this.$route.name;
      if (currentURL === "AdminLogin") {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__logo {
    margin-top: 60px;
    width: 40px;
    height: 40px;
  }
  &__title {
    font-size: $fs-h1;
    margin-top: 20px;
    margin-bottom: 10px;
    line-height: 33.3px;
  }
}
</style>
