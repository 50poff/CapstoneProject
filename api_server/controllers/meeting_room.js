//only hiring team have access
const pool = require ('../db');


//GET Request Handler
const getMeetingRoom = (req, res) => {
    if(req.user.role_name.includes ("Hiring Team Member")){

        let sql = 'select * from MeetingRoom';

        pool.query(sql).then((rows)=> 
        res.status(200).send(rows));

    }
    else{
        res.send(401);
    }
 };


 module.exports = {
    getMeetingRoom

}