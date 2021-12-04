<template>
  <div class="login__container">
    <img class="login__logo" src="./../assets/img/logo@2x.png" alt="" />
    <h1 class="login__title">建立你的帳號</h1>
    <AccountForm />
  </div>
</template>

<script>
import AccountForm from "./../components/AccountForm.vue";

export default {
  name: "Login",
  components: {
    AccountForm,
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
