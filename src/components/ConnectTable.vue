<template>
  <nav role="navigation" aria-label="個人資料時間軸" class="user-tab">
    <div class="user-tab__wrapper">
      <div class="user-tab__container">
        <div role="tablist" class="user-tab__tablist">
          <div class="user-tab__tab">
            <router-link class="user-tab__nav" :to="{ name: 'Follower' }"
              >追隨者</router-link
            >
          </div>
          <div class="user-tab__tab">
            <router-link class="user-tab__nav" :to="{ name: 'Following' }"
              >正在跟隨</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.user-tab {
  &__wrapper {
    border-bottom: 1px solid $clr-border;
    width: 600px;
  }
  &__tablist {
    display: flex;
  }
  &__tab {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 130px;
    height: 54px;
    color: $clr-secondary;
  }
  &__nav {
    font-weight: bold;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex: 1 0 auto;
    color: $clr-secondary;
    &:visited {
      color: $clr-secondary;
    }
  }
  .exact-active {
    color: $clr-third;
    border-bottom: 2px solid $clr-third;
  }
}
</style>
