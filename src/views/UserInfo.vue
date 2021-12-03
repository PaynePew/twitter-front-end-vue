<template>
  <UserInfoCard />
  <UserInfoTab />
  <router-view :key="$route.fullPath" />
  <ArticleCard :articles="articles" />
</template>

<script>
import UserInfoCard from "@/components/UserInfoCard.vue";
import UserInfoTab from "@/components/UserInfoTab.vue";
import ArticleCard from "@/components/ArticleCard.vue";
import { usersDummy } from "@/store/dummy/usersDummy";
import { articlesDummy } from "@/store/dummy/articlesDummy";

export default {
  components: {
    ArticleCard,
    UserInfoCard,
    UserInfoTab,
  },
  data() {
    return {
      currentUser: [],
      articles: [],
    };
  },
  beforeMount() {
    this.currentUser = usersDummy[0];
    this.articles = articlesDummy;
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log("from", from.params.userName);
  //   next();
  // },
};
</script>

<style lang="scss" scoped></style>
