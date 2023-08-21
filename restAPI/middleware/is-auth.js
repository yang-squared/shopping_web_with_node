const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authheader = req.get('Authorization');
    if(!authheader) {
        const error = new Error('Not authenticated.');
        error.statusconde = 401;
        throw error
    }
    const token = req.get('Authoration').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
    } catch (err) {
        err.statusconde = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not decodedToken');
        error.statusconde = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};