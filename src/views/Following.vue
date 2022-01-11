<template>
  <AppBar :status="currentUser.name" :stepper="true" :tweetNum="tweetNum" />
  <ConnectTable />
  <UserCard v-for="user in users" :key="user.id" :initialUser="user" />
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import ConnectTable from "@/components/ConnectTable.vue";
import UserCard from "@/components/UserCard.vue";
import usersAPI from "@/apis/users.js";
import { mapState } from "vuex";

export default {
  components: {
    ConnectTable,
    UserCard,
    AppBar,
  },
  data() {
    return {
      users: [],
      tweetNum: "",
    };
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
    }),
  },
  mounted() {
    this.fetchUsers(this.$route.params.userId);
    this.fetchTweetsNum(this.$route.params.userId);
  },
  methods: {
    async fetchUsers(userId) {
      try {
        const { data } = await usersAPI.follower.getFollowings(userId);
        this.users = data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchTweetsNum(id) {
      try {
        const { data } = await usersAPI.tweet.getTweets(id);
        this.tweetNum = data.length;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
