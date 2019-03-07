const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const db = require('./queries');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var router = express.Router();

app.get('/', (req, res) => {
  res.json({ info: 'api info'});
});

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);
app.post('/register', db.register);
app.post('/login', db.login);
app.use('/api', router);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
