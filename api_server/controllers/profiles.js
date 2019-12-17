//only hiring team have access
const pool = require ('../db');


// GET Request Handler
// Gets all profiles from the database
// Hiring team members need access to add profiles to candidates
// Managers need access to add profiles to interviewers/interview leaders
// route: ('/profiles')
const getProfile = (req, res) => {
    if(req.user.role_name.includes ("Hiring Team Member") || req.user.role_name.includes ("Manager")){

        let sql = 'SELECT profile_name, profile_id FROM Profile ORDER BY profile_name';
        //let sql = 'SELECT profile_name FROM Profile ORDER BY profile_name';

        pool.query(sql).then((rows)=> 
        res.status(200).send(rows));

    }
    else{
        res.send(401);
    }
 };

 // POST Request Handler
 // Posts a new profile into the database
const postProfile = (req, res) => {
    if(req.user.role_name.includes ("Hiring Team Member")){
        let sql = "insert into Profile (profile_name) values ('"+req.body.profile_name+"') ";
        pool.query(sql).then((rows)=> 
            res.status(200).send(rows));
    }
    else{
        console.log(" Only a Hiring team Member can create new profiles.");
        res.send(401);
    }
 };

 module.exports = {
    getProfile,
    postProfile

}