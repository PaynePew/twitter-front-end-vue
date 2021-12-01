<template>
  <section class="navbar">
    <div class="navbar__wrapper">
      <div class="navbar__header">
        <img class="navbar__logo" src="@/assets/img/logo@2x.png" alt="" />
      </div>
      <div class="navbar__body">
        <div class="navbar__menu">
          <img src="@/assets/img/icon_house@2x.png" class="navbar__icon" />
          <div class="navbar__title">首頁</div>
        </div>
        <div class="navbar__menu">
          <img src="@/assets/img/icon_user@2x.png" class="navbar__icon" />
          <div class="navbar__title">個人資料</div>
        </div>
        <div class="navbar__menu">
          <img src="@/assets/img/icon_gear@2x.png" class="navbar__icon" />
          <div class="navbar__title">設定</div>
        </div>
        <div class="navbar__menu">
          <button class="navbar__button">推文</button>
        </div>
      </div>
      <div class="navbar__footer"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.navbar {
  padding: 0 20px;
  height: 100vh;
  border: dashed green;

  &__logo {
    width: 30px;
    height: 30px;
    margin-top: 14px;
    margin-bottom: 30px;
  }
  &__menu {
    display: flex;
    margin-bottom: 30px;
  }
  &__icon {
    width: 24px;
    height: 24px;
  }
  &__title {
    margin-left: 1.3rem;
    font-size: $fs-h3;
  }
  &__button {
    background-color: $btn-primary;
    color: $clr-fourth;
    border-radius: 100px;
    border-style: none;
    flex: 1 1 auto;
    height: 38px;
  }
}
</style>
