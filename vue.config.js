module.exports = {
  devServer: {
    proxy: "http://localhost:8000",
    proxy: {
      "/api/v1/user": {
        target: "http://localhost:8000"
      }
    }
  }
};
