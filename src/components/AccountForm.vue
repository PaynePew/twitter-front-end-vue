<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="account-form__input-box form__input-box">
      <label class="form__input-box__label" for="account">帳號</label>
      <div
        class="
          account-form__input-box__input-container
          form__input-box__input-container
        "
      >
        <input
          id="account"
          v-model="account"
          name="account"
          type="text"
          class="
            account-form__input-box__input-container__input
            form__input-box__input-container__input
          "
          required
          autofocus
        />
      </div>
      <div class="form__input-box__hint">
        <p
          class="form__input-box__hint__error-message"
          v-if="accountLength > 50"
        >
          字數超出上限！
        </p>
        <p class="form__input-box__hint__counter">
          {{ 0 || accountLength }}/50
        </p>
      </div>
    </div>

    <div class="account-form__input-box form__input-box">
      <label class="form__input-box__label" for="name">名稱</label>
      <div
        class="
          account-form__input-box__input-container
          form__input-box__input-container
        "
      >
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          class="
            account-form__input-box__input-container__input
            form__input-box__input-container__input
          "
          required
        />
      </div>
      <div class="form__input-box__hint">
        <p class="form__input-box__hint__error-message" v-if="nameLength > 50">
          字數超出上限！
        </p>
        <p class="form__input-box__hint__counter">{{ 0 || nameLength }}/50</p>
      </div>
    </div>

    <div class="account-form__input-box form__input-box">
      <label class="form__input-box__label" for="email">email</label>
      <div
        class="
          account-form__input-box__input-container
          form__input-box__input-container
        "
      >
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="
            account-form__input-box__input-container__input
            form__input-box__input-container__input
          "
          required
        />
      </div>
    </div>

    <div class="account-form__input-box form__input-box">
      <label class="form__input-box__label" for="password">密碼</label>
      <div
        class="
          account-form__input-box__input-container
          form__input-box__input-container
        "
      >
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="
            account-form__input-box__input-container__input
            form__input-box__input-container__input
          "
          required
        />
      </div>
    </div>

    <div class="account-form__input-box form__input-box">
      <label class="form__input-box__label" for="passwordCheck">密碼確認</label>
      <div
        class="
          account-form__input-box__input-container
          form__input-box__input-container
        "
      >
        <input
          id="passwordCheck"
          v-model="passwordCheck"
          name="passwordCheck"
          type="password"
          class="
            account-form__input-box__input-container__input
            form__input-box__input-container__input
          "
          required
        />
      </div>
      <div class="form__input-box__hint">
        <p
          class="form__input-box__hint__error-message"
          v-if="passwordCheck && password !== passwordCheck"
        >
          兩組密碼不相符
        </p>
      </div>
    </div>

    <button class="account-form__btn btn">註冊</button>

    <div class="account-form__btn--small btn--small">
      <router-link to="/login" class="btn--small__text">取消</router-link>
    </div>
  </form>
</template>

<script>
import "./../assets/scss/components/_form.scss";
import "./../assets/scss/components/_button.scss";

export default {
  name: "AccountForm",

  props: {
    initialUser: {
      type: Object,
      default: () => ({
        account: "",
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
      errorMessage: "",
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

  methods: {
    toggleAdmin() {
      console.log("toggleAdmin");
      this.adminToggled = !this.adminToggled;
    },

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

        this.$router.push("home");
      } catch (error) {
        console.log("error");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.account-form {
  &__btn {
    width: 540px;
    height: 46px;
    margin-top: 40px;

    &--small {
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>