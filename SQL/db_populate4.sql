-- --------------------------------	--
-- db_populate4.sql 					--
-- --------------------------------	--
-- This is a script to populate the	--
-- database with testing data		--
-- --------------------------------	--

/****** Roles ******/
INSERT INTO Role (role_name) VALUES ("Administrator"),("Hiring Team Member"),("Manager"),("Interviewer"),("Interview Leader");

/****** Profiles ******/
INSERT INTO Profile (profile_name) VALUES ('Java Developer'),('JavaScript Developer'),('PERL Expert'),('DBA'),
('Systems Analyst'),('Python Developer'),('Ruby Developer'),('PHP Developer'),('React Developer'),('Data Warehouse Analyst');

/****** People ******/
/* Daitan Employees who are users of Dai Hire */
/* All of them have a testing password: testp */
INSERT INTO People (first_name, last_name, email, created_by, p_password, p_location) VALUES 
-- God user (has all roles)
('Michael', 'Clayton', 'mclayton@daitan.com', 1, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil'),
-- Administrators
('Adam', 'West', 'awest@daitan.com', 1, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil'),
('Amy', 'Lee', 'alee@daitan.com', 1, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil'),
-- Hiring Team Members
('Henry', 'Tudor', 'htudor@daitan.com', 1, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil'),
('Hector', 'Duran', 'hduran@daitan.com', 1, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil'),
-- Managers
('Morgan', 'Lafey', 'mlafey@daitan.com', 1, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil'), -- Manager w/ people_id 6
('Melissa', 'Banks', 'mbanks@daitan.com', 1, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil'); -- Manager w/ people_id 7
-- Interviewers
INSERT INTO People (first_name, last_name, email, created_by, p_password, p_location, max_interviews) VALUES 
('Irene', 'Johnson', 'ijohnson@daitan.com', 6, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil', 15),
('Indiana', 'Jones', 'ijones@daitan.com', 6, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil', 17),
('Iroh', 'Parrot', 'iparrot@daitan.com', 6, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil', 19),
('Isaac', 'Rock', 'irock@daitan.com', 7, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil', 16),
('Ivan', 'Breeze', 'ibreeze@daitan.com', 7, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil', 18),
('Ingrid', 'Nordstrom', 'inordstrom@daitan.com', 7, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil', 20),
-- Interview Leaders
('Liam', 'Smith', 'lsmith@daitan.com', 6, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil', 15),
('Larry', 'Leisure', 'lleisure@daitan.com', 6, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil', 16),
('Lorne', 'McClane', 'lmcclane@daitan.com', 7, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil', 17);


/****** PeopleRole ******/
-- God user: Michael Clayton
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('1', '1', '1'),('1', '2', '1'),('1', '3', '1'),('1', '4', '1'),('1', '5', '1');		
-- Administrators
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('2', '1', '1'); -- Adam West
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('3', '1', '1'); -- Amy Lee
-- Hiring Team Members
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('4', '2', '1'); -- Henry Tudor
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('5', '2', '1'); -- Hector Duran
-- Managers
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('6', '3', '1'); -- Morgan Lafey
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('7', '3', '1'); -- Melissa Banks
-- Interviewers
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('8', '4', '6'); -- Irene Johnson
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('9', '4', '6'); -- Indiana Jones
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('10', '4', '6'); -- Iroh Parrot
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('11', '4', '7'); -- Isaac Rock
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('12', '4', '7'); -- Ivan Breeze
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('13', '4', '7'); -- Ingrid Nordstrom
-- Interview Leaders
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('14', '5', '6'); -- Liam Smith
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('15', '5', '6'); -- Larry Leisure
INSERT INTO `DaiHire`.`PeopleRoles` (`people_id`, `role_id`, `role_added_by`) VALUES ('16', '5', '7'); -- Lorne McClane


/****** peopleProfile ******/
/* Profiles that interviewers have */
-- Interviewers
INSERT INTO `peopleProfile` (people_id, profile_id) VALUES (8,1),(8,2),(8,3),(8,4),(8,5),(8,6); -- Irene Johnson
INSERT INTO `peopleProfile` (people_id, profile_id) VALUES (9,6),(9,7),(9,8),(9,9),(9,10); -- Indiana Jones
INSERT INTO `peopleProfile` (people_id, profile_id) VALUES (10,1),(10,3),(10,5),(10,7),(10,9); -- Iroh Parrot
INSERT INTO `peopleProfile` (people_id, profile_id) VALUES (11,2),(11,4),(11,6),(11,8),(11,10); -- Isaac Rock
INSERT INTO `peopleProfile` (people_id, profile_id) VALUES (12,1),(12,2),(12,4),(12,8),(12,10); -- Ivan Breeze
INSERT INTO `peopleProfile` (people_id, profile_id) VALUES (13,2),(13,3),(13,5),(13,9); -- Ingrid Nordstrom
-- Leaders
INSERT INTO `peopleProfile` (people_id, profile_id) VALUES (14,1),(14,2),(14,3),(14,4),(14,5); -- Liam Smith
INSERT INTO `peopleProfile` (people_id, profile_id) VALUES (15,6),(15,7),(15,8),(15,9),(15,10); -- Larry Leisure
INSERT INTO `peopleProfile` (people_id, profile_id) VALUES (16,3),(16,4),(16,7),(16,8),(16,10); -- Larry Leisure

/****** Candidate ******/
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Bob", "White", "bwhite@cand.com", 1);
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Alice", "Black", "ablack@cand.com", 1);
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Marcus", "Green", "mgreen@cand.com", 1);
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Jamie", "Red", "jred@cand.com", 1);
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Dexter", "Orange", "dorange@cand.com", 1);
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Skye", "Blue", "oblue@cand.com", 1);
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Peter", "Purple", "hpurple@cand.com", 1);
INSERT INTO Candidate (first_name, last_name, email, created_by) VALUES ("Princess", "Peach", "ppeach@cand.com", 1);

/******* CandidateProfile ******/
INSERT INTO `DaiHire`.`candidateProfile` (`candidate_id`, `profile_id`) VALUES 
('1', '1'),('1', '2'),('1', '3'),('1', '4'),('1', '5'),
('2', '6'),('2', '7'),('2', '8'),('2', '9'),('2', '10'),
('3', '2'),('3', '4'),('3', '6'),('3', '8'),('3', '10'),
('4', '1'),('4', '3'),('4', '5'),('4', '7'),('4', '9'),
('5', '3'),('5', '9'),
('6', '6'),('6', '8'),
('7', '2'),('7', '4'),('7', '5'),('7', '10'),
('8', '1'),('8', '3'),('8', '6'),('8', '9');

/******* MeetingRoom *******/
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('TECH-259', 'Camosun Interurban');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('LA-121', 'Camosun Interurban');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('Corey\'s room', 'Corey\'s house');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('Hyperbolic Time Chamber', 'Kami\'s Lookout');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('The Duke\'s Chambers', 'Lumbridge Castle');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('Moth Priest\'s Chambers', 'White-Gold Tower');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('Secret Underground Vault', 'LEGO House');
INSERT INTO `DaiHire`.`MeetingRoom` (`room_name`, `room_location`) VALUES ('Daitan Meeting Room', 'Daitan Canada');

/******* timeslot *******/
-- Here, I have 30-minute timeslots that cover each workday, and the timeslots go from 8am to 7pm
-- (All the inserts are in military time)

-- Monday --
INSERT INTO `DaiHire`.`timeslot` (`week_day`, `start_time`, `end_time`) VALUES 
('Monday', '7:00:00', '7:30:00'),('Monday', '7:30:00', '8:00:00'),('Monday', '8:00:00', '8:30:00'),
('Monday', '8:30:00', '9:00:00'),('Monday', '9:00:00', '9:30:00'),('Monday', '9:30:00', '10:00:00'),
('Monday', '10:00:00', '10:30:00'),('Monday', '10:30:00', '11:00:00'),('Monday', '11:00:00', '11:30:00'),
('Monday', '11:30:00', '12:00:00'),('Monday', '12:00:00', '12:30:00'),('Monday', '12:30:00', '13:00:00'),
('Monday', '13:00:00', '13:30:00'),('Monday', '13:30:00', '14:00:00'),('Monday', '14:00:00', '14:30:00'),
('Monday', '14:30:00', '15:00:00'),('Monday', '15:00:00', '15:30:00'),('Monday', '15:30:00', '16:00:00'),
('Monday', '16:00:00', '16:30:00'),('Monday', '16:30:00', '17:00:00'),('Monday', '17:00:00', '17:30:00'),
('Monday', '17:30:00', '18:00:00'),('Monday', '18:00:00', '18:30:00'),('Monday', '18:30:00', '19:00:00');

-- Tuesday --
INSERT INTO `DaiHire`.`timeslot` (`week_day`, `start_time`, `end_time`) VALUES 
('Tuesday', '7:00:00', '7:30:00'),('Tuesday', '7:30:00', '8:00:00'),('Tuesday', '8:00:00', '8:30:00'),
('Tuesday', '8:30:00', '9:00:00'),('Tuesday', '9:00:00', '9:30:00'),('Tuesday', '9:30:00', '10:00:00'),
('Tuesday', '10:00:00', '10:30:00'),('Tuesday', '10:30:00', '11:00:00'),('Tuesday', '11:00:00', '11:30:00'),
('Tuesday', '11:30:00', '12:00:00'),('Tuesday', '12:00:00', '12:30:00'),('Tuesday', '12:30:00', '13:00:00'),
('Tuesday', '13:00:00', '13:30:00'),('Tuesday', '13:30:00', '14:00:00'),('Tuesday', '14:00:00', '14:30:00'),
('Tuesday', '14:30:00', '15:00:00'),('Tuesday', '15:00:00', '15:30:00'),('Tuesday', '15:30:00', '16:00:00'),
('Tuesday', '16:00:00', '16:30:00'),('Tuesday', '16:30:00', '17:00:00'),('Tuesday', '17:00:00', '17:30:00'),
('Tuesday', '17:30:00', '18:00:00'),('Tuesday', '18:00:00', '18:30:00'),('Tuesday', '18:30:00', '19:00:00');

-- Wednesday -
INSERT INTO `DaiHire`.`timeslot` (`week_day`, `start_time`, `end_time`) VALUES 
('Wednesday', '7:00:00', '7:30:00'),('Wednesday', '7:30:00', '8:00:00'),('Wednesday', '8:00:00', '8:30:00'),
('Wednesday', '8:30:00', '9:00:00'),('Wednesday', '9:00:00', '9:30:00'),('Wednesday', '9:30:00', '10:00:00'),
('Wednesday', '10:00:00', '10:30:00'),('Wednesday', '10:30:00', '11:00:00'),('Wednesday', '11:00:00', '11:30:00'),
('Wednesday', '11:30:00', '12:00:00'),('Wednesday', '12:00:00', '12:30:00'),('Wednesday', '12:30:00', '13:00:00'),
('Wednesday', '13:00:00', '13:30:00'),('Wednesday', '13:30:00', '14:00:00'),('Wednesday', '14:00:00', '14:30:00'),
('Wednesday', '14:30:00', '15:00:00'),('Wednesday', '15:00:00', '15:30:00'),('Wednesday', '15:30:00', '16:00:00'),
('Wednesday', '16:00:00', '16:30:00'),('Wednesday', '16:30:00', '17:00:00'),('Wednesday', '17:00:00', '17:30:00'),
('Wednesday', '17:30:00', '18:00:00'),('Wednesday', '18:00:00', '18:30:00'),('Wednesday', '18:30:00', '19:00:00');

-- Thursday --
INSERT INTO `DaiHire`.`timeslot` (`week_day`, `start_time`, `end_time`) VALUES 
('Thursday', '7:00:00', '7:30:00'),('Thursday', '7:30:00', '8:00:00'),('Thursday', '8:00:00', '8:30:00'),
('Thursday', '8:30:00', '9:00:00'),('Thursday', '9:00:00', '9:30:00'),('Thursday', '9:30:00', '10:00:00'),
('Thursday', '10:00:00', '10:30:00'),('Thursday', '10:30:00', '11:00:00'),('Thursday', '11:00:00', '11:30:00'),
('Thursday', '11:30:00', '12:00:00'),('Thursday', '12:00:00', '12:30:00'),('Thursday', '12:30:00', '13:00:00'),
('Thursday', '13:00:00', '13:30:00'),('Thursday', '13:30:00', '14:00:00'),('Thursday', '14:00:00', '14:30:00'),
('Thursday', '14:30:00', '15:00:00'),('Thursday', '15:00:00', '15:30:00'),('Thursday', '15:30:00', '16:00:00'),
('Thursday', '16:00:00', '16:30:00'),('Thursday', '16:30:00', '17:00:00'),('Thursday', '17:00:00', '17:30:00'),
('Thursday', '17:30:00', '18:00:00'),('Thursday', '18:00:00', '18:30:00'),('Thursday', '18:30:00', '19:00:00');

-- Friday --
INSERT INTO `DaiHire`.`timeslot` (`week_day`, `start_time`, `end_time`) VALUES 
('Friday', '7:00:00', '7:30:00'),('Friday', '7:30:00', '8:00:00'),('Friday', '8:00:00', '8:30:00'),
('Friday', '8:30:00', '9:00:00'),('Friday', '9:00:00', '9:30:00'),('Friday', '9:30:00', '10:00:00'),
('Friday', '10:00:00', '10:30:00'),('Friday', '10:30:00', '11:00:00'),('Friday', '11:00:00', '11:30:00'),
('Friday', '11:30:00', '12:00:00'),('Friday', '12:00:00', '12:30:00'),('Friday', '12:30:00', '13:00:00'),
('Friday', '13:00:00', '13:30:00'),('Friday', '13:30:00', '14:00:00'),('Friday', '14:00:00', '14:30:00'),
('Friday', '14:30:00', '15:00:00'),('Friday', '15:00:00', '15:30:00'),('Friday', '15:30:00', '16:00:00'),
('Friday', '16:00:00', '16:30:00'),('Friday', '16:30:00', '17:00:00'),('Friday', '17:00:00', '17:30:00'),
('Friday', '17:30:00', '18:00:00'),('Friday', '18:00:00', '18:30:00'),('Friday', '18:30:00', '19:00:00');



/****** CandidateAvailability *******/
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

INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Monday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2, 'Monday', '9:00:00', '9:30:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Monday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2, 'Monday', '10:00:00', '10:30:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2, 'Monday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Tuesday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Tuesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Tuesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Wednesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Wednesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Thursday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Thursday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Thursday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Thursday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Friday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Friday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Friday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (2,'Friday', '11:30:00', '12:00:00');

INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Monday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3, 'Monday', '9:00:00', '9:30:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Monday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3, 'Monday', '10:00:00', '10:30:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3, 'Monday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Tuesday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Tuesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Tuesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Wednesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Wednesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Thursday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Thursday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Thursday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Thursday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Friday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Friday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Friday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (3,'Friday', '11:30:00', '12:00:00');

INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4,'Monday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4, 'Monday', '9:00:00', '9:30:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4,'Monday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4, 'Monday', '10:00:00', '10:30:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4, 'Monday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4,'Tuesday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4,'Tuesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4,'Tuesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4,'Wednesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4,'Wednesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4,'Thursday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4,'Thursday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4,'Thursday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4,'Thursday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4,'Friday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4,'Friday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4,'Friday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (4,'Friday', '11:30:00', '12:00:00');

INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5,'Monday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5, 'Monday', '9:00:00', '9:30:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5,'Monday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5, 'Monday', '10:00:00', '10:30:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5, 'Monday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5,'Tuesday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5,'Tuesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5,'Tuesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5,'Wednesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5,'Wednesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5,'Thursday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5,'Thursday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5,'Thursday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5,'Thursday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5,'Friday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5,'Friday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5,'Friday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (5,'Friday', '11:30:00', '12:00:00');

INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6,'Monday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6, 'Monday', '9:00:00', '9:30:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6,'Monday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6, 'Monday', '10:00:00', '10:30:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6, 'Monday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6,'Tuesday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6,'Tuesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6,'Tuesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6,'Wednesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6,'Wednesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6,'Thursday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6,'Thursday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6,'Thursday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6,'Thursday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6,'Friday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6,'Friday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6,'Friday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (6,'Friday', '11:30:00', '12:00:00');

INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7,'Monday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7, 'Monday', '9:00:00', '9:30:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7,'Monday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7, 'Monday', '10:00:00', '10:30:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7, 'Monday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7,'Tuesday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7,'Tuesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7,'Tuesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7,'Wednesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7,'Wednesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7,'Thursday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7,'Thursday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7,'Thursday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7,'Thursday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7,'Friday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7,'Friday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7,'Friday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (7,'Friday', '11:30:00', '12:00:00');

INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8,'Monday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8, 'Monday', '9:00:00', '9:30:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8,'Monday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8, 'Monday', '10:00:00', '10:30:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8, 'Monday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8,'Tuesday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8,'Tuesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8,'Tuesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8,'Wednesday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8,'Wednesday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8,'Thursday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8,'Thursday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8,'Thursday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8,'Thursday', '11:30:00', '12:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8,'Friday', '8:30:00', '9:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8,'Friday', '9:30:00', '10:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8,'Friday', '10:30:00', '11:00:00');
INSERT INTO `DaiHire`.`CandidateAvailability` (`candidate_id`,`timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES (8,'Friday', '11:30:00', '12:00:00');


/****** PeopleAvailability ******/
INSERT INTO `PeopleAvailability` (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`) VALUES 
(8,'Monday', '8:30:00', '9:00:00'),
(8,'Monday', '9:00:00', '9:30:00'),
(8,'Monday', '9:30:00', '10:00:00'),
(8,'Monday', '10:00:00', '10:30:00'),
(8,'Monday', '10:30:00', '11:00:00'),
(8,'Monday', '11:00:00', '11:30:00'),
(8,'Monday', '11:30:00', '12:00:00'),
(8,'Monday', '12:00:00', '12:30:00'),
(8,'Monday', '12:30:00', '13:00:00'),
(8,'Monday', '13:00:00', '13:30:00'),
(8,'Monday', '13:30:00', '14:00:00'),
(8,'Tuesday', '9:30:00', '10:00:00'),
(8,'Tuesday', '10:30:00', '11:00:00'),
(8,'Tuesday', '11:30:00', '12:00:00'),
(8,'Wednesday', '10:30:00', '11:00:00'),
(8,'Wednesday', '11:30:00', '12:00:00'),
(8,'Thursday', '8:30:00', '9:00:00'),
(8,'Thursday', '9:30:00', '10:00:00'),
(8,'Thursday', '10:30:00', '11:00:00'),
(8,'Thursday', '11:30:00', '12:00:00'),
(8,'Friday', '8:30:00', '9:00:00'),
(8,'Friday', '9:30:00', '10:00:00'),
(8,'Friday', '10:30:00', '11:00:00'),
(8,'Friday', '11:30:00', '12:00:00'),

(9,'Monday', '8:30:00', '9:00:00'),
(9, 'Monday', '9:00:00', '9:30:00'),
(9,'Monday', '9:30:00', '10:00:00'),
(9, 'Monday', '10:00:00', '10:30:00'),
(9, 'Monday', '10:30:00', '11:00:00'),
(9,'Tuesday', '9:30:00', '10:00:00'),
(9,'Tuesday', '10:30:00', '11:00:00'),
(9,'Tuesday', '11:30:00', '12:00:00'),
(9,'Wednesday', '10:30:00', '11:00:00'),
(9,'Wednesday', '11:30:00', '12:00:00'),
(9,'Thursday', '8:30:00', '9:00:00'),
(9,'Thursday', '9:30:00', '10:00:00'),
(9,'Thursday', '10:30:00', '11:00:00'),
(9,'Thursday', '11:30:00', '12:00:00'),
(9,'Friday', '8:30:00', '9:00:00'),
(9,'Friday', '9:00:00', '9:30:00'),
(9,'Friday', '9:30:00', '10:00:00'),
(9,'Friday', '10:00:00', '10:30:00'),
(9,'Friday', '10:30:00', '11:00:00'),
(9,'Friday', '11:30:00', '12:00:00'),
(9,'Friday', '12:30:00', '13:00:00'),
(9,'Friday', '13:00:00', '13:30:00'),
(9,'Friday', '13:30:00', '14:00:00'),
(9,'Friday', '14:00:00', '14:30:00'),
(9,'Friday', '14:30:00', '15:00:00'),
(9,'Friday', '15:00:00', '15:30:00'),
(9,'Friday', '15:30:00', '16:00:00'),
(9,'Friday', '16:00:00', '16:30:00'),

(10,'Monday', '8:30:00', '9:00:00'),
(10, 'Monday', '9:00:00', '9:30:00'),
(10,'Monday', '9:30:00', '10:00:00'),
(10, 'Monday', '10:00:00', '10:30:00'),
(10, 'Monday', '10:30:00', '11:00:00'),
(10,'Tuesday', '9:30:00', '10:00:00'),
(10,'Tuesday', '10:30:00', '11:00:00'),
(10,'Tuesday', '11:30:00', '12:00:00'),
(10,'Wednesday', '10:30:00', '11:00:00'),
(10,'Wednesday', '11:30:00', '12:00:00'),
(10,'Thursday', '8:30:00', '9:00:00'),
(10,'Thursday', '9:30:00', '10:00:00'),
(10,'Thursday', '10:30:00', '11:00:00'),
(10,'Thursday', '11:30:00', '12:00:00'),
(10,'Friday', '8:30:00', '9:00:00'),
(10,'Friday', '9:30:00', '10:00:00'),
(10,'Friday', '10:30:00', '11:00:00'),
(10,'Friday', '11:30:00', '12:00:00'),

(11,'Monday', '8:30:00', '9:00:00'),
(11, 'Monday', '9:00:00', '9:30:00'),
(11,'Monday', '9:30:00', '10:00:00'),
(11, 'Monday', '10:00:00', '10:30:00'),
(11, 'Monday', '10:30:00', '11:00:00'),
(11,'Tuesday', '9:30:00', '10:00:00'),
(11,'Tuesday', '10:30:00', '11:00:00'),
(11,'Tuesday', '11:30:00', '12:00:00'),
(11,'Wednesday', '10:30:00', '11:00:00'),
(11,'Wednesday', '11:30:00', '12:00:00'),
(11,'Thursday', '8:30:00', '9:00:00'),
(11,'Thursday', '9:30:00', '10:00:00'),
(11,'Thursday', '10:30:00', '11:00:00'),
(11,'Thursday', '11:30:00', '12:00:00'),
(11,'Friday', '8:30:00', '9:00:00'),
(11,'Friday', '9:30:00', '10:00:00'),
(11,'Friday', '10:30:00', '11:00:00'),
(11,'Friday', '11:30:00', '12:00:00'),

(12,'Monday', '8:30:00', '9:00:00'),
(12, 'Monday', '9:00:00', '9:30:00'),
(12,'Monday', '9:30:00', '10:00:00'),
(12, 'Monday', '10:00:00', '10:30:00'),
(12, 'Monday', '10:30:00', '11:00:00'),
(12,'Tuesday', '9:30:00', '10:00:00'),
(12,'Tuesday', '10:30:00', '11:00:00'),
(12,'Tuesday', '11:30:00', '12:00:00'),
(12,'Wednesday', '10:30:00', '11:00:00'),
(12,'Wednesday', '11:30:00', '12:00:00'),
(12,'Thursday', '8:30:00', '9:00:00'),
(12,'Thursday', '9:30:00', '10:00:00'),
(12,'Thursday', '10:30:00', '11:00:00'),
(12,'Thursday', '11:30:00', '12:00:00'),
(12,'Friday', '8:30:00', '9:00:00'),
(12,'Friday', '9:30:00', '10:00:00'),
(12,'Friday', '10:30:00', '11:00:00'),
(12,'Friday', '11:30:00', '12:00:00'),

(13,'Monday', '8:30:00', '9:00:00'),
(13, 'Monday', '9:00:00', '9:30:00'),
(13,'Monday', '9:30:00', '10:00:00'),
(13, 'Monday', '10:00:00', '10:30:00'),
(13, 'Monday', '10:30:00', '11:00:00'),
(13,'Tuesday', '9:30:00', '10:00:00'),
(13,'Tuesday', '10:30:00', '11:00:00'),
(13,'Tuesday', '11:30:00', '12:00:00'),
(13,'Tuesday', '12:00:00', '12:30:00'),
(13,'Tuesday', '12:30:00', '13:00:00'),
(13,'Tuesday', '13:00:00', '13:30:00'),
(13,'Tuesday', '13:30:00', '14:00:00'),
(13,'Tuesday', '14:00:00', '14:30:00'),
(13,'Tuesday', '14:30:00', '15:00:00'),
(13,'Tuesday', '15:00:00', '15:30:00'),
(13,'Tuesday', '15:30:00', '16:00:00'),
(13,'Tuesday', '16:00:00', '16:30:00'),
(13,'Tuesday', '16:30:00', '17:00:00'),
(13,'Tuesday', '17:00:00', '17:30:00'),
(13,'Tuesday', '17:30:00', '18:00:00'),
(13,'Tuesday', '18:00:00', '18:30:00'),
(13,'Tuesday', '18:30:00', '19:00:00'),
(13,'Wednesday', '10:30:00', '11:00:00'),
(13,'Wednesday', '11:30:00', '12:00:00'),
(13,'Thursday', '8:30:00', '9:00:00'),
(13,'Thursday', '9:30:00', '10:00:00'),
(13,'Thursday', '10:30:00', '11:00:00'),
(13,'Thursday', '11:30:00', '12:00:00'),
(13,'Friday', '8:30:00', '9:00:00'),
(13,'Friday', '9:30:00', '10:00:00'),
(13,'Friday', '10:30:00', '11:00:00'),
(13,'Friday', '11:30:00', '12:00:00'),

(14,'Monday', '8:30:00', '9:00:00'),
(14, 'Monday', '9:00:00', '9:30:00'),
(14,'Monday', '9:30:00', '10:00:00'),
(14, 'Monday', '10:00:00', '10:30:00'),
(14, 'Monday', '10:30:00', '11:00:00'),
(14,'Tuesday', '9:30:00', '10:00:00'),
(14,'Tuesday', '10:30:00', '11:00:00'),
(14,'Tuesday', '11:30:00', '12:00:00'),
(14,'Wednesday', '10:30:00', '11:00:00'),
(14,'Wednesday', '11:30:00', '12:00:00'),
(14,'Thursday', '8:30:00', '9:00:00'),
(14,'Thursday', '9:30:00', '10:00:00'),
(14,'Thursday', '10:30:00', '11:00:00'),
(14,'Thursday', '11:30:00', '12:00:00'),
(14,'Friday', '8:30:00', '9:00:00'),
(14,'Friday', '9:30:00', '10:00:00'),
(14,'Friday', '10:30:00', '11:00:00'),
(14,'Friday', '11:30:00', '12:00:00'),

(15,'Monday', '8:30:00', '9:00:00'),
(15, 'Monday', '9:00:00', '9:30:00'),
(15,'Monday', '9:30:00', '10:00:00'),
(15, 'Monday', '10:00:00', '10:30:00'),
(15, 'Monday', '10:30:00', '11:00:00'),
(15,'Tuesday', '9:30:00', '10:00:00'),
(15,'Tuesday', '10:30:00', '11:00:00'),
(15,'Tuesday', '11:30:00', '12:00:00'),
(15,'Wednesday', '8:30:00', '9:00:00'),
(15,'Wednesday', '9:00:00', '9:30:00'),
(15,'Wednesday', '9:30:00', '10:00:00'),
(15,'Wednesday', '10:00:00', '10:30:00'),
(15,'Wednesday', '10:30:00', '11:00:00'),
(15,'Wednesday', '11:00:00', '11:30:00'),
(15,'Wednesday', '11:30:00', '12:00:00'),
(15,'Thursday', '8:30:00', '9:00:00'),
(15,'Thursday', '9:30:00', '10:00:00'),
(15,'Thursday', '10:30:00', '11:00:00'),
(15,'Thursday', '11:30:00', '12:00:00'),
(15,'Friday', '8:30:00', '9:00:00'),
(15,'Friday', '9:30:00', '10:00:00'),
(15,'Friday', '10:30:00', '11:00:00'),
(15,'Friday', '11:30:00', '12:00:00'),

(16,'Monday', '8:30:00', '9:00:00'),
(16, 'Monday', '9:00:00', '9:30:00'),
(16,'Monday', '9:30:00', '10:00:00'),
(16, 'Monday', '10:00:00', '10:30:00'),
(16, 'Monday', '10:30:00', '11:00:00'),
(16,'Tuesday', '9:30:00', '10:00:00'),
(16,'Tuesday', '10:30:00', '11:00:00'),
(16,'Tuesday', '11:30:00', '12:00:00'),
(16,'Wednesday', '10:30:00', '11:00:00'),
(16,'Wednesday', '11:30:00', '12:00:00'),
(16,'Thursday', '8:30:00', '9:00:00'),
(16,'Thursday', '9:30:00', '10:00:00'),
(16,'Thursday', '10:30:00', '11:00:00'),
(16,'Thursday', '11:30:00', '12:00:00'),
(16,'Thursday', '12:30:00', '13:00:00'),
(16,'Thursday', '13:30:00', '14:00:00'),
(16,'Thursday', '14:30:00', '15:00:00'),
(16,'Thursday', '15:30:00', '16:00:00');

/** Meeting **/ 
INSERT INTO `DaiHire`.`Meeting` (`meeting_id`, `meeting_datetime`, `meeting_room_id`, `meeting_owner_id`, `meeting_status`, `candidate_id`, `profile_id`) VALUES ('1', '2019-01-19 02:00:00', '1', '5', 'Scheduled', '1', '1');

/** People in meeting **/
INSERT INTO `DaiHire`.`PeopleInMeeting` (`people_id`, `meeting_id`) VALUES ('12', '1');
INSERT INTO `DaiHire`.`PeopleInMeeting` (`people_id`, `meeting_id`) VALUES ('11', '1');


