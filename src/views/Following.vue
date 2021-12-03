<template>
  <ConnectTable />
  <UserCard 
    v-for="user in users"
    :key="user.id"
    :initialUser="user" />
</template>

<script>
import ConnectTable from "@/components/ConnectTable.vue";
import UserCard from "@/components/UserCard.vue";

const usersDummy = [
  {
    id: 2,
    account: "VvoiYiMCA",
    email: "dmarre1@msn.com",
    password: "KscuOM98PC13",
    name: "Dukie Marre",
    introduction: "68.181.142.33",
    avatar: "https://robohash.org/errorlaboriosamest.png?size=50x50&set=set1",
    cover: "https://robohash.org/quasiipsumvoluptatem.png?size=50x50&set=set1",
    role: "admin",
    isFollowing: false,
  },
  
  {
    id: 4,
    account: "mhwUKdbDE9",
    email: "twhalley3@seattletimes.com",
    password: "M6E2oR",
    name: "Tisha Whalley",
    introduction: "45.183.172.212",
    avatar: "https://robohash.org/rerumautemnesciunt.png?size=50x50&set=set1",
    cover: "https://robohash.org/minusblanditiiseum.png?size=50x50&set=set1",
    role: "",
    isFollowing: false,
  },
  {
    id: 5,
    account: "8MCR1L22",
    email: "asiene4@comsenz.com",
    password: "PK3YN1MGmpg",
    name: "Antoinette Siene",
    introduction: "33.208.93.148",
    avatar: "https://robohash.org/minimaenimcupiditate.png?size=50x50&set=set1",
    cover: "https://robohash.org/quisexomnis.png?size=50x50&set=set1",
    role: "",
    isFollowing: true,
  },
  {
    id: 8,
    account: "G1tDyHgCU",
    email: "dbraghini7@networkadvertising.org",
    password: "btJ2SzVcO",
    name: "Dexter Braghini",
    introduction: "74.64.199.89",
    avatar: "https://robohash.org/aliquidnemooptio.png?size=50x50&set=set1",
    cover:
      "https://robohash.org/voluptatibusrepellenduset.png?size=50x50&set=set1",
    role: "",
    isFollowing: false,
  },
  {
    id: 10,
    account: "QdYUpgs1Mu",
    email: "chobben9@whitehouse.gov",
    password: "b6qH20ch",
    name: "Clementius Hobben",
    introduction: "68.11.51.112",
    avatar: "https://robohash.org/fugitnonqui.png?size=50x50&set=set1",
    cover: "https://robohash.org/ipsaassumendaitaque.png?size=50x50&set=set1",
    role: "",
    isFollowing: false,
  },
];

export default {
  components: {
    ConnectTable,
    UserCard,
  },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.users = usersDummy;
    },
  },
};
</script>
