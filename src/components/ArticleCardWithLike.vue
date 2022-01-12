<template>
  <section
    v-for="article in articles"
    :key="article.id"
    class="article-card"
    @click="handlePageRoute(article.Tweet.User.id, article.TweetId)"
  >
    <div class="article-card__wrapper">
      <div class="article-card__container">
        <div
          class="article-card__side"
          @click.stop="handlePageRoute(article.Tweet.User.id)"
        >
          <img
            class="article-card__avatar"
            :src="article.Tweet.User.avatar"
            alt=""
          />
        </div>
        <div class="article-card__main">
          <div
            class="article-card__header"
            @click.stop="handlePageRoute(article.Tweet.User.id)"
          >
            <div class="article-card__name">
              {{ article.Tweet.User.name }}
            </div>
            <div class="article-card__account">
              @{{ article.Tweet.User.account }}
            </div>
            <span>·</span>
            <div class="article-card__time">
              {{ fromNow(article.createdAt) }}
            </div>
          </div>
          <div class="article-card__body">
            {{ article.Tweet.description }}
          </div>
          <div class="article-card__footer">
            <div class="article-card__response">
              <div
                class="article-card__comment"
                @click.stop="
                  TOGGLE_MODAL();
                  handleModalReply(article);
                "
              >
                <img
                  class="article-card__icon"
                  src="@/assets/img/icon_reply@2x.png"
                  alt=""
                />
                <span class="article-card__count">{{
                  article.repliedCount
                }}</span>
              </div>
              <div class="article-card__like">
                <img
                  v-if="!article.isLiked"
                  @click.stop="postLike(article.TweetId)"
                  class="article-card__icon"
                  src="@/assets/img/icon_like@2x.png"
                  alt=""
                />
                <img
                  v-else
                  @click.stop="deleteLike(article.TweetId)"
                  class="article-card__icon"
                  src="@/assets/img/icon_like_active@2x.png"
                  alt=""
                />
                <span
                  class="article-card__count"
                  :class="[{ 'article-card__count--like': article.isLiked }]"
                  >{{ article.likedCount }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { fromNowMixin } from "@/utils/mixins";
import { mapMutations, mapState } from "vuex";
import articlesAPI from "@/apis/articles";

export default {
  props: {
    initArticles: Array,
  },
  data() {
    return {
      articles: this.initArticles,
    };
  },
  computed: {
    ...mapState("authentication", ["currentUser"]),
  },
  watch: {
    initArticles(newValue) {
      this.articles = newValue;
    },
  },
  methods: {
    ...mapMutations("modalArticle", ["TOGGLE_MODAL", "LOAD_ARTICLE"]),
    handlePageRoute(userId, articleId) {
      if (!articleId) {
        this.$router.push({
          name: "UserInfo",
          params: { userId },
        });
        return;
      }
      this.$router.push({
        name: "ArticleShow",
        params: { userId, articleId },
      });
    },
    toggleIsLike(articleId) {
      this.articles.map((_article) => {
        if (_article.TweetId === articleId) {
          _article.isLiked
            ? (_article.likedCount -= 1)
            : (_article.likedCount += 1);
          _article.isLiked = !_article.isLiked;
        }
        return _article;
      });
    },
    async postLike(articleId) {
      try {
        console.log(articleId);
        this.toggleIsLike(articleId);
        const { data } = await articlesAPI.like.create(articleId);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteLike(articleId) {
      try {
        this.toggleIsLike(articleId);
        const { data } = await articlesAPI.like.delete(articleId);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleModalReply(article) {
      const { avatar, account, name } = article.Tweet.User;
      const { description } = article.Tweet;
      const { createdAt } = article;
      let articleTemp = {
        User: { avatar, account, name },
        description,
        createdAt,
      };
      this.$store.commit("modalArticle/LOAD_ARTICLE", articleTemp);
    },
  },
  mixins: [fromNowMixin],
};
</script>

<style lang="scss" scoped>
.article-card {
  border-bottom: 1px solid $clr-border;
  cursor: pointer;
  &__wrapper {
    max-width: 600px;
  }
  &__container {
    margin: 10px 15px 15px 0px;
    display: flex;
  }
  &__header {
    display: flex;
    color: $clr-secondary;
  }
  &__side {
    margin-left: 15px;
  }
  &__avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 3px;
  }
  &__main {
    margin-left: 10px;
    width: 85%;
  }
  &__name {
    font-weight: bold;
    color: $clr-primary;
    margin-right: 5px;
  }
  &__account {
    color: $clr-secondary;
  }
  &__body {
    font-weight: 500;
    overflow-wrap: break-word;
  }
  &__footer {
    display: flex;
    margin-top: 10px;
  }
  &__response {
    max-width: 130px;
    font-size: $fs-h6;
    color: $clr-secondary;
    display: flex;
    justify-content: space-between;
  }
  &__comment {
    min-width: 40px;
    margin-right: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__like {
    min-width: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__icon {
    width: 15px;
    height: 15px;
  }
  &__count--like {
    color: #e0245e;
  }
}
</style>
