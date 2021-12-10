<template>
  <section class="user-list">
    <div class="user-list__container">
      <div class="user-list__header">
        <p class="user-list__title">線上使用者 (5)</p>
      </div>
      <div class="user-list__body">
        <ChatUserCard />
      </div>
    </div>
  </section>
</template>

<script>
import ChatUserCard from "@/components/ChatUserCard.vue";
export default {
  components: {
    ChatUserCard,
  },
};
</script>

<style lang="scss" scoped>
.user-list {
  width: 390px;
  &__header {
    padding: 15px;
    border-bottom: 1px solid $clr-border;
  }
  &__title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
