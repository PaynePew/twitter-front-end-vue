<template>
  <AppBar :status="'推文'" :stepper="true" />
  <Spinner v-if="isLoading" />
  <div v-else>
    <ArticleCardShow :current-article="currentArticle" />
    <ArticleCardWithReply
      :init-article="currentReplies"
      :owner="articleOwner"
    />
  </div>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import ArticleCardShow from "@/components/ArticleCardShow.vue";
import ArticleCardWithReply from "@/components/ArticleCardWithReply.vue";
import Spinner from "@/components/Spinner.vue";
import { mapState } from "vuex";

export default {
  components: {
    ArticleCardWithReply,
    ArticleCardShow,
    AppBar,
    Spinner,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  created() {
    const { articleId } = this.$route.params;
    this.getArticleShow(articleId);
    this.getArticleReply(articleId);
  },
  computed: {
    ...mapState({
      currentArticle: (state) => state.modalArticle.currentArticle,
      currentReplies: (state) => state.modalArticle.currentReplies,
      articleOwner: (state) => state.modalArticle.articleOwner,
    }),
  },
  methods: {
    async getArticleShow(articleId) {
      try {
        this.isLoading = true;
        await this.$store.dispatch("modalArticle/FETCH_ARTICLESHOW", articleId);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async getArticleReply(articleId) {
      try {
        await this.$store.dispatch(
          "modalArticle/FETCH_ARTICLE_REPLY",
          articleId
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
