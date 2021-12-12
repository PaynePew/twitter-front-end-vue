import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocketIO from "vue-3-socket.io";
import SocketIO from "socket.io-client";

const socket = new VueSocketIO({
  debug: true,
  connection: SocketIO("https://twitter-chatroom-test.herokuapp.com"),
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_",
  },
});

createApp(App).use(store).use(router).use(socket).mount("#app");
