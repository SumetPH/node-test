const Strategy = require("passport-facebook").Strategy;
const knex = require("./knex");
const key = require("../key");

const passportFacebook = new Strategy(
  {
    clientID: key.FBClientID,
    clientSecret: key.FBClientSecret,
    callbackURL: "/api/v1/user/login/facebook/return",
  },
  async (accessToken, refreshToken, profile, cb) => {
    const user = await knex("user")
      .select("*")
      .where("username", "=", profile.displayName);
    if (user.length === 0) {
      await knex("user").insert({
        username: profile.displayName,
        provider: profile.provider,
      });
    }
    return cb(null, user[0]);
  }
);

module.exports = passportFacebook;
