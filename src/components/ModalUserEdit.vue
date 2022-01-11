<template>
  <section class="modal">
    <div class="modal__mask">
      <div @click.self="TOGGLE_MODAL" class="modal__wrapper">
        <form @submit.prevent="handleSubmit">
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
                <button class="btn btn--primary" :disabled="isProcessing">
                  {{ isProcessing ? "上傳中..." : "儲存" }}
                </button>
              </div>
            </div>
            <section class="userinfo-card">
              <div class="userinfo-card__wrapper">
                <div class="userinfo-card__container">
                  <div class="userinfo-card__cover-box">
                    <img
                      :src="userInfo.cover"
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
                      <label for="cover-remove">
                        <img
                          @click.stop="handleDeleteCover"
                          class="userinfo-card__cover-delete"
                          src="@/assets/img/icon_delete@2x.png"
                        />
                      </label>
                      <input
                        id="cover-remove"
                        type="text"
                        name="noCover"
                        v-model="coverNull"
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
                          v-if="userInfo.avatar"
                          :src="userInfo.avatar"
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
                    />
                  </div>
                  <div class="form__hint">
                    <p
                      class="form__error-message"
                      v-if="userInfo.name.length > 20"
                    >
                      字數超出上限！
                    </p>
                    <p class="form__counter">
                      {{ 0 || userInfo.name.length }}/20
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
                    />
                  </div>
                  <div class="form__hint">
                    <p
                      class="form__error-message"
                      v-if="userInfo.introduction.length > 50"
                    >
                      字數超出上限！
                    </p>
                    <p class="form__counter">
                      {{ 0 || userInfo.introduction.length }}/50
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </form>
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
      },
      coverNull: "",
      isProcessing: false,
    };
  },
  created() {
    this.loadUserInfo();
  },
  methods: {
    ...mapMutations("modalUserInfo", ["TOGGLE_MODAL"]),
    async handleSubmit(e) {
      try {
        if (this.userInfo.name.length > 20) {
          throw new Error("名稱超過字數");
        } else if (this.userInfo.introduction.length > 50) {
          throw new Error("自我介紹超過字數");
        }
        this.isProcessing = true;
        const form = e.target;
        const formData = new FormData(form);
        const { data } = await usersAPI.info.update({ formData });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.$store.commit("noticeInfo/toggleNotice", {
          type: "success",
          message: data.message,
        });
        this.isProcessing = false;
        this.$emit("after-submit");
      } catch (error) {
        this.isProcessing = false;
        this.$store.commit("noticeInfo/toggleNotice", {
          type: "error",
          message: error.message,
        });
      }
    },
    loadUserInfo() {
      const { name, introduction, avatar, cover } = this.initUserInfo;
      this.userInfo = {
        name,
        introduction,
        avatar,
        cover,
      };
    },
    handleCoverChange(e) {
      const files = e.target.files;
      if (files.length === 0) {
        this.userInfo.cover = "";
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.userInfo.cover = imageURL;
        this.coverNull = "";
      }
    },
    handleAvatarChange(e) {
      const files = e.target.files;
      if (files.length === 0) {
        this.userInfo.avatar = "";
      } else {
        const imageURL = window.URL.createObjectURL(files[0]);
        this.userInfo.avatar = imageURL;
      }
    },
    handleDeleteCover() {
      this.userInfo.cover = "https://i.imgur.com/l8uvSR5.jpeg";
      this.coverNull = "https://i.imgur.com/l8uvSR5.jpeg";
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
    cursor: pointer;
  }
  &__body {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }
  &__edit-wrapper {
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
    cursor: pointer;
  }
  &__cover-delete {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  &__avatar-upload {
    width: 20px;
    height: 20px;
    cursor: pointer;
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
