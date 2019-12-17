const pool = require('../db');

//GET Request Handler
//http://localhost:80/api/v1/calendar
const getCalendar = (req, res) => {

let sql = "select week_day, start_time, end_time from DaiHire.timeslot  ORDER BY start_time, CASE week_day 	WHEN 'Monday' then 1 WHEN 'Tuesday' then 2	 WHEN 'Wednesday' then 3 WHEN 'Thursday' then 4  WHEN 'Friday' then 5	END " ;
 
    pool.query(sql).then((rows)=>{

    let j = 0;
    let newValueset = [];
    let emptyarr = [];
    newValueset[0] = [];
    let allTimeSlot = rows;
  
    let start_time = allTimeSlot[0].start_time;
    for (let i=0; i<allTimeSlot.length; i++){
        if (start_time == allTimeSlot[i].start_time){
            allTimeSlot[i].position = i;
            newValueset[j].push(allTimeSlot[i]);
        }
        else {
            j++;
            newValueset[j] = [];
            start_time = allTimeSlot[i].start_time;
            allTimeSlot[i].position = i;
            newValueset[j].push(allTimeSlot[i]);
        }
    }
    res.status(200).send(newValueset);
    });
};




module.exports = {
    getCalendar
}

