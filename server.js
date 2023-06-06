const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User
    .findById('646f1c8c5954bb471d4108f4')
    .then(user => {
        req.user = user
        next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
.connect('mongodb+srv://user1:keWCTShXDqb0x84U@cluster0.h9b9gd7.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
    User.findOne().then(user => { 
        if( !user ) {
            const user = new User({
                name: 'ysj',
                email: 'ysj@test.com',
                cart: {
                    item: []
                }
            });
            user.save();
        }
    })
    app.listen(3000)
})
.catch(err => {
    console.log(err)
});