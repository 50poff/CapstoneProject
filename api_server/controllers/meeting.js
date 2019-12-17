//only hiring team have access
const pool = require("../db");
const mysql = require("mysql");

//POST Request Handler
// Hiring Team can create a meeting with many interviewers
// http://localhost:80/api/v1/meeting

const postMeeting = (req, res) => {
  if (req.user.role_name.includes("Hiring Team Member")) {
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

        let values = {
          meeting_datetime: req.body.meeting_datetime,
          meeting_room_id: req.body.meeting_room_id,
          profile_id: req.body.profile_id,
          meeting_owner_id: req.user.people_id,
          candidate_id: req.body.candidate_id,
          meeting_status: "Scheduled"
        };
        let sql = "INSERT INTO Meeting Set ? ;";

        sql = mysql.format(sql, values);
        db.query(sql, function(err, rows, fields) {
          if (err) {
            return db.rollback(() => {
              res.status(500).send({ error: err });
            });
          }
          meeting_id = rows.insertId;
          peopleInMeetingArray = req.body.people_id;
          peopleValues = "";

          for (let i = 0; i < peopleInMeetingArray.length; i++) {
            peopleValues += "(" + peopleInMeetingArray[i] + ", ";
            peopleValues += "" + meeting_id + "),";
          }
          peopleValues = peopleValues.substring(0, peopleValues.length - 1);
          let sql =
            "INSERT INTO PeopleInMeeting (people_id, meeting_id) VALUES " +
            peopleValues +
            " ";
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
              res.status(200).send({ status: "Meeting entered in db" });
            });
          });
        });
      });
    });
  } else {
    res.send(401);
  }
};

module.exports = {
  postMeeting
};
