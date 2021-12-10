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
              <button @click.stop="handleSubmit" class="btn btn--primary">
                儲存
              </button>
            </div>
          </div>
          <section class="userinfo-card">
            <div class="userinfo-card__wrapper">
              <div class="userinfo-card__container">
                <div class="userinfo-card__cover-box">
                  <img
                    :src="userInfo.coverTemp"
                    alt=""
                    class="userinfo-card__cover"
                  />
                  <div class="userinfo-card__cover-utils">
                    <label for="cover-input">
                      <img
                        class="userinfo-card__cover-upload"
                        src="@/assets/img/icon_upload@2x.png"
                        alt=""
                      />
                    </label>
                    <img
                      @click.stop="handleDeleteCover"
                      class="userinfo-card__cover-delete"
                      src="@/assets/img/icon_delete@2x.png"
                    />
                    <input
                      id="cover-input"
                      type="file"
                      name="cover"
                      accept="image/*"
                      class="form-control-file"
                      @change="handleCoverChange"
                    />
                  </div>
                </div>
                <div class="userinfo-card__main">
                  <div class="userinfo-card__header">
                    <div class="userinfo-card__avatar-box">
                      <img
                        v-if="userInfo.avatarTemp"
                        :src="userInfo.avatarTemp"
                        alt=""
                        class="userinfo-card__avatar"
                      />
                      <div class="userinfo-card__image-upload">
                        <label for="avatar-input">
                          <img
                            class="userinfo-card__avatar-upload"
                            src="@/assets/img/icon_upload@2x.png"
                            alt=""
                          />
                        </label>
                        <input
                          id="avatar-input"
                          type="file"
                          name="avatar"
                          accept="image/*"
                          class="form-control-file"
                          @change="handleAvatarChange"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="modal__body">
            <section class="modal__edit-wrapper">
              <form
                @submit.stop.prevent="handleSubmit"
                class="modal__form form"
                enctype="multipart/form-data"
              >
                <div class="form__input-box">
                  <label class="form__label" for="name">名稱</label>
                  <div class="form__input-container">
                    <input
                      id="name"
                      v-model="userInfo.name"
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
                  <label class="form__label" for="introduction">自我介紹</label>
                  <div class="form__input-container">
                    <input
                      id="introduction"
                      v-model="userInfo.introduction"
                      name="introduction"
                      type="text"
                      class="form__input form__input--textarea"
                      required
                      @focus="focus = 'introduction'"
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
import { mapMutations } from "vuex";
import usersAPI from "@/apis/users";
export default {
  props: {
    initUserInfo: Object,
  },
  data() {
    return {
      userInfo: {
        name: "",
        introduction: "",
        cover: "",
        avatar: "",
        coverTemp: "",
        avatarTemp: "",
      },
    };
  },
  created() {
    this.loadUserInfo();
  },
  methods: {
    ...mapMutations("modalUserInfo", ["TOGGLE_MODAL"]),
    async handleSubmit() {
      try {
        const formData = new FormData();
        formData.append("avatar", this.userInfo.avatar[0]);
        formData.append("cover", this.userInfo.cover[0]);
        formData.append("name", this.userInfo.name);
        formData.append("introduction", this.userInfo.introduction);
        for (let [name, value] of formData.entries()) {
          console.log(name + ":" + value);
        }
        const { data } = await usersAPI.info.update({ formData });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    loadUserInfo() {
      const { name, introduction, avatar, cover } = this.initUserInfo;
      this.userInfo = {
        name,
        introduction,
        avatar,
        cover,
        coverTemp: cover,
        avatarTemp: avatar,
      };
    },
    handleCoverChange(e) {
      const files = e.target.files;
      if (files.length === 0) {
        this.userInfo.cover = "";
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.userInfo.cover = files;
        this.userInfo.coverTemp = imageURL;
      }
    },
    handleAvatarChange(e) {
      const files = e.target.files;
      console.log(files);
      if (files.length === 0) {
        this.userInfo.avatar = "";
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.userInfo.avatar = files;
        this.userInfo.avatarTemp = imageURL;
      }
    },
    handleDeleteCover() {
      this.userInfo.cover = "https://i.imgur.com/l8uvSR5.jpeg";
    },
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
    border-radius: 50%;
    width: 120px;
    height: 120px;
    margin-top: -75px;
  }
  &__avatar {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    border: 4px solid $clr-fourth;
  }
  &__cover-box {
    position: relative;
    height: 200px;
    width: 100%;
  }
  &__cover-utils {
    position: absolute;
    z-index: 999;
    top: 45%;
    left: 45%;
    > input {
      display: none;
    }
  }
  &__cover-upload {
    width: 20px;
    height: 20px;
    margin-right: 36.5px;
  }
  &__cover-delete {
    width: 20px;
    height: 20px;
  }
  &__avatar-upload {
    width: 20px;
    height: 20px;
  }
  &__image-upload {
    position: absolute;
    z-index: 990;
    left: 45%;
    top: 45%;
    > input {
      display: none;
    }
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
