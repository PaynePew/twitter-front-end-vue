<template>
  <AppBar :status="'推文'" :stepper="true" />
  <ArticleCardShow :article="currentArticle" />
  <ArticleCardWithReply :articles="articles" />
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import ArticleCardShow from "@/components/ArticleCardShow.vue";
import ArticleCardWithReply from "@/components/ArticleCardWithReply.vue";
import { articlesDummy } from "@/store/dummy/articlesDummy";

export default {
  components: {
    ArticleCardWithReply,
    ArticleCardShow,
    AppBar,
  },
  data() {
    return {
      currentUser: [],
      currentArticle: [],
      articles: [],
    };
  },
  beforeMount() {
    const { articleId } = this.$route.params;
    console.log(articleId);
    this.currentArticle = articlesDummy[0];
    this.articles = articlesDummy;
  },
};
</script>

<style lang="scss" scoped></style>
