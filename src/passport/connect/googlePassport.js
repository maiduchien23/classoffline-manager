const GoogleStrategy = require("passport-google-oauth2").Strategy;
const model = require("../../models/index");
const UserSocial = model.UserSocial;
const User = model.User;

module.exports = new GoogleStrategy(
    {
        clientID: process.env.CONNECT_GOOGLE_CLIENT_ID,
        clientSecret: process.env.CONNECT_GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CONNECT_GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
        scope: ["profile", "email"],
        prompt: "select_account",
    },
    async (req, accessToken, refreshToken, profile, done) => {
        const { id } = profile;
        const userId = req.user.id;
        const provider = "google";

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
        done(null, user);
        return;
    }
);
