const pool = require("../db");
const csv = require("fast-csv");
const fs = require("fs");
const bcrypt = require("bcryptjs"); // encrypts passwords being added

//GET Request Handler
//is working
// in postman: http://localhost:80/api/v1/user/
const getAllEmployeesOrderedById = (req, res) => {
  if (
    req.user.role_name.includes("Administrator") ||
    req.user.role_name.includes("Manager")
  ) {
    var people = [];
    var stream = fs.createReadStream(
      "/DaiHire/api_server/controllers/people.csv"
    );
    // var stream = fs.createReadStream("../../enviroment_config/user_data/people.csv");

    var csvStream = csv()
      .on("data", function(data) {
        var person = {};
        person.first_name = data[0];
        person.last_name = data[1];
        person.email = data[2];
        person.location = data[3];

        people.push(person);

        // console.log(data);
      })
      .on("end", function() {
        res.status(200).send(people);
        //console.log("done");
      });

    stream.pipe(csvStream);
  } else {
    console.log(
      " * [get_user_from_CSV.js] You are not a manager or administrator"
    );
    res.send(401);
  }
};

// *** POST Request Handler *** //
//is working
// anything that is "req.user" relates to the user who is logged in, while
// anything that is "req.body" relates to the Daitan Employee who is BEING ADDED TO DAIHIRE by the above user
const addNewEmployee = (req, res) => {
  // Ensures only an Administrator or Manager is trying to add a new user (they're the only ones who can)
  if (
    req.user.role_name.includes("Administrator") ||
    req.user.role_name.includes("Manager")
  ) {
    console.log("[loadCSV] ayy");
    let currentUserLoggedIn = req.user.people_id;

    let firstNameToAdd = req.body.first_name;
    let lastNameToAdd = req.body.last_name;
    let emailToAdd = req.body.email;
    let passToAdd = req.body.p_password;
    let locToAdd = req.body.p_location;

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
          return db.rollback(() => {
            res.status(500).send({ error: err });
            throw err;
          });
        }
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
        console.log(" First query: " + sql);
        db.query(sql, (err, rows, fields) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).send({ error: err });
            });
          }

          console.log(" * second query executed successfull");
          let idOfUserToAdd = rows.insertId; // the id of the employee WHO WAS JUST ADDED
          console.log(" * id of employee to add: " + idOfUserToAdd);
          sql =
          "SELECT role_id FROM Role Where role_name IN (";
          let  roles = req.body.role_name;
          for(let i=0;i<roles.length;i++){
                sql +="'"+roles[i]+"',";
          }
          sql = sql.substring(0, sql.length - 1);
          sql+=")";
          
         
            console.log(" * Third query: " + sql);

            // Execute the third query (getting the role_id from the role_name) for this iteration
            db.query(sql, (err,rows,fields)=>{
                if (err) {
                    return db.rollback(() => {
                      res.status(500).send({ error: err });
                    });
                }

            console.log(rows);
              idOfRolesToAdd = rows;
              sql =
                "INSERT INTO PeopleRoles (people_id, role_id, role_added_by) VALUES ";
            for(let i=0;i<idOfRolesToAdd.length;i++){
                sql+=  "("+idOfUserToAdd +", "+idOfRolesToAdd[i].role_id +", "+ currentUserLoggedIn+"),";

            }
            sql = sql.substring(0, sql.length - 1);
              console.log(" * Fourth query: " + sql);

              // Execute the fourth query (inserting the role into the DB) for this iteration
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
                    res.status(200).send({status:"success"});
                    console.log(' * Role "' + req.body.role_name + '" added!');

               
              });

            });
          });
        });
      });
    });
  }
  // Insert the employee info (not pertaining to roles) into the database
  else {
    res.send(401).send({error:"You must be an Administrator or Manager to add new users"});
  }
};
const addNewEmployee2 = (req, res) => {
  // Ensures only an Administrator or Manager is trying to add a new user (they're the only ones who can)
  if (
    req.user.role_name.includes("Administrator") ||
    req.user.role_name.includes("Manager")
  ) {
    console.log("[loadCSV] ayy");
    let currentUserLoggedIn = req.user.people_id;

    let firstNameToAdd = req.body.first_name;
    let lastNameToAdd = req.body.last_name;
    let emailToAdd = req.body.email;
    let passToAdd = req.body.p_password;
    let locToAdd = req.body.p_location;

    // hash & salt the password passed in
    let SALT = bcrypt.genSaltSync(10); // create a salt
    let HASH = bcrypt.hashSync(passToAdd, SALT); // hash the password using the salt

    // Insert the employee info (not pertaining to roles) into the database
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
    console.log(" First query: " + sql);
    pool.query(sql).then(rows => {
      // Find out what the id is of the employee you added in the first query
      sql = "Select people_id from People where email='" + emailToAdd + "'";
      console.log(" Second query: " + sql);
      pool.query(sql).then(rows => {
        console.log(" * second query executed successfull");
        let idOfUserToAdd = rows[0].people_id; // the id of the employee WHO WAS JUST ADDED
        console.log(" * id of employee to add: " + idOfUserToAdd);
        let numberOfRolesToAdd = req.body.role_name.length;
        console.log(" * # of roles to add: " + numberOfRolesToAdd);

        // Does this loop for every role that you want to add
        for (let i = 0; i < numberOfRolesToAdd; i++) {
          currentRoleName = req.body.role_name[i]; // may not be in the same order as they are in the DB
          sql =
            "SELECT role_id FROM Role Where role_name = '" +
            currentRoleName +
            "'";
          console.log(" * Third query: " + sql);

          // Execute the third query (getting the role_id from the role_name) for this iteration
          pool.query(sql).then(rows => {
            idOfRoleToAdd = rows[0].role_id;
            sql =
              "INSERT INTO PeopleRoles (people_id, role_id, role_added_by) VALUES (" +
              idOfUserToAdd +
              "," +
              idOfRoleToAdd +
              "," +
              currentUserLoggedIn +
              ")";
            console.log(" * Fourth query: " + sql);

            // Execute the fourth query (inserting the role into the DB) for this iteration
            pool.query(sql).then(rows => {
              console.log(' * Role "' + req.body.role_name[i] + '" added!');
            });

            /* It probably would've been more efficient to do string appending. Something like this:
                        for (let j = 0; j < rows.length; j++){
                            sql += "(" + req.user.people_id + "," + row[j].row_id + "," + req.user.people_id + "),";
                        }
                        Maybe I'll fix it if I have time*/
          });
        }
        // Finished my SQL queries; send a 200
        //console.log(" * User has been added with all roles!!");
        res.status(200).send(rows);
      });
    });
  } else {
    console.log("You must be an Administrator or Manager to add new users");
    res.send(401);
  }
};

module.exports = {
  getAllEmployeesOrderedById,
  addNewEmployee
};
