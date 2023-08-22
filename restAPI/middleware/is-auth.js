const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusconde = 401;
        throw error
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
    } catch (err) {
        err.statusconde = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not decodedToken');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};