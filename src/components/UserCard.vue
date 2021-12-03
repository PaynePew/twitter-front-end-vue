<template>
  <div class="user-card__container">
    <div v-for="user in users" :key="user.id" class="user-card__card">
      <img class="user-card__side" :src="user.avatar" />
      <div class="user-card__main">
        <div class="user-card__header">
          <div class="user-card__name">
            {{ user.name }}
          </div>
          <div class="user-card__account">@testAccount</div>
        </div>
        <div class="user-card__body">
          {{ user.introduction }}
        </div>
        <button
          :class="[
            'btn',
            `${
              user.isFollowing
                ? 'user-card__button--frame'
                : 'user-card__button'
            }`,
          ]"
          @click.stop.prevent="toggleFollowing(user.id)"
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
    initialUsers: Array,
  },
  data() {
    return {
      users: [],
    };
  },

  mounted() {
    this.fetchUsers();
  },

  watch: {
    initialUsers(newValue) {
      this.users = {
        ...this.users,
        ...newValue
      }
    }
  },

  methods: {
    async fetchUsers() {
      try {
        this.users = await this.initialUsers;
        console.log('fetched');
      } catch (error) {
        console.log(error);
      }
    },

    toggleFollowing(userId) {
      this.users = this.users.map((user) => {
        if (user.id !== userId) {
          return user;
        }
        const currentIsFollowing = user.isFollowing

        return {
          ...user,
          isFollowing: !currentIsFollowing,
        };
      });
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
