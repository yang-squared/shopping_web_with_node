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
        req.session.save(err => {
            console.log(err);
            res.redirect('/');
        });
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

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'signup',
        isAuthenticated: false
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const comfirmpassword = req.body.comfirmpassword;
    User.findOne({ email: email })
    .then(userDoc => {
        if (userDoc) {
            return res.redirect('/signup');
        }
        const user = new User({
            email: email,
            password: password,
            cart: { items: [] }
        });
        return user.save();
    })
    .then(result => {
        res.redirect('/login');
    })
    .catch(err => {
        console.log(err);
    });
};