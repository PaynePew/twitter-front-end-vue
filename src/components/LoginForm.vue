<template>
  <div
    :class="[
      isNotice && notice.type === 'success'
        ? ['form__notice-box', 'form__notice-box--show']
        : 'form__notice-box',
    ]"
  >
    <div class="form__notice-message">{{ notice.message }}</div>
    <div class="form__notice-bg form__notice-bg--success">
      <img
        class="form__notice-icon"
        src="./../assets/img/icon_success@2x.png"
        alt=""
      />
    </div>
  </div>

  <div
    :class="[
      isNotice && notice.type === 'error'
        ? ['form__notice-box', 'form__notice-box--show']
        : 'form__notice-box',
    ]"
  >
    <div class="form__notice-message">{{ notice.message }}</div>
    <div class="form__notice-bg form__notice-bg--error">
      <img
        class="form__notice-icon"
        src="./../assets/img/icon_error@2x.png"
        alt=""
      />
    </div>
  </div>

  <!-- <button 
    type="button" 
    class="btn btn-primary" 
    id="liveAlertBtn"
    @click="toggleNotice('You found me','success')"
  >
    Notice Test
  </button> -->
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

export default {
  name: "LoginForm",
  data() {
    return {
      account: "",
      password: "",
      isProcessing: false,
      adminToggled: false,
      isNotice: false,
      notice: {
        type: "",
        message: "",
      },
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

  mounted() {
    console.log(this.$router.name);
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
          const response = await authorizationAPI.signIn({
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

            this.toggleNotice({
              type: "error",
              message: "此帳號非管理者帳號",
            });
            this.isProcessing = false;
            return
          }

          localStorage.setItem("token", data.token);

          this.$store.commit("authentication/setCurrentUser", data.user);

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

            this.toggleNotice({
              type: "error",
              message: "請勿使用管理者帳號登入前台",
            });
            this.isProcessing = false;
            return
          }

          localStorage.setItem("token", data.token);

          this.$store.commit("authentication/setCurrentUser", data.user);

          this.$router.push("/home");
        }
      } catch (error) {
        this.toggleNotice({
          type: "error",
          message: error.response.data.message,
        });
        this.isProcessing = false;
      }
    },

    toggleNotice({ type, message }) {
      clearTimeout(this.timeoutId);
      console.log("before", this.timeoutId);
      this.isNotice = true;
      this.notice.message = message;
      this.notice.type = type;

      this.timeoutId = setTimeout(() => {
        this.isNotice = false;
      }, 4000);

      // setTimeout(() => {
      //   this.notice.type = "";
      //   this.notice.message = "";
      // }, 6000);
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
