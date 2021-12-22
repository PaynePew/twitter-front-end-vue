import { toggleNotice } from "../mutation-types";

export default {
  namespaced: true,
  state: {
    notice: {
      status: "",
      message: "",
    },
    isNotice: false,
    setTimeoutObject: "",
  },
  mutations: {
    [toggleNotice]: (state, notice) => {
      clearTimeout(state.setTimeoutObject);
      state.isNotice = true;
      state.notice = {
        ...state.notice,
        ...notice,
      };
      state.setTimeoutObject = setTimeout(() => {
        state.isNotice = false;
      }, 4000);
    },
  },
  actions: {},
  getters: {},
};

/*
Notice的components放在App.vue上
使用時只要在你要使用提示的時候呼叫下面的mutation:

this.$store.commit("noticeInfo/toggleNotice", {
          type: "error",
          message: error.message,
        });

type有兩種對應的icon
error: 叉叉 (src/assets/imgicon_error@2x.png)
success: 勾勾 (src/assets/imgicon_success@2x.png)

message可以直接輸入string，也可以依照後端回來的response來抓
ex:
message: "成功發佈推文"
message: data.message

若後端有回覆有status 404可以這樣抓訊息
message: error.response.data.message
*/
