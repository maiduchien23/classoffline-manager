const FacebookStrategy = require("passport-facebook").Strategy;
const model = require("../../models/index");
const UserSocial = model.UserSocial;
const User = model.User;

module.exports = new FacebookStrategy(
    {
        clientID: process.env.CONNECT_FACEBOOK_CLIENT_ID,
        clientSecret: process.env.CONNECT_FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.CONNECT_FACEBOOK_CALLBACK_URL,
        passReqToCallback: true,
        scope: ["email"],
        profileFields: ["id", "displayName", "email"],
    },
    async (req, accessToken, refreshToken, profile, done) => {
        const { id } = profile;
        const userId = req.user.id;
        const provider = "facebook";

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
