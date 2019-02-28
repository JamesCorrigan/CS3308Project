var mysql = require('mysql');
var express = require('express');
var app = express();


//connect to database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'me',
  password: 'password',
  database: 'my_db',
});

//listen to POSTS:
app.post('/users', function(req, res) {
  //pull sent data
  var user = req.body;
  //query mysql
  var query = connection.query('INSERT INTO users SET ?', user, function(err, result) {
    //???
  });
  res.end('logged in');
});

app.listen(3000, function() {
  console.log('listening on port 3000')
})
