'use strict';
const jwt = require('jwt-simple');
const moment = require('moment');

const secret = 'password';

exports.ensureAuth = (req, res, next) => {
    const { commands } = req.body;
    const splitCommand = commands.split(' ');
    const getCommand = splitCommand[0].toLowerCase();

    if (getCommand === 'register' || getCommand === 'login') {
        next();
    } else {
        if (!req.headers.authorization && getCommand !== 'register' && getCommand !== 'login') {
            return res.status(403).send({ error: 'Needs Authorization' });
        }

        var token = req.headers.authorization.replace(/['"]+/g, '');

        try {
            var payload = jwt.decode(token, secret);
            if (payload.exp <= moment.unix) {
                return res.status(401).send({ error: 'Expired Token' });
            }
        } catch (ex) {
            return res.status(404).send({ error: 'Invalid Token' });
        }

        req.user = payload;
        next();
    }
};
