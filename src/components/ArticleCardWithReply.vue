<template>
  <section
    v-for="(reply, index) in replies"
    :key="index"
    class="article-card-reply"
  >
    <div class="article-card-reply__wrapper">
      <div class="article-card-reply__container">
        <div class="article-card-reply__side">
          <img
            class="article-card-reply__avatar"
            :src="reply.User.avatar"
            alt=""
          />
        </div>
        <div class="article-card-reply__main">
          <div class="article-card-reply__header">
            <div class="article-card-reply__name">
              {{ reply.User.name }}
            </div>
            <div class="article-card-reply__account">
              @{{ reply.User.account }}
            </div>
            <span>·</span>
            <div class="article-card-reply__time">
              {{ fromNow(reply.createdAt) }}
            </div>
          </div>
          <div class="article-card-reply__subtitle">
            <span class="article-card-reply__prefix">回覆</span>
            <div class="article-card-reply__suffix">@{{ owner.account }}</div>
          </div>
          <div class="article-card-reply__body">
            {{ reply.comment }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { fromNowMixin } from "@/utils/mixins";
export default {
  props: {
    initArticle: Array,
    owner: Object,
  },
  data() {
    return {
      replies: this.initArticle,
    };
  },

  watch: {
    initArticle(newValue) {
      this.replies = newValue;
    },
  },
  mixins: [fromNowMixin],
};
</script>

<style lang="scss" scoped>
.article-card-reply {
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
  &__subtitle {
    display: flex;
    font-weight: 500;
  }
  &__prefix {
    color: $clr-secondary;
    margin-right: 3px;
  }
  &__suffix {
    color: $clr-third;
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
}
</style>
