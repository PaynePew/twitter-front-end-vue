<template>
  <section class="modal">
    <div class="modal__mask">
      <div @click.self="$emit('close')" class="modal__wrapper">
        <div class="modal__container">
          <div class="modal__header">
            <img
              @click.self="$emit('close')"
              class="modal__icon"
              src="@/assets/img/icon_close@2x.png"
              alt=""
            />
          </div>
          <div class="modal__body">
            <div class="modal__side">
              <img class="modal__avatar" :src="users[0].avatar" alt="" />
            </div>
            <form class="article-create__form" action="">
              <div class="article-create__input-box">
                <input
                  class="article-create__input"
                  type="textarea"
                  placeholder="有甚麼新鮮事?"
                  rows="5"
                  cols="33"
                  maxlength="40"
                />
              </div>
              <div class="article-create__footer">
                <button class="article-create__btn btn">推文</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    users: {
      Array,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/_button.scss";
.modal {
  &__mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    transition: opacity 0.3s ease;
  }
  &__wrapper {
    margin-top: 54px;
  }
  &__container {
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 300px;
    margin: 0px auto;
    background-color: $clr-fourth;
    border-radius: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }
  &__header {
    display: flex;
    align-items: center;
    height: 54px;
    border-bottom: 1px solid $clr-border;
  }
  &__icon {
    width: 24px;
    height: 24px;
    padding: 15px;
  }
  &__body {
    padding: 15px;
    display: flex;
    flex: 1 1 auto;
  }
  &__avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}

.article-create {
  &__form {
    display: flex;
    width: 100%;
    flex: 1 1 auto;
    flex-direction: column;
  }
  &__input-box {
    flex: 1 1 auto;
    width: 100%;
  }
  &__input {
    border-style: none;
    width: 100%;
    margin-top: 12px;
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
