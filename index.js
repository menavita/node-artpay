'use strict';

var Q = require('q');
var request = require('request');
var crypto = require('crypto');

function Artpay(url, key1, key2, alg) {

  this.url = url;
  this.key1 = key1;
  this.key2 = key2;
  this.alg = alg ? alg : 'sha512';

}

Artpay.prototype.createInvoice = function(params) {

  var d = Q.defer();

  params['ap_signature'] = this.createSignature(params);

  request.post({
    uri: this.url,
    form: params,
    encoding: 'UTF-8',
  }, function(err, res, body) {
    if (res.headers.location) {
      d.resolve(res.headers.location)
    } else {
      d.reject(res.headers['x-artpay-error']);
    }
  })

  return d.promise;

}

Artpay.prototype.createSignature = function(params) {

  var result = '';
  
  Object.keys(params).sort().forEach(function(elem) {
    result += params[elem] + ';';
  })

  result += this.key1;

  result = crypto.createHash(this.alg).update(result, 'utf8').digest('hex');

  return result;

}

Artpay.prototype.checkSignature = function(params) {

  if(!params['ap_signature']) return false;
  
  var result = '';

  var siganture = params['ap_signature'];
  delete params['ap_signature'];

  Object.keys(params).sort().forEach(function(elem) {
    result += params[elem] + ';';
  })

  result += this.key2;

  if (siganture == crypto.createHash(this.alg).update(result, 'utf8').digest('hex')) return true;

}

module.exports = Artpay;
