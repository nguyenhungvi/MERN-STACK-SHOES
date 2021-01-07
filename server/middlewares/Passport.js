const User = require("../models/UserModel");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const errors = [];

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
            secretOrKey: process.env.KEY_SECRET
        },
        async (payload, done) => {
            try {
                const user = await User.findOne({ _id: payload.sub });
                if (!user) {
                    errors.push("Khong tim thay tai khoan!!");
                    return done(null, errors);
                }
                return done(null, user);
            } catch (error) {
                done(error, false);
            }
        }
    )
);

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                errors.push("Khong tim thay tai khoan!!");
                return done(null, errors);
            }
            const checkPassword = await user.checkPassword(password);
            if (!checkPassword) {
                errors.push("Mat khau khong chinh xac. Hay kiem tra lai!!");
                return done(null, errors);
            }
            return done(null,user);
        } catch (error) {
            throw new Error(error);
        }
    }
))
