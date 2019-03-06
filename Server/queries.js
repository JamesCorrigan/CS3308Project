const Pool = require('pg').Pool
const pool = new Pool({
  user: 'james',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

const createUser = (req, res) => {
  const { name, email } = req.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${result.insertId}`)
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

const register = (req,res) => {
  let now = new Date();
  let userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: now,
    modified: now,
  }

  pool.query('INSERT INTO users (first_name, last_name, email, password, created, modified) VALUES ($1,$2,$3,$4,$5,$6)', [userData.first_name, userData.last_name, userData.email, userData.password, userData.created, userData.modified], (err, results, fields) => {
    if (err) {
      console.log("error", err);
      res.send({
        "code": 400,
        "failed": "error"
      });
    } else {
      console.log("solution", results);
      res.send({
        "code": 200,
        "success": "registered user"
      });
    }
  });
}

const login = (req, res) => {
  //load username / password
  let params = req.body;
  const email = params.email;
  const password = params.password;
  pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results, fields) => {
    if (err) {
      console.log("error", err);
      res.send({
        "code": 400,
        "failed": "error"
      });
    } else {
      if (results.length > 0) {
        if (results[0].password == password) {
          res.send({
            "code": 200,
            "success": "login successful"
          });
        } else {
          res.send({
            "code": 204,
            "success": "Wrong Password"
          });
        }
      } else {
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
  createUser,
  updateUser,
  deleteUser,
  login,
  register
}
