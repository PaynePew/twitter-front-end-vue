<template>
  <AppBar :status="userInfo.name" :stepper="true" :tweetNum="tweetNum" />
  <Spinner v-if="isLoading" />
  <UserInfoCard
    v-else
    :init-userInfo="userInfo"
    :init-isSelf="isSelf"
    @after-follow="handleRelation"
  />
  <ModalUserEdit
    v-if="isShow"
    :init-user-info="userInfo"
    @after-submit="handleAfterSubmit"
  />

  <UserInfoTab />
  <Spinner v-if="isTabLoading" />
  <div v-if="!isTabLoading">
    <ArticleCard v-if="$route.name === 'UserInfo'" :init-articles="articles" />
    <ArticleCardWithReplyTab
      v-if="$route.name === 'UserInfoWithReply'"
      :init-articles="replyArticle"
    />
    <ArticleCardWithLike
      v-if="$route.name === 'UserInfoWithLike'"
      :init-articles="likeArticle"
    />
  </div>
</template>

<script>
import usersAPI from "@/apis/users";
import AppBar from "@/components/AppBar.vue";
import UserInfoCard from "@/components/UserInfoCard.vue";
import UserInfoTab from "@/components/UserInfoTab.vue";
import ArticleCard from "@/components/ArticleCard.vue";
import ArticleCardWithLike from "@/components/ArticleCardWithLike.vue";
import ArticleCardWithReplyTab from "@/components/ArticleCardWithReplyTab.vue";
import ModalUserEdit from "@/components/ModalUserEdit.vue";
import Spinner from "@/components/Spinner.vue";
import { mapState } from "vuex";

export default {
  components: {
    ArticleCard,
    ArticleCardWithLike,
    ArticleCardWithReplyTab,
    UserInfoCard,
    UserInfoTab,
    AppBar,
    ModalUserEdit,
    Spinner,
  },
  data() {
    return {
      userInfo: {},
      articles: [],
      likeArticle: [],
      replyArticle: [],
      owner: [],
      isLoading: true,
      isTabLoading: true,
      tweetNum: "",
    };
  },
  created() {
    const { userId } = this.$route.params;
    this.getUser(userId);
    this.getArticle(userId);
  },
  computed: {
    ...mapState({
      isShow: (state) => state.modalUserInfo.isShow,
      userInfoRefresh: (state) => state.modalArticle.userInfoRefresh,
      currentUser: (state) => state.authentication.currentUser,
    }),
    isSelf() {
      return Number(this.$route.params.userId) === this.currentUser.id;
    },
  },
  watch: {
    userInfo(newValue) {
      this.articles = this.articles.map((_articles) => {
        return { ..._articles, User: { ...newValue } };
      });
    },
    userInfoRefresh() {
      const { userId } = this.$route.params;
      this.getArticle(userId);
    },
  },
  methods: {
    async getUser(id) {
      try {
        const { data } = await usersAPI.getUser(id);
        this.userInfo = data;
        this.isTabLoading = false;
        this.isLoading = false;
        this.getLikes(id);
        this.getReplies(id);
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async getArticle(userId) {
      try {
        const { data } = await usersAPI.tweet.getTweets(userId);
        this.articles = data;
        this.tweetNum = data.length;
        this.articles = this.articles.map((_articles) => {
          return { ..._articles, User: { ...this.userInfo } };
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getLikes(userId) {
      try {
        const { data } = await usersAPI.like.getLikes(userId);
        this.likeArticle = data;
      } catch (error) {
        console.log(error);
      }
    },
    async getReplies(userId) {
      try {
        const { data } = await usersAPI.reply.getReplies(userId);
        this.replyArticle = data;
        this.replyArticle = this.replyArticle.map((_replyArticle) => {
          return { ..._replyArticle, owner: { ...this.userInfo } };
        });
      } catch (error) {
        console.log(error);
      }
    },
    handleRelation() {
      this.userInfo.isFollowed = !this.userInfo.isFollowed;
    },
    handleAfterSubmit() {
      const { userId } = this.$route.params;
      this.getUser(userId);
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.isTabLoading = true;
    this.isLoading = true;
    const { userId } = to.params;
    this.getUser(userId);
    this.getArticle(userId);
    next();
  },
};
</script>

<style lang="scss" scoped></style>
