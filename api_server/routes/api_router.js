const express = require ('express');
const passport = require('passport');
const router = express.Router();



const meeting = require('../controllers/meeting');
const candidates = require('../controllers/candidates');
const meeting_room = require('../controllers/meeting_room');
const people = require('../controllers/people');
const role = require('../controllers/role');
const profile= require('../controllers/profiles');

const set_availability = require('../controllers/set_interviewer_availabilty');
const interviewer = require('../controllers/interviewer');
const loadCSV = require('../controllers/loadCSV');
const login = require('../controllers/login');
const put_time_slots_APIController = require('../controllers/put_time_slots_api');
const get_meeting = require('../controllers/get_meeting');
const calendar = require('../controllers/calendar');




/*###############
  Candidates
  ###############*/

//get all candidates
//post add a new  candidate 
router.route('/candidates')
.get(passport.authenticate('basic', { session: false }),
candidates.getAllCandidatesOrderedById)

router.route('/addCandidate')
.post(passport.authenticate('basic', { session: false }),
candidates.addNewCandidate);


//get single candidate to update and delete
router.route('/candidates/:candidate_id')
.get(passport.authenticate('basic', { session: false }),
candidates.getOneCandidate)
.put(passport.authenticate('basic', { session: false }),
candidates.updateCandidate);

//get single candidate with time available

router.route('/candidates/time/:candidate_id')
.get(passport.authenticate('basic', { session: false }), 
candidates.timeAvailable);





/*==============users of DaiHire==================*/
//get all user (aka People)
router.route('/user')
.get(passport.authenticate('basic', { session: false }), 
loadCSV.getAllEmployeesOrderedById)
.post(passport.authenticate('basic', { session: false }), 
loadCSV.addNewEmployee);

//get single user to update and delete
router.route('/user/:user_id')
.get(passport.authenticate('basic', { session: false }),
people.getOneEmployee)
.put(passport.authenticate('basic', { session: false }),
people.updateEmployee);
//.delete(passport.authenticate('basic', { session: false }),
//people.deleteEmployee);



// deactivate a single employee
router.route('/deactivate') // I tried making it `user/deactivate` and it didn't work!
.put(passport.authenticate('basic', {session: false}),
people.deactivateEmployee);

// activate (or reactivate) a single employee
router.route('/activate') // I tried making it `user/activate` and it didn't work!
.put(passport.authenticate('basic', {session: false}),
people.activateEmployee);

// Update your own password
router.route('/updateOwnPassword')
.put(passport.authenticate('basic', {session: false}),
people.updateMyOwnPassword);

/*=============================*/
router.route('/login')
.get(passport.authenticate('basic', { session: false }),login.loginUser);

router.route('/login/:userid')
.put(login.encrypt);

router.route('/room')
.get(passport.authenticate('basic', { session: false }), 
meeting_room.getMeetingRoom);

/* #################################*/

//INTERVIEWERS


/* #################################*/

/*==============adding ONE availability ===========*/
router.route('/addOneTimeslot/:user_id')
.post(passport.authenticate('basic', {session: false}),
interviewer.addOneTimeslot);



/*==============delete ONE availability ===========*/
router.route('/deleteOneTimeslot/:user_id')
.delete(passport.authenticate('basic', {session: false}),
interviewer.deleteOneTimeslot);





/*==============adding a new interviewer ===========*/
router.route('/addInterviewer')
.post(passport.authenticate('basic', {session: false}),
interviewer.addNewInterviewer);


/*==============interviewers skills=================*/

//router.route('/interviewers/skills')
router.route('/profiles')
.get(passport.authenticate('basic', { session: false }), 
profile.getProfile);


router.route('/interviewers/post_skills')
.post(passport.authenticate('basic', { session: false }), 
profile.postProfile);


/*============availability per profile==================*/

router.route('/interviewers/profile')
.get(passport.authenticate('basic', { session: false}),
interviewer.profileAvailable);


/*============availability per time==================*/

router.route('/interviewers/time/:people_id')
.get(passport.authenticate('basic', { session: false}),
interviewer.timeAvailable);


/*============get people availability======================= */
router.route('/interviewers/available')
.post(passport.authenticate('basic', { session: false}),
interviewer.userAvailability);

/*============get role name======================= */
router.route('/role')
.get(passport.authenticate('basic', { session: false}),
role.getRole);



/* ================create a meeting======================= */

router.route('/meeting')
.post(passport.authenticate('basic', { session: false}),
meeting.postMeeting);



/* ================get all the people========================*/

router.route('/people')
.get(passport.authenticate('basic', { session: false}),
people.getPeople);

/* ================update one person=========================*/
router.route('/people/old_email')
.put(passport.authenticate('basic', { session: false}),
//get_people_APIController.updatePerson);
people.updatePerson);

/* =================change password ======================== */
/*
router.route('/people/password')
.put(passport.authenticate('basic', { session: false}),
people.updatePeoplePassword);

get_people_APIController.updatePeoplePassword);
*/

/* =================change maxinterviews ======================== */

router.route('/people/maxinterviews')
.put(passport.authenticate('basic', { session: false}),
people.updateMaxInterviews);


/* =================get maxinterviews ======================== */

router.route('/people/maxinterviews/:user_id')
//router.route('people/maxinterviews')
.get(passport.authenticate('basic', { session: false}),
people.getMaxInterviews);

/* =================get list of all interviewers for the Hiring Team ======================== */
router.route('/getAllInterviewers')
.get(passport.authenticate('basic', { session: false}),
people.getAllInterviewers );

/* =================get list of interviewers a manager has made ======================== */
router.route('/getInterviewers')
.get(passport.authenticate('basic', { session: false}),
people.getInterviewers );

/* =================get information about a single interviewer based on the person who added them to the system ======================== */
router.route('/getSingleInterviewer/:people_id')
.get(passport.authenticate('basic', { session: false}),
people.getSingleInterviewer );

/* =================get information about a single interviewer meetings based on the person who added them to the system ======================== */
router.route('/getSingleInterviewerMeet/:people_id')
.get(passport.authenticate('basic', { session: false}),
people.getSingleInterviewerMeet );

/*============== delete time slot candidate===============*/

//delete time available for a specific candidate

router.route('/candidates/deleteTime/:candidate_id')

.delete(passport.authenticate('basic', { session: false }), 
put_time_slots_APIController.deleteTimeSlot);

/*=============create time slot candidate ================*/

router.route('/candidates/createTime')

.post(passport.authenticate('basic', { session: false }), 
put_time_slots_APIController.setAvailability);


/*========insert interviewer's availability============ */


router.route('/interviewers/createTime')

.post(passport.authenticate('basic', { session: false }), 
set_availability.setAvailability);

/*delete availability */
router.route('/interviewers/deleteTime/:people_id')
.delete(passport.authenticate('basic', { session: false }),
set_availability.deleteTimeSlot);



/* get one all meetings with people in the meeting */
router.route('/getAllMeetingPeople')
.get(passport.authenticate('basic', { session: false}),
get_meeting.getAllMeetingPeople);

/*get all meeting a hiring team member made */
router.route('/getAllMeetingPeople')
.get(passport.authenticate('basic', { session: false}),
get_meeting.getAllMeetingPeopleByHT);

/*one for all meetings an interviewer made by a specific manager */
router.route('/getAllMeetingManager')
.get(passport.authenticate('basic', { session: false}),
get_meeting.getAllMeetingPeopleByManager );

/*get all meeting a interviewer made */
router.route('/getAllMeetingInterviewer')
.get(passport.authenticate('basic', { session: false}),
get_meeting.getAllMeetingPeopleByInterviewer);

/* See all interviewers (used in Manager tools "Add profiles to Interviewer" and "View Interviewers") */
router.route('/seeInterviewers')
.get(passport.authenticate('basic', { session: false}),
interviewer.showAllInterviewers);

/* See all profiles for a single interviewer */
router.route('/oip/:id')
.get(passport.authenticate('basic', { session: false}),
interviewer.getAllProfilesForChosenInterviewer);

/* Grant a profile to an interviewer (POST) or remove a profile from an interviewer (DELETE) */
router.route('/grantProfile')
.post(passport.authenticate('basic', { session: false}),
interviewer.grantProfileToInterviewer)

router.route('/removeProfile')
.delete(passport.authenticate('basic', {session: false}),
interviewer.removeProfileFromInterviewer);

/*get calendar */
router.route('/calendar')
.get(calendar.getCalendar);







module.exports = router;