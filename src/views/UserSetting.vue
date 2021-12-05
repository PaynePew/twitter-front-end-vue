<template>
  <AppBar :status="'帳戶設定'" />
  <AccountForm :initialUser="currentUser" />
</template>

<script>
import AppBar from "./../components/AppBar.vue";
import AccountForm from "./../components/AccountForm.vue";

const dummyUser = {
  id: 3,
  account: "tz1VJJNhqL3irfvxKcJtuEn3Ti97hNUWQWcd",
  email: "fklasing2@china.com.cn",
  password: "He1xnjP",
  name: "Florri Klasing",
  introduction: "96.72.192.4",
  avatar: "https://robohash.org/sedvitaeeveniet.png?size=50x50&set=set1",
  cover: "https://robohash.org/autimpeditillo.png?size=50x50&set=set1",
  role: "",
};

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
    fetchUser() {
      this.currentUser = dummyUser;
    },
  },
};
</script>

<style lang="scss" scoped></style>
