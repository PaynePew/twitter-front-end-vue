<template>
  <section class="article-modal-reply">
    <div class="article-modal-reply__wrapper">
      <div class="article-modal-reply__container">
        <div class="article-modal-reply__side">
          <img
            class="article-modal-reply__avatar"
            :src="article.User.avatar"
            alt=""
          />
          <span class="article-modal-reply__dash"></span>
        </div>
        <div class="article-modal-reply__main">
          <div class="article-modal-reply__header">
            <div class="article-modal-reply__name">
              {{ article.User.name }}
            </div>
            <div class="article-modal-reply__account">
              @{{ article.User.account }}
            </div>
            <span>·</span>
            <div class="article-modal-reply__time">
              {{ fromNow(article.createdAt) }}
            </div>
          </div>

          <div class="article-modal-reply__body">
            {{ article.description }}
          </div>
          <div class="article-modal-reply__subtitle">
            <span class="article-modal-reply__prefix">回覆</span>
            <div class="article-modal-reply__suffix">
              @{{ article.User.account }}
            </div>
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
    article: Object,
  },
  data() {
    return {};
  },
  mixins: [fromNowMixin],
};
</script>

<style lang="scss" scoped>
.article-modal-reply {
  &__wrapper {
    max-width: 600px;
    margin-bottom: 10px;
  }
  &__container {
    display: flex;
  }
  &__header {
    display: flex;
    color: $clr-secondary;
  }
  &__side {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__dash {
    display: flex;
    width: 2px;
    background: $clr-dash;
    margin-top: 5px;
    flex: 1 1 auto;
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
    margin-top: 19px;
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
}
</style>
