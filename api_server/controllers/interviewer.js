//by availabiliy
//and profile

const bcrypt = require("bcryptjs"); // encrypts passwords being added (use din addNewInterviewer)

const pool = require("../db");

//GET Request Handler by profile
// Hiring Team can see all the availability that interviewers have
// http://localhost:80/api/v1/interviewers/profile

// *** POST Request Handler *** //
//is working
// anything that is "req.user" relates to the user who is logged in, while
// anything that is "req.body" relates to the Daitan Employee who is BEING ADDED TO DAIHIRE by the above user
const addNewInterviewer = (req, res) => {
  // Ensures only an Administrator or Manager is trying to add a new user (they're the only ones who can)
  if (
    req.user.role_name.includes("Administrator") ||
    req.user.role_name.includes("Manager")
  ) {
    let currentUserLoggedIn = req.user.people_id;

    let firstNameToAdd = req.body.first_name;
    let lastNameToAdd = req.body.last_name;
    let emailToAdd = req.body.email;
    let passToAdd = req.body.p_password;
    let locToAdd = req.body.p_location;
    let profilesToAdd = req.body.profile_ids;

    // hash & salt the password passed in
    let SALT = bcrypt.genSaltSync(10); // create a salt
    let HASH = bcrypt.hashSync(passToAdd, SALT); // hash the password using the salt
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
        // Write an execute a query to insert the candidate without profiles
        let sql =
          "INSERT INTO People (created_by, first_name, last_name, email, p_password, p_location) VALUES (" +
          currentUserLoggedIn +
          ",'" +
          firstNameToAdd +
          "', '" +
          lastNameToAdd +
          "', '" +
          emailToAdd +
          "', '" +
          HASH +
          "', '" +
          locToAdd +
          "' )";
        db.query(sql, (err, rows, fields) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).send({ error: err });
            });
          }
          let idOfUserToAdd = rows.insertId;
          let numberOfRolesToAdd = req.body.role_name.length;
          sql = "SELECT role_id FROM Role Where role_name IN (";
          // Does this loop for every role that you want to add
          for (let i = 0; i < numberOfRolesToAdd; i++) {
            let currentRoleName = req.body.role_name[i]; // may not be in the same order as they are in the DB
            sql += "'"+currentRoleName + "',";
          }
          sql = sql.substring(0, sql.length - 1);
          sql += ")";
          db.query(sql, function(err, rows, fields) {
            if (err) {
              return db.rollback(() => {
                res.status(500).send({ error: err });
              });
            }
            idOfRoleToAdd = rows[0].role_id;
            sql =
              "INSERT INTO PeopleRoles (people_id, role_id, role_added_by) VALUES ";
            for (let i = 0; i < numberOfRolesToAdd; i++) {
              let idOfRoleToAdd = rows[i].role_id; // may not be in the same order as they are in the DB
              sql +=
                "(" +
                idOfUserToAdd +
                "," +
                idOfRoleToAdd +
                "," +
                currentUserLoggedIn +
                "),";
            }
            sql = sql.substring(0, sql.length - 1);
            db.query(sql, function(err, rows, fields) {
              if (err) {
                return db.rollback(() => {
                  res.status(500).send({ error: err });
                });
              }
              sql = "INSERT INTO peopleProfile (people_id, profile_id) VALUES ";

              // append a new bubble onto the end of the query containing candidate id ( doesn't change) and the current profile id
              for (let j = 0; j < profilesToAdd.length; j++) {
                sql += "(" + idOfUserToAdd + "," + profilesToAdd[j] + "),";
              }

              // remove the last character of the array (a comma)
              sql = sql.substring(0, sql.length - 1);
              db.query(sql, function(err, rows, fields) {
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
                  res.status(200).send({ status: "Interviewer entered in db" });
                });
              });
            });
          });
        });
      });
    });
   
  } else {
    console.log("You must be an Administrator or Manager to add new users");
    res.send(401);
  }
};

const profileAvailable = (req, res) => {
  if (req.user.role_name.includes("Hiring Team Member")) {
    sql =
      "SELECT p.people_id, p.first_name, p.last_name,p.email, r.role_name,GROUP_CONCAT(pro.profile_id) as 'profile_id', GROUP_CONCAT(distinct(pro.profile_name) SEPARATOR ',') as 'profile_name' FROM People p INNER JOIN peopleProfile pp   on p.people_id = pp.people_id INNER JOIN  Profile pro on pro.profile_id = pp.profile_id INNER JOIN  PeopleRoles prol  on prol.people_id = p.people_id INNER JOIN  Role r  on r.role_id = prol.role_id WHERE r.role_name IN( 'Interviewer' ,'Interview Leader') GROUP BY (p.people_id)";

    pool.query(sql).then(rows => {
      rows.forEach(function(element) {
        element.profile_name = element.profile_name.split(",");
        element.profile_id = element.profile_id.split(",");
      });

      res.status(200).send(rows);
    });
  } else {
    res.send(401);
  }
};

//GET Request Handler by time
// Hiring Team can see all the availability that interviewers have
// https://localhost:80/api/v1/interviewers/time/people_id
const timeAvailable = (req, res) => {
  if (
    req.user.role_name.includes("Hiring Team Member") ||
    req.user.people_id == req.params.people_id ||
    req.user.role_name.includes("Manager")
  ) {
    sql =
      "SELECT  pava.timeslot_week_day AS weekday,   pava.timeslot_start_time AS start_time, pava.timeslot_end_time AS end_time FROM People p INNER JOIN  PeopleAvailability pava  on p.people_id = pava.people_id WHERE p.people_id =" +
      req.params.people_id +
      "";

    pool.query(sql).then(rows => {
      res.status(200).send(rows);
    });
  } else {
    res.send(401);
  }
};

//Post Request Handler
// Hiring Team and Manager can see all the interviewers' availability
//http://localhost:80/api/v1/interviewers/available
const userAvailability = (req, res) => {
  if (
    req.user.role_name.includes("Manager") ||
    req.user.role_name.includes("Hiring Team Member")
  ) {
    let values = "";
    req.body.interviewers.forEach(person => {
      values += person + ",";
    });
    values = values.substr(0, values.length - 1);
    sql =
      "select p.people_id, p.first_name, p.last_name,p.email, r.role_name, pa.timeslot_week_day, pa.timeslot_start_time, pa.timeslot_end_time from People p inner join PeopleRoles pr on pr.people_id = p.people_id inner join Role r on r.role_id = pr.role_id inner join PeopleAvailability pa on pa.people_id = p.people_id WHERE p.people_id IN (" +
      values +
      ") AND r.role_name IN('Interview Leader','Interviewer') ORDER BY p.people_id , r.role_name, pa.timeslot_week_day, pa.timeslot_start_time";
    pool
      .query(sql)
      .then(rows => {
        if (rows.length === 0) {
          throw 204;
        }
        let personTime = [];
        let i = 0;
        let person = rows[i].people_id;
        let name = rows[i].first_name + " " + rows[i].last_name;
        let role = rows[i].role_name;
        let email = rows[i].email;
        personTime.push({
          people_id: person,
          name: name,
          role: role,
          email: email,
          time: []
        });
        rows.forEach(row => {
          if (person != row.people_id) {
            i++;
            person = row.people_id;
            name = row.first_name + " " + row.last_name;
            role = row.role_name;
            email = row.email;
            personTime.push({
              people_id: person,
              name: name,
              role: role,
              email: email,
              time: []
            });
          }

          if (role != row.role_name) {
            // do nothing duplicate entry
          } else {
            personTime[i].time.push({
              week_day: row.timeslot_week_day,
              start_time: row.timeslot_start_time,
              end_time: row.timeslot_end_time
            });
          }
        });
        res.status(200).send(personTime);
      })
      .catch(err => {
        switch (err) {
          case 204:
            res.sendStatus(204);
            break;
          default:
            res.sendStatus(500);
        }
      });
  } else {
    res.send(401);
  }
};

// Used in manager tools "View Interviewers" and "Add Profiles to Interviewers"
const getAllProfilesForChosenInterviewer = (req, res) => {
  if (req.user.role_name.includes("Manager")) {
    console.log(" * [interviewer.js] You're a manager, Harry");
    let idOfInterviewer = req.params.id;
    //let emailOfInterviewer = req.params.email;
    console.log(" * [interviewer.js] id of interviewer" + idOfInterviewer);
    //console.log(" * [interviewer.js] email of interviewer: " + emailOfInterviewer);
    let sql =
      "SELECT pro.profile_name FROM Profile pro, People p, peopleProfile pp WHERE p.people_id = pp.people_id AND pp.profile_id = pro.profile_id AND p.people_id = " +
      idOfInterviewer +
      " ORDER BY pro.profile_name"; // id wasn't working in InterviewerList.jsx
    //let sql = "SELECT pro.profile_name FROM Profile pro, People p, peopleProfile pp WHERE p.people_id = pp.people_id AND pp.profile_id = pro.profile_id AND p.email = '" + emailOfInterviewer + "' ORDER BY pro.profile_name";
    console.log(" query: " + sql);
    pool.query(sql).then(rows => {
      res.status(200).send(rows);
    });
  } else {
    console.log(" * [interviewer.js] You must be a manager to use this tool");
    res.send(401);
  }
};

// Used in manager tools "View Interviewers" and "Add Profiles to Interviewers"
const showAllInterviewers = (req, res) => {
  if (req.user.role_name.includes("Manager")) {
    // Good to go
    let sql =
      "SELECT p.first_name, p.last_name, p.people_id, p.email, p_location, p.is_active, p.max_interviews, GROUP_CONCAT(r.role_name SEPARATOR ', ') as 'role' FROM People p, PeopleRoles pr, Role r WHERE p.people_id = pr.people_id AND pr.role_id = r.role_id AND r.role_name IN ('Interviewer','Interview Leader') GROUP BY p.people_id ORDER BY p.people_id";
    console.log(" * [interviewer.js] First Query: " + sql);
    pool.query(sql).then(rows => {
      res.status(200).send(rows);
    });
  } else {
    console.log(" * [interviewer.js] You must be a manager to use this tool");
    res.send(401);
  }
};

// Used to add a profile for an interviewer (AKA used to insert a new entry in peopleProfile)
// building atm
const grantProfileToInterviewer = (req, res) => {
  if (req.user.role_name.includes("Manager")) {
    let peopleId = req.body.people_id;
    let profileName = req.body.profile_name;

    // Write & Execute a query to get the profile_id from the profile_name
    let sql =
      "SELECT profile_id FROM Profile WHERE profile_name = '" +
      profileName +
      "'";
    console.log(" * First query: " + sql);
    pool.query(sql).then(rows => {
      //let userId = rows[0].people_id;
      let profileId = rows[0].profile_id;

      // Write & Execute a query to insert a new entry in peopleProfile containing the people_id and profile_id
      sql =
        "INSERT INTO peopleProfile (profile_id, people_id) VALUES (" +
        profileId +
        "," +
        peopleId +
        ")";
      console.log(" * Second query: " + sql);
      pool.query(sql).then(rows => {
        res.status(200).send(rows);
      });
    });
  } else {
    console.log(" Only a manager can grant a profile to an interviewer");
    res.send(401);
  }
};

// Used to remove a profile from an interviewer (AKA delete a row in peopleProfile based off of people_id and profile_id)
// will need to run the following command in MySQL developer or a mysql terminal in order for this query to work
// GRANT DELETE ON peopleProfile TO daihire;
const removeProfileFromInterviewer = (req, res) => {
  if (req.user.role_name.includes("Manager")) {
    let peopleId = req.body.people_id;
    let profileName = req.body.profile_name;

    // Write & Execute a query to get the profile_id from the profile_name
    let sql =
      "SELECT profile_id FROM Profile WHERE profile_name = '" +
      profileName +
      "'";
    console.log(" * First query: " + sql);
    pool.query(sql).then(rows => {
      let profileId = rows[0].profile_id;

      // Write & Execute a query to delete the row from peopleProfile which contains the people_id and profile_id
      sql =
        "DELETE FROM peopleProfile WHERE profile_id = " +
        profileId +
        " AND people_id = " +
        peopleId +
        "";
      console.log(" * Second query: " + sql);
      pool.query(sql).then(rows => {
        res.status(200).send(rows);
      });
    });
  } else {
    console.log(" Only a manager can grant a profile to an interviewer");
    res.send(401);
  }
};

const addOneTimeslot = (req, res) => {
  if (
    (req.user.role_name.includes("Interviewer") ||
      req.user.role_name.includes("Interview Leader")) &&
    req.user.people_id == req.params.user_id
  ) {
    let sql =
      "INSERT INTO PeopleAvailability (people_id, timeslot_week_day, timeslot_start_time, timeslot_end_time) VALUES (" +
      req.user.people_id +
      ",'" +
      req.body.week_day +
      "', '" +
      req.body.start_time +
      "','" +
      req.body.end_time +
      "')";

    pool.query(sql).then(rows => {
      res.status(200).send(rows);
    });
  } else {
    res.send(401);
  }
};

const deleteOneTimeslot = (req, res) => {
  if (
    (req.user.role_name.includes("Interviewer") ||
      req.user.role_name.includes("Interview Leader")) &&
    req.user.people_id == req.params.user_id
  ) {
    let sql =
      "DELETE FROM PeopleAvailability WHERE timeslot_week_day = '" +
      req.body.week_day +
      "' AND timeslot_start_time = '" +
      req.body.start_time +
      "' AND timeslot_end_time = '" +
      req.body.end_time +
      "' AND people_id  = " +
      req.user.people_id;

    pool.query(sql).then(rows => {
      res.status(200).send(rows);
    });
  } else {
    res.send(401);
  }
};

module.exports = {
  addNewInterviewer,
  userAvailability,
  profileAvailable,
  timeAvailable,
  showAllInterviewers,
  getAllProfilesForChosenInterviewer,
  grantProfileToInterviewer,
  removeProfileFromInterviewer,
  deleteOneTimeslot,
  addOneTimeslot
};
