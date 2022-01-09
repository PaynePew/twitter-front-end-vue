<template>
  <form
    @submit.stop.prevent="handleSubmit"
    class="account-form__form"
    :class="[
      { 'account-form__form--setting': $route.name == 'SettingAccount' },
    ]"
  >
    <div
      class="account-form__input-box form__input-box"
      :class="[
        { 'account-form__input-box--setting': $route.name == 'SettingAccount' },
      ]"
    >
      <label class="form__label" for="account">帳號</label>
      <div class="account-form__input-container form__input-container">
        <input
          id="account"
          v-model="account"
          name="account"
          type="text"
          class="account-form__input form__input"
          required
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

    <div
      class="account-form__input-box form__input-box"
      :class="[
        { 'account-form__input-box--setting': $route.name == 'SettingAccount' },
      ]"
    >
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

    <div
      class="account-form__input-box form__input-box"
      :class="[
        { 'account-form__input-box--setting': $route.name == 'SettingAccount' },
      ]"
    >
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

    <div
      class="account-form__input-box form__input-box"
      :class="[
        { 'account-form__input-box--setting': $route.name == 'SettingAccount' },
      ]"
    >
      <label class="form__label" for="password">密碼</label>
      <div class="account-form__input-container form__input-container">
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="account-form__input form__input"
          required
          autocomplete
        />
      </div>
    </div>

    <div
      class="account-form__input-box form__input-box"
      :class="[
        { 'account-form__input-box--setting': $route.name == 'SettingAccount' },
      ]"
    >
      <label class="form__label" for="checkPassword">密碼確認</label>
      <div class="account-form__input-container form__input-container">
        <input
          id="checkPassword"
          v-model="checkPassword"
          name="checkPassword"
          type="password"
          class="account-form__input form__input"
          required
          autocomplete
        />
      </div>
      <div class="form__hint">
        <p
          class="form__error-message"
          v-if="checkPassword && password !== checkPassword"
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
import authorizationAPI from "./../apis/authorization";
import usersAPI from "./../apis/users";

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
        checkPassword: "",
      }),
    },
  },

  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      checkPassword: "",
      isProcessing: false,
      adminToggled: false,
      focus: null,
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

        if (!this.checkPassword) {
          throw new Error("請輸入密碼確認");
        }

        if (this.password !== this.checkPassword) {
          throw new Error("兩次輸入密碼不同，請重新確認");
        }

        //前端驗證完成 開始打api
        this.isProcessing = true;

        if (this.$route.name === "Signup") {
          //若router為signup為註冊
          const { data } = await authorizationAPI.signUp({
            id: this.initialUser.id,
            name: this.name,
            account: this.account,
            email: this.email,
            password: this.password,
            checkPassword: this.checkPassword,
          });

          if (data.status !== "success") {
            throw new Error(data.message);
          }

          this.$router.push({
            name: "Login",
          });
        } else {
          //若router不為signup為更新資料
          const { data } = await usersAPI.account.update({
            id: this.initialUser.id,
            name: this.name,
            account: this.account,
            email: this.email,
            password: this.password,
            checkPassword: this.checkPassword,
          });

          if (data.status !== "success") {
            throw new Error(data.message);
          }

          this.$store.commit("noticeInfo/toggleNotice", {
            type: "success",
            message: "成功編輯帳號資料",
          });

          this.$router.push({
            name: "UserInfo",
            params: { userId: this.initialUser.id },
          });
        }
      } catch (error) {
        this.$store.commit("noticeInfo/toggleNotice", {
          type: "error",
          message: error.message,
        });
        this.isProcessing = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/components/_form.scss";
@import "./../assets/scss/components/_button-share.scss";

.account-form {
  &__form {
    padding: 0 16px;
    &--setting {
      width: 642px;
    }
  }
  &__input-box {
    &--setting {
      width: 642px;
    }
  }
  &__btn {
    width: 540px;
    height: 46px;
    margin-top: 40px;
    cursor: pointer;
    &--small {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
    &--setting {
      margin-top: 40px;
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
