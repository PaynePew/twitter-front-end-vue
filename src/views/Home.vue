<template>
  <AppBar :status="'首頁'" />
  <ArticleNew @after-submit="fetchArticles" />
  <Spinner v-if="isLoading" />
  <ArticleCard v-else :init-articles="articles" />
</template>

<script>
import ArticleNew from "@/components/ArticleNew.vue";
import ArticleCard from "@/components/ArticleCard.vue";
import Spinner from "@/components/Spinner.vue";
import AppBar from "@/components/AppBar.vue";
import articlesAPI from "@/apis/articles";

export default {
  components: {
    ArticleNew,
    ArticleCard,
    AppBar,
    Spinner,
  },
  data() {
    return {
      articles: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        this.isLoading = true;
        const response = await articlesAPI.getArticles();
        this.articles = response.data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
  },
};
</script>
