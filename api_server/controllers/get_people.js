const pool = require('../db');

// I don't think we need this file

// PUT Request to update a person's info in the datbase (including password)
// In postman: https://localhost:80/api/v1/people/old_email
const updatePerson = (req, res) => {
    if(req.user.role_name.includes ("Administrator")){

        // Variables that we populate from the body of the request
        let userFirstName = req.body.first_name;
        let userLastName = req.body.last_name;
        let userNewEmail = rew.body.new_email;
        let userOldEmail = req.body.old_email;
        let userNewPassword = rew.body.last_name; // recieves the value of userOldPassword if it's empty
        let userOldPassword = req.body.old_password;
        let userLocation = req.body.location;
        console.log(userFirstName + " " + userLastName + " : " + userLocation);
        console.log(userNewEmail + " / " + userOldEmail);
        console.log(userNewPassword + " / " + userOldPassword);

        // Check to see if the password is being changed at all (i.e. if 'userNewPassword' is null or empty)
        if (userNewPassword === ""){
            console.log(" * [get_people] You ain't changing their password at all");
            userNewPassword = userOldPassword;
        }

        // Execute a query to get the people_id based off of the old email being passed in (must be old email incase the admin is updating the user's email address)
        let SQL = "SELECT people_id FROM People WHERE email = '" + userOldEmail + "'";
        console.log(" * First query: " + SQL);
        pool.query(SQL).then((rows)=>{
            let userId = rows[0].people_id;
            SQL = "UPDATE People SET first_name = '" + userFirstName + "', last_name = '" + userLastName + "', p_location = '" + userLocation + "', p_password = '" + userNewPassword + "', email = '" + userNewEmail + "' WHERE people_id = " + userId;
            console.log(" * Second query: " + SQL);
            pool.query(SQL).then((rows)=>{
                console.log(" * I guess that worked?");
                res.status(200).send(rows);
            });
        });
    }
    else {
        console.log("Only an Administrator can alter a user's details");
        res.send(401);
    }
};


//GET Request Handler
// Administrator can see all the employees
// https://localhost:80/api/v1/people
const getPeople = (req, res) => {
    if(req.user.role_name.includes ("Administrator")){
        let sql = "SELECT p.first_name, p.last_name, p.p_password, p.email, p.p_location, GROUP_CONCAT(r.role_name SEPARATOR \", \") as \'role_names\' FROM People p, Role r, PeopleRoles pr WHERE p.people_id = pr.people_id AND pr.role_id = r.role_id GROUP BY p.people_id";
        //console.log("query:"+sql);
        pool.query(sql).then((rows)=>{
            res.status(200).send(rows);
        });
    }
    else {
        res.send(401);
    }
};

// Used in ManageMaxInterviewsPerWeek to GET the max interviews 
// per week from the DB for currently logged in user
const getMaxInterviews = (req, res) => {
    if  ((req.user.role_name.includes("Interviewer")) || (req.user.role_name.includes("Interview Leader")) ){
        let sql = " SELECT max_interviews from People where people_id = " + req.user.people_id+ "  ";
        pool.query(sql).then((row) => {
            res.status(200).send(row);
        });
    }
    else {
        res.send(401);
    }
};

// Used in ManageMaxInterviewsPerWeek to UPDATE the
// max interviews in the DB for currently logged in user
const updateMaxInterviews = (req, res) => {
    if  ((req.user.role_name.includes("Interviewer")) || (req.user.role_name.includes("Manager")) ){
        let sql = " update People set max_interviews = '"+req.body.max_interviews+"' where (people_id = " + req.user.people_id+ " ) "
        pool.query(sql).then((rows) => {
            res.status(200).send(rows);
        });
    }
    else {
        res.send(401);
    }
};

module.exports = {
    getPeople,
    updatePerson,
    updateMaxInterviews,
    getMaxInterviews
}