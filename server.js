const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     User
//     .findByPk('63f5bb4bb3aa56db45f8d1ec')
//     .then(user => {
//         req.user = new User(
//             user.name,
//             user.email,
//             user.cart,
//             user._id
//         );
//         next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
.connect('mongodb+srv://user1:keWCTShXDqb0x84U@cluster0.h9b9gd7.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
    app.listen(3000)
})
.catch(err => {
    console.log(err)
});