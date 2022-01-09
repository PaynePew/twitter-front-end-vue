<template>
  <section class="user-list">
    <div class="user-list__container">
      <div class="user-list__header">
        <p v-if="$route.name == 'ChatPublic'" class="user-list__title">
          線上使用者 {{ users.length }}
        </p>
        <p v-else class="user-list__title">私人訊息</p>
      </div>
      <div class="user-list__body">
        <ChatUserCard v-if="$route.name == 'ChatPublic'" :users="users" />
        <ChatUserCardPrivate
          v-if="$route.name == 'ChatPrivate'"
          :users="users"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ChatUserCard from "@/components/ChatUserCard.vue";
import ChatUserCardPrivate from "@/components/ChatUserCardPrivate.vue";

export default {
  components: {
    ChatUserCard,
    ChatUserCardPrivate,
  },
  props: {
    users: Array,
  },
  data() {
    return {
      currentURL: this.$route.name,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-list {
  position: relative;
  width: 390px;
  &__header {
    display: absolute;
    top: 0;
    padding: 15px;
    border-bottom: 1px solid $clr-border;
  }
  &__title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
  }
  &__body {
    overflow-y: scroll;
    height: calc(100vh - 55px);
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
