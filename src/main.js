import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocketIO from "vue-3-socket.io";
import SocketIO from "socket.io-client";

const baseURL = process.env.VUE_APP_SOCKET_URL;

const socket = new VueSocketIO({
  debug: process.env.NODE_ENV === "production" ? false : true,
  connection: SocketIO(baseURL, {
    autoConnect: false,
    transports: ["websocket"],
  }),
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_",
  },
});

createApp(App).use(store).use(router).use(socket).mount("#app");
