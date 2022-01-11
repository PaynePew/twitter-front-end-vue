<template>
  <section>
    <div class="chat-message__alert" v-if="!tempUser && !activeChat">
      點選聊天室或從朋友頁面點信封開啟新的對話吧!
    </div>
    <div class="chat-message__alert" v-if="tempUser && !activeChat">
      輸入訊息建立與{{ tempUser }}的聊天室吧!
    </div>
    <section v-if="activeChat">
      <div
        v-for="message in messages"
        :key="message.id"
        class="chat-message__container"
      >
        <div
          v-if="message.userId !== currentUser.id"
          class="chat-message__message-box"
        >
          <div class="chat-message__side">
            <img class="chat-message__avatar" :src="sender.avatar" />
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
          v-if="message.userId === currentUser.id"
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
  </section>
  <!-- <div class="chat-message__bottom-index"></div> -->
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { fromNowMixin } from "@/utils/mixins";

export default {
  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
      messageList: (state) => state.chatPrivate.messageList,
      activeReceiver: (state) => state.chatPrivate.activeReceiver,
      activeChat: (state) => state.chatPrivate.activeChat,
      tempUser: (state) => state.chatPrivate.tempUser,
    }),
    ...mapGetters({
      messages: "chatPrivate/getRoomMessage",
      sender: "chatPrivate/getRoomUser",
      getUserList: "chatPrivate/getUserList",
    }),
  },
  methods: {
    handleActiveChat() {
      let test = this.getUserList.filter(
        (_user) => _user.id === this.activeReceiver
      );
      let roomId = !test.length ? null : test[0].roomId;
      this.$store.commit("chatPrivate/selectChat", roomId);
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.handleActiveChat();
    });
  },
  mixins: [fromNowMixin],
};
</script>

<style lang="scss" scoped>
.chat-message {
  &__alert {
    font-size: 24px;
    font-weight: bold;
    margin-top: 30px;
    text-align: center;
  }
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
