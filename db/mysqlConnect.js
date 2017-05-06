'use strict'
var mysql = require('mysql'); //导入mysql Module  
  
var pool = mysql.createPool({  
    host: '590c46d23e11d.gz.cdb.myqcloud.com',  
    user: 'cdb_outerroot',  
    password: 'kxy930928',  
    database: 'bill' ,
    port:17649 
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