<template>
  <section class="modal">
    <div class="modal__mask">
      <div @click.self="TOGGLE_MODAL" class="modal__wrapper">
        <div class="modal__container">
          <div class="modal__header">
            <img
              @click.self="TOGGLE_MODAL"
              class="modal__icon"
              src="@/assets/img/icon_close@2x.png"
              alt=""
            />
            <div class="modal__appBar">
              <span>編輯個人資料</span>
              <button class="btn btn--primary">儲存</button>
            </div>
          </div>
          <div class="modal__body">
            <section class="userinfo-card">
              <div class="userinfo-card__wrapper">
                <div class="userinfo-card__container">
                  <div class="userinfo-card__cover-box">
                    <img
                      :src="currentUser.cover"
                      alt=""
                      class="userinfo-card__cover"
                    />
                  </div>
                  <div class="userinfo-card__main">
                    <div class="userinfo-card__header">
                      <div class="userinfo-card__avatar-box">
                        <img
                          :src="currentUser.avatar"
                          alt=""
                          class="userinfo-card__avatar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="modal__edit-wrapper">
              <form class="modal__form form">
                <div class="form__input-box">
                  <label class="form__label" for="name">名稱</label>
                  <div class="form__input-container">
                    <input
                      id="name"
                      v-model="name"
                      name="name"
                      type="text"
                      class="form__input"
                      required
                      @focus="focus = 'name'"
                      @blur="focus = null"
                    />
                  </div>
                  <div class="form__hint">
                    <p class="form__error-message" v-if="nameLength > 50">
                      字數超出上限！
                    </p>
                    <p class="form__counter" v-show="focus === 'name'">
                      {{ 0 || nameLength }}/50
                    </p>
                  </div>
                </div>
                <div class="form__input-box form__input-box--textarea">
                  <label class="form__label" for="name">自我介紹</label>
                  <div class="form__input-container">
                    <input
                      id="name"
                      v-model="name"
                      name="name"
                      type="textarea"
                      class="form__input form__input--textarea"
                      required
                      @focus="focus = 'name'"
                      @blur="focus = null"
                    />
                  </div>
                  <div class="form__hint">
                    <p class="form__error-message" v-if="nameLength > 50">
                      字數超出上限！
                    </p>
                    <p class="form__counter" v-show="focus === 'name'">
                      {{ 0 || nameLength }}/50
                    </p>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { articlesDummy } from "@/store/dummy/articlesDummy";
import { mapMutations } from "vuex";
export default {
  components: {},
  data() {
    return {
      currentUser: [],
    };
  },
  created() {
    this.currentUser = articlesDummy[0].tweet.User;
  },
  methods: {
    ...mapMutations("modalUserInfo", ["TOGGLE_MODAL"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/_button-share.scss";
@import "@/assets/scss/components/_form.scss";
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
    padding: 0 15px;
  }
  &__appBar {
    flex: 1 1 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > span {
      font-weight: bold;
    }
  }
  &__icon {
    width: 24px;
    height: 24px;
    margin-right: 44.5px;
  }
  &__body {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }
  &__edit-wrapper {
    display: flex;
    padding: 20px 15px 72px;
  }
}

.userinfo-card {
  &__container {
    display: flex;
    flex-direction: column;
  }
  &__cover {
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: contain;
  }
  &__main {
    padding: 0 15px;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  &__avatar-box {
    position: relative;
    margin-top: -75px;
  }
  &__avatar {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    border: 4px solid $clr-fourth;
  }
}
.btn {
  height: 28px;
}
.form {
  width: 100%;
  &__container {
    display: flex;
  }

  &__input-box {
    width: 100%;
    margin-top: 0;
    &--textarea {
      margin-top: 42px;
      height: 150px;
    }
  }
  &__input {
    font-weight: bold;
    &--textarea {
      height: 100%;
      font-weight: 500;
    }
  }
}
</style>
