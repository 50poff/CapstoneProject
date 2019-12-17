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
  `p_password` VARCHAR(45) NOT NULL COMMENT 'temporary; eventually they\'ll log in with their Daitan Active Directory accounts',
  `p_location` VARCHAR(45) NOT NULL COMMENT 'add the constraint afterwords! Must be \"Sao Paolo\", \"Silicon Valley\", \"Victoria\" (can\'t do the special character in Sao Paolo, sorry)',
  `is_active` TINYINT NOT NULL DEFAULT 1,
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
  `profile_name` VARCHAR(45) NOT NULL COMMENT 'example: Python, PHP, React, Mongo, etc... (like a skill that the organization might need) or perhaps something more specific like \"Java Backend developer\"\n',
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
  PRIMARY KEY (`meeting_id`),
  INDEX `fk_Meeting_MeetingRoom1_idx` (`meeting_room_id` ASC),
  INDEX `fk_Meeting_People2_idx` (`meeting_owner_id` ASC),
  INDEX `fk_Meeting_Candidate1_idx` (`candidate_id` ASC),
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
-- Table `DaiHire`.`Interviewer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DaiHire`.`Interviewer` ;

CREATE TABLE IF NOT EXISTS `DaiHire`.`Interviewer` (
  `max_interviews` INT NOT NULL,
  `leader` TINYINT NOT NULL DEFAULT 0 COMMENT 'Boolean value; false means \'is NOT an interview leader\', true means \'IS an interview leader\'. Defaults to 0.\n',
  `interviewer_id` INT NOT NULL,
  PRIMARY KEY (`max_interviews`),
  INDEX `fk_Interviewer_People1_idx` (`interviewer_id` ASC),
  CONSTRAINT `fk_Interviewer_People1`
    FOREIGN KEY (`interviewer_id`)
    REFERENCES `DaiHire`.`People` (`people_id`)
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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
