const pool = require("../db");
const bcrypt = require("bcryptjs"); // I forgot to put this in and I spent like 30 minutes wondering why the server kept crashing lol

// PUT Request to update a person's info in the datbase (including password)
// In postman: https://localhost:80/api/v1/people/old_email
// We are using this method
const updatePerson = (req, res) => {
  if (req.user.role_name.includes("Administrator")) {
    pool.getConnection((err, db) => {
      if (err) {
        res.status(500).send({ error: err });
        throw err;
      }
      db.beginTransaction(err => {
        if (err) {
          res.status(500).send({ error: err });
          throw err;
        }
        // got this from the first query
        let userId = req.body.people_id;

        // These variables all come from the body of the fetch request
        let userFirstName = req.body.first_name;
        let userLastName = req.body.last_name;
        let userNewEmail = req.body.new_email;
        let userNewPassword = req.body.new_password; // recieves the value of userOldPassword if it's empty
        let userLocation = req.body.location;

        // Check to see if the password is being changed at all (i.e. if 'userNewPassword' is null or empty)
        if (userNewPassword === "") {
          /* user IS NOT changing the password; perform a separate query */
          console.log(" * [get_people] You are NOT changing their password");

          // No need to salt & hash because the password is not changing at all

          // Write a query where the password is not updated
          SQL =
            "UPDATE People SET first_name = '" +
            userFirstName +
            "', last_name = '" +
            userLastName +
            "', p_location = '" +
            userLocation +
            "', email = '" +
            userNewEmail +
            "' WHERE people_id = " +
            userId;
        } else {
          /* User IS changing the password; perform a separate query */
          console.log(" * [get_people] You ARE changing their password");

          // Since we're changing the password, we need to salt & hash
          let salt = bcrypt.genSaltSync(10); // create a salt
          let hash = bcrypt.hashSync(userNewPassword, salt); // hash the password using the salt

          // Write a query where the password IS updated
          SQL =
            "UPDATE People SET first_name = '" +
            userFirstName +
            "', last_name = '" +
            userLastName +
            "', p_location = '" +
            userLocation +
            "', p_password = '" +
            hash +
            "', email = '" +
            userNewEmail +
            "' WHERE people_id = " +
            userId;
        }

        db.query(SQL, (err, rows, fields) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).send({ error: err });
            });
          }

          db.commit(err => {
            if (err) {
              return db.rollback(() => {
                throw err;
              });
            }
            db.release(err => {
              if (err) {
                console.log("connection failed to close");
              }
            });
            res.status(200).send(rows);
          });
        });
      });
    });
  } else {
    console.log("Only an Administrator can alter a user's details");
    res.send(401);
  }
};

//GET Request Handler
// Administrator can see all the employees
// https://localhost:80/api/v1/people
const getPeople = (req, res) => {
  if (req.user.role_name.includes("Administrator")) {
    let sql =
      "SELECT p.people_id,p.is_active, p.first_name, p.last_name, p.email, p.p_location, GROUP_CONCAT(r.role_name SEPARATOR \", \") as 'role_names' FROM People p, Role r, PeopleRoles pr WHERE p.people_id = pr.people_id AND pr.role_id = r.role_id GROUP BY p.people_id";
    //console.log("query:"+sql);
    pool.query(sql).then(rows => {
      res.status(200).send(rows);
    });
  } else {
    res.send(401);
  }
};

//GET Request Handler
// Hiring Team Memeber can see all the interviewers
// https://localhost:80/api/v1/getAllInterviewers
const getAllInterviewers = (req, res) => {
    if (req.user.role_name.includes("Hiring Team Member")) {
      let sql =
        "SELECT people_id, first_name, last_name, email FROM People GROUP BY people_id";
      pool.query(sql).then(rows => {
        res.status(200).send(rows);
      });
    } else {
      res.send(401);
    }
  };

//GET Request Handler
// Manager can see all the interviewers they created
// https://localhost:80/api/v1/getInterviewers
const getInterviewers = (req, res) => {
  if (req.user.role_name.includes("Manager") || req.user.role_name.includes("Hiring Team Member")) {
    let sql =
      "SELECT people_id, first_name, last_name, email FROM People WHERE created_by = '" +
      req.user.people_id +
      "' GROUP BY people_id";
    pool.query(sql).then(rows => {
      res.status(200).send(rows);
    });
  } else {
    res.send(401);
  }
};

//GET Request Handler
// Manager sees more information about an interviewer they created
// https://localhost:80/api/v1/getSingleInterviewer/:people_id
const getSingleInterviewer = (req, res) => {
    if(req.user.role_name.includes ("Manager") || req.user.role_name.includes("Hiring Team Member")){
        let sql = "SELECT p.people_id, GROUP_CONCAT(DISTINCT p.first_name, ' ',p.last_name) AS person, p.p_location, r.role_name, p.max_interviews, GROUP_CONCAT(DISTINCT pf.profile_name) AS profiles FROM People p, Role r, PeopleRoles pr, Profile pf, peopleProfile pp WHERE p.people_id = pr.people_id AND pr.role_id = r.role_id AND pp.profile_id = pf.profile_id AND p.people_id = pp.people_id AND p.people_id = '" + req.params.people_id + "' GROUP BY p.people_id";
        pool.query(sql).then((rows)=>{
            res.status(200).send(rows);
        });
    }
    else {
        res.send(401);
    }
};

//GET Request Handler
// Manager sees the interviews the interviewer they created are invited to
// https://localhost:80/api/v1/getSingleInterviewerMeet/:people_id
const getSingleInterviewerMeet = (req, res) => {
  if (req.user.role_name.includes("Manager") || req.user.role_name.includes ("Hiring Team Member")) {
    let sql =
      "SELECT m.meeting_datetime, mr.room_name, mr.room_location, GROUP_CONCAT(c.first_name, ' ', c.last_name) AS Candidate, pr.profile_name, pm.meeting_id FROM Meeting m  INNER JOIN MeetingRoom mr  ON m.meeting_room_id = mr.meeting_room_id  INNER JOIN PeopleInMeeting pm ON m.meeting_id = pm.meeting_id INNER JOIN People p ON p.people_id = pm.people_id INNER JOIN Candidate c ON m.candidate_id = c.candidate_id INNER JOIN Profile pr ON m.profile_id = pr.profile_id WHERE p.created_by IN (SELECT created_by FROM People WHERE p.created_by = '" +
      req.user.people_id +
      "') AND p.people_id = '" +
      req.params.people_id +
      "' GROUP BY m.meeting_id ORDER BY meeting_datetime DESC;";
    pool.query(sql).then(rows => {
      res.status(200).send(rows);
    });
  } else {
    res.send(401);
  }
};

// Used in ManageMaxInterviewsPerWeek to GET the max interviews
// per week from the DB for currently logged in user
const getMaxInterviews = (req, res) => {
  if (
    req.user.role_name.includes("Interviewer") ||
    req.user.role_name.includes("Interview Leader")
  ) {
    let sql =
      " SELECT max_interviews from People where people_id = " +
      req.user.people_id +
      "  ";
    pool.query(sql).then(row => {
      res.status(200).send(row);
    });
  } else {
    res.send(401);
  }
};

// Used in ManageMaxInterviewsPerWeek to UPDATE the
// max interviews in the DB for currently logged in user
const updateMaxInterviews = (req, res) => {
  if (
    req.user.role_name.includes("Interviewer") ||
    req.user.role_name.includes("Manager")||
    req.user.role_name.includes('Interview Leader')

  ) {
    let sql =
      " update People set max_interviews = '" +
      req.body.max_interviews +
      "' where (people_id = " +
      req.user.people_id +
      " ) ";
    pool.query(sql).then(rows => {
      res.status(200).send(rows);
    });
  } else {
    res.send(401);
  }
};

//GET individual employee
//is working
const getOneEmployee = (req, res) => {
  let sql = "select * from People where people_id = " + req.params.user_id + "";
  pool.query(sql).then(rows => res.status(200).send(rows));
};

// UPDATE Request Handler
//is working
const updateEmployee = (req, res) => {
  if (req.user.role_name.includes("Administrator")) {
    pool.getConnection((err, db) => {
      if (err) {
        res.status(500).send({ error: err });
        throw err;
      }
      db.beginTransaction(err => {
        if (err) {
          res.status(500).send({ error: err });
          throw err;
        }
        let sql =
          "update People set first_name = '" +
          req.body.first_name +
          "', last_name = '" +
          req.body.last_name +
          "',email = '" +
          req.body.email +
          "', created_by = " +
          req.body.created_by +
          ", p_password = '" +
          req.body.p_password +
          "', p_location = '" +
          req.body.p_location +
          "'  where people_id = " +
          req.params.user_id;
        db.query(sql, (err, rows, fields) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).send({ error: err });
            });
          }

          db.commit(err => {
            if (err) {
              return db.rollback(() => {
                throw err;
              });
            }
            db.release(err => {
              if (err) {
                console.log("connection failed to close");
              }
            });
            res.status(200).send(rows);
          });
        });
      });
    });
  } else {
    res.send(401);
  }
};

// ACTIVATE (or reactivate) Request Handler
const activateEmployee = (req, res) => {
  if (req.user.role_name.includes("Administrator")) {
    let sql =
      "UPDATE People SET is_active = true WHERE email = '" +
      req.body.email +
      "'";
    //console.log(" First query: " + sql);
    pool.query(sql).then(rows => {
      //console.log(" * Successfully activated?");
      res.status(200).send(rows);
    });
  } else {
    console.log("Only an administrator can activate a user");
    res.status(401);
  }
};

// DEACTIVATE (not delete) Request Handler
const deactivateEmployee = (req, res) => {
  if (req.user.role_name.includes("Administrator")) {
    let sql =
      "UPDATE People SET is_active = false WHERE email = '" +
      req.body.email +
      "'";
    //console.log(" First query: " + sql);
    pool.query(sql).then(rows => {
      //console.log(" * Successfully deactivated?");
      res.status(200).send(rows);
    });
  } else {
    console.log("Only an administrator can deactivate a user");
    res.status(401);
  }
};

// When a user of Dai Hire wants to update their own password
const updateMyOwnPassword = (req, res) => {
  pool.getConnection((err, db) => {
    if (err) {
      res.status(500).send({ error: err });
      throw err;
    }
    db.beginTransaction(err => {
      if (err) {
        res.status(500).send({ error: err });
        throw err;
      }
      //let oldPassword = req.body.oldPassword;
      let newPassword = req.body.newPassword;
      // we need to salt & hash before inserting into the database
      let salt = bcrypt.genSaltSync(10); // create a salt
      let hash = bcrypt.hashSync(newPassword, salt); // hash the password using the salt

      // Write a query to test the oldPassword that was passed in with the current password in the DB
      //let oldPasswordHash = bcrypt.hashSync(oldPasswrd, salt);
      //let oldSQL = "SELECT p_password FROM People WHERE p_password = '" + oldPasswordHash + "'";

      // write a query to update the password where the people_id (in the DB) matches the user_id passed in through the request (req)
      let sql = "UPDATE People set p_password = '" + hash + "'  WHERE people_id = " + req.user.people_id;
      console.log(" * First query: " + sql);
      db.query(sql, (err, rows, fields) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).send({ error: err });
          });
        }

        db.commit(err => {
          if (err) {
            return db.rollback(() => {
              throw err;
            });
          }
          db.release(err => {
            if (err) {
              console.log("connection failed to close");
            }
          });
          res.status(200).send(rows);
        });
      });
    });
  });
};

module.exports = {
  activateEmployee,
  deactivateEmployee,
  getPeople,
  getOneEmployee,
  updateEmployee,
  updateMaxInterviews,
  getMaxInterviews,
  updatePerson,
  getInterviewers,
  getSingleInterviewerMeet,
  getSingleInterviewer,
  updateMyOwnPassword,
  getAllInterviewers
};
 