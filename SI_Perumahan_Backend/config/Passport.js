const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Usermodel')
const passport = require('passport');
const argon2 = require('argon2');

passport.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
        return done(null, false, { message: 'Username tidak ditemukan' });
    }
    try {
        if (await argon2.verify(user.password, password)) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Password salah' });
        }
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ where: { id: id } });
    done(null, user);
});


