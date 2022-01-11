<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="login-form__input-box form__input-box">
      <label class="form__label" for="account">帳號</label>
      <div class="login-form__input-container form__input-container">
        <input
          id="account"
          v-model="account"
          name="account"
          type="account"
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
          autocomplete
        />
      </div>
    </div>

    <button class="login-form__btn btn">登入</button>

    <div class="login-form__btn--small btn--small">
      <template v-if="!isRouterAdmin">
        <router-link to="/signup" class="btn--small__text">
          註冊Alphitter
        </router-link>
        <span> · </span>
      </template>
      <router-link
        v-if="!isRouterAdmin"
        class="btn--small__text"
        to="/admin/login"
      >
        後台登入
      </router-link>
      <router-link v-if="isRouterAdmin" class="btn--small__text" to="/login">
        前台登入
      </router-link>
    </div>
  </form>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import adminAPI from "./../apis/admin";

export default {
  name: "LoginForm",
  data() {
    return {
      account: "",
      password: "",
      isProcessing: false,
      adminToggled: false,
      isNotice: false,
      // notice: {
      //   type: "",
      //   message: "",
      // },
    };
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
  methods: {
    async handleSubmit() {
      try {
        if (!this.account) {
          throw new Error("請輸入帳號");
        }

        if (!this.password) {
          throw new Error("請輸入密碼");
        }

        this.isProcessing = true;

        if (this.isRouterAdmin) {
          //若isRouterAdmin則為後台登入
          const response = await adminAPI.signIn({
            account: this.account,
            password: this.password,
          });

          const { data } = response;

          if (data.status !== "success") {
            throw new Error(data.message);
          }

          if (data.user.role !== "admin") {
            //阻擋前台帳號登入後台
            this.$store.commit("authentication/revokeAuthentication");
            this.$router.push("/login");
            this.$store.commit("noticeInfo/toggleNotice", {
              type: "error",
              message: "帳號不存在",
            });
            this.isProcessing = false;
            return;
          }
          localStorage.setItem("token", data.token);
          this.$store.commit("authentication/setCurrentUser", data.user);
          this.$store.dispatch("authentication/fetchCurrentUser");
          this.$router.push("/admin/users");
        } else {
          //否則為前台登入
          const response = await authorizationAPI.signIn({
            account: this.account,
            password: this.password,
          });
          const { data } = response;
          if (data.status !== "success") {
            throw new Error(data.message);
          }
          if (data.user.role === "admin") {
            //阻擋後台帳號登入前台
            this.$store.commit("authentication/revokeAuthentication");
            this.$router.push("/login");
            this.$store.commit("noticeInfo/toggleNotice", {
              type: "error",
              message: "帳號不存在",
            });
            this.isProcessing = false;
            return;
          }
          localStorage.setItem("token", data.token);
          this.$store.commit("authentication/setCurrentUser", data.user);
          this.$store.dispatch("authentication/fetchCurrentUser");
          this.$router.push("/home");
        }
      } catch (error) {
        console.log("LoginForm handleSubmit error: ", error);
        this.$store.commit("noticeInfo/toggleNotice", {
          type: "error",
          message: "帳號不存在",
        });
        this.isProcessing = false;
      }
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
