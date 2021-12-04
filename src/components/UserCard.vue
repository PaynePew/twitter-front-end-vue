<template>
  <div class="user-card__container">
    <div class="user-card__card">
      <router-link :to="{ name: 'UserInfo', params: { userName: user.name } }">
        <img class="user-card__side" :src="user.avatar" />
      </router-link>
      <div class="user-card__main">
        <div class="user-card__header">
          <div class="user-card__name">
            {{ user.name }}
          </div>
          <div class="user-card__account">@{{ user.account }}</div>
        </div>
        <div class="user-card__body">
          {{ user.introduction }}
        </div>
        <button
          v-if="user.isFollowing"
          class="btn user-card__button"
          @click.stop.prevent="deleteFollowing(user.id)"
        >
          <span>正在跟隨</span>
        </button>
        <button
          v-if="!user.isFollowing"
          class="btn user-card__button--frame"
          @click.stop.prevent="addFollowing(user.id)"
        >
          <span>跟隨</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialUser: {
      type: Object,
      require: true,
    },
  },

  data() {
    return {
      user: this.initialUser,
    };
  },

  // watch: {
  //   initialUser(newValue) {
  //     this.user = {
  //       ...this.user,
  //       ...newValue
  //     }
  //   }
  // },

  methods: {
    addFollowing() {
      this.user = {
        ...this.user,
        isFollowing: true,
      };
    },

    deleteFollowing() {
      this.user = {
        ...this.user,
        isFollowing: false,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/scss/components/_button.scss";

.user-card {
  &__container {
    width: 600px;
  }
  &__card {
    position: relative;
    display: flex;
    border: 1px solid $clr-border;
    height: 105px;
  }
  &__side {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    object-fit: cover;
    margin: 13px 10px 0 15px;
    background: #c1c1c1;
  }
  &__main {
    display: flex;
    flex-direction: column;
    // justify-content: center;
  }

  &__header {
    color: $clr-secondary;
    margin-top: 10px;
    margin-bottom: 5px;
    line-height: 1.3rem;
  }

  &__name {
    font-weight: bold;
    color: $clr-primary;
  }

  &__account {
    color: $clr-secondary;
  }

  &__button {
    position: absolute;
    top: 10px;
    right: 15px;
    width: 90px;
    height: 25px;
    font-size: 15px;

    &--frame {
      position: absolute;
      top: 10px;
      right: 15px;
      width: 60px;
      height: 25px;
      font-size: 15px;
      background: none;
      border: 1px solid $btn-primary;
      color: $btn-primary;
      white-space: nowrap;
    }
  }
}
</style>
