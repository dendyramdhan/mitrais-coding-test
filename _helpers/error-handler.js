const response = require('./response');

module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ ...response, success: false, error: err});
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        // sequalize validation error
        return res.status(400).json({ ...response, success: false, error: err.message});
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error        
        return res.status(401).json({ ...response, success: false, error: 'Invalid Token'});
    }

    // default to 500 server error
    return res.status(500).json({ ...response, success: false, error: err.message});
}