<template>
  <div class="login__container">
    <img class="login__logo" src="./../assets/img/logo@2x.png" alt="" />
    <h1 class="login__title">登入 Alphitter</h1>
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
    width: 40px;
    height: 40px;
  }
  h1 {
    font-size: $fs-h1;
  }
}
</style>
