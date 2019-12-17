-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema DaiHire
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `DaiHire` ;

-- -----------------------------------------------------
-- Schema DaiHire
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DaiHire` DEFAULT CHARACTER SET utf8 ;
USE `DaiHire` ;

-- -----------------------------------------------------
-- Table `DaiHire`.`People`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DaiHire`.`People` ;

CREATE TABLE IF NOT EXISTS `DaiHire`.`People` (
  `people_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `created_by` INT NOT NULL COMMENT 'the id of the employee who made this entry\n',
  `p_password` VARCHAR(100) NOT NULL COMMENT 'temporary; eventually they\'ll log in with their Daitan Active Directory accounts',
  `p_location` VARCHAR(45) NOT NULL COMMENT 'add the constraint afterwords! Must be \"Sao Paolo\", \"Silicon Valley\", \"Victoria\" (can\'t do the special character in Sao Paolo, sorry)',
  `is_active` TINYINT NOT NULL DEFAULT 1,
  `max_interviews` INT NULL DEFAULT 0,
  PRIMARY KEY (`people_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `idPeople_UNIQUE` (`people_id` ASC))
ENGINE = InnoDB
KEY_BLOCK_SIZE = 8;


-- -----------------------------------------------------
-- Table `DaiHire`.`Profile`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DaiHire`.`Profile` ;

CREATE TABLE IF NOT EXISTS `DaiHire`.`Profile` (
  `profile_id` INT NOT NULL AUTO_INCREMENT,
  `profile_name` VARCHAR(45) NOT NULL UNIQUE COMMENT 'example: Python, PHP, React, Mongo, etc... (like a skill that the organization might need) or perhaps something more specific like \"Java Backend developer\"\n',
  PRIMARY KEY (`profile_id`),
  UNIQUE INDEX `skillName_UNIQUE` (`profile_name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DaiHire`.`MeetingRoom`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DaiHire`.`MeetingRoom` ;

CREATE TABLE IF NOT EXISTS `DaiHire`.`MeetingRoom` (
  `meeting_room_id` INT NOT NULL AUTO_INCREMENT,
  `room_name` VARCHAR(45) NOT NULL,
  `room_location` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`meeting_room_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DaiHire`.`Candidate`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DaiHire`.`Candidate` ;

CREATE TABLE IF NOT EXISTS `DaiHire`.`Candidate` (
  `candidate_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `created_by` INT NOT NULL,
  `is_active` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`candidate_id`),
  INDEX `fk_Candidate_People1_idx` (`created_by` ASC),
  CONSTRAINT `fk_Candidate_People1`
    FOREIGN KEY (`created_by`)
    REFERENCES `DaiHire`.`People` (`people_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DaiHire`.`Meeting`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DaiHire`.`Meeting` ;

CREATE TABLE IF NOT EXISTS `DaiHire`.`Meeting` (
  `meeting_id` INT NOT NULL AUTO_INCREMENT,
  `meeting_datetime` DATETIME NOT NULL COMMENT '\"time\" is an oracle keyword so I made the column \"meeting_time\"',
  `meeting_room_id` INT NOT NULL,
  `meeting_owner_id` INT NOT NULL,
  `meeting_status` VARCHAR(45) NOT NULL COMMENT 'todo: add a constraint so that the meeting can be \"scheduled\", \"completed\", or \"cancelled\"',
  `candidate_id` INT NOT NULL,
  `profile_id` INT NOT NULL,
  PRIMARY KEY (`meeting_id`),
  INDEX `fk_Meeting_MeetingRoom1_idx` (`meeting_room_id` ASC),
  INDEX `fk_Meeting_People2_idx` (`meeting_owner_id` ASC),
  INDEX `fk_Meeting_Candidate1_idx` (`candidate_id` ASC),
  INDEX `fk_Meeting_Profile1_idx` (`profile_id` ASC),
  CONSTRAINT `fk_Meeting_MeetingRoom1`
    FOREIGN KEY (`meeting_room_id`)
    REFERENCES `DaiHire`.`MeetingRoom` (`meeting_room_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Meeting_People2`
    FOREIGN KEY (`meeting_owner_id`)
    REFERENCES `DaiHire`.`People` (`people_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Meeting_Candidate1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `DaiHire`.`Candidate` (`candidate_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Meeting_Profile1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `DaiHire`.`Profile` (`profile_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DaiHire`.`PeopleInMeeting`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DaiHire`.`PeopleInMeeting` ;

CREATE TABLE IF NOT EXISTS `DaiHire`.`PeopleInMeeting` (
  `people_id` INT NOT NULL,
  `meeting_id` INT NOT NULL,
  INDEX `fk_Meeting_People1_idx` (`people_id` ASC),
  INDEX `fk_PeopleInMeeting_Meeting1_idx` (`meeting_id` ASC),
  PRIMARY KEY (`people_id`, `meeting_id`),
  CONSTRAINT `fk_Meeting_People1`
    FOREIGN KEY (`people_id`)
    REFERENCES `DaiHire`.`People` (`people_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PeopleInMeeting_Meeting1`
    FOREIGN KEY (`meeting_id`)
    REFERENCES `DaiHire`.`Meeting` (`meeting_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DaiHire`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DaiHire`.`Role` ;

CREATE TABLE IF NOT EXISTS `DaiHire`.`Role` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DaiHire`.`PeopleRoles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DaiHire`.`PeopleRoles` ;

CREATE TABLE IF NOT EXISTS `DaiHire`.`PeopleRoles` (
  `people_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  `role_added_by` INT NOT NULL,
  INDEX `fk_PeopleRoles_People_idx` (`people_id` ASC),
  PRIMARY KEY (`role_id`, `people_id`),
  INDEX `fk_PeopleRoles_People1_idx` (`role_added_by` ASC),
  CONSTRAINT `fk_PeopleRoles_People`
    FOREIGN KEY (`people_id`)
    REFERENCES `DaiHire`.`People` (`people_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PeopleRoles_Role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `DaiHire`.`Role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PeopleRoles_People1`
    FOREIGN KEY (`role_added_by`)
    REFERENCES `DaiHire`.`People` (`people_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DaiHire`.`peopleProfile`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DaiHire`.`peopleProfile` ;

CREATE TABLE IF NOT EXISTS `DaiHire`.`peopleProfile` (
  `people_id` INT NOT NULL,
  `profile_id` INT NOT NULL,
  INDEX `fk_peopleSkills_People1_idx` (`people_id` ASC),
  INDEX `fk_peopleProfile_Profile1_idx` (`profile_id` ASC),
  PRIMARY KEY (`people_id`, `profile_id`),
  CONSTRAINT `fk_peopleSkills_People1`
    FOREIGN KEY (`people_id`)
    REFERENCES `DaiHire`.`People` (`people_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_peopleProfile_Profile1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `DaiHire`.`Profile` (`profile_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DaiHire`.`timeslot`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DaiHire`.`timeslot` ;

CREATE TABLE IF NOT EXISTS `DaiHire`.`timeslot` (
  `week_day` VARCHAR(10) NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  PRIMARY KEY (`week_day`, `start_time`, `end_time`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DaiHire`.`PeopleAvailability`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DaiHire`.`PeopleAvailability` ;

CREATE TABLE IF NOT EXISTS `DaiHire`.`PeopleAvailability` (
  `people_id` INT NOT NULL,
  `timeslot_week_day` VARCHAR(10) NULL,
  `timeslot_start_time` TIME NULL,
  `timeslot_end_time` TIME NULL,
  INDEX `fk_table1_People1_idx` (`people_id` ASC),
  PRIMARY KEY (`people_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`),
  INDEX `fk_PeopleAvailability_timeslot1_idx` (`timeslot_week_day` ASC, `timeslot_start_time` ASC, `timeslot_end_time` ASC),
  CONSTRAINT `fk_table1_People1`
    FOREIGN KEY (`people_id`)
    REFERENCES `DaiHire`.`People` (`people_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PeopleAvailability_timeslot1`
    FOREIGN KEY (`timeslot_week_day` , `timeslot_start_time` , `timeslot_end_time`)
    REFERENCES `DaiHire`.`timeslot` (`week_day` , `start_time` , `end_time`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DaiHire`.`candidateProfile`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DaiHire`.`candidateProfile` ;

CREATE TABLE IF NOT EXISTS `DaiHire`.`candidateProfile` (
  `candidate_id` INT NOT NULL,
  `profile_id` INT NOT NULL,
  PRIMARY KEY (`candidate_id`, `profile_id`),
  INDEX `fk_candidateProfile_Profile1_idx` (`profile_id` ASC),
  CONSTRAINT `fk_candidateProfile_Candidate1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `DaiHire`.`Candidate` (`candidate_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_candidateProfile_Profile1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `DaiHire`.`Profile` (`profile_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DaiHire`.`CandidateAvailability`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DaiHire`.`CandidateAvailability` ;

CREATE TABLE IF NOT EXISTS `DaiHire`.`CandidateAvailability` (
  `candidate_id` INT NOT NULL,
  `timeslot_week_day` VARCHAR(10) NULL,
  `timeslot_start_time` TIME NULL,
  `timeslot_end_time` TIME NULL,
  PRIMARY KEY (`candidate_id`, `timeslot_week_day`, `timeslot_start_time`, `timeslot_end_time`),
  INDEX `fk_CandidateAvailability_timeslot1_idx` (`timeslot_week_day` ASC, `timeslot_start_time` ASC, `timeslot_end_time` ASC),
  CONSTRAINT `fk_CandidateAvailability_Candidate1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `DaiHire`.`Candidate` (`candidate_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CandidateAvailability_timeslot1`
    FOREIGN KEY (`timeslot_week_day` , `timeslot_start_time` , `timeslot_end_time`)
    REFERENCES `DaiHire`.`timeslot` (`week_day` , `start_time` , `end_time`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


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


/****** Roles ******/
INSERT INTO Role (role_name) VALUES ("Administrator"),("Hiring Team Member"),("Manager"),("Interviewer"),("Interview Leader");

-- Administrators
INSERT INTO People (first_name, last_name, email, created_by, p_password, p_location) VALUES ('ADMIN', 'ADMIN', 'ADMIN@daihire.com', 1, "$2a$10$YAgehDC08KCVJyKtc8d2wOaD7cw5ciMFybU6gXTPav0LAH5j8ZWXW", 'Brazil');
INSERT INTO PeopleRoles (people_id, role_id, role_added_by) VALUES ('1', '1', '1');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

GRANT SELECT, INSERT, UPDATE, SHOW VIEW on DaiHire.* to daihire;


GRANT DELETE ON PeopleAvailability TO daihire;
GRANT DELETE ON peopleProfile TO daihire;
GRANT DELETE ON candidateProfile To daihire;

-- run these as root
-- GRANT DELETE ON PeopleAvailability TO daihire;
-- GRANT DELETE ON peopleProfile TO daihire;