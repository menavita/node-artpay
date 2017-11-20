var should = require('should');
var Artpay = require('../');

var artpay = new Artpay('https://gateway-sandbox-artpay.dev-3c.by/create/', 'jH6FA84b', 'Druk6S18')

describe('Create invoice', function() {
  it('should return id for redirecting.', function() {
    return artpay.createInvoice({
      'ap_storeid': '2087',
      'ap_order_num': '10',
      'ap_client_dt': Date.now().toString().substring(0,10),
      'ap_amount': 10,
      'ap_currency': 'BYN',
      'ap_invoice_desc': 'info',
      'ap_test': 1,
    })
    .then(function(res) {
      console.log(res);
      res.should.have.property('CardInvoiceNo');
    })
    .catch(function(e) {
      console.log(e);
      throw new Error(e);
    })
  })
})
