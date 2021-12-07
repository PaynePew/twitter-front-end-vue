<template>
  <AppBar :status="'帳戶設定'" />
  <AccountForm :initialUser="currentUser" />
</template>

<script>
import AppBar from "./../components/AppBar.vue";
import AccountForm from "./../components/AccountForm.vue";
import usersAPI from "./../apis/users";
import { mapState } from "vuex";

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
  computed: {
    ...mapState(["currentUser"]),
  },

  mounted() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      console.log("fetching user");
      try {
        const { data } = await usersAPI.account.get();

        const { account, name, email } = data.usersAPI;

        this.currentUser = {
          ...this.currentUser,
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
