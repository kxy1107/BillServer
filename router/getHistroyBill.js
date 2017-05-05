var express = require('express');
var histroyBill = require('../model/histroyBill');

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
    let proc = "CALL PROC_GETHISTROYBILL(?,?,?,?,?)";//存储过程名称
    let params = [UserNo, StartDate, EndDate, PageSize, PageIndex];//存储过程参数
    sql.query(proc, params, function (rows, fields) {
        console.log(rows);
        responseData.code = rows[0][0]["Code"];
        responseData.message = rows[0][0]["Message"];
        histroyBill.BillList = [];
        for (let key of rows[1]) {
            let list = {};
            list.UserNo = key["UserNo"];
            list.UserName = "aaa";
            list.BillNo = key["BillNo"];
            list.BillDate = key["BillDate"];
            list.BillMoney = key["Money"];
            list.BillPurpose = key["Purpose"];
            list.BillRemark = key["Remark"];
            histroyBill.BillList.push(list);
        }
        responseData.data = histroyBill.BillList;
        res.json(
            responseData
        )
    });

});
module.exports = router;
