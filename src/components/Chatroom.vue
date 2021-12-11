<template>
  <div class="chatroom__container">
    <div class="chatroom__header">
      <p class="chatroom__title">公開聊天室</p>
    </div>
    <div class="chatroom__body">
      <ChatMessage :messageList="messageList" @scroll="scrollToggle" />
      <div class="chatroom__temp" ref="temp"></div>
    </div>
    <div class="chatroom__footer">
      <input class="chatroom__input" type="text" v-model="content" />
      <img
        src="@/assets/img/icon_send@2x.png"
        class="chatroom__icon"
        @click="chatSubmit(content)"
      />
    </div>
  </div>
</template>
<script>
import ChatMessage from "../components/ChatMessage.vue";
import { fromNowMixin } from "@/utils/mixins";
import { mapState } from "vuex";
const dummyData = [
  {
    id: 1,
    type: "notice",
    user: "Apple",
    userId: 3,
    avatar: "https://robohash.org/utetenim.png?size=50x50&set=set1",
    content: "online",
    creatAt: "2021-11-02T22:54:49.000Z",
  },
  {
    id: 2,
    type: "notice",
    user: "Banana",
    userId: 4,
    avatar: "https://robohash.org/errorlaboriosamest.png?size=50x50&set=set1",
    content: "online",
    creatAt: "2021-12-01T10:47:28.000Z",
  },
  {
    id: 3,
    type: "notice",
    user: "Mango",
    userId: 5,
    avatar: "https://robohash.org/sedvitaeeveniet.png?size=50x50&set=set1",
    content: "online",
    creatAt: "2021-12-01T10:47:28.000Z",
  },
  {
    id: 4,
    type: "message",
    user: "Peach",
    userId: 6,
    avatar: "https://robohash.org/rerumautemnesciunt.png?size=50x50&set=set1",
    content: "good morning",
    creatAt: "2021-12-01T10:47:29.000Z",
  },
  {
    id: 5,
    type: "message",
    user: "Papaya",
    userId: 7,
    avatar: "https://robohash.org/minimaenimcupiditate.png?size=50x50&set=set1",
    content: "not good",
    creatAt: "2021-12-01T10:47:28.000Z",
  },
  {
    id: 6,
    type: "notice",
    user: "Pineapple",
    userId: 8,
    avatar: "https://robohash.org/nemolaboriosamin.png?size=50x50&set=set1",
    content: "offline",
    creatAt: "2021-12-01T10:47:29.000Z",
  },
  {
    id: 7,
    type: "message",
    user: "CurrentUser",
    userId: 21,
    avatar: "https://robohash.org/nemolaboriosamin.png?size=50x50&set=set1",
    content: "賣造",
    creatAt: "2021-12-01T11:47:29.000Z",
  },
  {
    id: 5,
    type: "message",
    user: "Papaya",
    userId: 7,
    avatar: "https://robohash.org/minimaenimcupiditate.png?size=50x50&set=set1",
    content:
      "666666666666666666666666666666666666666666666666666666666666666666666",
    creatAt: "2021-12-01T10:47:28.000Z",
  },
  {
    id: 5,
    type: "message",
    user: "Papaya",
    userId: 7,
    avatar: "https://robohash.org/minimaenimcupiditate.png?size=50x50&set=set1",
    content:
      "666666666666666666666666666666666666666666666666666666666666666666666",
    creatAt: "2021-12-01T10:47:28.000Z",
  },
  {
    id: 5,
    type: "message",
    user: "Papaya",
    userId: 7,
    avatar: "https://robohash.org/minimaenimcupiditate.png?size=50x50&set=set1",
    content:
      "666666666666666666666666666666666666666666666666666666666666666666666",
    creatAt: "2021-12-01T10:47:28.000Z",
  },
];
export default {
  el: "#app",
  components: {
    ChatMessage,
  },
  data() {
    return {
      messageList: [],
      content: "",
    };
  },
  mounted() {
    this.messageList = dummyData;
    this.scrollToggle();
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
    }),
  },
  methods: {
    async chatSubmit(content) {
      await this.messageList.push({
        id: this.messageList.length,
        type: "message",
        user: "Orange",
        userId: this.currentUser.id,
        avatar:
          "https://robohash.org/errorlaboriosamest.png?size=50x50&set=set1",
        content: content,
        creatAt: this.now(),
      });
      this.content = "";
      let container = this.$refs.temp;
      container.scrollIntoView({ behavior: "smooth" });
    },
    scrollToggle() {
      let container = this.$refs.temp;
      container.scrollIntoView({ behavior: "smooth" });
      // let container = this.$el.querySelector(".chatroom__body");
      // container.scrollTop = container.scrollHeight;
    },
  },
  mixins: [fromNowMixin],
};
</script>

<style lang="scss" scoped>
.chatroom {
  &__container {
    box-sizing: border-box;
    position: relative;
    width: 672px;
    border-left: 1px solid $clr-border;
    height: 100vh;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__header {
    display: absolute;
    top: 0;
    border-bottom: 1px solid $clr-border;
  }
  &__title {
    font-size: 18px;
    font-weight: 700;
    padding: 15px;
    margin: 0;
  }
  &__body {
    margin: 0 15px;
    height: calc(100vh - 55px - 52px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__footer {
    position: absolute;
    bottom: 0px;
    width: 100%;
    display: flex;
    align-items: center;
  }
  &__input {
    width: 580px;
    height: 32px;
    border-radius: 50vh;
    background-color: $clr-border;
    margin: 10px 15px;
    padding: 0 12px;
    border: none;
    outline: none;
    text-align: end;
  }
  &__icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
</style>
