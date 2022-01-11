<template>
  <div class="chatroom__container">
    <div class="chatroom__header">
      <p v-if="$route.name == 'ChatPublic'" class="chatroom__title">
        公開聊天室
      </p>
      <p v-else class="chatroom__title">私人聊天室</p>
    </div>
    <div class="chatroom__body">
      <ChatMessage v-if="$route.name == 'ChatPublic'" />
      <ChatMessagePrivate v-if="$route.name == 'ChatPrivate'" />
      <div class="chatroom__temp" ref="temp"></div>
    </div>
    <div class="chatroom__footer">
      <input
        class="chatroom__input"
        type="text"
        v-model="content"
        @keyup.enter="
          $emit('chat-submit', content);
          content = '';
        "
      />
      <img
        src="@/assets/img/icon_send@2x.png"
        class="chatroom__icon"
        @click="
          $emit('chat-submit', content);
          content = '';
        "
      />
    </div>
  </div>
</template>
<script>
import ChatMessage from "../components/ChatMessage.vue";
import ChatMessagePrivate from "../components/ChatMessagePrivate.vue";
import { fromNowMixin } from "@/utils/mixins";
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    ChatMessage,
    ChatMessagePrivate,
  },
  data() {
    return {
      content: "",
    };
  },

  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
      activeChat: (state) => state.chatPrivate.activeChat,
    }),
    ...mapGetters({
      getReceiverUser: "chatPrivate/getReceiverUser",
    }),
  },
  methods: {
    scrollToggle(behavior) {
      const container = this.$refs.temp;
      if (behavior) {
        container.scrollIntoView({ behavior: "smooth" });
        return;
      }
      container.scrollIntoView();
    },
  },
  mixins: [fromNowMixin],
};
</script>

<style lang="scss" scoped>
.chatroom {
  &__container {
    box-sizing: border-box;
    position: relative;
    width: 672px;
    border-left: 1px solid $clr-border;
    height: 100vh;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__header {
    display: absolute;
    top: 0;
    border-bottom: 1px solid $clr-border;
  }
  &__title {
    font-size: 18px;
    font-weight: 700;
    padding: 15px;
    margin: 0;
  }
  &__body {
    margin: 0 15px;
    height: calc(100vh - 55px - 52px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__footer {
    position: absolute;
    bottom: 0px;
    width: 100%;
    display: flex;
    align-items: center;
  }
  &__input {
    width: 580px;
    height: 32px;
    border-radius: 50vh;
    background-color: $clr-border;
    margin: 10px 15px;
    padding: 0 12px;
    border: none;
    outline: none;
    text-align: start;
  }
  &__icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
</style>
