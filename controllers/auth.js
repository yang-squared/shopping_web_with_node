const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
// const transporter = require('transporter');
const { validationResult } = require('express-validator');

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'login',
        errorMessage: message,
        oldInput: {
            email: '',
            password: ''
        },
        vaildationErrors: []
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email: email,
                password: password,
            },
            vaildationErrors: errors.array()
        });
    }

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(422).render('auth/login', {
                    path: '/login',
                    pageTitle: 'Login',
                    errorMessage: '입력하신 아이디 정보가 없습니다. 다시 입력해주세요.',
                    oldInput: {
                        email: email,
                        password: password,
                    },
                    vaildationErrors: []
                });
            }
            bcrypt
                .compare(password, user.password)
                .then(Match => {
                    if (Match) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    return res.status(422).render('auth/login', {
                        path: '/login',
                        pageTitle: 'Login',
                        errorMessage: '비밀번호를 잘못 입력했습니다. 다시 입력해주세요.',
                        oldInput: {
                            email: email,
                            password: password,
                        },
                        vaildationErrors: []
                    })
                })
            .catch(err => {
                console.log(err)
                res.redirect('/login');
            })
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
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'signup',
        errorMessage: message,
        oldInput: {
            email: '',
            password: '',
            confirmpassword: ''
        },
        vaildationErrors: []
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422)
            .render('auth/signup', {
                path: '/signup',
                pageTitle: 'signup',
                errorMessage: errors.array()[0].msg,
                oldInput: {
                    email: email,
                    password: password,
                    confirmpassword: req.body.confirmpassword
                },
                vaildationErrors: errors.array()
            });
    }
    bcrypt
        .hash(password, 12)
        .then(hashpassword => {
            const user = new User({
                email: email,
                password: hashpassword,
                cart: { items: [] }
            });
            return user.save();
        })
        .then(result => {
            res.redirect('/login');
            return transporter.sendMail({
                to: email,
                from: 'example@nodeTest.com',
                subject: 'Signup success',
                html: '<h1>회원가입에 성공하셨습니다.</h1>'
            });
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'reset',
        errorMessage: message
    });
}

exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err)
            return res.redirect('/reset')
        }
        const token = buffer.toString('hex');
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    req.flash('error', '이메일정보를 확인할 수 없습니다. 다시 작성해주세요.');
                    return res.redirect('/reset');
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();
            })
            .then(result => {
                res.redirect('/');
                transporter.sendMail({
                    to: req.body.email,
                    from: 'example@nodeTest.com',
                    subject: 'Password reset',
                    html: `
                <p>회원님의 비밀번호가 초기화되었습니다. </p>
                <p>비밀번호를 재설정하기위해 <a href= "http://localhost:3000/reset/"${token}>여기</a>를 클릭해주세요</p>
                `
                });
            })
            .catch(err => {
                console.log(err);
            });
    })
}

exports.getUpdatepw = (req, res, next) => {
    const token = req.params.token;
    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then(user => {
            let message = req.flash('error');
            if (message.length > 0) {
                message = message[0];
            } else {
                message = null;
            }
            res.render('auth/update-pw', {
                path: '/update-pw',
                pageTitle: 'Update Password',
                errorMessage: message,
                userId: user_id.toString(),
                passwordToken: token
            });
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postUpdatepw = (req, res, next) => {
    const updatepw = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;

    User.findOne({
        resetToken: passwordToken,
        resetTokenExpiration: { $gt: Date.now() },
        _id: userId
    })
        .then(user => {
            resetUser = user;
            return bcrypt.hash(newPassword, 12);
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save();
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });
}