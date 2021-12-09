<template>
  <AppBar :status="'推文'" :stepper="true" />
  <Spinner v-if="isLoading" />
  <ArticleCardShow v-else :current-article="currentArticle" />
  <ArticleCardWithReply :articles="articles" />
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import ArticleCardShow from "@/components/ArticleCardShow.vue";
import ArticleCardWithReply from "@/components/ArticleCardWithReply.vue";
import Spinner from "@/components/Spinner.vue";
import { articlesDummy } from "@/store/dummy/articlesDummy";
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
      articles: [],
      isLoading: true,
    };
  },
  created() {
    const { articleId } = this.$route.params;
    this.currentArticle = articlesDummy[0];
    this.articles = articlesDummy;
    this.getArticleShow(articleId);
  },
  methods: {
    async getArticleShow(articleId) {
      try {
        const { data } = await articlesAPI.getArticleShow(articleId);
        console.log("articleshow", data);
        this.currentArticle = data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
