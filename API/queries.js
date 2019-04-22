const Pool = require('pg').Pool;
//connect to db
const pool = new Pool({
  user: 'james',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

//query for all users
function getUsers(req, res) {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

//query for one user
function getUserById(req, res){
  const id = parseInt(req.params.id);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

function getUserByEmail(email){
  pool.query('SELECT * FROM users WHERE email = $1 RETURNING *', [email], (error, results) => {
    if (error) {
      throw error;
    } else {
      const user = results.rows[0];
      console.log(user);
      res.status(200).json(results.rows)
      return user;
    }

  })
}

function getAllFamilyImages(req, res){
  const familyID = parseInt(req.body.family);
  console.log('family: ', familyID, );
  pool.query('SELECT images FROM families WHERE id = $1', [familyID], (error, results) => {
    const images = results.rows[0].images;
    if (error) {
      throw error;
      res.status(204).json(results.rows)
    } else {

    }
    if (images.length > 0) {
      res.send({
        "code": 200,
        "success": "got photos",
        data: images
      });
    } else {
      res.send({
        "code": 204,
        data: images
      })
    }
  })
}


function addImageToDB(req, res) {
  const url = req.body.url;
  const family = req.body.family;
  console.log('url:', url, 'family: ', family);
  pool.query('UPDATE families SET images = array_append(images, $1) WHERE id = $2',
  [url, family], (error, results) => {
    if (error) {
      throw error;
    }
    res.send({
      "code": 200,
      "success": "Added URL to family DB"
    });
  })
}

function updateUser(req, res) {
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

function deleteUser(req, res) {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
}

function registerUser(req, res) {
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
    'INSERT INTO users (first_name, last_name, email, password, created, family, parent) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
    [first_name, last_name, email, password, Date.now(), family, parent],
    (err, results, fields) => {
    if (err) {
      console.log("error", err);
      res.send({
        "code": 400,
        "failed": "error"
      });
    } else {
      const user = results.rows[0];
      //AFTER USER IS REGISTERED, NEED TO PREFORM ACTIONS ON FAMILY TABLE
      res.send({
        "code": 200,
        "success": "registered user",
        data: user
      });
    }
  });
}

function addMemberToFamily(req, res) {
    const now = new Date();
    const family = req.body.family;
    const last_name = req.body.last_name;
    const first_name = req.body.first_name;
    const email = req.body.email;
    const password = req.body.password;
    const parent = req.body.parent;
    const obj = {
      first_name,
      last_name,
      email,
      password,
      family,
      parent
    }
    let added = false;
    const user = createFamilyHelper(obj);
    if (user){
        pool.query(
            'SELECT * FROM families WHERE id = ($1)',
            [family],
            (err, results, fields) => {
                const members = results.rows[0].members;
                if (err){
                    console.log("error", err);
                }else{
                    if (parent){
                        const newMembers = {parents: [...members.parents, first_name], children: members.children};
                        pool.query(
                            'UPDATE families SET members = ($1)',
                            [newMembers],
                            (err, results, fields) => {
                                if (err){
                                    console.log('err', error);
                                }else{
                                    res.send({
                                      "code": 200,
                                      "success": "add member to family successful",
                                      "data": obj
                                    });
                                }
                            });
                    }else{
                        const newMembers = {parents: members.parents, children: [...members.children], first_name}
                        pool.query(
                            'UPDATE familes SET members = ($1)',
                            [newMembers],
                            (err, results, fields) => {
                                if (err){
                                    console.log('err', error);
                                }else{
                                    res.send({
                                      "code": 200,
                                      "success": "add member to family successful",
                                      "data": obj
                                    });
                                }
                            });
                    }
                }
            });
    } else {
      //if add user fails:
      console.log('failure');

    }
}

function createFamilyHelper(obj) {
  const now = new Date();
  const first_name = obj.first_name;
  const last_name = obj.last_name;
  const email = obj.email;
  const password = obj.password;
  const family = obj.family;
  const parent = obj.parent;
  let created;
  pool.query(
    'INSERT INTO users (first_name, last_name, email, password, created, family, parent) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
    [first_name, last_name, email, password, now, family, parent],
    (err, results, fields) => {
    if (!!err) {
      console.log("error", err);
      created = false;
    } else {
      console.log('user created!');
      created = true;
      //AFTER USER IS REGISTERED, NEED TO PREFORM ACTIONS ON FAMILY TABLE
    }
  });
  return created;
}

async function createFamily(req, res) {
  //CREATE IMAGES FOLDER FOR FAMILY, USERS, etc.
  const now = new Date();
  const last_name = req.body.last_name;
  const first_name = req.body.first_name;
  const email = req.body.email;
  const password = req.body.password;
  const parent = req.body.parent;
  let images = {};
  const members = req.body.parent ? {parents: [first_name], children: []} : {parents: [], children: [first_name]};
  let calendar = {};
  console.log(req.body);
  const result = await pool.query(
    'INSERT INTO families (last_name, images, members, calendar) VALUES ($1,$2,$3,$4) RETURNING *',
    [last_name, images, members, calendar],
    (err, results) => {
      if (!!err) {
        console.log('error', err);
        res.send({
          "code": 400,
          "failed": "error"
        });
      } else {
        /*
        res.send({
          "code": 200,
          "success": "created family",
          "data": results.rows[0]
        });
        */
        const family = results.rows[0].id;
        let created = false;
        pool.query(
          'INSERT INTO users (first_name, last_name, email, password, created, family, parent) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
          [first_name, last_name, email, password, now, family, parent],
          (err, iResults, fields) => {
          if (!!err) {
            console.log("error", err);
            created = false;
            res.send({
              "code": 204,
              "failed": "user creation error",
              "data": results.rows[0]
            });
            //delete family if user isnt made
          } else {
            console.log('user and family created!');
            created = true;
            res.send({
              "code": 200,
              "success": "created family",
              "family": results.rows[0],
              "user": iResults.rows[0]
            });
            //AFTER USER IS REGISTERED, NEED TO PREFORM ACTIONS ON FAMILY TABLE
          }
        });

        //IF FAMILY CREATED, LOG in as user who created.
      }
    }
  )
}



function login(req, res) {
  //load username / password
  const email = req.body.email;
  const password = req.body.password;
  pool.query('SELECT * FROM users WHERE email = ($1)', [email], (error, results, fields) => {
    if (error !== undefined) {
      console.log("error is::", error);
      res.send({
        "code": 400,
        "failed": "error"
      });
    } else {
      if (results.rows.length > 0) {
        if (results.rows[0].password == password) {
          console.log('logged in');
          res.send({
            "code": 200,
            "success": "login successful",
            "data": results.rows[0]
          });
        } else {
          res.send({
            "code": 204,
            "success": "Wrong Password",
            "data": results.rows[0]
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

function getCalendar(req, res){
  const id = parseInt(req.params.id);
  pool.query('SELECT calendar FROM families WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    const cal = results.rows[0].calendar;
    res.send({
      "code": 200,
      "success": "login successful",
      "data": cal
    });

  })
}


function addCalendar(req, res){
    const family = req.body.family;
    const newEvent = req.body.event;
    pool.query(
        'UPDATE families SET calendar = calendar || $1 WHERE id = $2 RETURNING calendar;',
        [newEvent, family],
        (error, results, fields) => {
            if (error) {
                throw error
            }
            const cal = results.rows[0].calendar;
            console.log('add results: ', JSON.stringify(results.rows));
            res.send({
                "code": 200,
                "success": "added event",
                "data": cal
            })
        })
}

function deleteCalendar(req, res){
    const family = req.body.family;
    const badEvent = req.body.event;
    pool.query(
        'UPDATE families SET calendar = calendar - $1;',
        [badEvent],
        (error, results, fields) => {
            if (error){
                throw error;
            }
            res.send({
                "code": 200,
                "success": "deleted event"
            })
      })
}




module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  registerUser,
  login,
  createFamily,
  addMemberToFamily,
  addImageToDB,
  getAllFamilyImages,
  getCalendar,
  addCalendar,
  deleteCalendar
}
