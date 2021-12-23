<template>
  <section>
    <div
      v-for="message in messageList"
      :key="message.id"
      class="chat-message__container"
    >
      <div v-if="message.type === 'notice'" class="chat-message__notice-box">
        <div class="chat-message__notice">
          {{ message.name }}
          {{ message.content }}
        </div>
      </div>
      <div
        v-if="!message.type && message.userId !== currentUser.id"
        class="chat-message__message-box"
      >
        <div class="chat-message__side">
          <img class="chat-message__avatar" :src="message.avatar" />
        </div>
        <div class="chat-message__main">
          <div class="chat-message__content chat-message__content--other">
            {{ message.content }}
          </div>
          <div class="chat-message__time">
            {{ chatTime(message.createdAt) }}
          </div>
        </div>
      </div>
      <div
        v-if="!message.type && message.userId === currentUser.id"
        class="chat-message__message-box chat-message__message-box--self"
      >
        <div class="chat-message__side"></div>
        <div class="chat-message__main chat-message__main--self">
          <div class="chat-message__content chat-message__content--self">
            {{ message.content }}
          </div>
          <div class="chat-message__time">
            {{ chatTime(message.createdAt) }}
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- <div class="chat-message__bottom-index"></div> -->
</template>

<script>
import { mapState } from "vuex";
import { fromNowMixin } from "@/utils/mixins";

export default {
  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
      messageList: (state) => state.chat.messageList,
    }),
  },
  mixins: [fromNowMixin],
};
</script>

<style lang="scss" scoped>
.chat-message {
  &__notice-box {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }
  &__notice {
    padding: 4px 14px;
    border-radius: 50vh;
    background-color: #e5e5e5;
    color: $clr-secondary;
    width: fit-content;
  }
  &__message-box {
    margin-bottom: 20px;
    width: fit-content;
    height: fit-content;
    display: flex;
    width: 100%;
    align-items: flex-end;
    &--self {
      // justify-content: flex-end;
      flex-direction: row-reverse;
    }
  }
  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50vh;
    background-color: $clr-secondary;
    margin-right: 10px;
    margin-bottom: 20px;
    &--self {
      margin-right: 0;
      margin-left: 10px;
    }
  }
  &__main {
    &--self {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
  &__content {
    padding: 8px 15px;
    background-color: #e6ecf0;
    width: fit-content;
    max-width: 80%;
    word-wrap: break-word;
    &--other {
      border-radius: 25px 25px 25px 0;
    }
    &--self {
      background-color: $clr-third;
      color: $clr-fourth;
      border-radius: 25px 25px 0 25px;
    }
  }
  &__time {
    color: $clr-form-secondary;
  }
}
</style>
