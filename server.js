const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongodbstore = require('connect-mongodb-session')(session);
const csrf =  require('csurf');

const errorController = require('./controllers/error');
const User = require('./models/user');

const mongodb_Uri = 'mongodb+srv://user1:keWCTShXDqb0x84U@cluster0.h9b9gd7.mongodb.net/shop';

const app = express();
const store = new mongodbstore({
    uri: mongodb_Uri,
    collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);
app.use(csrfProtection);

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
      }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        })
})

app.use((req, res, next) => {
    res.local.isAuthenticated = req.session.isLoggedIn;
    res.local.csrfToken = req.csrfToken();
    next();
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
    .connect(mongodb_Uri)
    .then(result => {
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    });