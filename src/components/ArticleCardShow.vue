<template>
  <section class="article-show">
    <div class="article-show__wrapper">
      <div class="article-show__container">
        <div class="article-show__header">
          <img
            class="article-show__avatar"
            :src="article.tweet.User.avatar"
            alt=""
          />
          <div class="article-show__title">
            <div class="article-show__name">
              {{ article.tweet.User.name }}
            </div>
            <div class="article-show__account">
              @{{ article.tweet.User.account }}
            </div>
          </div>
        </div>
        <div class="article-show__main">
          <div class="article-show__des">
            {{ article.tweet.description }}
          </div>
          <div class="article-show__time-box">
            <div class="article-show__time">
              <span>·</span>{{ article.tweet.createdAt }}
            </div>
          </div>
          <div class="article-show__popular-box">
            <div class="article-show__popular">
              <div class="article-show__prefix">34&nbsp;</div>
              <div class="article-show__suffix">回覆</div>
            </div>
            <div class="article-show__popular">
              <div class="article-show__prefix">808&nbsp;</div>
              <div class="article-show__suffix">喜歡次數</div>
            </div>
          </div>
          <div class="article-show__action-box">
            <div class="article-show__reply" @click.stop="TOGGLE_MODAL">
              <img
                class="article-show__icon"
                src="@/assets/img/icon_reply@2x.png"
                alt=""
              />
            </div>
            <div class="article-show__like">
              <img
                class="article-show__icon"
                src="@/assets/img/icon_like@2x.png"
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
export default {
  props: {
    currentUser: Object,
    article: Array,
  },
  data() {
    return {
      allarticles: [],
    };
  },
  methods: {
    ...mapMutations(["TOGGLE_MODAL"]),
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
  }
  &__des {
    font-size: $fs-h1;
    font-weight: 500;
    margin-bottom: 15px;
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
