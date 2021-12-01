<template>
  <div class="container">
    <img class="logo" src="./../assets/img/logo@2x.png" alt="" />
    <h1>登入 Alphitter</h1>
    <LoginForm/>
    
  </div>
</template>

<script>
import LoginForm from './../components/LoginForm.vue'

export default {
  components: {
    LoginForm
  },

  data() {
    return {
      email: "",
      password: "",
      isProcessing: false,
    };
  },
};

</script>

<style lang="scss" scoped>
.logo {
  width: 40px;
  height: 40px;
}

h1 {
  font-size: $fs-h1;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-label-group {
  position: relative;
  width: 540px;
  height: 52px;
  margin-top: 30px;
  border: none;
  border-radius: 0px;
  label {
    position: absolute;
    color: $clr-form-secondary;
    top: 5px;
    left: 10px;
  }
}

.form-control {
  border: none;
  background: $clr-form-bg;
  border-bottom: 2px solid $clr-form-secondary;
  border-radius: 0px 0px 4px 4px;
  width: 100%;
  height: 100%;
}

.login__btn {
  width: 540px;
  height: 46px;
}
</style>
