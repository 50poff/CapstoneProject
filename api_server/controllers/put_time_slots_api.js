const pool = require('../db');
//DELETE Request Handler by time
// Hiring Team can delete all the availability that candidates have
// https://localhost:80/api/v1/candidates/deleteTime/candidate_id

const deleteTimeSlot = (req, res) => {
    if (req.user.role_name.includes("Hiring Team Member")) {

        sql = "DELETE FROM CandidateAvailability WHERE candidate_id = " + req.params.candidate_id + " ";

        pool.query(sql).then((rows) => {
            res.status(200).send(rows);
        });
    }
    else {
        res.send(401);
    }
};


//POST Request Handler
// Hiring Team can update the availability that candidates have
// https://localhost:80/api/v1/candidates/createTime
const setAvailability = (req, res) => {

    if (req.user.role_name.includes("Hiring Team Member")) {

        timeslot_week_dayArray = req.body.timeslot_week_day;
        //console.log(" * timeslot_week_dayArray");
        //console.log(timeslot_week_dayArray);
        timeslot_start_timeArray = req.body.timeslot_start_time;
        timeslot_end_timeArray = req.body.timeslot_end_time;
        candidate_id = req.body.candidate_id;
        weekdayValues = "";
       


        for (let i = 0; i < timeslot_week_dayArray.length; i++) {
            //console.log(" * new iteration");
            weekdayValues += " ("+candidate_id+", " ;
            weekdayValues += "'"+timeslot_week_dayArray[i]+"',"; 
            weekdayValues += "'"+timeslot_start_timeArray[i]+"',"; 
            weekdayValues += "'"+timeslot_end_timeArray[i]+"'),"; 

        }
        weekdayValues = weekdayValues.substring(1, weekdayValues.length - 1);
       // console.log("weekdayValues" + weekdayValues);

        let sql = "insert into CandidateAvailability (candidate_id, timeslot_week_day, timeslot_start_time, timeslot_end_time) values " + weekdayValues;
       // console.log(" * Query: " + sql);
        pool.query(sql).then((rows) => {
            res.status(200).send(rows);
        });

    }


}

module.exports = {
    deleteTimeSlot,
    setAvailability

}