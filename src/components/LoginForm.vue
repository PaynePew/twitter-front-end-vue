<template>
  <form>
    <div class="form-label-group mb-2">
      <label for="email">email</label>
      <input
        id="email"
        v-model="email"
        name="email"
        type="email"
        class="form-control"
        placeholder=""
        autocomplete="username"
        required
        autofocus
      />
    </div>

    <div class="form-label-group mb-3">
      <label for="password">Password</label>
      <input
        id="password"
        v-model="password"
        name="password"
        type="password"
        class="form-control"
        placeholder=""
        autocomplete="current-password"
        required
      />
    </div>

    <div class="btn login__btn">登入</div>

    <div class="button--small">
      <router-link to="/signup" class="button__text--small">註冊Alphitter</router-link>
      <span> · </span>
      <span class="button__text--small"> 後台登入</span>
    </div>
  </form>
</template>

<script>
export default {
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