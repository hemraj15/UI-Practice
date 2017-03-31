var sha512 = require('js-sha512').sha512;
var paymentCtl = {};

var creds = {

	merchantKey	: "qSZkUBHF",
	merchantSalt: "GSBMZPYTk7",
	authHeader	: "pxiepTvA9GJ2Hm6cVFGranRGH/r4+82LvXiBnQN6KTI=",
	merchantId	: 5499122
};

var initialParams = {
	key: 'qSZkUBHF',
	txnid: '',
	amount: '',
	firstname: '',
	email: '',
	phone: '9876543210',
	productinfo: '',
	surl: "http://printkaari.com/api/payment/success",
	furl: "http://printkaari.com/api/payment/failure",
	service_provider: "payu_paisa",
	udf1: 'a',
	udf2: 'b',
	udf3: 'c',
	udf4: 'd',
	udf5: 'e'
};

var mappedParams = {
	mihpayid : 'paymentGatewayTrxId',
	mode : 'paymentMode',
	status: 'trxStatus',
	txnid: 'transactionNo',
	udf1: 'orderId',
	amount: 'amount',
	field8: 'trxMessage',
	field9: 'custTrxAction',
	bank_ref_num: 'bankRefNum',
	bankcode: 'bankCode',
	error: 'errorCode',
	error_Message : 'errorMessage',
	payuMoneyId: 'payYouMoneyId',
	discount: 'discount',
	net_amount_debit: 'netAmountPaid'
};

var finalParams = {};

var hashParams = ['key','txnid','amount','productinfo','firstname','email','udf1','udf2','udf3','udf4','udf5','a','b','c','d','e'];

paymentCtl._populateParams = function(resParams){
	finalParams = {};

	for (var prop in initialParams) {
		if (initialParams.hasOwnProperty(prop)) {
			finalParams[prop] = resParams[prop] || initialParams[prop];
		} 
	}

	finalParams.amount = 1; // to over-ride amount for testing purpose
};

paymentCtl._generateString = function(params){
	var string = '';
	
	paymentCtl._populateParams(params);
	
	for (var i = 0; i < hashParams.length; i++) {
		string += finalParams[hashParams[i]] || '';
		string += '|';
	}

	string+= creds.merchantSalt;

	return string;
}

paymentCtl._generateMappedParams = function(params){

	finalParams = {};

	for(key in mappedParams){
		if(mappedParams.hasOwnProperty(key)){
			finalParams[mappedParams[key]] = params[key] || "";
		}
	}
}

paymentCtl.generateParams = function(req, res){
	var hash = sha512(paymentCtl._generateString(req.body));

	finalParams['hash'] = hash;
	
	res
		.status(200)
		.json(finalParams);
}

paymentCtl._validateParams = function(params){
	return true;
};

paymentCtl._encodeParams = function(params){

	var string = '';

	for(var key in params){
		if(params.hasOwnProperty(key)){
			string += key + '=' + encodeURIComponent(params[key]);
			string += '&';
		}
	}
	string = string.substr(0, string.length - 1);
	return string;
}

paymentCtl.processSuccess = function(req, res){
	
	if (paymentCtl._validateParams(req.body)) {

		paymentCtl._generateMappedParams(req.body);
		var querystring = paymentCtl._encodeParams(finalParams);
		res.redirect('/#!/payment/success?' + querystring);
	}
};


paymentCtl.processFailure = function(req, res){
	
	if(paymentCtl._validateParams(req.body)){
		paymentCtl._generateMappedParams(req.body);
		var querystring = paymentCtl._encodeParams(finalParams);
		res.redirect('/#!/payment/failure?' + querystring);
	}
};

module.exports = paymentCtl;
