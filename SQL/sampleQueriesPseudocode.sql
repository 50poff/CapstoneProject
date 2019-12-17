/* Going through the Domain Class Diagram and seeing if I can write a pseudocode query for every method in there */
/* If not, I'll need to change the ERD */
/* These are currently just pseudocode; we have to fix 'em */

-----------------------
---- ADMINISTRATOR ----
-----------------------

-- addUser() --
INSERT INTO People (
	first_name, 
	last_name, 
	email,  
	created_by
)
VALUES (
	/*the user's first name*/, 
	/*the user's last name*/, 
	/*the user's email address*/, 
	/*The id of the user who is running this query*/
);

-- removeUser() --
DELETE FROM People WHERE id == /*their id*/;


---------------------
---- HIRING TEAM ----
---------------------
--- CRUDCandidate() ---
-- CreateCandidate() --
INSERT INTO Candidate (
	first_name, 
	last_name, 
	email,  
	created_by
)
VALUES (
	/*the candidate's first name*/, 
	/*the candidate's last name*/, 
	/*the candidate's email address*/, 
	/*The id of the hiring team member who is running this query*/
);

-- ReadCandidate() --
SELECT first_name, last_name, email, created_by FROM Candidate WHERE candidate_id IS /*Whatever candidate id you want to see*/

-- UpdateCandate() --
/* https://www.guru99.com/delete-and-update.html */
UPDATE candidate 
SET	first_name = /*newFirstName*/,
	last_name = /*newLastName*/,
	email = /*newEmail*/
WHERE candidate_id = /*whatever their candidate id is*/;

-- DeleteCandidate() --
DELETE FROM candidate WHERE candidate_id = /*whatever their candidate id is*/;


--------------
---- USER ----
--------------
-- logIn(username,password) --
/* some kind of query to see if those credentials match an entry in the daitan active directory */


 ---------------------
---- UserInterview ----
 ---------------------
 
-- createAvailability() --
INSERT INTO PeopleAvailability (timeslot) VALUES (/*Some datetime value*/); /* now how do interviewers/interview leaders REMOVE that timeslot?) */

-- deleteAvailbility() --
DELETE FROM PeopleAvalability WHERE people_id = /*currently signed in user id*/ AND timeslot = /*timeslot they want to remove*/;

-- setMaxMeeting(maxPerWeek) --
UPDATE Interviewer SET max_interviews = /*maxPerWeek (the variable holding their new max # of interviews per week)*/

-- getMeetings() --
-- TODO: make the query show all the people in the meeting
SELECT m.meeting_time, mr.roomName AS 'room', mr.roomLoc AS 'room location', concat(p.first_name, ' ',p.last_name) AS 'creator', m.status AS 'status'
FROM Meeting m, MeetingRoom mr, People p, Candidate c
WHERE m.meeting_has_room = mr.meeting_room_id
AND m.meetign_has_owner = p.id
AND c.candidate_id = m.candidate_id;


 ---------------
---- Manager ----
 ---------------

-- addInterviewer() --
/* the idea is that the manager will see a list of daitan employees via the active directory and add the "interviewer" role to them, as well as profiles (skills) */
INSERT INTO PeopleRoles (people_id, role_id) VALUES (/*the people.id of the employee who is to become an interviewer*/, /*whatever the id of interviewer is in the "role" table*/);
INSERT INTO Interviewer (
	interviewer_id, 
	leader
) VALUES (
	/*the people.id of the employee who is to become an interviewer*/, 
	/*1 if they're a leader, 0 if not*/
);

-- initiateMeeting() --
INSERT INTO Meeting (
	meeting_time, 
	meeting_has_room, 
	meeting_has_owner, 
	status, 
	candidate_id
)
VALUES (
	/* the time of the meeting as a DATETIME*/
	/* the meeting_has_room to match the respective meeting_room_id in MeetingRoom */
	/* the people.id of whoever the currently logged in Manager is*/
	"Scheduled",
	/* the candidate_id of the candidate who is being interviewed */
);


 ---------------
---- Meeting ----
 ---------------

-- no methods at all?

