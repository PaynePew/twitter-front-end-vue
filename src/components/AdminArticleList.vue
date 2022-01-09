<template>
  <div class="admin-article-list__container">
    <div
      v-for="article in articles"
      :key="article.id"
      class="admin-article-list__card"
    >
      <img class="admin-article-list__side" :src="article.User.avatar" alt="" />
      <div class="admin-article-list__main">
        <div class="admin-article-list__header">
          <div class="admin-article-list__name">
            {{ article.User.name }}
          </div>
          <div class="admin-article-list__account">@testAccount</div>
          <span>·</span>
          <div class="admin-article-list__time">
            {{ fromNow(article.createdAt) }}
          </div>
        </div>
        <div class="admin-article-list__body">
          {{ article.description50 }}
        </div>

        <img
          class="admin-article-list__close"
          src="@/assets/img/icon_close_black@2x.png"
          alt=""
          @click="deleteArticle(article.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowMixin } from "@/utils/mixins";
import adminAPI from "./../apis/admin";

export default {
  data() {
    return {
      articles: [],
    };
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const { data } = await adminAPI.articles.getAll();
        this.articles = data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteArticle(tweetId) {
      try {
        const { data } = await adminAPI.articles.delete({ tweetId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.articles = this.articles.filter(
          (article) => article.id !== tweetId
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
  mixins: [fromNowMixin],
};
</script>

<style lang="scss" scoped>
.admin-article-list {
  &__container {
    width: 1060px;
  }

  &__card {
    position: relative;
    display: flex;
    height: 75px;
    border: 1px solid $clr-border;
  }
  &__side {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    object-fit: cover;
    margin: 15px;
    margin-top: 13px;
  }

  &__main {
    display: flex;
    flex-direction: column;
    // justify-content: center;
  }

  &__header {
    display: flex;
    color: $clr-secondary;
    margin-top: 10px;
    margin-bottom: 6px;
  }

  &__name {
    font-weight: bold;
    color: $clr-primary;
    margin-right: 5px;
  }

  &__account {
    color: $clr-secondary;
  }

  &__close {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 15px;
    right: 15px;
  }
}
</style>
