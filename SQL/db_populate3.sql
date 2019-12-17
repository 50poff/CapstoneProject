-- --------------------------------	--
-- db_populate.sql 					--
-- --------------------------------	--
-- This is a script to populate the	--
-- database with testing data		--
-- --------------------------------	--

/* People */
INSERT INTO People (first_name, last_name, email, created_by, p_password, p_location) VALUES ('Michael', 'Clayton', 'test1@test.com', 1, "$2a$10$SJfVmo.2enEVTnoyWRwh3OdX0kSCsYjodFUUk9bLlvuNjOHqaUBVi", 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('Adam', 'Admin', 'admin@test.com', '1', "$2a$10$04PY7MXrMUqIVgsQzM5Vqu1de0wnZ1iIWKfHdZfvd5ioW5hloBGXK", 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('Harry', 'HTM', 'htm@test.com', '1', "$2a$10$1B2VwZU0pb61O53cLMHOm.YKfRdspm.gh0eo.rjMPjgqQbSctpoui", 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('Morgan', 'Manager', 'manager@test.com', '1', "$2a$10$PH/olUs6g/U1G40mnhy9UO5zxg4sub/yJhmpwJLDTho9qrXPYn1.m", 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('Irene', 'Interviewer', 'irene@test.com', '1', "$2a$10$fq2qqBWa..rVwnt6GPpHjuhJOaOrkG0CfaS5OuyePyPBpRqalpUF2", 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('Liam', 'Leader', 'liam@test.com', '1', "$2a$10$3uhQT58JnW1.fKxNVkXPluweg/vkHa10yjMqvBhRjDcPdcIIopzNS", 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`, `is_active`) VALUES ('India', 'Interviewer', 'india@test.com', '1', "$2a$10$YmtFojeWc8DSMFMAdSz9TurVigGVw44TOBcuhALigxH8FBJWK1qGG", 'Brazil', '1');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`, `is_active`) VALUES ('Iroh', 'Interviewer', 'iroh@test.com', '1', "$2a$10$CnI7YI7ZkO6BFNOb0XbbRumuJemRIjf5STAB9H3WctK085JudL7m6", 'Brazil', '1');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`, `is_active`) VALUES ('Isaac', 'Interviewer', 'isaac@test.com', '1', "$2a$10$VXtlxKiPJ4FCHIZ1MVUYDeGVe1TNgAVhaYTMB7JGiIlh03LqdIHW6", 'Brazil', '1');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`, `is_active`) VALUES ('Ivan', 'Interviewer', 'ivan@test.com', '1', "$2a$10$geqdjfA2nPTqBSTwpo8QQO65eXEclkYaAL.5LPRH4KXTjXrvA04Du", 'Brazil', '1');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`, `is_active`) VALUES ('Island', 'Interviewer', 'island@test.com', '1', "$2a$10$EMRtRA.99wQ9eBq8QzRHAupSflFA5OxcU9dBrCZT3Ja5c5V9gbSGq", 'Brazil', '1');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('Larry', 'Leader', 'larry@test.com', '1', "$2a$10$3uhQT58JnW1.fKxNVkXPluweg/vkHa10yjMqvBhRjDcPdcIIopzNS", 'Brazil');
INSERT INTO `DaiHire`.`People` (`first_name`, `last_name`, `email`, `created_by`, `p_password`, `p_location`) VALUES ('Lorne', 'Leader', 'lorne@test.com', '1', "$2a$10$3uhQT58JnW1.fKxNVkXPluweg/vkHa10yjMqvBhRjDcPdcIIopzNS", 'Brazil');


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
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('1', '1', '1'); -- Test God user: Administrator
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('1', '2', '1');		-- Hiring Team Member
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('1', '3', '1');		-- Manager
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('1', '4', '1');		-- Interviewer
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('1', '5', '1');		-- Interview Leader

INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('2', '1', '1'); -- Test Admin
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('3', '2', '1'); -- Test Hiring Team Member
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('4', '3', '1'); -- Test Manager

-- interviewers
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('5', '4', '1'); -- Test Interviewer Irene
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('7', '4', '1'); -- India
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('8', '4', '1'); -- Iroh
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('9', '4', '1'); -- Isaac
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('10', '4', '1'); -- Ivan
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('11', '4', '1'); -- Island

-- interview leaders
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('6', '5', '1'); -- Test Interview Leader Liam
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('12', '5', '1'); -- Test Interview Leader Larry
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('13', '5', '1'); -- Test Interview Leader Lorne





/* 
-- see all users and all their roles neatly grouped together
SELECT CONCAT(p.first_name, " ", p.last_name) as "full name", GROUP_CONCAT(r.roleName SEPARATOR ", ") as "roles" 
FROM PeopleRoles pr, People p, Role r
WHERE p.people_id = pr.people_id
AND pr.role_id = r.idRole;
*/

/* Profile */
INSERT INTO Profile (profile_name) VALUES ('Java Backend'),('JavaScript Full Stack'),('Front End Developer'),('Vampire Slayer'),('Android Developer'),('iOS Developer'),('Crab Fisherman'),('Turtle Hermit'),('DJ'),('Python Developer'),('Network Programmer'),('Dragon Slayer'),('Blacksmith'),('PHP Developer'),('Systems Analyst'),('System Administrator'),('Database Administrator');

/* CandidateProfile */
INSERT INTO `DaiHire`.`candidateProfile` (`candidate_id`, `profile_id`) VALUES ('1', '1'),('1', '2'),('1', '3'),('1', '4'),('1', '5'),('1', '6'),('2', '1'),('2', '2'),('2', '3'),('2', '9'),('2', '10'),('2', '15'),('3', '1'),('3', '2'),('3', '3'),('3', '8'),('3', '12'),('3', '14'),('4', '2'),('4', '11'),('5', '3'),('5', '11'),('6', '3'),('6', '8'),('7', '11'),('7', '12'),('7', '13'),('7', '14'),('8', '9'),('8', '11'),('8', '13'),('8', '15');

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
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('6', '3');
INSERT INTO `DaiHire`.`peopleProfile` (`people_id`, `profile_id`) VALUES ('6', '2');


/* time slots */
-- Here, I have 30-minute timeslots that cover each workday, and the timeslots go from 8am to 7pm
-- (All the inserts are in military time)

-- Monday --
INSERT INTO `DaiHire`.`timeslot` (`week_day`, `start_time`, `end_time`) VALUES 
('Monday', '7:00:00', '7:30:00'),
('Monday', '7:30:00', '8:00:00'),
('Monday', '8:00:00', '8:30:00'),
('Monday', '8:30:00', '9:00:00'),
('Monday', '9:00:00', '9:30:00'),
('Monday', '9:30:00', '10:00:00'),
('Monday', '10:00:00', '10:30:00'),
('Monday', '10:30:00', '11:00:00'),
('Monday', '11:00:00', '11:30:00'),
('Monday', '11:30:00', '12:00:00'),
('Monday', '12:00:00', '12:30:00'),
('Monday', '12:30:00', '13:00:00'),
('Monday', '13:00:00', '13:30:00'),
('Monday', '13:30:00', '14:00:00'),
('Monday', '14:00:00', '14:30:00'),
('Monday', '14:30:00', '15:00:00'),
('Monday', '15:00:00', '15:30:00'),
('Monday', '15:30:00', '16:00:00'),
('Monday', '16:00:00', '16:30:00'),
('Monday', '16:30:00', '17:00:00'),
('Monday', '17:00:00', '17:30:00'),
('Monday', '17:30:00', '18:00:00'),
('Monday', '18:00:00', '18:30:00'),
('Monday', '18:30:00', '19:00:00');

-- Tuesday --
INSERT INTO `DaiHire`.`timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Tuesday', '7:00:00', '7:30:00'),
('Tuesday', '7:30:00', '8:00:00'),('Tuesday', '8:00:00', '8:30:00'),('Tuesday', '8:30:00', '9:00:00'),
('Tuesday', '9:00:00', '9:30:00'),('Tuesday', '9:30:00', '10:00:00'),
('Tuesday', '10:00:00', '10:30:00'),
('Tuesday', '10:30:00', '11:00:00'),
('Tuesday', '11:00:00', '11:30:00'),('Tuesday', '11:30:00', '12:00:00'),('Tuesday', '12:00:00', '12:30:00'),
('Tuesday', '12:30:00', '13:00:00'),('Tuesday', '13:00:00', '13:30:00'),('Tuesday', '13:30:00', '14:00:00'),
('Tuesday', '14:00:00', '14:30:00'),('Tuesday', '14:30:00', '15:00:00'),('Tuesday', '15:00:00', '15:30:00'),
('Tuesday', '15:30:00', '16:00:00'),('Tuesday', '16:00:00', '16:30:00'),('Tuesday', '16:30:00', '17:00:00'),
('Tuesday', '17:00:00', '17:30:00'),('Tuesday', '17:30:00', '18:00:00'),('Tuesday', '18:00:00', '18:30:00'),
('Tuesday', '18:30:00', '19:00:00');

-- Wednesday -
INSERT INTO `DaiHire`.`timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Wednesday', '7:00:00', '7:30:00'),
('Wednesday', '7:30:00', '8:00:00'),('Wednesday', '8:00:00', '8:30:00'),('Wednesday', '8:30:00', '9:00:00'),
('Wednesday', '9:00:00', '9:30:00'),('Wednesday', '9:30:00', '10:00:00'),
('Wednesday', '10:00:00', '10:30:00'),
('Wednesday', '10:30:00', '11:00:00'),
('Wednesday', '11:00:00', '11:30:00'),('Wednesday', '11:30:00', '12:00:00'),('Wednesday', '12:00:00', '12:30:00'),
('Wednesday', '12:30:00', '13:00:00'),('Wednesday', '13:00:00', '13:30:00'),('Wednesday', '13:30:00', '14:00:00'),
('Wednesday', '14:00:00', '14:30:00'),('Wednesday', '14:30:00', '15:00:00'),('Wednesday', '15:00:00', '15:30:00'),
('Wednesday', '15:30:00', '16:00:00'),('Wednesday', '16:00:00', '16:30:00'),('Wednesday', '16:30:00', '17:00:00'),
('Wednesday', '17:00:00', '17:30:00'),('Wednesday', '17:30:00', '18:00:00'),('Wednesday', '18:00:00', '18:30:00'),
('Wednesday', '18:30:00', '19:00:00');

-- Thursday --
INSERT INTO `DaiHire`.`timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Thursday', '7:00:00', '7:30:00'),
('Thursday', '7:30:00', '8:00:00'),('Thursday', '8:00:00', '8:30:00'),('Thursday', '8:30:00', '9:00:00'),
('Thursday', '9:00:00', '9:30:00'),('Thursday', '9:30:00', '10:00:00'),
('Thursday', '10:00:00', '10:30:00'),
('Thursday', '10:30:00', '11:00:00'),
('Thursday', '11:00:00', '11:30:00'),('Thursday', '11:30:00', '12:00:00'),('Thursday', '12:00:00', '12:30:00'),
('Thursday', '12:30:00', '13:00:00'),('Thursday', '13:00:00', '13:30:00'),('Thursday', '13:30:00', '14:00:00'),
('Thursday', '14:00:00', '14:30:00'),('Thursday', '14:30:00', '15:00:00'),('Thursday', '15:00:00', '15:30:00'),
('Thursday', '15:30:00', '16:00:00'),('Thursday', '16:00:00', '16:30:00'),('Thursday', '16:30:00', '17:00:00'),
('Thursday', '17:00:00', '17:30:00'),('Thursday', '17:30:00', '18:00:00'),('Thursday', '18:00:00', '18:30:00'),
('Thursday', '18:30:00', '19:00:00');

-- Friday --
INSERT INTO `DaiHire`.`timeslot` (`week_day`, `start_time`, `end_time`) VALUES ('Friday', '7:00:00', '7:30:00'),
('Friday', '7:30:00', '8:00:00'),('Friday', '8:00:00', '8:30:00'),('Friday', '8:30:00', '9:00:00'),
('Friday', '9:00:00', '9:30:00'),('Friday', '9:30:00', '10:00:00'),
('Friday', '10:00:00', '10:30:00'),
('Friday', '10:30:00', '11:00:00'),
('Friday', '11:00:00', '11:30:00'),('Friday', '11:30:00', '12:00:00'),('Friday', '12:00:00', '12:30:00'),
('Friday', '12:30:00', '13:00:00'),('Friday', '13:00:00', '13:30:00'),('Friday', '13:30:00', '14:00:00'),
('Friday', '14:00:00', '14:30:00'),('Friday', '14:30:00', '15:00:00'),('Friday', '15:00:00', '15:30:00'),
('Friday', '15:30:00', '16:00:00'),('Friday', '16:00:00', '16:30:00'),('Friday', '16:30:00', '17:00:00'),
('Friday', '17:00:00', '17:30:00'),('Friday', '17:30:00', '18:00:00'),('Friday', '18:00:00', '18:30:00'),
('Friday', '18:30:00', '19:00:00');

/* insert candidate availability*/
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Monday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1, 'Monday', '9:00:00', '9:30:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Monday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1, 'Monday', '10:00:00', '10:30:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1, 'Monday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Tuesday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Tuesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Tuesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Wednesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Wednesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Thursday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Thursday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Thursday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Thursday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Friday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Friday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Friday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (1,'Friday', '11:30:00', '12:00:00');

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



/*insert into meeting table */
INSERT INTO `DaiHire`.`Meeting` (`candidate_id`, `meeting_datetime`, `meeting_room_id`, `meeting_owner_id`, `meeting_status`, `profile_id`) VALUES (1, '2019-10-6-13:00', 1, 1, 'Scheduled', 1);
INSERT INTO `DaiHire`.`Meeting` (`candidate_id`, `meeting_datetime`, `meeting_room_id`, `meeting_owner_id`, `meeting_status`, `profile_id`) VALUES (2, '2019-10-7-14:00', 2, 1, 'Scheduled', 1);
INSERT INTO `DaiHire`.`Meeting` (`candidate_id`, `meeting_datetime`, `meeting_room_id`, `meeting_owner_id`, `meeting_status`, `profile_id`) VALUES (3, '2019-10-8-12:00', 3, 1, 'Scheduled', 1);

/* people in meeting */
INSERT INTO `DaiHire`.`PeopleInMeeting` (`people_id`, `meeting_id`) VALUES ('1', '1');
INSERT INTO `DaiHire`.`PeopleInMeeting` (`people_id`, `meeting_id`) VALUES ('1', '2');
INSERT INTO `DaiHire`.`PeopleInMeeting` (`people_id`, `meeting_id`) VALUES ('1', '3');



/* People availability */
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('6', 'Monday', '8:30', '9:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('6', 'Monday', '9:00', '9:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('6', 'Monday', '10:00', '10:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('6', 'Tuesday', '8:00', '8:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('6', 'Tuesday', '8:30', '9:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('6', 'Tuesday', '9:00', '9:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('6', 'Tuesday', '9:30', '10:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('6', 'Friday', '8:00', '8:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('6', 'Friday', '8:30', '9:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('6', 'Friday', '9:00', '9:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('6', 'Friday', '9:30', '10:00');


INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('1', 'Monday', '8:00:00', '8:30:00');

INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('8', 'Monday', '8:00', '8:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('8', 'Monday', '8:30', '9:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('8', 'Monday', '9:00', '9:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('8', 'Monday', '9:30', '10:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('8', 'Tuesday', '8:00', '8:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('8', 'Tuesday', '8:30', '9:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('8', 'Tuesday', '9:00', '9:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('8', 'Tuesday', '9:30', '10:00');

INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('5', 'Monday', '8:00', '8:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('5', 'Monday', '8:30', '9:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('5', 'Monday', '9:00', '9:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('5', 'Monday', '9:30', '10:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('5', 'Monday', '10:00', '10:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('5', 'Monday', '10:30', '11:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('5', 'Tuesday', '8:00', '8:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('5', 'Tuesday', '8:30', '9:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('5', 'Tuesday', '9:00', '9:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('5', 'Tuesday', '9:30', '10:00');


INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('7', 'Monday', '8:00', '8:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('7', 'Monday', '8:30', '9:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('7', 'Monday', '9:00', '9:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('7', 'Monday', '9:30', '10:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('7', 'Monday', '10:00', '10:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('7', 'Tuesday', '8:00', '8:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('7', 'Tuesday', '8:30', '9:00');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('7', 'Tuesday', '9:00', '9:30');
INSERT INTO `DaiHire`.`PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES ('7', 'Tuesday', '9:30', '10:00');

