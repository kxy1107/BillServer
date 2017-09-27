'use strict'
var express = require('express');
var router = express.Router();
var crypto = require("crypto");



router.get('/', function (req, res) {


    //获取前端传过来的参数
    // let signature = "fd71b07df580aca8992684c1c5e9b891972b3ae8";
    // let timestamp = "1506496672";
    // let nonce = "2512899450";
    // let echostr = "1803899215725427378";
    // let token = "aaaaaa";

    let signature = req.query.signature;
    let timestamp = req.query.timestamp;
    let nonce = req.query.nonce;
    let echostr = req.query.echostr;

    console.log("signature:" + signature + ",timestamp:" + timestamp + ",nonce:" + nonce + ",echostr:" + echostr );
    var token = "aaa123";//自定义字段(自己填写3-32个字符)
    var key = [token, timestamp, nonce].sort().join('');
    var sha1 = crypto.createHash('sha1');
    sha1.update(key);
    var resultStr = sha1.digest("hex");
    if (resultStr == signature) {
        console.log("success:" + echostr);
        res.send(echostr + "")

    } else {
        res.send(false)
    }
});

module.exports = router;
