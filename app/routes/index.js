var express = require('express');
var router = express.Router();

var payment = require("./payment");

router.use('/payment', payment);

module.exports = router;