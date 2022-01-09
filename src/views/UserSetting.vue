<template>
  <AppBar :status="'帳戶設定'" />
  <AccountForm :initialUser="currentUser" />
</template>

<script>
import AppBar from "./../components/AppBar.vue";
import AccountForm from "./../components/AccountForm.vue";
import usersAPI from "./../apis/users";

export default {
  name: "UserSetting",
  components: {
    AccountForm,
    AppBar,
  },
  data() {
    return {
      currentUser: {
        id: -1,
        account: "",
        email: "",
        password: "",
        name: "",
        introduction: "",
        avatar: "",
        cover: "",
        role: "",
      },
    };
  },

  mounted() {
    this.fetchUser();
  },

  methods: {
    async fetchUser() {
      try {
        const { data } = await usersAPI.getCurrentUser();

        const { id, account, name, email } = data.user;

        this.currentUser = {
          ...this.currentUser,
          id,
          account,
          name,
          email,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
