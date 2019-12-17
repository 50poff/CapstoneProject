-- --------------------------------	--
-- db_populate.sql 					--
-- --------------------------------	--
-- This is a script to populate the	--
-- database with testing data		--
-- --------------------------------	--

/* People */
INSERT INTO People (first_name, last_name, email, created_by, p_password, p_location) VALUES ('Test1', 'Test1', 'test1@test.com', 1, 'testpass', 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('Adam', 'Admin', 'admin@test.com', '1', 'admin', 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('Harry', 'HTM', 'htm@test.com', '1', 'htm', 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('Morgan', 'Manager', 'manager@test.com', '1', 'manager', 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('Irene', 'Interviewer', 'interview@test.com', '1', 'interviewer', 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('Liam', 'Leader', 'interviewleader@test.com', '1', 'interviewleader', 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`, `is_active`) VALUES ('India', 'Interviewer', 'interview2@test.com', '1', 'interviewer2', 'Brazil', '1');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`, `is_active`) VALUES ('Iroh', 'Interviewer', 'interview3@test.com', '1', 'interviewer3', 'Brazil', '1');

/* Candidate */
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Bob", "White", "bwhite@cand.com", 1);
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Alice", "Black", "ablack@cand.com", 1);
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Marcus", "Green", "mgreen@cand.com", 1);
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Jamie", "Red", "jred@cand.com", 1);
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Dexter", "Orange", "dorange@cand.com", 1);
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Ocean", "Blue", "oblue@cand.com", 1);
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Hermit", "Purple", "hpurple@cand.com", 1);
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Princess", "Peach", "ppeach@cand.com", 1);

/* Role */
INSERT INTO Role (role_name) VALUES ("Administrator"),("Hiring Team Member"),("Manager"),("Interviewer"),("Interview Leader");

/* PeopleRoles */
-- All the roles for the user Test1 --
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('1', '1', '1'); -- Test God user
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('1', '2', '1');
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('1', '3', '1');
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('1', '4', '1');
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('2', '1', '1'); -- Test Admin
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('3', '2', '1'); -- Test Hiring Team Member
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('4', '3', '1'); -- Test Manager
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('5', '4', '1'); -- Test Interviewer
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('6', '4', '1'); -- Test Interview Leader
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('7', '4', '1');
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('8', '4', '1');


/* 
-- see all users and all their roles neatly grouped together
SELECT CONCAT(p.first_name, " ", p.last_name) as "full name", GROUP_CONCAT(r.roleName SEPARATOR ", ") as "roles" 
FROM PeopleRoles pr, People p, Role r
WHERE p.people_id = pr.people_id
AND pr.role_id = r.idRole;
*/

/* Profile */
INSERT INTO Profile (profile_name) VALUES ("Java Backend"),("JavaScript Full Stack"),("Front End Developer");

/* CandidateProfile */
INSERT INTO `DaiHire`.`candidateProfile` (`candidate_id`, `profile_id`) VALUES ('1', '1');
INSERT INTO `DaiHire`.`candidateProfile` (`candidate_id`, `profile_id`) VALUES ('1', '2');
INSERT INTO `DaiHire`.`candidateProfile` (`candidate_id`, `profile_id`) VALUES ('1', '3');
INSERT INTO `DaiHire`.`candidateProfile` (`candidate_id`, `profile_id`) VALUES ('2', '1');
INSERT INTO `DaiHire`.`candidateProfile` (`candidate_id`, `profile_id`) VALUES ('2', '2');
INSERT INTO `DaiHire`.`candidateProfile` (`candidate_id`, `profile_id`) VALUES ('2', '3');
INSERT INTO `DaiHire`.`candidateProfile` (`candidate_id`, `profile_id`) VALUES ('3', '1');
INSERT INTO `DaiHire`.`candidateProfile` (`candidate_id`, `profile_id`) VALUES ('3', '2');
INSERT INTO `DaiHire`.`candidateProfile` (`candidate_id`, `profile_id`) VALUES ('3', '3');
INSERT INTO `DaiHire`.`candidateProfile` (`candidate_id`, `profile_id`) VALUES ('4', '2');
INSERT INTO `DaiHire`.`candidateProfile` (`candidate_id`, `profile_id`) VALUES ('5', '3');
INSERT INTO `DaiHire`.`candidateProfile` (`candidate_id`, `profile_id`) VALUES ('6', '3');

/* Interviewer */
-- INSERT INTO `DaiHire`.`Interviewer` (`max_interviews`, `leader`, `interviewer_id`) VALUES ('5', '1', '1'); -- interviewer with id of 1 is a leader and can do 5 interviews per week

/* MeetingRoom */
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('TEC259', 'Camosun');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('Oval Office', 'White House');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('Corey\'s room', 'Corey\'s house');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('Hyperbolic Time Chamber', 'Kami\'s Lookout');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('The Duke\'s Chambers', 'Lumbridge Castle');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('Moth Priest\'s Chambers', 'White-Gold Tower');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('Men\'s Washroom', 'Thrifty Foods Broadmead');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('Secret Underground Vault', 'LEGO House');

/* peopleProfile */
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('1', '1'); -- Java Backend
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('1', '2'); -- JavaScript Full Stack
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('1', '3'); -- Front End Developer
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('5', '1'); -- Java Backend
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('7', '2'); -- JavaScript Full Stack
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('8', '3'); -- Front End Developer
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('7', '1');
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('7', '3');
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('8', '2');


/* time slots */
describe Timeslot;
select * from Timeslot;
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Monday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Monday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Monday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Monday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Tuesday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Tuesday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Tuesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Tuesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Wednesday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Wednesday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Wednesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Wednesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Thursday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Thursday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Thursday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Thursday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Friday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Friday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Friday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Friday', '11:30:00', '12:00:00');



INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Monday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Monday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Monday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Monday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Tuesday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Tuesday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Tuesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Tuesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Wednesday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Wednesday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Wednesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Wednesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Thursday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Thursday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Thursday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Thursday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Friday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Friday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Friday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Friday', '11:30:00', '12:00:00');
/* meeting */
-- describe Meeting;
-- INSERT INTO Meeting (meeting_time, meeting_room_id, meeting_owner_id, candidate_id) VALUES (
/*insert into timeslot */

INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Monday', '9:00', '18:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Tuesday', '9:00', '18:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Wednesday', '9:00', '18:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Thursday', '9:00', '18:00');
INSERT INTO `DaiHire`.`Timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Friday', '9:00', '18:00');


/* insert candidate availability*/
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('1', 'Monday', '12:00', '16:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('2', 'Tuesday', '9:00', '18:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('3', 'Wednesday', '9:00', '18:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('4', 'Thursday', '9:00', '18:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('5', 'Friday', '9:00', '18:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('6', 'Monday', '9:00', '18:00');

/*insert into meeting table */

INSERT INTO `DaiHire`.`Meeting` (`meeting_id`, `meeting_datetime`, `meeting_room_id`, `meeting_owner_id`, `meeting_status`) VALUES ('1', 'june-10-2019', '1', '1', 'confirmed');
UPDATE `DaiHire`.`Meeting` SET `meeting_datetime` = '2019-07-10 10:00:00' WHERE (`meeting_id` = '1');
INSERT INTO `DaiHire`.`Meeting` (`meeting_id`, `meeting_datetime`, `meeting_room_id`, `meeting_owner_id`, `meeting_status`, `candidate_id`) VALUES ('2', '2019-08-05 13:00', '2', '1', 'in progress', '4');


/*insert into PeopleAvailability */
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('5', 'Monday', '08:30:00', '09:00:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('5', 'Friday', '08:30:00', '09:00:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('7', 'Monday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('7', 'Thursday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('8', 'Monday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('8', 'Friday', '11:30:00', '12:00:00');

 
/* inserting on  Meeting*/ 
INSERT INTO `DaiHire`.`PeopleInMeeting` (`people_id`, `meeting_id`) VALUES ('5', '2');
INSERT INTO `DaiHire`.`PeopleInMeeting` (`people_id`, `meeting_id`) VALUES ('6', '2');
INSERT INTO `DaiHire`.`PeopleInMeeting` (`people_id`, `meeting_id`) VALUES ('7', '3');
INSERT INTO `DaiHire`.`PeopleInMeeting` (`people_id`, `meeting_id`) VALUES ('8', '3');

/* insert into people as a manager*/
INSERT INTO `DaiHire`.`People` (`people_id`, `first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`, `is_active`) VALUES ('9', 'Bill', 'Gates', 'interview4@test.com', '4', 'interviewer4', 'Brazil', '1');
/* insert the new interviewer in the meeting */
INSERT INTO `DaiHire`.`PeopleInMeeting` (`people_id`, `meeting_id`) VALUES ('9', '4');