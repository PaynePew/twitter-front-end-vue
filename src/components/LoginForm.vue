<template>
  <div class="form__warning-box" v-if="warning">
    <span class="form__warning-message">{{ warning }}</span>
    <img
      class="form__warning-close"
      src="./../assets/img/icon_close_black@2x.png"
      @click="warning = ''"
      alt=""
    />
  </div>
  <!-- <button 
    type="button" 
    class="btn btn-primary" 
    id="liveAlertBtn"
    @click="alert('You found me','success')"
  >
    Warning Test
  </button> -->
  <form @submit.stop.prevent="handleSubmit">
    <div class="login-form__input-box form__input-box">
      <label class="form__label" for="email">email</label>
      <div class="login-form__input-container form__input-container">
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="login-form__input form__input"
          required
          autofocus
        />
      </div>
    </div>

    <div class="login-form__input-box form__input-box">
      <label class="form__label" for="password">密碼</label>
      <div class="login-form__input-container form__input-container">
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="login-form__input form__input"
          required
        />
      </div>
    </div>

    <button class="login-form__btn btn">登入</button>

    <div class="login-form__btn--small btn--small">
      <router-link v-if="!adminToggled" to="/signup" class="btn--small__text">
        註冊Alphitter
      </router-link>
      <span v-if="!adminToggled"> · </span>
      <span class="btn--small__text" @click="toggleAdmin">
        {{ adminToggled ? "前台登入" : "後台登入" }}
      </span>
    </div>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false,
      adminToggled: false,
      warning: "",
    };
  },

  methods: {
    toggleAdmin() {
      console.log("toggleAdmin");
      this.adminToggled = !this.adminToggled;
    },

    async handleSubmit() {
      try {
        if (!this.email) {
          throw new Error("請輸入email");
        }

        if (!this.password) {
          throw new Error("請輸入密碼");
        }

        if (this.adminToggled) {
          this.$router.push("/admin/users");
        } else {
          this.$router.push("/home");
        }
      } catch (error) {
        this.alert(error.message);
      }
    },

    alert(message) {
      this.warning = message;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/components/_form.scss";
@import "./../assets/scss/components/_button.scss";

.login-form {
  &__btn {
    width: 540px;
    height: 46px;
    margin-top: 40px;
    &--small {
      margin-top: 20px;
    }
  }
}
</style>
