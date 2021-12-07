<template>
  <section
    v-for="article in articles"
    :key="article.tweet.id"
    class="article-card"
    @click="handlePageRoute(article.tweet.User.account, article.tweet.id)"
  >
    <div class="article-card__wrapper">
      <div class="article-card__container">
        <div class="article-card__side">
          <img
            class="article-card__avatar"
            :src="article.tweet.User.avatar"
            alt=""
          />
        </div>
        <div class="article-card__main">
          <div class="article-card__header">
            <div class="article-card__name">
              {{ article.tweet.User.name }}
            </div>
            <div class="article-card__account">
              @{{ article.tweet.User.account }}
            </div>
            <span>·</span>
            <div class="article-card__time">
              {{ fromNow(article.tweet.createdAt) }}
            </div>
          </div>
          <div class="article-card__body">
            {{ article.tweet.description }}
          </div>
          <div class="article-card__footer">
            <div class="article-card__response">
              <div class="article-card__comment" @click.stop="TOGGLE_MODAL">
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
                  class="article-card__icon"
                  src="@/assets/img/icon_like@2x.png"
                  alt=""
                />
                <span class="article-card__count">{{
                  article.likedCount
                }}</span>
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
import { mapMutations } from "vuex";
export default {
  props: {
    currentUser: Object,
    articles: Array,
  },
  data() {
    return {
      allarticles: [],
    };
  },
  methods: {
    ...mapMutations("modalArticle", ["TOGGLE_MODAL"]),
    handlePageRoute(account, id) {
      this.$router.push({
        name: "ArticleShow",
        params: { account, articleId: id },
      });
    },
  },

  watch: {
    articles(newValue) {
      this.allarticles = newValue;
    },
  },
  mixins: [fromNowMixin],
};
</script>

<style lang="scss" scoped>
.article-card {
  border-bottom: 1px solid $clr-border;
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
}
</style>
