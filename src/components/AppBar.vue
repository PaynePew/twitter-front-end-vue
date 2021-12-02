<template>
  <section class="appbar">
    <div class="appbar__wrapper">
      <div class="appbar__nav" v-show="isShow">
        <img src="@/assets/img/icon_back@2x.png" class="appbar__icon" alt="" />
      </div>
      <div class="appbar__title">首頁</div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
};
</script>

<style lang="scss" scoped>
.appbar {
  &__wrapper {
    display: flex;
  }
  &__icon {
    width: 17px;
    height: 14px;
  }
  &__title {
    font-size: $fs-h3;
  }
}
</style>
