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
            <ArticleModalWithReply
              v-if="articleReply.User"
              :article="articleReply"
            />
            <div class="modal__post">
              <div class="modal__side">
                <img class="modal__avatar" :src="users.avatar" alt="" />
              </div>
              <form
                v-if="!articleReply.User"
                class="article-create__form"
                action=""
              >
                <div class="article-create__input-box">
                  <textarea
                    class="article-create__input"
                    placeholder="有甚麼新鮮事?"
                    rows="3"
                    cols="50"
                    maxlength="140"
                    v-model="description"
                  />
                </div>
                <div class="article-create__footer">
                  <button
                    @click.stop.prevent="postArticle"
                    class="article-create__btn btn"
                  >
                    推文
                  </button>
                </div>
              </form>
              <form v-else class="article-create__form" action="">
                <div class="article-create__input-box">
                  <input
                    class="article-create__input"
                    type="textarea"
                    placeholder="推你的回覆"
                    rows="5"
                    cols="33"
                    maxlength="40"
                    v-model="description"
                  />
                </div>
                <div class="article-create__footer">
                  <button
                    @click.prevent="postReply"
                    class="article-create__btn btn"
                  >
                    回覆
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ArticleModalWithReply from "@/components/ArticleModalWithReply.vue";
import articlesAPI from "@/apis/articles";
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    users: {
      Array,
    },
  },
  components: {
    ArticleModalWithReply,
  },
  data() {
    return {
      description: "",
      isProcessing: false,
    };
  },
  created() {},
  computed: {
    ...mapState("modalArticle", ["articleReply"]),
    ...mapMutations("modalArticle", ["TOGGLE_MODAL"]),
  },
  methods: {
    async postArticle() {
      try {
        this.isProcessing = true;
        const { data } = await articlesAPI.createArticle(this.description);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.description = "";
        this.$store.commit("noticeInfo/toggleNotice", {
          type: "success",
          message: "發文成功",
        });
        this.$store.commit("modalArticle/TOGGLE_MODAL");
        this.$store.dispatch("modalArticle/FETCH_ARTICLES");
      } catch (error) {
        this.isProcessing = false;
        this.$store.commit("noticeInfo/toggleNotice", {
          type: "error",
          message: error.message,
        });
      }
    },
    async postReply() {
      try {
        this.isProcessing = true;
        const { data } = await articlesAPI.reply.create({
          comment: this.description,
          tweetId: this.articleReply.id,
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.description = "";
        if (this.$route.name === "UserInfo") {
          this.$store.commit("modalArticle/USERINFO_REFRESH");
        }
        this.$store.commit("noticeInfo/toggleNotice", {
          type: "success",
          message: "文章回覆成功",
        });
        this.$store.dispatch(
          "modalArticle/FETCH_ARTICLESHOW",
          this.articleReply.id
        );
        this.$store.dispatch(
          "modalArticle/FETCH_ARTICLE_REPLY",
          this.articleReply.id
        );
        this.$store.dispatch("modalArticle/FETCH_ARTICLES");
        this.$store.commit("modalArticle/TOGGLE_MODAL");
      } catch (error) {
        this.isProcessing = false;
        this.$store.commit("noticeInfo/toggleNotice", {
          type: "error",
          message: error.message,
        });
      }
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
    height: 100%;
  }
  &__container {
    display: flex;
    flex-direction: column;
    width: 600px;
    min-height: 300px;
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
    flex-direction: column;
    flex: 1 1 auto;
  }
  &__post {
    display: flex;
    height: 245px;
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
    border: none;
    resize: none;
    &::-webkit-scrollbar {
      background: transparent;
    }
    &:focus {
      outline: none;
    }
  }
  &__footer {
    margin-right: 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &__warn {
    color: $clr-form-error;
    padding-right: 20px;
    margin: 0;
  }
  &__btn {
    width: 66px;
  }
}
</style>
