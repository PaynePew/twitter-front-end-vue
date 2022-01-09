<template>
  <section
    v-for="user in users"
    :key="user.id"
    class="relation"
    @click="
      clickUser(user.id);
      clickRoom(user.roomId);
    "
  >
    <div class="relation__wrapper">
      <div class="relation__header">
        <div class="relation__avatar">
          <img class="relation__img" :src="user.avatar" alt="" />
        </div>
      </div>
      <div class="relation__body">
        <div class="relation__box-top">
          <div class="relation__user-info">
            <div class="relation__name">{{ user.name }}</div>
            <div class="relation__account">@{{ user.account }}</div>
          </div>
          <div class="relation__time">10秒</div>
        </div>
        <div class="relation__box-bottom">
          <div class="relation__message">Latest message</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    users: Array,
  },
  methods: {
    clickUser(userId) {
      this.$store.commit("chatPrivate/selectReceiver", userId);
    },
    clickRoom(roomId) {
      this.$store.commit("chatPrivate/selectChat", roomId);
    },
  },
};
</script>

<style lang="scss" scoped>
.relation {
  &__wrapper {
    display: flex;
    border-bottom: 1px solid $clr-border;
    padding: 10px 15px;
    box-sizing: border-box;
  }
  &__header {
    margin-right: 10px;
  }
  &__img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  &__body {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  }
  &__box-top {
    display: flex;
    justify-content: space-between;
  }
  &__user-info {
    display: flex;
    align-items: center;
  }
  &__box {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 20px;
  }
  &__name {
    font-weight: bold;
  }
  &__account {
    margin-left: 5px;
    color: $clr-secondary;
  }
  &__time {
    color: $clr-secondary;
  }
  &__message {
    color: $clr-secondary;
  }
}
</style>
