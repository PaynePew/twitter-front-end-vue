<template>
  <AppBar :status="'首頁'" />
  <ArticleNew @after-submit="afterSubmit" />
  <Spinner v-if="isLoading" />
  <ArticleCard v-else :init-articles="articles" />
</template>

<script>
import ArticleNew from "@/components/ArticleNew.vue";
import ArticleCard from "@/components/ArticleCard.vue";
import Spinner from "@/components/Spinner.vue";
import AppBar from "@/components/AppBar.vue";
import { mapState } from "vuex";

export default {
  components: {
    ArticleNew,
    ArticleCard,
    AppBar,
    Spinner,
  },
  data() {
    return {
      // articles: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchArticles();
  },
  computed: {
    ...mapState({
      articles: (state) => state.modalArticle.articles,
    }),
    // ...mapActions({
    //   fetchArticles: "modalArticle/FETCH_ARTICLES",
    // }),
  },
  methods: {
    async fetchArticles() {
      try {
        this.isLoading = true;
        // const response = await articlesAPI.getArticles();
        // this.articles = response.data;
        await this.$store.dispatch("modalArticle/FETCH_ARTICLES");
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async afterSubmit() {
      try {
        await this.$store.dispatch("modalArticle/FETCH_ARTICLES");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
