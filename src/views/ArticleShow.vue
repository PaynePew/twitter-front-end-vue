<template>
  <AppBar :status="'推文'" :stepper="true" />
  <Spinner v-if="isLoading" />
  <div v-else>
    <ArticleCardShow :current-article="currentArticle" />
    <ArticleCardWithReply :init-article="allReplies" :owner="owner" />
  </div>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import ArticleCardShow from "@/components/ArticleCardShow.vue";
import ArticleCardWithReply from "@/components/ArticleCardWithReply.vue";
import Spinner from "@/components/Spinner.vue";
import articlesAPI from "@/apis/articles";

export default {
  components: {
    ArticleCardWithReply,
    ArticleCardShow,
    AppBar,
    Spinner,
  },
  data() {
    return {
      currentUser: [],
      currentArticle: {},
      allReplies: [],
      owner: [],
      isLoading: true,
    };
  },
  created() {
    const { articleId } = this.$route.params;
    this.getArticleShow(articleId);
  },
  methods: {
    async getArticleShow(articleId) {
      try {
        this.isLoading = true;
        const { data } = await articlesAPI.getArticleShow(articleId);
        this.currentArticle = data;
        await this.getArticleReply(articleId);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async getArticleReply(articleId) {
      try {
        const { data } = await articlesAPI.reply.get(articleId);
        console.log(data);
        this.allReplies = data.RepliedUsers;
        this.owner = data.User;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
