<template>
  <div
    v-show="isNotice"
    :class="[
      isNotice && notice.type === 'success'
        ? ['notice__box', 'notice__box--show']
        : 'notice__box',
    ]"
  >
    <div class="notice__message">{{ notice.message }}</div>
    <div class="notice__bg notice__bg--success">
      <img
        class="notice__icon"
        src="./../assets/img/icon_success@2x.png"
        alt=""
      />
    </div>
  </div>

  <div
    v-show="isNotice"
    :class="[
      isNotice && notice.type === 'error'
        ? ['notice__box', 'notice__box--show']
        : 'notice__box',
    ]"
  >
    <div class="notice__message">{{ notice.message }}</div>
    <div class="notice__bg notice__bg--error">
      <img
        class="notice__icon"
        src="./../assets/img/icon_error@2x.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      notice: (state) => state.noticeInfo.notice,
      isNotice: (state) => state.noticeInfo.isNotice,
    }),
  },
};
</script>

<style lang="scss" scoped>
.notice {
  &__box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 15px;
    right: 40%;
    z-index: 9999;
    width: 354px;
    height: 56px;
    padding: 20px;
    border-radius: 8px;
    margin: 5px;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(51, 51, 51, 0.04),
      0px 4px 16px rgba(51, 51, 51, 0.08);
    opacity: 0;
    transition: opacity 1s;
    &--show {
      opacity: 1;
      transition: opacity 0s;
    }
  }
  &__message {
    font-size: 20px;
    font-weight: 700;
  }
  &__bg {
    position: relative;
    padding: 28px;
    border-radius: 50%;
    &--success {
      background: rgba(130, 196, 60, 0.12);
    }
    &--error {
      background: rgba(252, 90, 90, 0.12);
    }
  }
  &__icon {
    position: absolute;
    width: 24px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
