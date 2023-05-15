const LocalStrategy = require('passport-local').Strategy;
const Warga = require('../models/wargamodel')
const passportw = require('passport');
const argon2 = require('argon2');

passportw.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    const warga = await Warga.findOne({ where: { username: username } });
    if (!warga) {
        return done(null, false, { message: 'Username tidak ditemukan' });
    }
    try {
        if (await argon2.verify(warga.password, password)) {
            return done(null, warga);
        } else {
            return done(null, false, { message: 'Password salah' });
        }
    } catch (error) {
        return done(error);
    }
}));

passportw.serializeUser((warga, done) => done(null, warga.id));

passportw.deserializeUser(async (id, done) => {
    const warga = await Warga.findOne({ where: { id: id } });
    done(null, warga);
});


