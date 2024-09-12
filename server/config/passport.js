const passport = require('passport');

require('dotenv').config();
const jwtkey = process.env.JWT_KEY;

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');

const User = require('../models/User');
const Recipe = require('../models/Recipe');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtkey
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
        .catch(err => console.error(err));
}));

module.exports = passport;