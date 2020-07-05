'use strict'
exports.success = (res, data, httpCode = 200, message = 'Success') => 
    res.status(httpCode).send({ error: null, message, data, status: httpCode })


exports.error = (error, res, httpCode = 500, message = 'Unexpected Error') => 
    res.status(httpCode).send({ error: error, message, status: httpCode })