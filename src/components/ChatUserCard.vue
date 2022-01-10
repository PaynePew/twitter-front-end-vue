<template>
  <section class="relation">
    <div v-for="user in users" :key="user.id" class="relation__wrapper">
      <div class="relation__header">
        <div class="relation__avatar">
          <img class="relation__img" :src="user.avatar" alt="" />
        </div>
      </div>
      <div class="relation__body">
        <div class="relation__box">
          <div class="relation__name">{{ user.name }}</div>
          <div class="relation__account">@{{ user.account }}</div>
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
};
</script>

<style lang="scss" scoped>
.relation {
  &__wrapper {
    display: flex;
    border-bottom: 1px solid $clr-border;
    padding: 10px 15px;
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
    justify-content: space-between;
    align-items: center;
  }
  &__box {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 20px;
    font-weight: bold;
  }
  &__account {
    margin: 5px;
    color: $clr-secondary;
  }
}
</style>
