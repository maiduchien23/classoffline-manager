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
        const provider = "github";

        let providerDetail = await UserSocial.findOne({
            where: {
                provider: provider,
                providerId: id,
            },
        });

        try {
            if (req.isAuthenticated() && providerDetail === null) {
                await UserSocial.create({
                    userId: req.user.id,
                    provider: provider,
                    providerId: id,
                });
                const user = await User.findOne({
                    where: {
                        id: req.user.id,
                    },
                });
                req.isConnectGithub = true;
                return done(null, user);
            } else {
                if (providerDetail) {
                    const user = await User.findOne({
                        where: {
                            id: providerDetail.userId,
                        },
                    });

                    return done(null, user);
                }
                return done(null, false, {
                    message: req.flash(
                        "error",
                        "Không tồn tại tài khoản nào liên kết với github này!"
                    ),
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
);
