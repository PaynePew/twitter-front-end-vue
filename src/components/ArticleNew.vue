<template>
  <section class="article-create">
    <div class="article-create__wrapper">
      <div class="article-create__header">
        <img :src="currentUser.avatar" alt="" class="article-create__avatar" />
      </div>
      <div class="article-create__body">
        <form class="article-create__form" action="">
          <textarea
            class="article-create__input"
            placeholder="有甚麼新鮮事?"
            name="description"
            rows="3"
            cols="50"
            maxlength="140"
            v-model="description"
          />
          <div class="article-create__footer">
            <button
              type="button"
              :disabled="isProcessing"
              @click.prevent="handleSubmit"
              class="article-create__btn btn btn--primary"
            >
              推文
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import articlesAPI from "@/apis/articles";
import { mapState } from "vuex";
export default {
  data() {
    return {
      description: "",
      isProcessing: false,
    };
  },
  computed: {
    ...mapState("authentication", ["currentUser"]),
  },
  methods: {
    async handleSubmit() {
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
        this.$emit("after-submit");
        this.isProcessing = false;
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
@import "@/assets/scss/components/_button-share.scss";
.article-create {
  &__wrapper {
    display: flex;
    width: 600px;
    height: 120px;
    border-bottom: 10px solid $clr-border;
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
  &__btn {
    width: 66px;
  }
  &__warn {
    color: $clr-form-error;
    padding-right: 20px;
    margin: 0;
  }
}
</style>
