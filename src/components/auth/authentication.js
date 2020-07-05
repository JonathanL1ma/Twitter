'use strict';
const jwt = require('jwt-simple');
const moment = require('moment');

const secret = 'password';

exports.ensureAuth = (req, res, next) => {
    const { commands } = req.body;
    const getParams = commands.split(' ');
    let [ command ] = getParams;
    command = command.toLowerCase();

    if (command === 'register' || command === 'login') {
        next();
    } else {
        if (!req.headers.authorization && command !== 'register' && command !== 'login') {
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
