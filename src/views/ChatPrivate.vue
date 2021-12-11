<template>
  <div class="private-message__container">
    <ChatUserList />
    <Chatroom />
  </div>
</template>

<script>
import ChatUserList from "../components/ChatUserList.vue";
import Chatroom from "../components/Chatroom.vue";

export default {
  components: {
    ChatUserList,
    Chatroom,
  },
};
</script>

<style lang="scss" scoped>
.private-message {
  &__container {
    width: 1063px;
    height: 100%;
    display: flex;
  }
}
</style>
