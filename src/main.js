import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import VueSocketIO from "vue-3-socket.io";
// import SocketIO from "socket.io-client";

// const socket = new VueSocketIO({
//   debug: true,
//   connection: SocketIO("http://localhost:3000"),
//   vuex: {
//     store,
//     actionPrefix: "SOCKET_",
//     mutationPrefix: "SOCKET_",
//   },
// });

createApp(App).use(store).use(router).mount("#app");
