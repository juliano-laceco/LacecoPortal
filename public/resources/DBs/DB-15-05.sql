-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: lacecodb
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'Juliano','2024-04-08','Lebanon','Sanitary',NULL),(2,'Alexandra','2024-08-04','UAE','Finance',NULL);
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `client_contact`
--

LOCK TABLES `client_contact` WRITE;
/*!40000 ALTER TABLE `client_contact` DISABLE KEYS */;
/*!40000 ALTER TABLE `client_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `contract_type`
--

LOCK TABLES `contract_type` WRITE;
/*!40000 ALTER TABLE `contract_type` DISABLE KEYS */;
INSERT INTO `contract_type` VALUES (1,'Permanent'),(2,'Project Based'),(3,'Intern');
/*!40000 ALTER TABLE `contract_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `discipline`
--

LOCK TABLES `discipline` WRITE;
/*!40000 ALTER TABLE `discipline` DISABLE KEYS */;
INSERT INTO `discipline` VALUES (1,'Architecture','2024-05-14',1,3),(2,'Interior Design','2024-05-14',1,3),(3,'Landscape','2024-05-14',1,3),(4,'Structure','2024-05-14',1,3),(5,'Quantity Surveying','2024-05-14',1,3),(6,'Electrical','2024-05-14',1,3),(7,'Mechanical','2024-05-14',1,3),(8,'Roads','2024-05-14',1,3),(9,'Wet Utilities','2024-05-14',1,3);
/*!40000 ALTER TABLE `discipline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `division`
--

LOCK TABLES `division` WRITE;
/*!40000 ALTER TABLE `division` DISABLE KEYS */;
INSERT INTO `division` VALUES (1,'Business Development'),(2,'Construction Supervision'),(3,'Design & Advisory');
/*!40000 ALTER TABLE `division` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'104245244317726462006','Juliano','Gharzeddine','juliano.gharzeddine@laceco.me','2000-03-04','Lebanese','Single',1,150,'Software Engineering',3,1,'2025-03-04',60,8,'Lebanon',1,'2000-03-04',2);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `employee_status`
--

LOCK TABLES `employee_status` WRITE;
/*!40000 ALTER TABLE `employee_status` DISABLE KEYS */;
INSERT INTO `employee_status` VALUES (1,'Active'),(2,'Suspended'),(3,'Terminated'),(4,'On Probation'),(5,'On Temporary Leave');
/*!40000 ALTER TABLE `employee_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `employee_status_history`
--

LOCK TABLES `employee_status_history` WRITE;
/*!40000 ALTER TABLE `employee_status_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_status_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `employee_work_day`
--

LOCK TABLES `employee_work_day` WRITE;
/*!40000 ALTER TABLE `employee_work_day` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_work_day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `employee_work_day_versions`
--

LOCK TABLES `employee_work_day_versions` WRITE;
/*!40000 ALTER TABLE `employee_work_day_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_work_day_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `grade`
--

LOCK TABLES `grade` WRITE;
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
INSERT INTO `grade` VALUES (3,'G1',1),(4,'G2',1),(5,'G3',1),(6,'G4',1),(7,'G5+',1),(8,'G6',1),(9,'G7',1);
/*!40000 ALTER TABLE `grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `grade_history`
--

LOCK TABLES `grade_history` WRITE;
/*!40000 ALTER TABLE `grade_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `grade_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `holiday`
--

LOCK TABLES `holiday` WRITE;
/*!40000 ALTER TABLE `holiday` DISABLE KEYS */;
/*!40000 ALTER TABLE `holiday` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `holiday_year`
--

LOCK TABLES `holiday_year` WRITE;
/*!40000 ALTER TABLE `holiday_year` DISABLE KEYS */;
/*!40000 ALTER TABLE `holiday_year` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'Add Employee'),(2,'Edit Employee');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `phase`
--

LOCK TABLES `phase` WRITE;
/*!40000 ALTER TABLE `phase` DISABLE KEYS */;
/*!40000 ALTER TABLE `phase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `phase_assignee`
--

LOCK TABLES `phase_assignee` WRITE;
/*!40000 ALTER TABLE `phase_assignee` DISABLE KEYS */;
/*!40000 ALTER TABLE `phase_assignee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `phase_assignee_versions`
--

LOCK TABLES `phase_assignee_versions` WRITE;
/*!40000 ALTER TABLE `phase_assignee_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `phase_assignee_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `phase_history`
--

LOCK TABLES `phase_history` WRITE;
/*!40000 ALTER TABLE `phase_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `phase_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `phase_status`
--

LOCK TABLES `phase_status` WRITE;
/*!40000 ALTER TABLE `phase_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `phase_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `phase_versions`
--

LOCK TABLES `phase_versions` WRITE;
/*!40000 ALTER TABLE `phase_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `phase_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,'CEO'),(2,'Business Development Manager'),(3,'Director of Business Development'),(4,'Marketing Coordinator'),(5,'Public Relations Specialist'),(6,'Graphic Designer'),(7,'Sr. Site Civil Engineer'),(8,'Sr. Site Electrical Engineer'),(9,'Document Controller'),(10,'Civil Engineer'),(11,'Sr. Site Mechanical Engineer'),(12,'Resident Engineer'),(13,'Site Mechanical Engineer'),(14,'Resident Architect'),(15,'Sr. Site Structural Engineer'),(16,'Director of Construction'),(17,'Head of Contracts'),(18,'Senior Project Manager'),(19,'Administrative Assistant'),(20,'Sr. Site Architect'),(21,'Assistant Project Manager'),(22,'HSE Engineer'),(23,'Senior Quantity Surveyor'),(24,'Sr. Site Architect & QA/QC'),(25,'Civil Inspector'),(26,'Landscape Architect'),(27,'Mechanical Inspector'),(28,'Electrical Engineer'),(29,'Electrical Inspector'),(30,'Mechanical Engineer'),(31,'Safety Officer'),(32,'Senior Planning Engineer'),(33,'Site Architect'),(34,'Lead Architect'),(35,'Senior Mechanical Engineer'),(36,'Senior Electrical Inspector'),(37,'Lead Electrical Engineer'),(38,'Director of Engineering'),(39,'Foreman 2'),(40,'Senior Environmental Engineer'),(41,'Director of Environmental'),(42,'Solid Waste Expert'),(43,'Project Manager'),(44,'Proposals Coordinator'),(45,'Head of Proposals'),(46,'Head of Quantity Surveying'),(47,'Lead Road & Transportation Engineer'),(48,'Head of Structure'),(49,'Senior Structural Engineer'),(50,'Lead Structural Engineer'),(51,'Lead Wet Infrastructure Utilities Engineer'),(52,'Wet Infrastructure Utilities Engineer'),(53,'Head of Wet Utilities'),(54,'Chief Executive Officer'),(55,'Senior Accountant'),(56,'Director of Finance'),(57,'Accountant'),(58,'Organizational Performance Lead'),(59,'Planning Engineer'),(60,'Developer'),(61,'Administrative Manager'),(62,'Office Boy'),(63,'Government Relations Specialist'),(64,'PRO'),(65,'Office Manager'),(66,'Plotting Officer'),(67,'IT Manager'),(68,'Senior System Administrator'),(69,'Director of HR and OD'),(70,'HR Coordinator'),(71,'Human Resource Officer'),(72,'PMU Coordinator');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `position_history`
--

LOCK TABLES `position_history` WRITE;
/*!40000 ALTER TABLE `position_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `position_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `project_category`
--

LOCK TABLES `project_category` WRITE;
/*!40000 ALTER TABLE `project_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `project_comment`
--

LOCK TABLES `project_comment` WRITE;
/*!40000 ALTER TABLE `project_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `project_status`
--

LOCK TABLES `project_status` WRITE;
/*!40000 ALTER TABLE `project_status` DISABLE KEYS */;
INSERT INTO `project_status` VALUES (1,'Active'),(2,'On Hold'),(3,'Completed'),(4,'Cancelled');
/*!40000 ALTER TABLE `project_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `projected_work_week`
--

LOCK TABLES `projected_work_week` WRITE;
/*!40000 ALTER TABLE `projected_work_week` DISABLE KEYS */;
/*!40000 ALTER TABLE `projected_work_week` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `projected_work_week_versions`
--

LOCK TABLES `projected_work_week_versions` WRITE;
/*!40000 ALTER TABLE `projected_work_week_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `projected_work_week_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `projects_versions`
--

LOCK TABLES `projects_versions` WRITE;
/*!40000 ALTER TABLE `projects_versions` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'HR'),(2,'Planning Administrator');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
INSERT INTO `role_permission` VALUES (1,1,1),(2,1,2);
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `schedule_year`
--

LOCK TABLES `schedule_year` WRITE;
/*!40000 ALTER TABLE `schedule_year` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedule_year` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `seniority`
--

LOCK TABLES `seniority` WRITE;
/*!40000 ALTER TABLE `seniority` DISABLE KEYS */;
INSERT INTO `seniority` VALUES (1,'Junior','Entry Level'),(2,'Junior','Middle Level'),(3,'Senior','Senior Level'),(4,'Administrative','Administrative Level'),(5,'Executive','Executive Level'),(6,'Staff','Staff');
/*!40000 ALTER TABLE `seniority` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-15 17:27:18
