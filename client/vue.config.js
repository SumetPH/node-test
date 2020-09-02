module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
      },
      "/upload": {
        target: "http://localhost:8000",
      },
    },
  },
};
