const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'login',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    User.findById('646f1c8c5954bb471d4108f4')
    .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.redirect('/');
    })
    .catch(err => {
        console.log(err)
    })
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};