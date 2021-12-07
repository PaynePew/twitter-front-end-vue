<template>
  <section class="userinfo-card">
    <div class="userinfo-card__wrapper">
      <div class="userinfo-card__container">
        <div class="userinfo-card__cover-box">
          <img :src="currentUser.cover" alt="" class="userinfo-card__cover" />
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
            <div class="userinfo-card__setting">
              <!-- 此處需增加currentUser判定 -->
              <div v-if="isShow" class="userinfo-card__utils">
                <img
                  class="userinfo-card__btn"
                  src="@/assets/img/btn_messege@2x.png"
                  alt=""
                />
                <img
                  class="userinfo-card__btn"
                  src="@/assets/img/btn_noti@2x.png"
                  alt=""
                />
                <!-- 此處需要判定開啟提醒 -->
                <img
                  v-if="active"
                  class="userinfo-card__btn"
                  src="@/assets/img/btn_noti_active@2x.png"
                  alt=""
                />
                <!-- 此處需要判定追蹤 -->
                <button v-if="active" class="btn btn--opacity">跟隨</button>
                <button class="btn btn--primary">正在跟隨</button>
              </div>
              <button @click.stop="TOGGLE_MODAL" class="btn btn--opacity">
                編輯個人檔案
              </button>
            </div>
          </div>
          <div class="userinfo-card__title">
            <div class="userinfo-card__name">{{ currentUser.name }}</div>
            <div class="userinfo-card__account">@{{ currentUser.account }}</div>
          </div>
          <div class="userinfo-card__des">{{ currentUser.introduction }}</div>
          <div class="userinfo-card__relation-list">
            <div class="userinfo-card__relation">
              <router-link
                class="userinfo-card__nav"
                :to="{ name: 'Following' }"
              >
                <span class="userinfo-card__prefix">2 個</span>
                <span class="userinfo-card__suffix">跟隨中</span>
              </router-link>
            </div>
            <div class="userinfo-card__relation">
              <router-link
                class="userinfo-card__nav"
                :to="{ name: 'Follower' }"
              >
                <span class="userinfo-card__prefix">59 位</span>
                <span class="userinfo-card__suffix">跟隨者</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    currentUser: {
      Object,
    },
  },

  methods: {
    ...mapMutations("modalUserInfo", ["TOGGLE_MODAL"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/_button-share.scss";
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
    padding: 10px 15px;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  &__utils {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &__avatar-box {
    position: relative;
    margin-top: -75px;
  }
  &__avatar {
    border-radius: 50%;
    width: 140px;
    height: 140px;
    border: 4px solid $clr-fourth;
  }
  &__title {
    margin: 5px 0 10px 0;
  }
  &__name {
    font-size: $fs-h2;
    font-weight: bold;
  }
  &__account {
    color: $clr-secondary;
  }
  &__des {
    font-size: $fs-h5;
    margin-bottom: 10px;
  }
  &__relation-list {
    display: flex;
  }
  &__relation {
    margin-right: 20px;
  }

  &__nav {
    text-decoration: none;
    &:visited {
      color: inherit;
    }
  }
  &__prefix {
    color: $clr-primary;
    font-weight: bold;
  }
  &__suffix {
    color: $clr-secondary;
  }
  &__btn {
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }
}
</style>
