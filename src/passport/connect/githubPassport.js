const GitHubStrategy = require("passport-github2").Strategy;
const model = require("../../models/index");
const User = model.User;
const UserSocial = model.UserSocial;

module.exports = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    const { id } = profile;
    const userId = req.user.id;
    const provider = "github";

    await UserSocial.create({
      userId: userId,
      provider: provider,
      providerId: id,
    });
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    req.session.isConnect = true;
    return done(null, user);
  }
);
