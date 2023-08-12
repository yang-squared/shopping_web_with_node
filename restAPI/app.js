const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader("Access-Constrol-Allow-Origin","*");
    res.setHeader("Access-Constrol-Allow-Method", 'OPTION, GET, POST, PUT, PATH, DELETE');
    res.setHeader("Access-Constrol-Allow-Headers","Content-Type,Authhorization");
    next();
})

app.use('/feed', feedRoutes);

app.listen(8080);