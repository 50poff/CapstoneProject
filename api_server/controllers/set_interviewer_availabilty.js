const pool = require('../db');
//DELETE Request Handler by time
// Hiring Team and Interviewer can delete one of his availability
// https://localhost:80/api/v1/interviewers/deleteTime/people_id

const deleteTimeSlot = (req, res) => {
    if ((req.user.role_name.includes("Hiring Team Member")) || (req.user.role_name.includes("Interviewer"))) {

        sql = "DELETE FROM PeopleAvailability WHERE people_id = " + req.params.people_id + " AND timeslot_week_day = '" + req.body.timeslot_week_day + "' AND timeslot_start_time >= '" + req.body.timeslot_start_time + "' AND timeslot_end_time <= '" + req.body.timeslot_end_time + "' ";

        pool.query(sql).then((rows) => {
            res.status(200).send(rows);
        });
    }
    else {
        res.send(401);
    }
};


//POST Request Handler
// Interviewers can update their availability 
// https://localhost:80/api/v1/interviewers/createTime
const setAvailability = (req, res) => {

    if ((req.user.role_name.includes("Hiring Team Member")) || (req.user.role_name.includes("Interviewer"))) {
        console.log(req.user.people_id);
        
        let people_id = req.user.people_id;

        let timeslot_week_dayArray = req.body.timeslot_week_day;
        let timeslot_start_timeArray = req.body.timeslot_start_time;
        let timeslot_end_timeArray = req.body.timeslot_end_time;

        weekdayValues = "";



        for (let i = 0; i < timeslot_week_dayArray.length; i++) {

            weekdayValues += " (" + people_id + ", ";
            weekdayValues += " '" + timeslot_week_dayArray[i] + "',";
            weekdayValues += "'" + timeslot_start_timeArray[i] + "',";
            weekdayValues += "'" + timeslot_end_timeArray[i] + "'),";

        }
        weekdayValues = weekdayValues.substring(1, weekdayValues.length - 1);
        console.log("weekdayValues" + weekdayValues);

        let sql = "insert into PeopleAvailability (people_id, timeslot_week_day, timeslot_start_time, timeslot_end_time) values " + weekdayValues;
        console.log(" * Query: " + sql);
        pool.query(sql).then((rows) => {
            res.status(200).send(rows);
        });

    }


}

module.exports = {
    deleteTimeSlot,
    setAvailability

}