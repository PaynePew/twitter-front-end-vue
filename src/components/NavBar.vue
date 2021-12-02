<template>
  <section class="navbar">
    <div class="navbar__wrapper">
      <div>
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
      </div>
      <div class="navbar__footer">
        <div class="navbar__logout">
          <img src="@/assets/img/icon_logout@2x.png" class="navbar__icon" />
          <div class="navbar__title">登出</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.navbar {
  width: 275px;
  height: 100vh;
  padding: 0 20px;
  display: flex;
  flex: 0 1 auto;
  align-items: stretch;
  position: relative;

  &__wrapper {
    position: fixed;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    height: 100vh;
    width: inherit;
    justify-content: space-between;
  }

  &__logo {
    width: 30px;
    height: 30px;
    margin-top: 14px;
    margin-left: 10px;
    margin-bottom: 30px;
  }

  &__menu {
    display: flex;
    margin-bottom: 30px;
    margin-left: 10px;
  }
  &__icon {
    width: 24px;
    height: 24px;
  }
  &__title {
    margin-left: 1.3rem;
    font-weight: bold;
  }
  &__button {
    background-color: $btn-primary;
    color: $clr-fourth;
    border-radius: 100px;
    border-style: none;
    height: 38px;
    width: 210px;
  }
  &__logout {
    margin-left: 10px;
    display: flex;
    height: 60px;
  }
}
</style>
