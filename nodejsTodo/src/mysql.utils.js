var mysql = require('mysql')
console.log(process.env.MYSQL_USER)
var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DBNAME,
})

connection.connect()
exports.connection = connection
