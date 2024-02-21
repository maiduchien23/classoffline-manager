const FacebookStrategy = require("passport-facebook").Strategy;
const model = require("../../models/index");
const UserSocial = model.UserSocial;
const User = model.User;

module.exports = new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        passReqToCallback: true,
        scope: ["email"],
        profileFields: ["id", "displayName", "email"],
    },
    async (req, accessToken, refreshToken, profile, done) => {
        const { id } = profile;
        const provider = "facebook";

        let providerDetail = await UserSocial.findOne({
            where: {
                provider: provider,
                providerId: id,
            },
        });

        if (!providerDetail?.userId) {
            done(null, false, {
                message: req.flash(
                    "error",
                    "Không tồn tại tài khoản nào liên kết với facebook này!"
                ),
            });
            return;
        }
        const user = await User.findOne({
            where: {
                id: providerDetail.userId,
            },
        });

        done(null, user);
        return;
    }
);
