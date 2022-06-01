var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_aungm',
  password        : '3348',
  database        : 'cs340_aungm'
});
module.exports.pool = pool;