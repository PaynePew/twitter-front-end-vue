<template>
  <AppBar :stepper="true" :article-count="25" />
  <UserInfoCard :currentUser="currentUser" />
  <UserInfoTab />
  <router-view :key="$route.fullPath" />
  <ArticleCard :articles="articles" />
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import UserInfoCard from "@/components/UserInfoCard.vue";
import UserInfoTab from "@/components/UserInfoTab.vue";
import ArticleCard from "@/components/ArticleCard.vue";
import { articlesDummy } from "@/store/dummy/articlesDummy";

export default {
  components: {
    ArticleCard,
    UserInfoCard,
    UserInfoTab,
    AppBar,
  },
  data() {
    return {
      currentUser: [],
      articles: [],
    };
  },
  beforeMount() {
    this.currentUser = articlesDummy[0].tweet.User;
    this.articles = articlesDummy;
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log("from", from.params.userName);
  //   next();
  // },
};
</script>

<style lang="scss" scoped></style>
