<template>
  <h1>Home</h1>
  <ArticleNew />
  <ArticleCard />
</template>

<script>
import ArticleNew from "@/components/ArticleNew.vue";
import ArticleCard from "@/components/ArticleCard.vue";
export default {
  components: {
    ArticleNew,
    ArticleCard,
  },
};
</script>
