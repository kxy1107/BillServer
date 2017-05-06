'use strict'
var express = require('express');
var router = express.Router();
var sql = require("../db/mysqlConnect");
var responseData;

router.use(function (req, res, next) {

    responseData = {
        code: 0,
        message: ''
    }
    next();
});


router.get('/', function (req, res) {

//获取前端传过来的参数
    let UserNo = req.query.UserNo;
    let StartDate = req.query.StartDate;
    let EndDate = req.query.EndDate;
    let PageSize = req.query.PageSize;
    let PageIndex = req.query.PageIndex;

//链接数据库，执行存储过程
    let proc = "CALL PROC_GET_HISTORY_BILL(?,?,?,?,?)";//存储过程名称
    let params = [UserNo, StartDate, EndDate, PageSize, PageIndex];//存储过程参数
    sql.query(proc, params, function (rows, fields) {
        console.log(rows);
        responseData.Code = rows[0][0]["Code"];
        responseData.Message = rows[0][0]["Messagwe"];
        responseData.TotalMoney = rows[1][0]["TotalMoney"] == null ? 0 : rows[1][0]["TotalMoney"];
        let histroyBill = [];
        for (let key of rows[2]) {
            let list = {};
            list.UserNo = key["UserNo"];
            list.BillNo = key["BillNo"];
            list.Date = key["BillDate"];
            list.SpendMoney = key["Money"] == null ? 0 : key["Money"];
            list.Purpose = key["Purpose"];
            list.PurposeIcon = key["PurposeIcon"];
            histroyBill.push(list);
        }
        responseData.HistoryBillList = histroyBill;
        res.json(
            responseData
        )
    });

});
module.exports = router;
