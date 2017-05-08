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
app.use('/login', require('./router/login'));//登录同步微信信息
app.use('/getTodayBill', require('./router/getTodayBill'));//获取今天账单列表和今日消费总金额，本月消费总金额，本年消费总金额
app.use('/getSpendWayList', require('./router/getSpendWayList'));//获取消费方式列表
app.use('/addRecordBill', require('./router/addRecordBill'));//添加/修改消费记录
app.use('/getHistoryBillList', require('./router/getHistoryBill'));//获取历史消费记录
app.use('/getBillDetailInfo', require('./router/getBillDetailInfo'));//获取消费记录详情
app.use('/delRecordBill', require('./router/delRecordBill'));//删除消费记录
app.use('/getChartsData', require('./router/getChartsData'));//获取统计图数据


var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

httpServer.listen(8012, function() {
  console.log("httpServer is OK");
});
// httpsServer.listen(8013, function() {
//   console.log("httpsServer is OK");
// });
