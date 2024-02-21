const GoogleStrategy = require("passport-google-oauth2").Strategy;
const model = require("../../models/index");
const UserSocial = model.UserSocial;
const User = model.User;

module.exports = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true,
        scope: ["profile", "email"],
        prompt: "select_account",
    },
    async (req, accessToken, refreshToken, profile, done) => {
        const { id } = profile;

        const provider = "google";
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
                    "Không tồn tại tài khoản nào liên kết với google này!"
                ),
            });
            return;
        }
        const user = await User.findOne({
            where: {
                id: providerDetail.userId,
            },
        });
        return done(null, user);
    }
);
