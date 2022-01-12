<template>
  <section class="navbar">
    <div class="navbar__wrapper">
      <div>
        <div class="navbar__header">
          <img class="navbar__logo" src="@/assets/img/logo@2x.png" alt="" />
        </div>
        <div class="navbar__body" v-if="!isAdminPage">
          <router-link class="navbar__menu" to="/home">
            <img
              v-if="HomeURL.includes(currentPage)"
              src="@/assets/img/icon_house_active@2x.png"
              class="navbar__icon"
            />
            <img
              v-else
              src="@/assets/img/icon_house@2x.png"
              class="navbar__icon"
            />
            <div
              :class="[
                'navbar__title',
                { 'navbar__title--active': HomeURL.includes(currentPage) },
              ]"
            >
              首頁
            </div>
          </router-link>
          <router-link
            class="navbar__menu"
            :to="{
              name: 'ChatPublic',
            }"
          >
            <img
              v-if="currentPage === 'ChatPublic'"
              src="@/assets/img/icon_msg_active@2x.png"
              class="navbar__icon"
            />
            <img
              v-else
              src="@/assets/img/icon_msg@2x.png"
              class="navbar__icon"
            />
            <div
              :class="[
                'navbar__title',
                {
                  'navbar__title--active': currentPage === 'ChatPublic',
                },
              ]"
            >
              公開聊天室
            </div>
          </router-link>
          <router-link
            class="navbar__menu"
            :to="{
              name: 'ChatPrivate',
            }"
          >
            <img
              v-if="currentPage === 'ChatPrivate'"
              src="@/assets/img/icon_msg_active@2x.png"
              class="navbar__icon"
            />
            <img
              v-else
              src="@/assets/img/icon_msg@2x.png"
              class="navbar__icon"
            />
            <div
              :class="[
                'navbar__title',
                {
                  'navbar__title--active': currentPage === 'ChatPrivate',
                },
              ]"
            >
              私人訊息
              <span class="navbar__unread">{{ unReadCount }}</span>
            </div>
          </router-link>
          <router-link
            class="navbar__menu"
            :to="{
              name: 'UserInfo',
              params: { userId: currentUser.id || 'null' },
            }"
          >
            <img
              v-if="$route.params.userId == currentUser.id"
              src="@/assets/img/icon_user_active@2x.png"
              class="navbar__icon"
            />
            <img
              v-else
              src="@/assets/img/icon_user@2x.png"
              class="navbar__icon"
            />
            <div
              :class="[
                'navbar__title',
                {
                  'navbar__title--active':
                    $route.params.userId == currentUser.id,
                },
              ]"
            >
              個人資料
            </div>
          </router-link>
          <router-link class="navbar__menu" to="/settings/account">
            <img
              v-if="currentPage === 'SettingAccount'"
              src="@/assets/img/icon_gear_active@2x.png"
              class="navbar__icon"
            />
            <img
              v-else
              src="@/assets/img/icon_gear@2x.png"
              class="navbar__icon"
            />
            <div
              :class="[
                'navbar__title',
                { 'navbar__title--active': currentPage === 'SettingAccount' },
              ]"
            >
              設定
            </div>
          </router-link>
          <div class="navbar__menu">
            <button @click.stop="handleNewPost" class="navbar__button">
              推文
            </button>
          </div>
        </div>

        <div class="navbar__body" v-if="isAdminPage">
          <router-link class="navbar__menu" to="/admin/articles">
            <img src="@/assets/img/icon_house@2x.png" class="navbar__icon" />
            <div
              :class="[
                'navbar__title',
                { 'navbar__title--active': currentPage === 'AdminArticles' },
              ]"
            >
              推文清單
            </div>
          </router-link>
          <router-link class="navbar__menu" to="/admin/users">
            <img src="@/assets/img/icon_user@2x.png" class="navbar__icon" />
            <div
              :class="[
                'navbar__title',
                { 'navbar__title--active': currentPage === 'AdminUsers' },
              ]"
            >
              使用者列表
            </div>
          </router-link>
        </div>
      </div>
      <div class="navbar__footer">
        <div class="navbar__logout" @click="logout">
          <img src="@/assets/img/icon_logout@2x.png" class="navbar__icon" />
          <div class="navbar__title">登出</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavBar",
  data() {
    return {
      HomeURL: ["Home", "ArticleShow"],
      UserURL: ["UserInfo", "UserInfoWithReply", "UserInfoWithLike"],
      unReadCount: 0,
    };
  },
  sockets: {
    unReadCount(data) {
      this.unReadCount = data;
    },
  },
  created() {
    this.$socket.connect();
  },
  mounted() {
    this.$nextTick(function () {
      this.joinPrivate(this.currentUser.id);
      this.$socket.emit("unReadCount", this.currentUser.id);
    });
  },
  computed: {
    isAdminPage() {
      let currentURL = this.$route;
      const pathWithoutSideRender = ["AdminUsers", "AdminArticles"];
      if (pathWithoutSideRender.includes(currentURL.name)) {
        return true;
      }
      return false;
    },
    currentPage() {
      return this.$route.name;
    },
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
    }),
  },

  methods: {
    joinPrivate(senderId) {
      this.$socket.emit("privateEnter", { senderId });
    },
    handleNewPost() {
      this.$emit("after-click");
    },

    logout() {
      this.$store.commit("authentication/revokeAuthentication");
      this.$store.commit("chatPrivate/RESET_PRIVATE");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 235px;
  height: 100vh;
  padding: 0 20px;
  display: flex;
  flex: 0 1 auto;
  align-items: stretch;
  position: relative;

  &__wrapper {
    position: fixed;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    height: 100vh;
    width: inherit;
    justify-content: space-between;
  }

  &__logo {
    width: 30px;
    height: 30px;
    margin-top: 14px;
    margin-left: 10px;
    margin-bottom: 30px;
  }

  &__unread {
    font-size: 15px;
    font-weight: bold;
    color: red;
  }

  &__menu {
    display: flex;
    margin-bottom: 30px;
    margin-left: 10px;
    font-size: 18px;
    text-decoration: none;
  }
  &__icon {
    width: 24px;
    height: 24px;
  }
  &__title {
    margin-left: 1.3rem;
    font-weight: bold;
    color: $clr-form-primary;
    &--active {
      color: $clr-third;
    }
  }
  &__button {
    background-color: $btn-primary;
    color: $clr-fourth;
    border-radius: 100px;
    border-style: none;
    height: 38px;
    width: 210px;
    cursor: pointer;
  }
  &__logout {
    margin-left: 10px;
    display: flex;
    height: 60px;
    cursor: pointer;
  }
}
</style>
