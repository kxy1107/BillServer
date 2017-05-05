'use strict'
var express = require('express');
var app = express();
// var fs = require('fs');
var http = require('http');
// var https = require('https');
// var privateKey  = fs.readFileSync('/path/to/private.pem', 'utf8'),
// var certificate = fs.readFileSync('/path/to/file.crt', 'utf8');
// var credentials = {key: privateKey, cert: certificate};

//routes
app.get('/', function (req, res) {
   res.send('Hello World');
})
app.use('/login', require('./router/login'));
app.use('/addRecordBill', require('./router/addRecordBill'));
app.use('/getHistroyBill', require('./router/getHistroyBill'));



var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

httpServer.listen(8012, function() {
  console.log("httpServer is OK");
});
// httpsServer.listen(8013, function() {
//   console.log("httpsServer is OK");
// });
