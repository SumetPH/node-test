// Update with your config settings.
const key = require("./key");

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: key.psqlDatabse,
      user: key.psqlUser,
      password: key.password,
    },
  },
};
