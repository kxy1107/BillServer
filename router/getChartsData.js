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

//链接数据库，执行存储过程
    let proc = "CALL PROC_GET_CHARTS_DATA(?)";//存储过程名称
    let params = [UserNo];//存储过程参数
    sql.query(proc, params, function (rows, fields) {
        console.log(rows);
        responseData.Code = rows[0][0]["Code"];
        responseData.Message = rows[0][0]["Messagwe"];
        let monthCostList = [];
        for (let key of rows[1]) {
            let list = {};
            list.Date = key["MonthDate"];
            list.SpendMoney = key["Money"] == null ? 0 : key["Money"];
            monthCostList.push(list);
        }
        responseData.ChartsData = monthCostList;
        res.json(
            responseData
        )
    });

});
module.exports = router;
