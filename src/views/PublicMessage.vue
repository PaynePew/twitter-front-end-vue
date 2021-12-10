<template>
  <div class="public-message__container">
    <OnlineList />
    <Chatroom />
  </div>
</template>

<script>
import OnlineList from "./../components/OnlineList.vue";
import Chatroom from "./../components/Chatroom.vue";

export default {
  components: {
    OnlineList,
    Chatroom,
  },
};
</script>

<style lang="scss" scoped>
.public-message {
  &__container {
    width: 1063px;
    height: 100%;
    display: flex;
  }
}
</style>
