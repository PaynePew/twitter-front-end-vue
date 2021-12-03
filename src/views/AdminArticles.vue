<template>
  <AppBar :status="'推文清單'" />
  <div class="container">
    <AdminArticleList />
  </div>
</template>

<script>
import AdminArticleList from "./../components/AdminArticleList.vue";
import AppBar from "./../components/AppBar.vue";

export default {
  components: {
    AdminArticleList,
    AppBar,
  },
};
</script>
