'use strict'
var express = require('express');

var router = express.Router();
var sql = require("../db/mysqlConnect");


router.get('/', function (req, res) {

//获取前端传过来的参数
    let UserNo = req.query.UserNo;
    let BillNo = req.query.BillNo;
    let AddDate = req.query.Date;
    let Purpose = req.query.SpendWay;
    let PurposeIcon = req.query.SpendWayImg;
    let Money = req.query.SpendMoney;
    let Remark = req.query.Remarks;

   //链接数据库，执行存储过程
    let proc = "CALL PROC_ADD_RECORD_BILL(?,?,?,?,?,?,?)";//存储过程名称
    let params = [UserNo,BillNo, AddDate, Purpose,PurposeIcon,Money,Remark];//存储过程参数
    sql.query(proc, params, function (rows, fields) {
        console.log(rows);
        var responseData = {};
        responseData.Code = rows[0][0]["Code"];
        responseData.Message = rows[0][0]["Message"];
        res.json(
            responseData
        )
    });

});
module.exports = router;
