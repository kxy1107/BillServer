'use strict'
var mysql = require('mysql'); //导入mysql Module  
  
var pool = mysql.createPool({  
    host: 'localhost',  
    user: 'root',  
    password: '123456',  
    database: 'kxytest'  
});  
  
//查询sql语句  
function query(strSQL, param, callback) {  
    pool.getConnection(function(err, connection) {  
        connection.query(strSQL, param, function(err, rows, fields) {  
            if (err) throw err;  
            callback(rows, fields);  
            connection.release();
            // connection.destroy();  
        });  
    });  
}  
  
exports.query = query;  