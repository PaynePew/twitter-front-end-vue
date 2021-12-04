<template>
  <AppBar :stepper="true" :article-count="25" />
  <UserInfoCard :currentUser="currentUser" />
  <UserInfoTab />
  <ArticleCard
    v-if="$route.name !== 'UserInfoWithReply'"
    :articles="articles"
  />
  <ArticleCardWithReply v-else :articles="articles" />
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import UserInfoCard from "@/components/UserInfoCard.vue";
import UserInfoTab from "@/components/UserInfoTab.vue";
import ArticleCard from "@/components/ArticleCard.vue";
import ArticleCardWithReply from "@/components/ArticleCardWithReply.vue";
import { articlesDummy } from "@/store/dummy/articlesDummy";

export default {
  components: {
    ArticleCard,
    ArticleCardWithReply,
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
