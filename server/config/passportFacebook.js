const Strategy = require("passport-facebook").Strategy;
const user = require("./db").get("user");

const passportFacebook = new Strategy(
  {
    clientID: process.env.FBClientID,
    clientSecret: process.env.FBClientSecret,
    callbackURL: "/api/v1/user/login/facebook/return",
  },
  async (accessToken, refreshToken, profile, cb) => {
    const user = await user.findOne({ username: profile.displayName });
    if (!user) {
      await user.insert({
        username: profile.displayName,
        provider: profile.provider,
      });
    }
    return cb(null, user);
  }
);

module.exports = passportFacebook;
