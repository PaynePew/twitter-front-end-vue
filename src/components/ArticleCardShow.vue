<template>
  <section class="article-show">
    <div class="article-show__wrapper">
      <div class="article-show__container">
        <div
          class="article-show__header"
          @click.stop="handlePageRoute(article.User.id)"
        >
          <img class="article-show__avatar" :src="article.User.avatar" alt="" />
          <div class="article-show__title">
            <div class="article-show__name">
              {{ article.User.name }}
            </div>
            <div class="article-show__account">@{{ article.User.account }}</div>
          </div>
        </div>
        <div class="article-show__main">
          <div class="article-show__des">
            {{ article.description }}
          </div>
          <div class="article-show__time-box">
            <div class="article-show__time">
              {{ moment(article.createdAt) }}
            </div>
          </div>
          <div class="article-show__popular-box">
            <div class="article-show__popular">
              <div class="article-show__prefix">
                {{ article.repliedCount }}&nbsp;
              </div>
              <div class="article-show__suffix">回覆</div>
            </div>
            <div class="article-show__popular">
              <div class="article-show__prefix">
                {{ article.likedCount }}&nbsp;
              </div>
              <div class="article-show__suffix">喜歡次數</div>
            </div>
          </div>
          <div class="article-show__action-box">
            <div
              class="article-show__reply"
              @click.stop="
                TOGGLE_MODAL();
                LOAD_ARTICLE(article);
              "
            >
              <img
                class="article-show__icon"
                src="@/assets/img/icon_reply@2x.png"
                alt=""
              />
            </div>
            <div class="article-show__like">
              <img
                v-if="!article.isLiked"
                @click.stop="postLike(article.id)"
                class="article-show__icon"
                src="@/assets/img/icon_like@2x.png"
                alt=""
              />
              <img
                v-else
                @click.stop="deleteLike(article.id)"
                class="article-show__icon"
                src="@/assets/img/icon_like_active@2x.png"
                alt=""
              />
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
import articlesAPI from "@/apis/articles";
export default {
  props: {
    currentArticle: { Object },
  },
  data() {
    return {
      article: this.currentArticle,
    };
  },
  methods: {
    ...mapMutations("modalArticle", ["TOGGLE_MODAL", "LOAD_ARTICLE"]),
    handlePageRoute(userId) {
      this.$router.push({
        name: "UserInfo",
        params: { userId },
      });
    },
    toggleIsLike() {
      this.article.isLiked = !this.article.isLiked;
    },
    async postLike(articleId) {
      try {
        this.toggleIsLike();
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
        this.toggleIsLike();
        const { data } = await articlesAPI.like.delete(articleId);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    currentArticle(newValue) {
      this.article = newValue;
    },
  },
  mixins: [fromNowMixin],
};
</script>

<style lang="scss" scoped>
.article-show {
  border-bottom: 1px solid $clr-border;

  &__wrapper {
    max-width: 600px;
  }
  &__container {
    margin: 15px;
    display: flex;
    flex-direction: column;
  }
  &__header {
    display: flex;
    margin-bottom: 15px;
  }
  &__avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  &__title {
    margin-left: 10px;
    line-height: 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__main {
    width: 100%;
  }
  &__des {
    font-size: $fs-h1;
    font-weight: 500;
    margin-bottom: 15px;
    overflow-wrap: break-word;
  }
  &__time-box {
    padding-bottom: 15px;
    border-bottom: 1px solid $clr-border;
  }
  &__time {
    color: $clr-secondary;
  }
  &__popular-box {
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid $clr-border;
  }
  &__popular {
    margin-right: 20px;
    display: flex;
  }
  &__prefix {
    color: $clr-primary;
    font-weight: bold;
  }
  &__suffix {
    color: $clr-secondary;
  }
  &__name {
    font-weight: bold;
    color: $clr-primary;
  }
  &__account {
    color: $clr-secondary;
  }
  &__action-box {
    display: flex;
    padding-top: 15px;
  }
  &__reply {
    margin-right: 155px;
  }
  &__icon {
    width: 24.69px;
    height: 24.69px;
  }
}
</style>
