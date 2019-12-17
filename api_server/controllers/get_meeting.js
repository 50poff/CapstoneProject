/* *one for all meetings with people in the meeting
*one for all meeting a hiring team member made
one for all meetings an interviewer made by a specific manager
one for interviewers to be able to see their meetings */

//only hiring team have access
const pool = require('../db');


//GET Request Handler
// Hiring Team can see all meetings with people in the meeting
// http://localhost:80/api/v1/getAllMeetingPeople
const getAllMeetingPeople = (req, res) => {

    if (req.user.role_name.includes("Hiring Team Member")) {
        let sql = "SELECT m.meeting_datetime, GROUP_CONCAT(p.first_name, ' ', p.last_name, '#', p.email SEPARATOR '?') AS person, mr.room_name, mr.room_location, c.first_name, c.last_name, pr.profile_name FROM Meeting m  INNER JOIN MeetingRoom mr  ON m.meeting_room_id = mr.meeting_room_id  INNER JOIN PeopleInMeeting pm ON m.meeting_id = pm.meeting_id INNER JOIN People p ON p.people_id = pm.people_id INNER JOIN Candidate c ON m.candidate_id = c.candidate_id INNER JOIN Profile pr ON m.profile_id = pr.profile_id GROUP BY m.meeting_id ORDER BY meeting_datetime DESC";
        pool.query(sql).then((rows) => {
            rows.forEach (row=>{
                row.person = row.person.split("?");
                let AllPeople = [];
                row.person.forEach(person=>{
                    person = person.split("#");
                    AllPeople.push(person);
                })
                row.person = AllPeople;
             
            });
            res.status(200).send(rows);
        });
    }
    else {
        res.send(401);S
    }
};


// one for all meeting a hiring team member made
//http://localhost:80/api/v1/getAllMeetingPeopleManager
const getAllMeetingPeopleByHT = (req, res) => {

    if (req.user.role_name.includes("Hiring Team Member")) {
        let sql = "SELECT m.meeting_datetime, p.first_name, p.last_name, email, mr.room_name, mr.room_location FROM Meeting m  INNER JOIN MeetingRoom mr  ON m.meeting_room_id = mr.meeting_room_id  INNER JOIN PeopleInMeeting pm ON m.meeting_id = pm.meeting_id INNER JOIN People p ON p.people_id = pm.people_id where meeting_owner_id =  '" + req.user.people_id + "' ";
        pool.query(sql).then((rows) => {
            res.status(200).send(rows);
        });
    }
    else {
        res.send(401);
    }
};

//one for all meetings an interviewer made by a specific manager
//https://localhost:80/api/v1/getAllMeetingManager/
const getAllMeetingPeopleByManager = (req, res) => {
    
    if (req.user.role_name.includes("Manager")) {
        let sql = "SELECT m.meeting_datetime, GROUP_CONCAT(p.first_name, ' ', p.last_name, '#', p.email SEPARATOR '?') AS person, mr.room_name, mr.room_location, c.first_name, c.last_name, pr.profile_name FROM Meeting m  INNER JOIN MeetingRoom mr  ON m.meeting_room_id = mr.meeting_room_id  INNER JOIN PeopleInMeeting pm ON m.meeting_id = pm.meeting_id INNER JOIN People p ON p.people_id = pm.people_id INNER JOIN Candidate c ON m.candidate_id = c.candidate_id INNER JOIN Profile pr ON m.profile_id = pr.profile_id WHERE p.created_by IN ( SELECT created_by FROM People WHERE p.created_by = '" + req.user.people_id + "' ) GROUP BY m.meeting_id ORDER BY meeting_datetime DESC";
        pool.query(sql).then((rows) => {
            rows.forEach (row=>{
                row.person = row.person.split("?");
                let AllPeople = [];
                row.person.forEach(person=>{
                    person = person.split("#");
                    AllPeople.push(person);
                })
                row.person = AllPeople;
             
            });
            res.status(200).send(rows);
        });
    }
    else {
        res.send(401);S
    }
};

//one for interviewers to be able to see their meetings
//https://localhost:80/api/v1/getAllMeetingInterviewer
const getAllMeetingPeopleByInterviewer = (req, res) => {

if (req.user.role_name.includes("Hiring Team Member")  || req.user.role_name.includes("Interviewer") ||req.user.role_name.includes("Interview Leader")  ) {
   // let sql = "SELECT m.meeting_datetime, GROUP_CONCAT(p.first_name,', ', p.last_name, ', ', email SEPARATOR ':') AS person, mr.room_name, mr.room_location FROM Meeting m  INNER JOIN MeetingRoom mr  ON m.meeting_room_id = mr.meeting_room_id  INNER JOIN PeopleInMeeting pm ON m.meeting_id = pm.meeting_id INNER JOIN People p ON p.people_id = pm.people_id GROUP BY m.meeting_id ORDER BY meeting_datetime DESC";
   let sql = "SELECT m.meeting_datetime, GROUP_CONCAT(p.first_name, ' ', p.last_name, '#', p.email SEPARATOR '?') AS person, mr.room_name, mr.room_location, c.first_name, c.last_name, pr.profile_name FROM Meeting m  INNER JOIN MeetingRoom mr  ON m.meeting_room_id = mr.meeting_room_id  INNER JOIN PeopleInMeeting pm ON m.meeting_id = pm.meeting_id INNER JOIN People p ON p.people_id = pm.people_id INNER JOIN Candidate c ON m.candidate_id = c.candidate_id INNER JOIN Profile pr ON m.profile_id = pr.profile_id WHERE m.meeting_id IN (SELECT pm.meeting_id FROM PeopleInMeeting pm INNER JOIN People p ON p.people_id = pm.people_id WHERE p.people_id = '" + req.user.people_id + "') GROUP BY m.meeting_id ORDER BY meeting_datetime DESC";
   pool.query(sql).then((rows) => {
        rows.forEach (row=>{
            /*
            *Attempted to make meeting_datetime an array of date and time, but could not figure out how to do it. Leaving this here incase there is an attempt again.
            *console.log(typeof row.meeting_datetime);
            *row.meeting_datetime = toString(row.meeting_datetime);
            *console.log(typeof row.meeting_datetime);
            *console.log(row.meeting_datetime);
            *row.meeting_datetime = row.meeting_datetime.split("T");
            *row.meeting_datetime = row.meeting_datetime.replace('Z','');
            */
            row.person = row.person.split("?");
            let AllPeople = [];
            row.person.forEach(person=>{
                person = person.split("#");
                AllPeople.push(person);
            })
            row.person = AllPeople;
    
        });
        res.status(200).send(rows);
    });
}
else {
    res.send(401);S
}
};

module.exports = {
    getAllMeetingPeople,
    getAllMeetingPeopleByHT,
    getAllMeetingPeopleByManager,
    getAllMeetingPeopleByInterviewer

}