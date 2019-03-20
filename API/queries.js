const Pool = require('pg').Pool
//connect to db
const pool = new Pool({
  user: 'Joe',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

//query for all users
const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

//query for one user
const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body
  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
  })
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
}

const registerUser = (req, res) => {
  //REGISTER A USER AND JOIN TO A FAMILY
  let now = new Date();
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let password = req.body.password;
  let family = req.body.family;
  let parent = req.body.parent;
  let created = now;

  pool.query(
    'INSERT INTO users (first_name, last_name, email, password, created, family, parent) VALUES ($1,$2,$3,$4,$5,$6,$7)',
    [first_name, last_name, email, password, Date.now(), family, parent],
    (err, results, fields) => {
    if (err) {
      console.log("error", err);
      res.send({
        "code": 400,
        "failed": "error"
      });
    } else {
      //AFTER USER IS REGISTERED, NEED TO PREFORM ACTIONS ON FAMILY TABLE
      console.log("solution", results);
      res.send({
        "code": 200,
        "success": "registered user"
      });
    }
  });
}

const addMemberToFamily = (req, res) => {
  const family = req.body.family;

}
const createFamily = (req, res) => {
  //CREATE IMAGES FOLDER FOR FAMILY, USERS, etc.
  let now = new Date();
  let last_name = req.body.last_name;
  let images = {};
  let members = req.body.members;
  let calendar = {};
  pool.query(
    'INSERT INTO families (last_name, images, members, calendar)',
    [last_name, images, members, calendar],
    (err, results) => {
      if (err) {
        console.log('error', err);
        res.send({
          "code": 400,
          "failed": "error"
        });
      } else {
        //IF FAMILY CREATED, what?
        console.log("solution", results);
        res.send({
          "code": 200,
          "success": "created family"
        });
      }
    }
  )
}



const login = (req, res) => {
  //load username / password
  const email = req.body.email;
  const password = req.body.password;
  pool.query('SELECT * FROM users WHERE email = ($1)', [email], (error, results, fields) => {
    console.log(error);
    if (error !== undefined) {
      console.log("error is::", error);
      res.send({
        "code": 400,
        "failed": "error"
      });
    } else {
      console.log(results.rows[0]);
      if (results.rows.length > 0) {
        if (results.rows[0].password == password) {
          console.log('logged in');
          res.send({
            "code": 200,
            "success": "login successful"
          });
        } else {
          console.log('wrong password');
          res.send({
            "code": 204,
            "success": "Wrong Password"
          });
        }
      } else {
        console.log('user does not exist');
        res.send({
          "code": 204,
          "success": "User Does not exist"
        });
      }
    }
  });
  //pull user with same name from db, then check password
}

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  login,
  createFamily
}
