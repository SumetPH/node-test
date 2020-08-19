module.exports = {
  devServer: {
    proxy: "http://localhost:8000",
    proxy: {
      "/user": {
        target: "http://localhost:8000"
      }
    }
  }
};
