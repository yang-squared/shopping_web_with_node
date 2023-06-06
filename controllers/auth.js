const user = require("../models/user");

exports.getLogin = (req, res, next) => {
    const isLoggedIn = req.get('Cookie')
        .split(';')[0]
        .trim()
        .split('=')[1];
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'login',
        isAuthenticated: isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
};
