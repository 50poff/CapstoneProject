-- --------------------------------	--
-- db_populate.sql 					--
-- --------------------------------	--
-- This is a script to populate the	--
-- database with testing data		--
-- --------------------------------	--

/* People */
INSERT INTO People (first_name, last_name, email, created_by, p_password, p_location) VALUES ('Test1', 'Test1', 'test1@test.com', 1, 'testpass', 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('adam', 'admin', 'admin@test.com', '1', 'admin', 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('harry', 'htm', 'htm@test.com', '1', 'htm', 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('morgan', 'manager', 'manager@test.com', '1', 'manager', 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('irene', 'interviewer', 'interview@test.com', '1', 'interviewer', 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('liam', 'leader', 'interviewleader@test.com', '1', 'interviewleader', 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`, `is_active`) VALUES ('india', 'interviewer', 'interview2@test.com', '1', 'interviewer2', 'Brazil', '1');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`, `is_active`) VALUES ('iroh', 'interviewer', 'interview3@test.com', '1', 'interviewer3', 'Brazil', '1');



/* Candidate */
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Bob", "White", "bwhite@cand.com", 1);
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Alice", "Black", "ablack@cand.com", 1);

/* Role */
-- INSERT INTO Role (roleName) VALUES ("Administrator"),("Hiring Team Member"),("Manager"),("Interviewer"),("Interview Leader");
INSERT INTO Role (role_name) VALUES ("Administrator"),("Hiring Team Member"),("Manager"),("Interviewer"),("Interview Leader");

/* PeopleRoles */
-- All the roles for the user Test1 --
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('1', '1', '1');
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('1', '2', '1');
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('1', '3', '1');
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('1', '4', '1');
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('1', '5', '1');




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
INSERT INTO `DaiHire`.`CandidateProfile` (`candidate_id`, `profile_id`) VALUES ('1', '1');
INSERT INTO `DaiHire`.`CandidateProfile` (`candidate_id`, `profile_id`) VALUES ('1', '2');
INSERT INTO `DaiHire`.`CandidateProfile` (`candidate_id`, `profile_id`) VALUES ('2', '2');
INSERT INTO `DaiHire`.`CandidateProfile` (`candidate_id`, `profile_id`) VALUES ('2', '3');

/* Interviewer */
INSERT INTO `DaiHire`.`Interviewer` (`max_interviews`, `leader`, `interviewer_id`) VALUES ('5', '1', '1'); -- interviewer with id of 1 is a leader and can do 5 interviews per week

/* MeetingRoom */
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('TEC259', 'Camosun');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('Oval Office', 'White House');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('Corey\'s room', 'Corey\'s house');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('Hyperbolic Time Chamber', 'Kami\'s Lookout');

/* peopleProfile */
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('1', '1'); -- Java Backend
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('1', '2'); -- JavaScript Full Stack
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('1', '3'); -- Front End Developer
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('5', '1'); -- Java Backend
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('7', '2'); -- JavaScript Full Stack
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('8', '3'); -- Front End Developer




INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('2', '1', '1'); -- Test Admin
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('3', '2', '1'); -- Test Hiring Team Member
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('4', '3', '1'); -- Test Manager
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('5', '4', '1'); -- Test Interviewer
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('6', '5', '1'); -- Test Interview Leader




