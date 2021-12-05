<template>
  <AccountForm :initialUser="currentUser" />
</template>

<script>
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
  name: "Login",
  components: {
    AccountForm,
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
