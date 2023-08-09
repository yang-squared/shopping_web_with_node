const express = require("express");

const feedController = require('../controller/feed');

const router = express.Router();

router.get('/posts',get)

module.exports = router;    