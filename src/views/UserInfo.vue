<template>
  <AppBar :stepper="true" :article-count="25" />
  <UserInfoCard :currentUser="currentUser" />
  <ModalUserEdit v-if="isShow" />
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
import ModalUserEdit from "@/components/ModalUserEdit.vue";
import { mapState } from "vuex";

export default {
  components: {
    ArticleCard,
    ArticleCardWithReply,
    UserInfoCard,
    UserInfoTab,
    AppBar,
    ModalUserEdit,
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
  computed: {
    ...mapState("modalUserInfo", {
      isShow: (state) => state.isShow,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
