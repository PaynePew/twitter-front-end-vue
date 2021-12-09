import moment from "moment";

moment.locale('zh-tw');

export const fromNowMixin = {
  methods: {
    fromNow: function (datetime) {
      return datetime ? moment(datetime).fromNow() : "-";
    },
  },
};

export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || "https://via.placeholder.com/350x220/DFDFDF?text=No+Image";
    },
  },
};
