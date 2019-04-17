const express = require('express');
const path = require('path');

const fs = require('fs');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
const port = 4000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/photos', express.static(__dirname + '/photos'));
//db = all database functions
const db = require('./queries');

app.post('/upload', (req, res, next) => {
  console.log(req);
  let imageFile = req.files.file;
  let familyID = req.body.family;
  const dir = __dirname + '/photos/' + familyID;

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  imageFile.mv(`${__dirname}/photos/${familyID}/${req.body.filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({file: `photos/${familyID}/${req.body.filename}.jpg`});
  });

});


//allows app to use url routes
var router = express.Router();

//For root, return simple info
app.get('/', (req, res) => {
  res.json({ info: 'api info'});
});

//GET to get all users (old)
app.get('/users', db.getUsers);
//GET to get one user (old)
app.get('/users/:id', db.getUserById);

app.get('/getCalendar/:id', db.getCalendar)

//POST to register a user
app.post('/register', db.registerUser);

//POST TO login
app.post('/login', db.login);

//POST TO CREATE FAMILY
app.post('/createFamily', db.createFamily);

app.post('/addMember', db.addMemberToFamily);

app.post('/addImageToDB', db.addImageToDB);

app.post('/getAllFamilyImages', db.getAllFamilyImages);

app.post('/addCalendar', db.addCalendar);

app.post('/deleteCalendar', db.deleteCalendar);



//LINK API
app.use('/api', router);

//Listen on chosen port
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
