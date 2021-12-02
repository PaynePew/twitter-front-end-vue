<template>
  <section class="article-create">
    <div class="article-create__wrapper">
      <div class="article-create__header">
        <img :src="currentUser.avatar" alt="" class="article-create__avatar" />
      </div>
      <div class="article-create__body">
        <form class="article-create__form" action="">
          <input
            class="article-create__input"
            type="textarea"
            placeholder="有甚麼新鮮事?"
          />
          <div class="article-create__footer">
            <button class="article-create__btn btn">推文</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    currentUser: Object,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/_button.scss";
.article-create {
  &__wrapper {
    display: flex;
    width: 600px;
    height: 120px;
    border-bottom: 1px solid $clr-border;
  }
  &__header {
    margin-top: 10px;
    margin-left: 15px;
  }
  &__avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  &__body {
    display: flex;
    width: 100%;
  }
  &__form {
    display: flex;
    width: 100%;
    flex: 1 1 auto;
    flex-direction: column;
  }
  &__input {
    height: 100%;
    margin-top: 20px;
    border-style: none;
    &:focus {
      outline: none;
    }
  }
  &__footer {
    margin-right: 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
  }
  &__btn {
    width: 66px;
  }
}
</style>
