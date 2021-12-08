<template>
  <div class="admin-user-card__container">
    <div
      v-for="user in users"
      :key="user.id"
      class="admin-user-card__user-card"
    >
      <img class="admin-user-card__cover" :src="user.cover" />

      <img class="admin-user-card__avatar" :src="user.avatar" />

      <div class="admin-user-card__info">
        <div class="admin-user-card__name">
          {{ user.name }}
        </div>
        <div class="admin-user-card__account">@{{ user.account }}</div>
        <div class="admin-user-card__article">
          <div class="admin-user-card__reply">
            <img
              class="admin-user-card__img"
              src="@/assets/img/icon_reply@2x.png"
              alt=""
            />
            <!-- <span>1.5K</span> -->
            <span>{{ user.TweetCount }}</span>
          </div>
          <div class="admin-user-card__like">
            <img
              class="admin-user-card__img"
              src="@/assets/img/icon_like@2x.png"
              alt=""
            />
            <!-- <span>66K</span> -->
            <span>{{ user.LikedTweetCount }}</span>
          </div>
        </div>
        <div class="admin-user-card__follow">
          <div class="admin-user-card__text admin-user-card__follower">
            <strong>{{ short(user.Followings) }}</strong>
            <p>跟隨中</p>
          </div>
          <div class="admin-user-card__text">
            <strong>{{ short(user.Followers) }}</strong>
            <p>跟隨者</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const abbreviate = require("number-abbreviate");

// const usersDummy = [
//   {
//     id: 1,
//     account: "tz1Mp67V",
//     email: "pcobbing0@oracle.com",
//     password: "PcQxT3f1J",
//     name: "Phineas Cobbing",
//     introduction: "150.255.148.96",
//     avatar: "https://robohash.org/utetenim.png?size=50x50&set=set1",
//     cover: "https://robohash.org/nihilhicet.png?size=50x50&set=set1",
//     role: "admin",
//     Followers: 12312,
//     Followings: 22534,
//   },
//   {
//     id: 2,
//     account: "tz1SKPF",
//     email: "dmarre1@msn.com",
//     password: "KscuOM98PC13",
//     name: "Dukie Marre",
//     introduction: "68.181.142.33",
//     avatar: "https://robohash.org/errorlaboriosamest.png?size=50x50&set=set1",
//     cover: "https://robohash.org/quasiipsumvoluptatem.png?size=50x50&set=set1",
//     role: "admin",
//     Followers: 23512,
//     Followings: 42534,
//   },
//   {
//     id: 3,
//     account: "tz1VJJ",
//     email: "fklasing2@china.com.cn",
//     password: "He1xnjP",
//     name: "Florri Klasing",
//     introduction: "96.72.192.4",
//     avatar: "https://robohash.org/sedvitaeeveniet.png?size=50x50&set=set1",
//     cover: "https://robohash.org/autimpeditillo.png?size=50x50&set=set1",
//     role: "",
//   },
//   {
//     id: 4,
//     account: "tz1NbWn",
//     email: "twhalley3@seattletimes.com",
//     password: "M6E2oR",
//     name: "Tisha Whalley",
//     introduction: "45.183.172.212",
//     avatar: "https://robohash.org/rerumautemnesciunt.png?size=50x50&set=set1",
//     cover: "https://robohash.org/minusblanditiiseum.png?size=50x50&set=set1",
//     role: "",
//   },
//   {
//     id: 5,
//     account: "tz1TV2",
//     email: "asiene4@comsenz.com",
//     password: "PK3YN1MGmpg",
//     name: "Antoinette Siene",
//     introduction: "33.208.93.148",
//     avatar: "https://robohash.org/minimaenimcupiditate.png?size=50x50&set=set1",
//     cover: "https://robohash.org/quisexomnis.png?size=50x50&set=set1",
//     role: "",
//   },
//   {
//     id: 6,
//     account: "tz1gni8TC9Y3yR",
//     email: "emorsey5@blinklist.com",
//     password: "cBIGgrFpAL",
//     name: "Emylee Morsey",
//     introduction: "157.40.7.185",
//     avatar: "https://robohash.org/nemolaboriosamin.png?size=50x50&set=set1",
//     cover: "https://robohash.org/voluptatemquivelit.png?size=50x50&set=set1",
//     role: "",
//   },
//   {
//     id: 7,
//     account: "tzdx3PWDLEMcQK",
//     email: "wcragg6@github.com",
//     password: "CF2yom3hg",
//     name: "Winslow Cragg",
//     introduction: "14.27.230.34",
//     avatar: "https://robohash.org/debitisveroet.png?size=50x50&set=set1",
//     cover:
//       "https://robohash.org/doloribusrecusandaefugiat.png?size=50x50&set=set1",
//     role: "",
//   },
//   {
//     id: 8,
//     account: "tpgG1tDyHgCU",
//     email: "dbraghini7@networkadvertising.org",
//     password: "btJ2SzVcO",
//     name: "Dexter Braghini",
//     introduction: "74.64.199.89",
//     avatar: "https://robohash.org/aliquidnemooptio.png?size=50x50&set=set1",
//     cover:
//       "https://robohash.org/voluptatibusrepellenduset.png?size=50x50&set=set1",
//     role: "",
//   },
//   {
//     id: 9,
//     account: "nif1nT6S6",
//     email: "kcalbaithe8@jugem.jp",
//     password: "UuO7qrvFObMZ",
//     name: "Keriann Calbaithe",
//     introduction: "18.188.140.26",
//     avatar: "https://robohash.org/teneturiureet.png?size=50x50&set=set1",
//     cover:
//       "https://robohash.org/quivoluptatemnecessitatibus.png?size=50x50&set=set1",
//     role: "",
//   },
//   {
//     id: 10,
//     account: "RQdYUpgs1Mu",
//     email: "chobben9@whitehouse.gov",
//     password: "b6qH20ch",
//     name: "Clementius Hobben",
//     introduction: "68.11.51.112",
//     avatar: "https://robohash.org/fugitnonqui.png?size=50x50&set=set1",
//     cover: "https://robohash.org/ipsaassumendaitaque.png?size=50x50&set=set1",
//     role: "",
//   },
// ];

import adminAPI from "./../apis/admin";
/* eslint-disable */
export default {
  data() {
    return {
      users: [],
    };
  },

  computed: {},

  mounted() {
    this.fetchUsers();
  },

  methods: {
    async fetchUsers() {
      try {
        const { data } = await adminAPI.getUsers();
        this.users = data;

        // this.users = usersDummy;
      } catch (error) {
        console.log(error);
      }
    },

    short(num) {
      return abbreviate(num, 1);
    },
  },
};
</script>

<style lang="scss">
@import "./../assets/scss/vendor/__vendor-dir";

.admin-user-card {
  &__container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 314px;
    gap: 15px 15px;
    padding: 15px;
  }
  &__user-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 245px;
    height: 314px;
    border-radius: 10px;
    background: #f6f7f8;
  }
  &__cover {
    position: absolute;
    width: 245px;
    height: 140px;
    background-color: #c4c4c4;
    border-radius: 10px 10px 0 0;
    width: 245px;
    height: 140px;
    object-fit: cover;
  }

  &__avatar {
    box-sizing: border-box;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border: 4px solid #ffffff;
    background-color: #c4c4c4;
    z-index: 2;
    margin-top: 68px;
  }

  &__info {
    z-index: 1;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5px;
  }
  &__name {
    font-weight: 900;
  }
  &__account {
    color: $clr-form-secondary;
  }
  &__article {
    width: 130px;
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
  }
  &__reply,
  &__like {
    display: flex;
    align-items: center;
  }
  &__img {
    width: 24px;
    height: 24px;
    padding-right: 5px;
  }
  &__follower {
    padding-right: 5px;
  }
  &__follow {
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
  }
  &__text {
    display: flex;
    font-size: 14px;
    margin: 0;

    p {
      margin: 0;
      color: $clr-form-secondary;
    }
  }
}
</style>
