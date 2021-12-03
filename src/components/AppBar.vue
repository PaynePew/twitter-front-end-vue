<template>
  <section class="appbar">
    <div class="appbar__wrapper">
      <div class="appbar__container">
        <div @click="$router.go(-1)" class="appbar__nav" v-if="stepper">
          <img
            src="@/assets/img/icon_back@2x.png"
            class="appbar__icon"
            alt=""
          />
        </div>
        <div class="appbar__title-box">
          <div v-if="status" class="appbar__title">{{ status }}</div>
          <div v-if="articleCount" class="appbar__des">
            {{ articleCount }} 推文
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    currentUser: {
      Array,
    },
    status: {
      String,
      default: "首頁",
    },
    stepper: {
      Boolean,
      default: false,
    },
    articleCount: {
      Number,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.appbar {
  position: sticky;
  &__wrapper {
    display: flex;
    border-bottom: 1px solid $clr-border;
  }
  &__container {
    display: flex;
    margin: 15px;
    justify-content: center;
    align-items: center;
  }
  &__icon {
    margin-right: 40px;
    width: 17px;
    height: 14px;
    cursor: pointer;
  }
  &__title {
    font-size: $fs-h3;
    font-weight: bold;
  }
  &__des {
    color: $clr-secondary;
    font-size: $fs-h6;
  }
}
</style>
