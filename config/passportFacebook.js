const Strategy = require("passport-facebook").Strategy;
const knex = require("./knex");

const passportFacebook = new Strategy(
  {
    clientID: "1694808430669797",
    clientSecret: "c05e3dbfd66bb1a3a0d7463e08e77aef",
    callbackURL: "/user/login/facebook/return"
  },
  async (accessToken, refreshToken, profile, cb) => {
    const user = await knex("user")
      .select("*")
      .where("username", "=", profile.displayName);
    if (user.length === 0) {
      await knex("user").insert({
        username: profile.displayName,
        provider: profile.provider
      });
    }
    return cb(null, user[0]);
  }
);

module.exports = passportFacebook;
