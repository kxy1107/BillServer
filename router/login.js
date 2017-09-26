'use strict'
var express = require('express');
var WXBizDataCrypt = require('../util/WXBizDataCrypt');
var WXUtil = require('../util/WXUtil');
const APP_ID = 'wx12e0d9958c5b3bb6';
const SECRET = '30356ac2c536e99bbfe1ad2cd2a40963';

var router = express.Router();
var sql = require("../db/mysqlConnect");



router.get('/', function (req, res) {

    //获取前端传过来的参数
    let Code = req.query.Code;
    let encryptedData = req.query.EncryptedData;
    let iv = req.query.Iv;
    WXUtil.getSessionKey(Code, function (sessionKey) {

        //解密用户信息并存入数据库
        let pc = new WXBizDataCrypt(APP_ID, sessionKey);
        let data = pc.decryptData(encryptedData, iv);
        let UserNo = data.openId;
        let UserName = data.nickName;
        let Gender = data.gender;
        let City = data.city;
        let Province = data.province;
        let UserImg = data.avatarUrl;


        //链接数据库，执行存储过程
        let proc = "CALL PROC_lOGIN(?,?,?)";//存储过程名称
        let params = [UserNo, UserImg, UserName];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
            console.log(rows);
            var responseData = {};
            responseData.Code = rows[0][0]["Code"];
            responseData.Message = rows[0][0]["Message"];
            responseData.OpenID = UserNo;
            res.json(
                responseData
            )
        });

    });
});

module.exports = router;
