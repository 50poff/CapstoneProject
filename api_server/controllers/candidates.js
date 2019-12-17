const pool = require('../db');



//GET Request Handler
// I am using this one
const getAllCandidatesOrderedById = (req, res) => {
    if (req.user.role_name.includes("Hiring Team Member")) {
        let sql = "SELECT c.candidate_id, c.first_name as 'first_name', c.last_name as 'last_name', c.email as 'email', c.is_active as 'is_active', c.created_by as 'created_by', GROUP_CONCAT(pro.profile_name SEPARATOR ',') as 'profiles', p.first_name as 'cb_first_name', p.last_name as 'cb_last_name', p.email as 'cb_email', p.p_location as 'cb_location', p.is_active as 'cb_is_active' FROM Candidate c, People p, candidateProfile cp, Profile pro WHERE c.created_by = p.people_id AND c.candidate_id = cp.candidate_id AND cp.profile_id = pro.profile_id GROUP BY c.candidate_id";
        pool.query(sql).then((rows) => {
            res.status(200).send(rows);
        }).catch( err =>{
            res.status(500);
        }
        );
    }
    else {
        res.send(401);
    }
};
// POST Request Handler
// I am using this one
// Works exactly as intended through postman
// Now why cannot the app make it work???
const addNewCandidate = (req, res) => {
    if (req.user.role_name.includes("Hiring Team Member")) {
        let candCreator = req.body.created_by;
        let candFirstName = req.body.first_name;
        let candLastName = req.body.last_name;
        let candEmail = req.body.email;
        let candProfiles = req.body.profiles;
        let timeSlots = req.body.timeSlots;

        pool.getConnection((err,db)=>{
            if(err){
                res.status(500).send({error:err});
                throw err;
            }
            db.beginTransaction(err=>{
                if(err){
                res.status(500).send({error:err});
                throw err;
                }
                 // Write an execute a query to insert the candidate without profiles
          let sql = "INSERT INTO Candidate (created_by, first_name, last_name, email) values (" + candCreator + ",'" + candFirstName + "', '" + candLastName + "','" + candEmail + "')";     
          db.query(sql,(err,rows,fields)=>{
                    if (err) {
                        return db.rollback(() => {
                          res.status(500).send({ error: err });
                        });
                      }
                      let candId = rows.insertId;
                       // Write a query to insert one or more entries into the candidateProfile table
                      let sql = "INSERT INTO candidateProfile (candidate_id, profile_id) VALUES ";
  
                        // append a new bubble onto the end of the query containing candidate id ( doesn't change) and the current profile id
                        for (let j = 0; j < candProfiles.length; j++){
                            sql += "(" + candId + "," + candProfiles[j] + "),"
                        }
  
                        // remove the last character of the array (a comma)
                        sql = sql.substring(0, sql.length - 1);
                            db.query(sql, function(err, rows, fields) {
                              if (err) {
                                return db.rollback(() => {
                                    console.log("error here");
                                  res.status(500).send({ error: err });
                                });
                              }
                              let sql = "INSERT INTO CandidateAvailability (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ";
  
                              // append a new bubble onto the end of the query containing candidate id ( doesn't change) and the current profile id
                              for (let j = 0; j < timeSlots.length; j++){
                                  sql += "(" + candId + ",'" + timeSlots[j].timeslot_week_day+"', '"+timeSlots[j].timeslot_start_time+"', '"+timeSlots[j].timeslot_end_time + "'),"
                              }
  
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
                                  console.log("connection closed");
                                 
                                });
                                res.status(200).send({ status: "candidate entered in db" });
                              
                              });
                            });
                            });
                          
                      });
                  
                  });
              });
    }
    else {
        console.log(" Only Hiring Team Members can add new candidates");
        res.send(401);
    }
};

//GET Request for single candidate with profiles 
// Hiring Team can see Candidate information and profiles 
// http://localhost:80/api/v1/candidates/:candidate_id
const getOneCandidate = (req, res) => {
    if (req.user.role_name.includes("Hiring Team Member")) {
        let sql = "SELECT Candidate.candidate_id, first_name, last_name, email, created_by, ";
        sql += "GROUP_CONCAT(profile_name) as profile_name ,";
        sql += "GROUP_CONCAT(Profile.profile_id) as profile_id "
        sql += "FROM DaiHire.Candidate ";
        sql += "INNER JOIN candidateProfile ";
        sql += "ON candidateProfile.candidate_id = Candidate.candidate_id ";
        sql += "INNER JOIN Profile ";
        sql += "ON candidateProfile.profile_id = Profile.profile_id ";
        sql += "WHERE Candidate.candidate_id =" + req.params.candidate_id + " ";
        sql += "GROUP BY Candidate.candidate_id ";
        pool.query(sql).then((rows) => {
            let info = rows[0]
            info.profile_name = info.profile_name.split(","); // splits the string elements into an array, with each array element being separated by a ","
            info.profile_id = info.profile_id.split(',');
            res.status(200).send(info)
        });
    }
    else {
        res.send(401);
    }
};

// DELETE Request Handler
const deleteCandidate = (req, res) => {
    //res.status(200).send('Succesful API DELETE Request');
    if (req.user.role_name.includes("Hiring Team Member")) {
        let sql = "delete from Candidate where candidate_id = " + req.params.candidate_id + ""
        pool.query(sql).then((rows) => {
            res.status(200).send(rows);
        });
    }
    else {
        res.send(401);
    }
};

// UPDATE Request Handler
const updateCandidate = (req, res) => {
    if (req.user.role_name.includes("Hiring Team Member")) {
        let sql = "update DaiHire.Candidate set first_name = '" + req.body.first_name + "', last_name = '" + req.body.last_name + "',email = '" + req.body.email + "' where candidate_id = " + req.params.candidate_id;
        pool.query(sql).then((rows) => {
            res.status(200).send(rows);
        });
    }
    else {
        res.send(401);
    }
};



//GET Request Handler by time
// Hiring Team can see all the availability that candidates have
// http://localhost:80/api/v1/candidates/time/candidate_id
const timeAvailable = (req, res) => {
    if (req.user.role_name.includes("Hiring Team Member")) {

        sql = "SELECT  cava.timeslot_week_day,   cava.timeslot_start_time, cava.timeslot_end_time FROM Candidate c INNER JOIN  CandidateAvailability cava  on c.candidate_id = cava.candidate_id WHERE c.candidate_id =" + req.params.candidate_id + "";

        pool.query(sql).then((rows) => {
            res.status(200).send(rows);
        });
    }
    else {
        res.send(401);
    }
};






module.exports = {
    getAllCandidatesOrderedById,
    addNewCandidate,
    //deleteCandidate,
    updateCandidate,
    getOneCandidate,
    timeAvailable,
   
}