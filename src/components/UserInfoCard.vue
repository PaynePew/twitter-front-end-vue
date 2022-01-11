<template>
  <section class="userinfo-card">
    <div class="userinfo-card__wrapper">
      <div class="userinfo-card__container">
        <div class="userinfo-card__cover-box">
          <img :src="userInfo.cover" alt="" class="userinfo-card__cover" />
        </div>
        <div class="userinfo-card__main">
          <div class="userinfo-card__header">
            <div class="userinfo-card__avatar-box">
              <img
                :src="userInfo.avatar"
                alt=""
                class="userinfo-card__avatar"
              />
            </div>
            <div class="userinfo-card__setting">
              <!-- 此處需增加currentUser判定 -->
              <div v-if="!isSelf" class="userinfo-card__utils">
                <router-link :to="{ name: 'ChatPrivate' }">
                  <img
                    class="userinfo-card__btn"
                    src="@/assets/img/btn_messege@2x.png"
                    alt=""
                    @click="
                      selectReceiver(userInfo.id);
                      selectTempUser(userInfo.name);
                    "
                  />
                </router-link>
                <img
                  v-if="!isNoti"
                  @click.stop="handleNoti"
                  class="userinfo-card__btn"
                  src="@/assets/img/btn_noti@2x.png"
                  alt=""
                />
                <img
                  v-else
                  @click.stop="handleNoti"
                  class="userinfo-card__btn"
                  src="@/assets/img/btn_noti_active@2x.png"
                  alt=""
                />
                <!-- 此處需要判定追蹤 -->
                <button
                  @click.stop="addFollowShips(userInfo.id)"
                  v-if="!userInfo.isFollowed"
                  class="btn btn--opacity"
                >
                  跟隨
                </button>
                <button
                  @click.stop="deleteFollowShips(userInfo.id)"
                  v-else
                  class="btn btn--primary"
                >
                  正在跟隨
                </button>
              </div>
              <button
                v-if="isSelf"
                @click.stop="TOGGLE_MODAL"
                class="btn btn--opacity"
              >
                編輯個人檔案
              </button>
            </div>
          </div>
          <div class="userinfo-card__title">
            <div class="userinfo-card__name">{{ userInfo.name }}</div>
            <div class="userinfo-card__account">@{{ userInfo.account }}</div>
          </div>
          <div class="userinfo-card__des">{{ userInfo.introduction }}</div>
          <div class="userinfo-card__relation-list">
            <div class="userinfo-card__relation">
              <router-link
                class="userinfo-card__nav"
                :to="{ name: 'Following' }"
              >
                <span class="userinfo-card__prefix"
                  >{{ userInfo.FollowingCount }} 個</span
                >
                <span class="userinfo-card__suffix">跟隨中</span>
              </router-link>
            </div>
            <div class="userinfo-card__relation">
              <router-link
                class="userinfo-card__nav"
                :to="{ name: 'Follower' }"
              >
                <span class="userinfo-card__prefix"
                  >{{ userInfo.FollowerCount }} 位</span
                >
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
import usersAPI from "@/apis/users";
export default {
  props: {
    initUserInfo: {
      Object,
    },
    initIsSelf: {
      Boolean,
    },
  },
  data() {
    return {
      userInfo: this.initUserInfo,
      isSelf: this.initIsSelf,
      isNoti: false,
    };
  },
  watch: {
    initUserInfo(newValue) {
      this.userInfo = newValue;
    },
    initIsSelf(newValue) {
      this.isSelf = newValue;
    },
  },
  methods: {
    ...mapMutations({
      selectTempUser: "chatPrivate/selectTempUser",
      selectReceiver: "chatPrivate/selectReceiver",
      TOGGLE_MODAL: "modalUserInfo/TOGGLE_MODAL",
    }),
    async addFollowShips(id) {
      try {
        this.$emit("after-follow");
        const { data } = await usersAPI.follower.addFollowShips(id);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteFollowShips(id) {
      try {
        this.$emit("after-follow");
        const { data } = await usersAPI.follower.deleteFollowShips(id);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    handleNoti() {
      this.isNoti = !this.isNoti;
    },
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
  &__cover-box {
    height: 200px;
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
