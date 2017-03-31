var express = require('express');
var router = express.Router();

var paymentCtl = require("../../controllers/payment.controller");

router.
	route('/generateparams')
	.post(paymentCtl.generateParams);

router
	.route('/success')
	.post(paymentCtl.processSuccess);

router
	.route('/failure')
	.post(paymentCtl.processFailure);

module.exports = router;