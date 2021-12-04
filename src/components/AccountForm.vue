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
    <div class="account-form__input-box form__input-box">
      <label class="form__label" for="account">帳號</label>
      <div class="account-form__input-container form__input-container">
        <input
          id="account"
          v-model="account"
          name="account"
          type="text"
          class="account-form__input form__input"
          required
          :disabled="initialUser.account"
          @focus="focus = 'account'"
          @blur="focus = null"
        />
      </div>
      <div class="form__hint">
        <p class="form__error-message" v-if="accountLength > 50">
          字數超出上限！
        </p>
        <p class="form__counter" v-show="focus === 'account'">
          {{ 0 || accountLength }}/50
        </p>
      </div>
    </div>

    <div class="account-form__input-box form__input-box">
      <label class="form__label" for="name">名稱</label>
      <div class="account-form__input-container form__input-container">
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          class="account-form__input form__input"
          required
          @focus="focus = 'name'"
          @blur="focus = null"
        />
      </div>
      <div class="form__hint">
        <p class="form__error-message" v-if="nameLength > 50">字數超出上限！</p>
        <p class="form__counter" v-show="focus === 'name'">
          {{ 0 || nameLength }}/50
        </p>
      </div>
    </div>

    <div class="account-form__input-box form__input-box">
      <label class="form__label" for="email">email</label>
      <div class="account-form__input-container form__input-container">
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="account-form__input form__input"
          required
        />
      </div>
    </div>

    <div class="account-form__input-box form__input-box">
      <label class="form__label" for="password">密碼</label>
      <div class="account-form__input-container form__input-container">
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="account-form__input form__input"
          required
        />
      </div>
    </div>

    <div class="account-form__input-box form__input-box">
      <label class="form__label" for="passwordCheck">密碼確認</label>
      <div class="account-form__input-container form__input-container">
        <input
          id="passwordCheck"
          v-model="passwordCheck"
          name="passwordCheck"
          type="password"
          class="account-form__input form__input"
          required
        />
      </div>
      <div class="form__hint">
        <p
          class="form__error-message"
          v-if="passwordCheck && password !== passwordCheck"
        >
          兩組密碼不相符
        </p>
      </div>
    </div>

    <div v-if="this.$route.name === 'Signup'">
      <button type="submit" class="account-form__btn btn btn--primary">
        註冊
      </button>

      <div class="account-form__btn--small btn--small">
        <router-link to="/login" class="btn--small__text">取消</router-link>
      </div>
    </div>

    <div
      class="account-form__btn-wrapper"
      v-if="this.$route.name === 'SettingAccount'"
    >
      <button type="submit" class="account-form__btn--setting btn btn--primary">
        儲存
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "AccountForm",

  props: {
    initialUser: {
      type: Object,
      default: () => ({
        account: null,
        name: "",
        email: "",
        password: "",
        passwordCheck: "",
      }),
    },
  },

  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isProcessing: false,
      adminToggled: false,
      focus: null,
      warning: "",
    };
  },

  computed: {
    accountLength() {
      return this.account.length;
    },

    nameLength() {
      return this.name.length;
    },
  },

  watch: {
    initialUser(newValue) {
      this.account = newValue.account;
      this.name = newValue.name;
      this.email = newValue.email;
      this.password = newValue.password;
    },
  },

  methods: {
    async handleSubmit() {
      try {
        // 前端驗證
        if (!this.account) {
          throw new Error("請輸入帳號");
        }

        if (this.account.length > 50) {
          throw new Error("帳號長度上限50字");
        }

        if (!this.name) {
          throw new Error("請輸入名稱");
        }

        if (this.name.length > 50) {
          throw new Error("名稱長度上限50字");
        }

        if (!this.email) {
          throw new Error("請輸入email");
        }

        if (!this.password) {
          throw new Error("請輸入密碼");
        }

        if (!this.passwordCheck) {
          throw new Error("請輸入密碼確認");
        }

        if (this.password !== this.passwordCheck) {
          throw new Error("兩次輸入密碼不同，請重新確認");
        }

        this.$router.push({
          name: "UserInfo",
          params: { account: this.account },
        });
      } catch (error) {
        console.log("error");
        alert(error.message);
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
@import "./../assets/scss/components/_button-share.scss";

.account-form {
  &__btn {
    width: 540px;
    height: 46px;
    margin-top: 40px;
    cursor: pointer;
    &--small {
      justify-content: center;
      margin-top: 20px;
    }
    &--setting {
      margin-top: 50px;
      width: 116px;
      height: 46px;
      cursor: pointer;
    }
  }
  &__btn-wrapper {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
