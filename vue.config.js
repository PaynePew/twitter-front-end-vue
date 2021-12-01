module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/twitter-front-end-vue/" : "/",
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/assets/scss/style.scss";',
      },
    },
  },
};
