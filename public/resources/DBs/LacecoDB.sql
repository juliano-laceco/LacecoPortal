-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: lacecodb
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `client_id` int NOT NULL AUTO_INCREMENT,
  `client_name` varchar(255) NOT NULL,
  `joined_on` date NOT NULL,
  `geography` varchar(255) NOT NULL,
  `sector` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_contact`
--

DROP TABLE IF EXISTS `client_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_contact` (
  `client_contact_id` int NOT NULL AUTO_INCREMENT,
  `contact_name` varchar(255) NOT NULL,
  `contact_info` varchar(255) NOT NULL,
  `contact_location` varchar(255) NOT NULL,
  `client_id` int NOT NULL,
  PRIMARY KEY (`client_contact_id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `client_contact_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_contact`
--

LOCK TABLES `client_contact` WRITE;
/*!40000 ALTER TABLE `client_contact` DISABLE KEYS */;
/*!40000 ALTER TABLE `client_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_type`
--

DROP TABLE IF EXISTS `contract_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_type` (
  `contract_type_id` int NOT NULL AUTO_INCREMENT,
  `contract_type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`contract_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_type`
--

LOCK TABLES `contract_type` WRITE;
/*!40000 ALTER TABLE `contract_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `contract_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discipline`
--

DROP TABLE IF EXISTS `discipline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discipline` (
  `discipline_id` int NOT NULL AUTO_INCREMENT,
  `discipline_name` varchar(255) NOT NULL,
  `assigned_on` date NOT NULL,
  `head_of_department_id` int NOT NULL,
  `division_id` int DEFAULT NULL,
  PRIMARY KEY (`discipline_id`),
  KEY `head_of_department_id` (`head_of_department_id`),
  KEY `division_id` (`division_id`),
  CONSTRAINT `discipline_ibfk_1` FOREIGN KEY (`head_of_department_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `discipline_ibfk_2` FOREIGN KEY (`division_id`) REFERENCES `division` (`division_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discipline`
--

LOCK TABLES `discipline` WRITE;
/*!40000 ALTER TABLE `discipline` DISABLE KEYS */;
/*!40000 ALTER TABLE `discipline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `division`
--

DROP TABLE IF EXISTS `division`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `division` (
  `division_id` int NOT NULL AUTO_INCREMENT,
  `division_name` varchar(255) NOT NULL,
  PRIMARY KEY (`division_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `division`
--

LOCK TABLES `division` WRITE;
/*!40000 ALTER TABLE `division` DISABLE KEYS */;
/*!40000 ALTER TABLE `division` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `google_sub` varchar(500) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `work_email` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `nationality` varchar(500) NOT NULL,
  `marital_status` char(10) NOT NULL,
  `discipline_id` int DEFAULT NULL,
  `employee_hourly_cost` float NOT NULL,
  `major` varchar(500) NOT NULL,
  `years_of_experience` int NOT NULL,
  `contract_type_id` int DEFAULT NULL,
  `contract_valid_till` date DEFAULT NULL,
  `position_id` int DEFAULT NULL,
  `grade_id` int DEFAULT NULL,
  `country` char(10) NOT NULL,
  `status_id` int DEFAULT NULL,
  `created_on` date NOT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `role_id_fk_idx` (`role_id`),
  KEY `discipline_id_fk` (`discipline_id`),
  KEY `contract_type_id_fk` (`contract_type_id`),
  KEY `position_id_fk` (`position_id`),
  KEY `grade_id_fk` (`grade_id`),
  KEY `status_id_fk` (`status_id`),
  CONSTRAINT `contract_type_id_fk` FOREIGN KEY (`contract_type_id`) REFERENCES `contract_type` (`contract_type_id`),
  CONSTRAINT `discipline_id_fk` FOREIGN KEY (`discipline_id`) REFERENCES `discipline` (`discipline_id`),
  CONSTRAINT `grade_id_fk` FOREIGN KEY (`grade_id`) REFERENCES `grade` (`grade_id`),
  CONSTRAINT `position_id_fk` FOREIGN KEY (`position_id`) REFERENCES `position` (`position_id`),
  CONSTRAINT `role_id_fk` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `status_id_fk` FOREIGN KEY (`status_id`) REFERENCES `employee_status` (`employee_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'104245244317726462006','Juliano','Gharzeddine','juliano.gharzeddine@laceco.me','2000-03-04','Lebanese','Single',NULL,150,'Software Engineering',3,NULL,'2025-03-04',NULL,NULL,'Lebanon',NULL,'2000-03-04',1);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `employee_roles`
--

DROP TABLE IF EXISTS `employee_roles`;
/*!50001 DROP VIEW IF EXISTS `employee_roles`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `employee_roles` AS SELECT 
 1 AS `employee_id`,
 1 AS `google_sub`,
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `role_id`,
 1 AS `role_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `employee_status`
--

DROP TABLE IF EXISTS `employee_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_status` (
  `employee_status_id` int NOT NULL AUTO_INCREMENT,
  `employee_status_name` varchar(255) NOT NULL,
  PRIMARY KEY (`employee_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_status`
--

LOCK TABLES `employee_status` WRITE;
/*!40000 ALTER TABLE `employee_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_status_history`
--

DROP TABLE IF EXISTS `employee_status_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_status_history` (
  `employee_status_history_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `old_status_id` int NOT NULL,
  `new_status_id` int NOT NULL,
  `changed_on` date NOT NULL,
  `changed_by` int NOT NULL,
  PRIMARY KEY (`employee_status_history_id`),
  KEY `employee_id` (`employee_id`),
  KEY `old_status_id` (`old_status_id`),
  KEY `new_status_id` (`new_status_id`),
  KEY `changed_by_employee_id_idx` (`changed_by`),
  CONSTRAINT `changed_by_employee_id` FOREIGN KEY (`changed_by`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `employee_status_history_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `employee_status_history_ibfk_2` FOREIGN KEY (`old_status_id`) REFERENCES `employee_status` (`employee_status_id`),
  CONSTRAINT `employee_status_history_ibfk_3` FOREIGN KEY (`new_status_id`) REFERENCES `employee_status` (`employee_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_status_history`
--

LOCK TABLES `employee_status_history` WRITE;
/*!40000 ALTER TABLE `employee_status_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_status_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_work_day`
--

DROP TABLE IF EXISTS `employee_work_day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_work_day` (
  `employee_work_day_id` int NOT NULL AUTO_INCREMENT,
  `phase_assignee_id` int NOT NULL,
  `work_day` date NOT NULL,
  `hours_worked` float NOT NULL,
  `status` varchar(255) NOT NULL,
  `actioned_by` int NOT NULL,
  `actioned_on` datetime NOT NULL,
  `rejection_reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`employee_work_day_id`),
  KEY `phase_assignee_id` (`phase_assignee_id`),
  KEY `actioned_by` (`actioned_by`),
  CONSTRAINT `employee_work_day_ibfk_1` FOREIGN KEY (`phase_assignee_id`) REFERENCES `phase_assignee` (`phase_assignee_id`),
  CONSTRAINT `employee_work_day_ibfk_2` FOREIGN KEY (`actioned_by`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_work_day`
--

LOCK TABLES `employee_work_day` WRITE;
/*!40000 ALTER TABLE `employee_work_day` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_work_day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_work_day_versions`
--

DROP TABLE IF EXISTS `employee_work_day_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_work_day_versions` (
  `employee_work_day_id` int NOT NULL AUTO_INCREMENT,
  `phase_assignee_id` int NOT NULL,
  `work_day` date NOT NULL,
  `hours_worked` float NOT NULL,
  `status` varchar(255) NOT NULL,
  `actioned_by` int NOT NULL,
  `actioned_on` datetime NOT NULL,
  `rejection_reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`employee_work_day_id`),
  KEY `phase_assignee_id` (`phase_assignee_id`),
  KEY `actioned_by` (`actioned_by`),
  CONSTRAINT `employee_work_day_versions_ibfk_1` FOREIGN KEY (`phase_assignee_id`) REFERENCES `phase_assignee_versions` (`phase_assignee_id`),
  CONSTRAINT `employee_work_day_versions_ibfk_2` FOREIGN KEY (`actioned_by`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_work_day_versions`
--

LOCK TABLES `employee_work_day_versions` WRITE;
/*!40000 ALTER TABLE `employee_work_day_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_work_day_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grade`
--

DROP TABLE IF EXISTS `grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade` (
  `grade_id` int NOT NULL AUTO_INCREMENT,
  `grade_code` bigint NOT NULL,
  `seniority_id` int NOT NULL,
  PRIMARY KEY (`grade_id`),
  KEY `seniority_id` (`seniority_id`),
  CONSTRAINT `grade_ibfk_1` FOREIGN KEY (`seniority_id`) REFERENCES `seniority` (`seniority_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade`
--

LOCK TABLES `grade` WRITE;
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
/*!40000 ALTER TABLE `grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grade_history`
--

DROP TABLE IF EXISTS `grade_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade_history` (
  `grade_history_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `old_grade_id` int DEFAULT NULL,
  `new_grade_id` int NOT NULL,
  `changed_on` date NOT NULL,
  PRIMARY KEY (`grade_history_id`),
  KEY `employee_id` (`employee_id`),
  KEY `old_grade_id` (`old_grade_id`),
  KEY `new_grade_id` (`new_grade_id`),
  CONSTRAINT `grade_history_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `grade_history_ibfk_2` FOREIGN KEY (`old_grade_id`) REFERENCES `grade` (`grade_id`),
  CONSTRAINT `grade_history_ibfk_3` FOREIGN KEY (`new_grade_id`) REFERENCES `grade` (`grade_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade_history`
--

LOCK TABLES `grade_history` WRITE;
/*!40000 ALTER TABLE `grade_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `grade_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holiday`
--

DROP TABLE IF EXISTS `holiday`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holiday` (
  `holiday_id` int NOT NULL AUTO_INCREMENT,
  `holiday_name` varchar(255) NOT NULL,
  PRIMARY KEY (`holiday_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holiday`
--

LOCK TABLES `holiday` WRITE;
/*!40000 ALTER TABLE `holiday` DISABLE KEYS */;
/*!40000 ALTER TABLE `holiday` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holiday_year`
--

DROP TABLE IF EXISTS `holiday_year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holiday_year` (
  `holiday_year_id` int NOT NULL AUTO_INCREMENT,
  `year` char(4) NOT NULL,
  `holiday_start_date` date NOT NULL,
  `holiday_end_date` date NOT NULL,
  `holiday_id` int NOT NULL,
  PRIMARY KEY (`holiday_year_id`),
  KEY `holiday_id` (`holiday_id`),
  CONSTRAINT `holiday_year_ibfk_1` FOREIGN KEY (`holiday_id`) REFERENCES `holiday` (`holiday_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holiday_year`
--

LOCK TABLES `holiday_year` WRITE;
/*!40000 ALTER TABLE `holiday_year` DISABLE KEYS */;
/*!40000 ALTER TABLE `holiday_year` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `permission_id` int NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(255) NOT NULL,
  PRIMARY KEY (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phase`
--

DROP TABLE IF EXISTS `phase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phase` (
  `phase_id` int NOT NULL AUTO_INCREMENT,
  `phase_name` bigint NOT NULL,
  `project_id` int NOT NULL,
  `actioned_by` int NOT NULL,
  `actioned_on` date NOT NULL,
  `planned_startdate` date NOT NULL,
  `planned_enddate` date NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status_id` int NOT NULL,
  PRIMARY KEY (`phase_id`),
  KEY `actioned_by` (`actioned_by`),
  KEY `status_id` (`status_id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `phase_ibfk_1` FOREIGN KEY (`actioned_by`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `phase_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `phase_status` (`phase_status_id`),
  CONSTRAINT `phase_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase`
--

LOCK TABLES `phase` WRITE;
/*!40000 ALTER TABLE `phase` DISABLE KEYS */;
/*!40000 ALTER TABLE `phase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phase_assignee`
--

DROP TABLE IF EXISTS `phase_assignee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phase_assignee` (
  `phase_assignee_id` int NOT NULL AUTO_INCREMENT,
  `assignee_id` int NOT NULL,
  `work_done_hrs` int NOT NULL,
  `expected_work_hrs` int NOT NULL,
  `expected_start_date` date NOT NULL,
  `phase_id` int NOT NULL,
  PRIMARY KEY (`phase_assignee_id`),
  KEY `assignee_id` (`assignee_id`),
  KEY `phase_id` (`phase_id`),
  CONSTRAINT `phase_assignee_ibfk_1` FOREIGN KEY (`assignee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `phase_assignee_ibfk_2` FOREIGN KEY (`phase_id`) REFERENCES `phase` (`phase_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase_assignee`
--

LOCK TABLES `phase_assignee` WRITE;
/*!40000 ALTER TABLE `phase_assignee` DISABLE KEYS */;
/*!40000 ALTER TABLE `phase_assignee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phase_assignee_versions`
--

DROP TABLE IF EXISTS `phase_assignee_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phase_assignee_versions` (
  `phase_assignee_id` int NOT NULL AUTO_INCREMENT,
  `assignee_id` int NOT NULL,
  `work_done_hrs` bigint NOT NULL,
  `expected_work_hrs` bigint NOT NULL,
  `expected_start_date` date NOT NULL,
  `phase_id` int NOT NULL,
  PRIMARY KEY (`phase_assignee_id`),
  KEY `assignee_id` (`assignee_id`),
  KEY `phase_id` (`phase_id`),
  CONSTRAINT `phase_assignee_versions_ibfk_1` FOREIGN KEY (`assignee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `phase_assignee_versions_ibfk_2` FOREIGN KEY (`phase_id`) REFERENCES `phase_versions` (`phase_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase_assignee_versions`
--

LOCK TABLES `phase_assignee_versions` WRITE;
/*!40000 ALTER TABLE `phase_assignee_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `phase_assignee_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phase_history`
--

DROP TABLE IF EXISTS `phase_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phase_history` (
  `phase_history_id` int NOT NULL AUTO_INCREMENT,
  `phase_id` int NOT NULL,
  `actioned_on` date NOT NULL,
  `actioned_by` int NOT NULL,
  `old_end_date` date NOT NULL,
  `new_end_date` date NOT NULL,
  `justification` varchar(255) NOT NULL,
  PRIMARY KEY (`phase_history_id`),
  KEY `phase_id` (`phase_id`),
  KEY `changed_by_employee_id_idx` (`actioned_by`),
  CONSTRAINT `phase_actioned_by_employee_id` FOREIGN KEY (`actioned_by`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `phase_history_ibfk_1` FOREIGN KEY (`phase_id`) REFERENCES `phase` (`phase_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase_history`
--

LOCK TABLES `phase_history` WRITE;
/*!40000 ALTER TABLE `phase_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `phase_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phase_status`
--

DROP TABLE IF EXISTS `phase_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phase_status` (
  `phase_status_id` int NOT NULL AUTO_INCREMENT,
  `phase_status_name` bigint NOT NULL,
  PRIMARY KEY (`phase_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase_status`
--

LOCK TABLES `phase_status` WRITE;
/*!40000 ALTER TABLE `phase_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `phase_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phase_versions`
--

DROP TABLE IF EXISTS `phase_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phase_versions` (
  `phase_id` int NOT NULL AUTO_INCREMENT,
  `phase_name` bigint NOT NULL,
  `actioned_by` int NOT NULL,
  `actioned_on` date NOT NULL,
  `planned_startdate` date NOT NULL,
  `planned_enddate` date NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status_id` int NOT NULL,
  `initial_phase_id` int NOT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`phase_id`),
  KEY `initial_phase_id` (`initial_phase_id`),
  KEY `status_id` (`status_id`),
  KEY `actioned_by` (`actioned_by`),
  CONSTRAINT `phase_versions_ibfk_1` FOREIGN KEY (`initial_phase_id`) REFERENCES `phase` (`phase_id`),
  CONSTRAINT `phase_versions_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `phase_status` (`phase_status_id`),
  CONSTRAINT `phase_versions_ibfk_3` FOREIGN KEY (`actioned_by`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase_versions`
--

LOCK TABLES `phase_versions` WRITE;
/*!40000 ALTER TABLE `phase_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `phase_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `position` (
  `position_id` int NOT NULL AUTO_INCREMENT,
  `position_name` varchar(255) NOT NULL,
  PRIMARY KEY (`position_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,'CEO');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position_history`
--

DROP TABLE IF EXISTS `position_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `position_history` (
  `position_history_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `position_change_type` varchar(255) NOT NULL,
  `old_position_id` int DEFAULT NULL,
  `new_position_id` int DEFAULT NULL,
  `old_employee_hourly_cost` float NOT NULL,
  `new_employee_hourly_cost` float NOT NULL,
  `changed_on` date NOT NULL,
  `changed_by` int NOT NULL,
  PRIMARY KEY (`position_history_id`),
  KEY `employee_id` (`employee_id`),
  KEY `old_position_id` (`old_position_id`),
  KEY `new_position_id` (`new_position_id`),
  KEY `position_history_changed_by_employee_id_idx` (`changed_by`),
  CONSTRAINT `position_history_changed_by_employee_id` FOREIGN KEY (`changed_by`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `position_history_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `position_history_ibfk_2` FOREIGN KEY (`old_position_id`) REFERENCES `position` (`position_id`),
  CONSTRAINT `position_history_ibfk_3` FOREIGN KEY (`new_position_id`) REFERENCES `position` (`position_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position_history`
--

LOCK TABLES `position_history` WRITE;
/*!40000 ALTER TABLE `position_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `position_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_category`
--

DROP TABLE IF EXISTS `project_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_category` (
  `project_category_id` int NOT NULL AUTO_INCREMENT,
  `project_category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`project_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_category`
--

LOCK TABLES `project_category` WRITE;
/*!40000 ALTER TABLE `project_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_comment`
--

DROP TABLE IF EXISTS `project_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `comment_text` varchar(255) NOT NULL,
  `poster_id` int NOT NULL,
  `is_reply` bit(1) NOT NULL,
  `reply_to_id` int DEFAULT NULL,
  `posted_on` bigint NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `project_id` (`project_id`),
  KEY `poster_id` (`poster_id`),
  KEY `reply_to_id_comment_id_idx` (`reply_to_id`),
  CONSTRAINT `project_comment_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`),
  CONSTRAINT `project_comment_ibfk_2` FOREIGN KEY (`poster_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `reply_to_id_comment_id` FOREIGN KEY (`reply_to_id`) REFERENCES `project_comment` (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_comment`
--

LOCK TABLES `project_comment` WRITE;
/*!40000 ALTER TABLE `project_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_status`
--

DROP TABLE IF EXISTS `project_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_status` (
  `project_status_id` int NOT NULL AUTO_INCREMENT,
  `project_status_name` bigint NOT NULL,
  PRIMARY KEY (`project_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_status`
--

LOCK TABLES `project_status` WRITE;
/*!40000 ALTER TABLE `project_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projected_work_week`
--

DROP TABLE IF EXISTS `projected_work_week`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projected_work_week` (
  `projected_work_week_id` int NOT NULL AUTO_INCREMENT,
  `phase_assignee_id` int NOT NULL,
  `week_start` date NOT NULL,
  `hours_expected` int NOT NULL,
  PRIMARY KEY (`projected_work_week_id`),
  KEY `phase_assignee_id` (`phase_assignee_id`),
  CONSTRAINT `projected_work_week_ibfk_1` FOREIGN KEY (`phase_assignee_id`) REFERENCES `phase_assignee` (`phase_assignee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projected_work_week`
--

LOCK TABLES `projected_work_week` WRITE;
/*!40000 ALTER TABLE `projected_work_week` DISABLE KEYS */;
/*!40000 ALTER TABLE `projected_work_week` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projected_work_week_versions`
--

DROP TABLE IF EXISTS `projected_work_week_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projected_work_week_versions` (
  `projected_work_week_id` int NOT NULL AUTO_INCREMENT,
  `phase_assignee_id` int NOT NULL,
  `week_start` date NOT NULL,
  `hours_expected` int NOT NULL,
  PRIMARY KEY (`projected_work_week_id`),
  KEY `phase_assignee_id` (`phase_assignee_id`),
  CONSTRAINT `projected_work_week_versions_ibfk_1` FOREIGN KEY (`phase_assignee_id`) REFERENCES `phase_assignee_versions` (`phase_assignee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projected_work_week_versions`
--

LOCK TABLES `projected_work_week_versions` WRITE;
/*!40000 ALTER TABLE `projected_work_week_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `projected_work_week_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `client_id` int NOT NULL,
  `geography` varchar(255) NOT NULL,
  `baseline_budget` bigint NOT NULL,
  `variance` float NOT NULL DEFAULT '0',
  `BUA` int NOT NULL,
  `Landscape` int NOT NULL,
  `ParkingArea` int NOT NULL,
  `DesignArea` int NOT NULL,
  `planned_startdate` date NOT NULL,
  `planned_enddate` date NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `head_of_department_id` int NOT NULL,
  `project_status_id` int NOT NULL,
  `category_id` int NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `client_id` (`client_id`),
  KEY `head_of_department_id` (`head_of_department_id`),
  KEY `project_status_id` (`project_status_id`),
  KEY `category_id` (`category_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`head_of_department_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `projects_ibfk_3` FOREIGN KEY (`project_status_id`) REFERENCES `project_status` (`project_status_id`),
  CONSTRAINT `projects_ibfk_4` FOREIGN KEY (`category_id`) REFERENCES `project_category` (`project_category_id`),
  CONSTRAINT `projects_ibfk_5` FOREIGN KEY (`created_by`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects_versions`
--

DROP TABLE IF EXISTS `projects_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects_versions` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `client_id` int NOT NULL,
  `geography` varchar(255) NOT NULL,
  `baseline_budget` bigint NOT NULL,
  `variance` float NOT NULL,
  `BUA` int NOT NULL,
  `Landscape` int NOT NULL,
  `ParkingArea` int NOT NULL,
  `DesignArea` int NOT NULL,
  `planned_startdate` date NOT NULL,
  `planned_enddate` date NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_on` date NOT NULL,
  `head_of_department_id` int NOT NULL,
  `project_status_id` int NOT NULL,
  `category_id` int NOT NULL,
  `intial_project_id` int NOT NULL,
  `created_by` int NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `client_id` (`client_id`),
  KEY `head_of_department_id` (`head_of_department_id`),
  KEY `project_status_id` (`project_status_id`),
  KEY `category_id` (`category_id`),
  KEY `created_by` (`created_by`),
  KEY `intial_project_id` (`intial_project_id`),
  CONSTRAINT `projects_versions_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `projects_versions_ibfk_2` FOREIGN KEY (`head_of_department_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `projects_versions_ibfk_3` FOREIGN KEY (`project_status_id`) REFERENCES `project_status` (`project_status_id`),
  CONSTRAINT `projects_versions_ibfk_4` FOREIGN KEY (`category_id`) REFERENCES `project_category` (`project_category_id`),
  CONSTRAINT `projects_versions_ibfk_5` FOREIGN KEY (`created_by`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `projects_versions_ibfk_6` FOREIGN KEY (`intial_project_id`) REFERENCES `projects` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects_versions`
--

LOCK TABLES `projects_versions` WRITE;
/*!40000 ALTER TABLE `projects_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'Planning Administrator');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `role_permission_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`role_permission_id`),
  KEY `role_id` (`role_id`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `schedule_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule_year`
--

DROP TABLE IF EXISTS `schedule_year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule_year` (
  `schedule_year_id` int NOT NULL AUTO_INCREMENT,
  `year` char(4) NOT NULL,
  `schedule_start_date` date NOT NULL,
  `schedule_end_date` date NOT NULL,
  `daily_work_hours` float NOT NULL,
  `schedule_id` int NOT NULL,
  PRIMARY KEY (`schedule_year_id`),
  KEY `schedule_id` (`schedule_id`),
  CONSTRAINT `schedule_year_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_year`
--

LOCK TABLES `schedule_year` WRITE;
/*!40000 ALTER TABLE `schedule_year` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedule_year` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seniority`
--

DROP TABLE IF EXISTS `seniority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seniority` (
  `seniority_id` int NOT NULL AUTO_INCREMENT,
  `seniority_type` varchar(255) NOT NULL,
  `seniority_level` varchar(255) NOT NULL,
  PRIMARY KEY (`seniority_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seniority`
--

LOCK TABLES `seniority` WRITE;
/*!40000 ALTER TABLE `seniority` DISABLE KEYS */;
/*!40000 ALTER TABLE `seniority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `employee_roles`
--

/*!50001 DROP VIEW IF EXISTS `employee_roles`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `employee_roles` AS select `e`.`employee_id` AS `employee_id`,`e`.`google_sub` AS `google_sub`,`e`.`first_name` AS `first_name`,`e`.`last_name` AS `last_name`,`r`.`role_id` AS `role_id`,`r`.`role_name` AS `role_name` from (`employee` `e` join `role` `r` on((`e`.`role_id` = `r`.`role_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-07  8:46:59