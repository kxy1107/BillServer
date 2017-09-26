'use strict'
var express = require('express');

var router = express.Router();
var sql = require("../db/mysqlConnect");

router.get('/', function (req, res) {

//获取前端传过来的参数
    let UserNo = req.query.UserNo;
    let BillNo = req.query.BillNo;
   

//链接数据库，执行存储过程
    let proc = "CALL PROC_GET_BILL_DETAIL_INFO(?,?)";//存储过程名称
    let params = [UserNo,BillNo];//存储过程参数
    sql.query(proc, params, function (rows, fields) {
        console.log(rows);
        var responseData = {}; 
        responseData.Code = rows[0][0]["Code"];
        responseData.Message = rows[0][0]["Message"];
        let billInfo = [];
        for (let key of rows[1]) {
            let list = {};
            list.UserNo = key["UserNo"];
            list.BillNo = key["BillNo"];
            list.BillDate = key["BillDate"];
            list.SpendMoney = key["Money"] == null ? 0 : key["Money"];
            list.Purpose = key["Purpose"];
            list.PurposeIcon = key["PurposeIcon"];
            list.Remark = key["Remark"];
            billInfo.push(list);
        }
        responseData.BillInfo = billInfo;
        res.json(
            responseData
        )
    });

});
module.exports = router;
