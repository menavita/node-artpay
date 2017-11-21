var should = require('should');
var Artpay = require('../');

var artpay = new Artpay('https://gateway-sandbox-artpay.dev-3c.by/create/', 'jH6FA84b', 'Druk6S18')

describe('Create invoice', function () {
  it('should return id for redirecting.', function () {
    return artpay.createInvoice({
        'ap_storeid': '2087',
        'ap_order_num': '10',
        'ap_client_dt': Date.now().toString().substring(0, 10),
        'ap_amount': 10,
        'ap_currency': 'BYN',
        'ap_invoice_desc': 'info',
        'ap_test': 1,
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (e) {
        console.log(e);
        throw new Error(e);
      })
  })
})

describe('Signature', function () {
  it('should create signature', function () {
    var signature = artpay.createSignature({
      'ap_storeid': '2087',
      'ap_order_num': '10',
      'ap_client_dt': Date.now().toString().substring(0, 10),
      'ap_amount': 10,
      'ap_currency': 'BYN',
      'ap_invoice_desc': 'info',
      'ap_test': 1,
    });
    console.log(signature);
  })

  it('should check signature from artpay', function () {
    var check = artpay.checkSignature({
      ap_storeid: '2087',
      ap_test: 1,
      ap_notice_type: 'PayOrder',
      ap_order_num: 64,
      ap_operation: 'Sale',
      ap_amount: 10,
      ap_currency: 'BYN',
      ap_card_mask_num: '445453******0999',
      ap_trans_dt: '2016-05-12MSK14:09:13',
      ap_auth_code: '422108',
      ap_reference_code: '',
      ap_action_code: '111',
      up_suid: 'd46720f5150175e3', // params with app is optional
      ap_signature: 'c580564b380bba771ba382ee582d268a1b11ad826fb408c9149fb848b8a21729'
    })
    if (check) {
      console.log('True signature');
    } else {
      throw new Error('False signature');
    }
  })
})