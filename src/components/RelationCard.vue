<template>
  <section v-for="user in topUsers" :key="user.id" class="relation">
    <div @click.stop="handlePageRoute(user.id)" class="relation__wrapper">
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
        <!-- <div v-if="user.id === currentUser.id">恭喜上榜!</div> -->
        <button
          v-if="!user.isFollowed && user.id !== currentUser.id"
          @click.stop="addFollowShips(user.id)"
          class="relation__btn"
        >
          跟隨
        </button>
        <button
          v-if="user.isFollowed && user.id !== currentUser.id"
          @click.stop="deleteFollowShips(user.id)"
          class="relation__btn relation__btn--active"
        >
          正在跟隨
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import usersAPI from "@/apis/users";
import { mapState } from "vuex";
export default {
  data() {
    return {
      topUsers: [],
    };
  },
  created() {
    this.getTopFollowers();
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
    }),
  },
  methods: {
    async getTopFollowers() {
      try {
        const response = await usersAPI.follower.getTopFollowers();
        this.topUsers = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addFollowShips(id) {
      try {
        this.toggleFollow(id);
        const { data } = await usersAPI.follower.addFollowShips(id);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteFollowShips(id) {
      try {
        this.toggleFollow(id);
        const { data } = await usersAPI.follower.deleteFollowShips(id);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    handlePageRoute(userId) {
      this.$router.push({
        name: "UserInfo",
        params: { userId },
      });
    },
    toggleFollow(id) {
      this.topUsers.forEach((_user) => {
        _user.id === id ? (_user.isFollowed = !_user.isFollowed) : _user;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/* @import "@/assets/scss/components/_button.scss"; */

.relation {
  &__wrapper {
    display: flex;
    border-top: 1px solid $clr-border;
    padding: 10px 15px;
  }
  &__header {
    margin-right: 10px;
  }
  &__img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
  &__body {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    align-items: center;
  }
  &__box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 20px;
    font-weight: bold;
    cursor: pointer;
  }
  &__account {
    color: $clr-secondary;
  }
  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $btn-primary;
    border-radius: 100px;
    border: 1px solid $btn-primary;
    padding: 10px 15px;
    height: 35px;
    font-weight: bold;
    cursor: pointer;
    &--active {
      background-color: $btn-primary;
      color: $clr-fourth;
    }
  }
}
</style>
