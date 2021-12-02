<template>
  <ArticleNew :current-user="currentUser" />
  <ArticleCard :current-user="currentUser" :articles="articles" />
</template>

<script>
import ArticleNew from "@/components/ArticleNew.vue";
import ArticleCard from "@/components/ArticleCard.vue";

const usersDummy = [
  {
    id: 1,
    account: "tz1Mp67VLh43epLdHSvuaK4FbMoQ2nQkeLUk",
    email: "pcobbing0@oracle.com",
    password: "PcQxT3f1J",
    name: "Phineas Cobbing",
    introduction: "150.255.148.96",
    avatar: "https://robohash.org/utetenim.png?size=50x50&set=set1",
    cover: "https://robohash.org/nihilhicet.png?size=50x50&set=set1",
    role: "admin",
  },
  {
    id: 2,
    account: "tz1SKPFJP4bFp6Y56iD2mVvoiYiMCAEaoj9v",
    email: "dmarre1@msn.com",
    password: "KscuOM98PC13",
    name: "Dukie Marre",
    introduction: "68.181.142.33",
    avatar: "https://robohash.org/errorlaboriosamest.png?size=50x50&set=set1",
    cover: "https://robohash.org/quasiipsumvoluptatem.png?size=50x50&set=set1",
    role: "admin",
  },
  {
    id: 3,
    account: "tz1VJJNhqL3irfvxKcJtuEn3Ti97hNUWQWcd",
    email: "fklasing2@china.com.cn",
    password: "He1xnjP",
    name: "Florri Klasing",
    introduction: "96.72.192.4",
    avatar: "https://robohash.org/sedvitaeeveniet.png?size=50x50&set=set1",
    cover: "https://robohash.org/autimpeditillo.png?size=50x50&set=set1",
    role: "",
  },
  {
    id: 4,
    account: "tz1NbWnzR4y3RXaWbNbxqBise7mhwUKdbDE9",
    email: "twhalley3@seattletimes.com",
    password: "M6E2oR",
    name: "Tisha Whalley",
    introduction: "45.183.172.212",
    avatar: "https://robohash.org/rerumautemnesciunt.png?size=50x50&set=set1",
    cover: "https://robohash.org/minusblanditiiseum.png?size=50x50&set=set1",
    role: "",
  },
  {
    id: 5,
    account: "tz1TVNB6KoER4jhrwn7zT2zNzioU8MCR1L22",
    email: "asiene4@comsenz.com",
    password: "PK3YN1MGmpg",
    name: "Antoinette Siene",
    introduction: "33.208.93.148",
    avatar: "https://robohash.org/minimaenimcupiditate.png?size=50x50&set=set1",
    cover: "https://robohash.org/quisexomnis.png?size=50x50&set=set1",
    role: "",
  },
  {
    id: 6,
    account: "tz1gnidYyxRuGPPsdoSFH66nGWNW8TC9Y3yR",
    email: "emorsey5@blinklist.com",
    password: "cBIGgrFpAL",
    name: "Emylee Morsey",
    introduction: "157.40.7.185",
    avatar: "https://robohash.org/nemolaboriosamin.png?size=50x50&set=set1",
    cover: "https://robohash.org/voluptatemquivelit.png?size=50x50&set=set1",
    role: "",
  },
  {
    id: 7,
    account: "tz1irDLapEzgQDEinShczzcddx3PWDLEMcQK",
    email: "wcragg6@github.com",
    password: "CF2yom3hg",
    name: "Winslow Cragg",
    introduction: "14.27.230.34",
    avatar: "https://robohash.org/debitisveroet.png?size=50x50&set=set1",
    cover:
      "https://robohash.org/doloribusrecusandaefugiat.png?size=50x50&set=set1",
    role: "",
  },
  {
    id: 8,
    account: "tz1Pn4y7MJo1wt11oC8Gk1er5pgG1tDyHgCU",
    email: "dbraghini7@networkadvertising.org",
    password: "btJ2SzVcO",
    name: "Dexter Braghini",
    introduction: "74.64.199.89",
    avatar: "https://robohash.org/aliquidnemooptio.png?size=50x50&set=set1",
    cover:
      "https://robohash.org/voluptatibusrepellenduset.png?size=50x50&set=set1",
    role: "",
  },
  {
    id: 9,
    account: "tz1SFP5AqHsSUcRSmtYkUNucCiwnif1nT6S6",
    email: "kcalbaithe8@jugem.jp",
    password: "UuO7qrvFObMZ",
    name: "Keriann Calbaithe",
    introduction: "18.188.140.26",
    avatar: "https://robohash.org/teneturiureet.png?size=50x50&set=set1",
    cover:
      "https://robohash.org/quivoluptatemnecessitatibus.png?size=50x50&set=set1",
    role: "",
  },
  {
    id: 10,
    account: "tz1VNvAnRWy9XYGhSHNsQjL1ZRQdYUpgs1Mu",
    email: "chobben9@whitehouse.gov",
    password: "b6qH20ch",
    name: "Clementius Hobben",
    introduction: "68.11.51.112",
    avatar: "https://robohash.org/fugitnonqui.png?size=50x50&set=set1",
    cover: "https://robohash.org/ipsaassumendaitaque.png?size=50x50&set=set1",
    role: "",
  },
];
const articleDummy = [
  {
    id: 1,
    description:
      "felis ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac",
    created_at: "2021-07-02",
  },
  {
    id: 2,
    description:
      "posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis",
    created_at: "2021-03-16",
  },
  {
    id: 3,
    description:
      "orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa",
    created_at: "2021-07-19",
  },
  {
    id: 4,
    description:
      "est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et",
    created_at: "2021-08-24",
  },
  {
    id: 5,
    description:
      "aliquam non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis",
    created_at: "2021-10-17",
  },
  {
    id: 6,
    description:
      "aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est",
    created_at: "2021-10-24",
  },
  {
    id: 7,
    description:
      "pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante",
    created_at: "2021-08-22",
  },
  {
    id: 8,
    description:
      "dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh",
    created_at: "2021-02-09",
  },
  {
    id: 9,
    description:
      "vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum",
    created_at: "2021-04-25",
  },
  {
    id: 10,
    description:
      "posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui",
    created_at: "2021-06-08",
  },
];

export default {
  components: {
    ArticleNew,
    ArticleCard,
  },
  data() {
    return {
      currentUser: [],
      articles: [],
    };
  },
  mounted() {
    this.fetchCurrentUser();
    this.fetchArticles();
  },
  methods: {
    fetchCurrentUser() {
      this.currentUser = usersDummy[3];
    },
    fetchArticles() {
      this.articles = articleDummy;
    },
  },
};
</script>
