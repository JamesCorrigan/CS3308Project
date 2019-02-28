var express = require('express');
var router = express.Router();




//CREATE
router.post('/new', function(req, res, next) {
  res.locals.connection.query('insert into members(name,email) values(''+req.body.name+'',''+req.body.email+'')', function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});
//READ
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.locals.connection.query('SELECT * from members',function (error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
  });
});
//UPDATE
router.get('/edit', function(req, res, next) {
  res.locals.connection.query('update members set name = ''+req.body.name+'', email = ''+req.body.email+'' where id = ''+req.body.id+''', function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
  });
});

//DELETE
router.get('/delete', function(req, res, next) {
    res.locals.connection.query('DELETE from members where id = '+req.body.id+'', function (error, results, fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});


module.exports = router;
