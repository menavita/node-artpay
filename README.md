# node-artpay
Node module for Artpay API.

```javascript
var Artpay = require('node-artpay');

var artpay = new Artpay('https://engine.artpay.by/create/', 'secretkey1', 'secretkey2'[, 'sha512']);
```
Last param, hash algorithm, is optional, by default sha512. Added since Artpay changed standart hash algorithm.

Sandbox url:
```
https://gateway-sandbox-artpay.dev-3c.by/create/
```
## Functions
### Create invoice
Create invoice and return link for redirect to Artpay. Signature included.
```javascript
artpay.createInvoice({
  'ap_storeid': '2087',
  'ap_order_num': '10',
  'ap_client_dt': Date.now().toString().substring(0,10),
  'ap_amount': 10,
  'ap_currency': 'BYN',
  'ap_invoice_desc': 'info',
  'ap_test': 0,
})
.then(function(res) {
  console.log(res);
})
.catch(function(e) {
  throw new Error(e);
})
```

### Create signature
Create signature and return it as string.
```javascript
artpay.createSignature({
  'ap_storeid': '2087',
  'ap_order_num': '10',
  'ap_client_dt': Date.now().toString().substring(0,10),
  'ap_amount': 10,
  'ap_currency': 'BYN',
  'ap_invoice_desc': 'info',
  'ap_test': 0,
})
```

### Check signature
Check signature and return boolean value.
```javascript
artpay.checkSignature(paramsFromArtpay);
```

## Tests
```bash
npm run test
```
## License
MIT