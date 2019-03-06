var mysql = require('mysql');
var connection = mysql.createConnection({
  user: 'james',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});
connection.connect(function(err) {
  if (!err) {
    console.log("database connected");
  } else {
    console.log("Error connecting Database");
  }
})
