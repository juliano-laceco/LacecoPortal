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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('317e03b7-2a65-40e4-9eb7-050b9232579f','801aa3303ca449078c5c0557cba6be33df481196a2051540f787c613bdb95c55','2024-05-24 11:23:41.076','0_init','',NULL,'2024-05-24 11:23:41.076',0);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `client_id` int NOT NULL AUTO_INCREMENT,
  `client_name` varchar(255) NOT NULL,
  `joined_on` date DEFAULT NULL,
  `geography` varchar(255) DEFAULT NULL,
  `sector` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'JCC',NULL,NULL,NULL,NULL),(2,'SAIP',NULL,NULL,NULL,NULL),(3,'JABAL',NULL,NULL,NULL,NULL),(4,'AL JAWHARA',NULL,NULL,NULL,NULL),(5,'BRIDI',NULL,NULL,NULL,NULL),(6,'DEMO CLIENT',NULL,NULL,NULL,NULL),(7,'Shurooq',NULL,NULL,NULL,NULL);
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
  CONSTRAINT `client_contact_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_type`
--

LOCK TABLES `contract_type` WRITE;
/*!40000 ALTER TABLE `contract_type` DISABLE KEYS */;
INSERT INTO `contract_type` VALUES (1,'Permanent'),(2,'Contract Based'),(3,'Intern');
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
  `head_of_department_id` int DEFAULT NULL,
  `division_id` int DEFAULT NULL,
  PRIMARY KEY (`discipline_id`),
  KEY `head_of_department_id` (`head_of_department_id`),
  KEY `division_id` (`division_id`),
  CONSTRAINT `discipline_ibfk_1` FOREIGN KEY (`head_of_department_id`) REFERENCES `employee` (`employee_id`) ON UPDATE SET NULL,
  CONSTRAINT `discipline_ibfk_2` FOREIGN KEY (`division_id`) REFERENCES `division` (`division_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discipline`
--

LOCK TABLES `discipline` WRITE;
/*!40000 ALTER TABLE `discipline` DISABLE KEYS */;
INSERT INTO `discipline` VALUES (1,'Business Development','2024-05-14',1,1),(2,'Business Development & Marketing','2024-05-14',1,1),(3,'Ajman Supervision','2024-05-14',1,2),(4,'Al Jabal Supervision','2024-05-14',1,2),(5,'Bridi Supervision','2024-05-14',1,2),(6,'Construction Supervision','2024-05-14',1,2),(7,'Contracts','2024-05-14',1,2),(8,'Hevolution Supervision','2024-05-14',1,2),(9,'LUNC Supervision','2024-05-14',1,2),(10,'Mekkah Supervision','2024-05-14',1,2),(11,'Myriam Island Supervision','2024-05-14',1,2),(12,'Sharjah Supervision','2024-05-14',1,2),(60,'BIM','2024-05-14',1,8),(61,'Electrical','2024-05-14',1,8),(62,'Engineering','2024-05-14',1,8),(63,'Environment','2024-05-14',1,8),(64,'Mechanical','2024-05-14',1,8),(65,'Proposals','2024-05-14',1,8),(66,'Quantity Surveying','2024-05-14',1,8),(67,'Roads','2024-05-14',1,8),(68,'Structure','2024-05-14',1,8),(69,'Wet Utilities','2024-05-14',1,8),(70,'Executive Management','2024-05-14',1,3),(71,'Finance','2024-05-14',1,4),(72,'Operational Excellence','2024-05-14',1,5),(73,'Planning','2024-05-14',1,5),(74,'Administration','2024-05-14',1,6),(75,'Information Technology','2024-05-14',1,8),(76,'Organization & Culture','2024-05-14',1,6),(77,'Talent Management','2024-05-14',1,6),(78,'Project Management Unit','2024-05-14',1,7),(79,'Board','2024-05-14',1,9),(80,'Architecture','2024-05-14',1,8),(81,'Al Ula Supervision','2024-05-14',1,2),(83,'Landscape','2024-05-14',1,8),(84,'Interior Design','2024-05-14',1,8);
/*!40000 ALTER TABLE `discipline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discipline_history`
--

DROP TABLE IF EXISTS `discipline_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discipline_history` (
  `discipline_history_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `new_discipline_id` int DEFAULT NULL,
  `changed_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changed_by` int NOT NULL,
  PRIMARY KEY (`discipline_history_id`),
  KEY `emp_id_fk_idx` (`employee_id`),
  KEY `changed_by_fk_idx` (`changed_by`),
  CONSTRAINT `changed_by_fk` FOREIGN KEY (`changed_by`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `emp_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discipline_history`
--

LOCK TABLES `discipline_history` WRITE;
/*!40000 ALTER TABLE `discipline_history` DISABLE KEYS */;
INSERT INTO `discipline_history` VALUES (3,289,61,'2024-08-07 10:23:15',1),(4,289,79,'2024-08-07 10:23:42',1),(5,1,77,'2024-08-07 10:38:09',1),(6,1,75,'2024-08-07 10:38:27',1);
/*!40000 ALTER TABLE `discipline_history` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `division`
--

LOCK TABLES `division` WRITE;
/*!40000 ALTER TABLE `division` DISABLE KEYS */;
INSERT INTO `division` VALUES (1,'Business Development'),(2,'Construction Supervision'),(3,'Executive Management'),(4,'Finance'),(5,'Operational Excellence'),(6,'Organization & Culture'),(7,'Project Management'),(8,'Design & Advisory'),(9,'Board');
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
  `employee_code` varchar(45) DEFAULT NULL,
  `google_sub` varchar(500) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `work_email` varchar(255) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `country` varchar(150) NOT NULL,
  `nationality` varchar(500) NOT NULL,
  `marital_status` char(10) NOT NULL,
  `major` varchar(500) NOT NULL,
  `years_of_experience` float NOT NULL,
  `contract_type_id` int NOT NULL,
  `contract_valid_till` date DEFAULT NULL,
  `discipline_id` int NOT NULL DEFAULT '3',
  `position_id` int NOT NULL,
  `employee_hourly_cost` float DEFAULT NULL,
  `employee_status_id` int NOT NULL DEFAULT '1',
  `role_id` int NOT NULL DEFAULT '1',
  `work_end_date` date DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int NOT NULL DEFAULT '1',
  `changed_on` datetime DEFAULT NULL,
  `changed_by` int DEFAULT NULL,
  PRIMARY KEY (`employee_id`,`position_id`),
  KEY `role_id_fk_idx` (`role_id`),
  KEY `contract_type_id_fk` (`contract_type_id`),
  KEY `status_id_fk` (`employee_status_id`),
  KEY `pos_id_fk_idx` (`position_id`),
  KEY `discipline_id_fk_idx` (`discipline_id`),
  KEY `created_by_fk_idx` (`created_by`),
  CONSTRAINT `contract_type_id_fk` FOREIGN KEY (`contract_type_id`) REFERENCES `contract_type` (`contract_type_id`),
  CONSTRAINT `created_by_fk` FOREIGN KEY (`created_by`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `discipline_id_fk` FOREIGN KEY (`discipline_id`) REFERENCES `discipline` (`discipline_id`),
  CONSTRAINT `pos_id_fk` FOREIGN KEY (`position_id`) REFERENCES `position` (`position_id`),
  CONSTRAINT `role_id_fk` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `status_id_fk` FOREIGN KEY (`employee_status_id`) REFERENCES `employee_status` (`employee_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=465 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,NULL,'104245244317726462006','Juliano','Gharzeddine','juliano.gharzeddine@laceco.me','2000-03-04','Lebanon','Lebanese','Single','Bachelor, Software Engineering, Le CNAM',3,2,'2029-04-03',75,136,NULL,1,2,NULL,'2024-01-04 00:00:00',1,'2024-08-07 10:52:09',1),(289,'320',NULL,'Fayez','Makkouk','fayez.makkouk@laceco.me','1949-11-13','Lebanon','Lebanese','Married','Master, Engineering, Azerbaijan Red Banner Older Institute of Petroleum and Chemistry',41,1,NULL,79,3,NULL,1,1,NULL,'1990-01-01 00:00:00',1,'2024-08-07 10:24:42',1),(290,'1304',NULL,'Bilal','Alayli','bilal.alayeli@laceco.me','1949-04-10','Lebanon','Lebanese','Married','Bachelor, Physics, Lebanese University\nDiploma, Civil Engineering, Ecole Centrale de Lyon\nPhD, Nuclear Physics, Universite de Lyon',48,1,NULL,79,3,NULL,1,1,NULL,'1990-01-01 00:00:00',1,NULL,NULL),(291,'3097',NULL,'Wael','Debian','wael.debian@laceco.me','1972-06-22','Lebanon','Lebanese','Married','Diploma, Mechanical Engineering, Lebanese University',25.8,1,NULL,62,78,NULL,1,1,NULL,'1998-09-01 00:00:00',1,NULL,NULL),(292,'3110',NULL,'Marwan','Saleh','msaleh@laceco.me','1953-02-12','Lebanon','Lebanese','Married','Diploma, Architecture, Ecole D\'architecture de Paris La Villette ENSBAMaster, Urban Planning, Institut D\'urbanisme ParisCES, Regional and Urban Planning, Ecole Nationale des Ponts et Chaussées',43,1,NULL,9,4,NULL,1,1,NULL,'1993-01-01 00:00:00',1,NULL,NULL),(293,'3118',NULL,'Muhieddine','Berjawi','moheidine.berjawi@laceco.me','1971-04-23','Lebanon','Lebanese','Married','Bachelor, Architecture, BAU',30,1,NULL,80,53,NULL,1,1,NULL,'1994-08-01 00:00:00',1,NULL,NULL),(294,'3120',NULL,'Mohamed','Chawwa','mohamad.chawa@laceco.me','1969-10-10','United Arab Emirates','Lebanese','Married','Bachelor, Architecture, Lebanese University',32,1,NULL,12,53,NULL,1,1,NULL,'1994-01-01 00:00:00',1,NULL,NULL),(295,'3147',NULL,'Abir','Joumaa','abir.joumaa@laceco.me','1971-08-14','Lebanon','Lebanese','Married','Bachelor, Civil Engineering, BAU',30,1,NULL,69,112,NULL,1,1,NULL,'1994-08-01 00:00:00',1,NULL,NULL),(296,'3163',NULL,'Ahmad','Hajjar','ahmad.hajjar@laceco.me','1966-07-11','United Arab Emirates','Lebanese','Married','Bachelor, Electrical Engineering, BAU',33,1,NULL,12,25,NULL,1,1,NULL,'1991-01-01 00:00:00',1,NULL,NULL),(297,'3214',NULL,'Youssef','Bohloq','youssef.bohlok@laceco.me','1969-02-27','Lebanon','Lebanese','Married','Unavailable',28.4,1,NULL,75,133,NULL,1,1,NULL,'1996-02-01 00:00:00',1,NULL,NULL),(298,'3235',NULL,'Ferial','Sleiman','ferial.sleiman@laceco.me','1951-05-29','Lebanon','Lebanese','Married','Unavailable',28,1,NULL,79,3,NULL,1,1,NULL,'1996-01-01 00:00:00',1,NULL,NULL),(299,'3284',NULL,'Mustapha','El Zarif','mustapha.elzarif@laceco.me','1967-01-01','United Arab Emirates','Lebanese','Married','Bachelor, Industrial/ Civil Engineering, Ecole H.E.I Lille\nMaster, Physics/ Mechanical, University of Lille',31,1,NULL,12,21,NULL,1,1,NULL,'1998-11-04 00:00:00',1,NULL,NULL),(300,'3319',NULL,'Diala','Saad','diala.saad@laceco.me','1978-06-28','Lebanon','Lebanese','Married','Bachelor, Gestion et Management, USJ\nMaster, Financial analysis, stock markets, USJ',23,1,NULL,71,118,NULL,1,1,NULL,'2001-08-13 00:00:00',1,NULL,NULL),(301,'3323',NULL,'Nisrine','El Hougeiri','nisrine.elhougeiri@laceco.me','1976-03-05','Saudi Arabia','Lebanese','Married','Bachelor, Chemistry, AUB\nMaster, Environmental Technology, AUB',24,1,NULL,63,79,NULL,1,1,NULL,'2001-10-01 00:00:00',1,NULL,NULL),(302,'3326',NULL,'Josef','El Ghoul','josef.elghoul@laceco.me','1967-08-28','Lebanon','Lebanese','Married','Bachelor, Engineering, Makeevka University\nMaster, Engineering, Makeevka University',22.7,1,NULL,63,82,NULL,1,1,NULL,'2001-10-01 00:00:00',1,NULL,NULL),(303,'3346',NULL,'Mohamed','Mazboudi','unavailable@laceco.me','1972-03-03','Lebanon','Lebanese','Married','Unavailable',21.8,1,NULL,74,129,NULL,1,1,NULL,'2002-08-17 00:00:00',1,NULL,NULL),(304,'3379',NULL,'Ali','Deeb','ali.deeb@laceco.me','1979-08-24','Lebanon','Lebanese','Married','Diploma, Civil Engineering, Lebanese University\nMaster, Water Resources and Environmental Engineering, AUB ',22,1,NULL,69,113,NULL,1,1,NULL,'2004-04-08 00:00:00',1,NULL,NULL),(305,'3383',NULL,'Amine','Dobeissy','amin.dobeissy@laceco.me','1979-03-01','Lebanon','Lebanese','Married','Bachelor, Architectural Engineering, BAU',24,1,NULL,78,150,NULL,1,1,NULL,'2007-03-07 00:00:00',1,NULL,NULL),(306,'3388',NULL,'Ola','Baghdadi','ola.baghdadi@laceco.me','1973-02-17','United Arab Emirates','Egyptian','Single','Bachelor, Civil Engineering, BAU',27,1,NULL,12,29,NULL,1,1,NULL,'2004-08-02 00:00:00',1,NULL,NULL),(307,'3412',NULL,'Rami','Saad','rami.saad@laceco.me','1979-11-19','Lebanon','Lebanese','Married','Diploma Universitaire de la Technologie , Genie Industriel et Maintenance, Lebanese University\nDiploma, Grade de Master Energetique, CNAM',19.5,1,NULL,64,89,NULL,1,1,NULL,'2004-12-23 00:00:00',1,NULL,NULL),(308,'3430',NULL,'Walid','Koteich','walid.koteich@laceco.me','1976-02-01','Lebanon','Lebanese','Married','Diploma, Mechanical Engineering , General Mechanics, Lebanese University ',24,1,NULL,64,87,NULL,1,1,NULL,'2005-04-01 00:00:00',1,NULL,NULL),(309,'3454',NULL,'Bassel','Ismail','bassel.ismail@laceco.me','1980-08-09','Lebanon','Lebanese','Married','Bachelor, Civil Engineering, BAU',22,1,NULL,9,29,NULL,1,1,NULL,'2005-07-11 00:00:00',1,NULL,NULL),(310,'3456',NULL,'Ghassan','Hajjar','ghassan.hajjar@laceco.me','1979-11-03','Lebanon','Lebanese','Married','Diploma, Civil Engineering, Lebanese University\nMaster, Civil Engineering, Balamand',21,1,NULL,66,27,NULL,1,1,NULL,'2005-07-19 00:00:00',1,NULL,NULL),(311,'3457',NULL,'Hana','Haddar','hana.haddar@laceco.me','1982-01-01','Lebanon','Lebanese','Married','Bachelor, Architecture, Lebanese University',18.9,1,NULL,80,52,NULL,1,1,NULL,'2005-07-19 00:00:00',1,NULL,NULL),(312,'3468',NULL,'Dania','Ourabi','dania.ourabi@laceco.me','1978-11-03','Lebanon','Lebanese','Married','Master, Architecture, Lebanese University',22,1,NULL,9,21,NULL,1,1,NULL,'2005-09-05 00:00:00',1,NULL,NULL),(313,'3474',NULL,'Salwa','Koleilat','salwa.koleilat@laceco.me','1957-03-17','Lebanon','Lebanese','Single','Certificate, Computer Programming, BATC\nCertificate, MCSE, Formatec ',43,1,NULL,74,125,NULL,1,1,NULL,'2005-10-01 00:00:00',1,NULL,NULL),(314,'3483',NULL,'Kamal','Mawla','unavailable@laceco.me','1979-06-20','Lebanon','Lebanese','Married','Unavailable',18.6,1,NULL,74,129,NULL,1,1,NULL,'2005-11-01 00:00:00',1,NULL,NULL),(315,'3487',NULL,'Georges','Abou Ghannam','georges.aboughannam@laceco.me','1982-06-15','Lebanon','Lebanese','Married','Bachelor, Urban Planning and Environmental Science, USJ',19,1,NULL,7,15,NULL,1,1,NULL,'2005-12-14 00:00:00',1,NULL,NULL),(316,'3507',NULL,'Abbas','Toska','unavailable@laceco.me','1969-04-30','Lebanon','Lebanese','Single','Unavailable',18,1,NULL,74,129,NULL,1,1,NULL,'2006-04-01 00:00:00',1,NULL,NULL),(317,'3517',NULL,'Rana','Kuwatly','rana.kouatly@laceco.me','1980-10-27','Lebanon','Lebanese','Single','Bachelor, Public relations, Lebanese University',20,1,NULL,74,127,NULL,1,1,NULL,'2006-05-15 00:00:00',1,NULL,NULL),(318,'3533',NULL,'Ali','Najdi','ali.najdi@laceco.me','1983-11-02','Lebanon','Lebanese','Married','Bachelor, Civil Engineering, Lebanese University',18,1,NULL,67,103,NULL,1,1,NULL,'2006-08-29 00:00:00',1,NULL,NULL),(319,'3540',NULL,'Manal','Yassine','manal.yassine@laceco.me','1983-05-29','Lebanon','Lebanese','Single','Bachelor, Accounting, AUST',17.7,1,NULL,71,119,NULL,1,1,NULL,'2006-09-21 00:00:00',1,NULL,NULL),(320,'3553',NULL,'Eva','Dbouny','eva.dbouny@laceco.me','1981-01-01','Lebanon','Lebanese','Married','Bachelor, Sociology, Lebanese University',18,1,NULL,65,95,NULL,1,1,NULL,'2006-09-23 00:00:00',1,NULL,NULL),(321,'3561',NULL,'Bilal','Mousally','bilal.moussalli@laceco.me','1969-09-30','Lebanon','Lebanese','Married','B.T, Electronic & Electricity, High Technical Center',29,1,NULL,75,135,NULL,1,1,NULL,'2006-10-16 00:00:00',1,NULL,NULL),(322,'3563',NULL,'Hisham','Hajj Shehade','hisham.hajjshehade@laceco.me','1981-03-10','Lebanon','Lebanese','Married','Diploma, Mechanical Engineering, Lebanese University',19,1,NULL,66,27,NULL,1,2,NULL,'2006-10-19 00:00:00',1,NULL,NULL),(323,'3628',NULL,'Mahmoud','Shehabeddine','mahmoud.shehabeddine@laceco.me','1979-11-06','Lebanon','Lebanese','Married','Bachelor, Mechanical Engineering, Lebanese University',19,1,NULL,64,89,NULL,1,1,NULL,'2006-12-01 00:00:00',1,NULL,NULL),(324,'3669',NULL,'Ghida','Shehab','ghida.shehab@laceco.me','1985-05-30','Lebanon','Lebanese','Single','Bachelor, Accounting, BAU',16.9,1,NULL,71,119,NULL,1,1,NULL,'2007-08-01 00:00:00',1,NULL,NULL),(325,'3707',NULL,'Ahmad','Yassine','ahmad.yassine@laceco.me','1983-07-30','Lebanon','Lebanese','Married','Bachelor, MIS, Center University Of Technolog\nBachelor, MCSE, Institute Official Of Tripoli',16,1,NULL,75,135,NULL,1,1,NULL,'2008-02-19 00:00:00',1,NULL,NULL),(326,'3719',NULL,'Samer','Noureldine','samer.noureldine@laceco.me','1981-08-09','Lebanon','Lebanese','Married','Technical Baccalaureate Degree, Architecture, Ecole Superieur Technique Amliye',17,1,NULL,80,64,NULL,1,1,NULL,'2008-04-01 00:00:00',1,NULL,NULL),(327,'3773',NULL,'Mazen','Naamani','mazen.namani@laceco.me','1973-04-25','United Arab Emirates','Syrian','Married','Bachelor, Mechanical Engineering, AUB\nMaster, Engineering Management, AUB',28,1,NULL,6,17,NULL,1,1,NULL,'2008-10-01 00:00:00',1,NULL,NULL),(328,'3775',NULL,'Salim','Diab','unavailable@laceco.me','1970-04-03','Lebanon','Lebanese','Married','Unavailable',21.7,1,NULL,79,3,NULL,1,1,NULL,'2002-10-01 00:00:00',1,NULL,NULL),(329,'3796',NULL,'Ahmad','Hakim','ahmad.hakim@laceco.me','1980-07-19','Lebanon','Lebanese','Married','DES, Architecture, Lebanese University',22,1,NULL,9,28,NULL,1,1,NULL,'2009-02-16 00:00:00',1,NULL,NULL),(330,'3871',NULL,'Abdel Hadi','El Harfouche','abdelhadi.harfouche@laceco.me','1983-11-15','Lebanon','Lebanese','Single','Bachelor, Mechanical Engineering, AUB',18,1,NULL,64,151,NULL,1,1,NULL,'2010-05-20 00:00:00',1,NULL,NULL),(331,'3909',NULL,'Nadine','Abdallah','nadine.abdallah@laceco.me','1982-07-16','Lebanon','Lebanese','Single','Bachelor, Business Management & Marketing, Lebanese University',18,1,NULL,9,127,NULL,1,1,NULL,'2010-09-01 00:00:00',1,NULL,NULL),(332,'3917',NULL,'Hiba','Yassine','hiba.yassine@laceco.me','1981-07-25','Lebanon','Lebanese','Single','Diploma, Electrical and Electronics Engineering, Lebanese University',19,1,NULL,61,75,NULL,1,1,NULL,'2023-02-10 00:00:00',1,NULL,NULL),(333,'3975',NULL,'Toufic','Akl','toufic.akl@laceco.me','1989-01-01','Lebanon','Lebanese','Married','Bachelor, Electrical Engineering, Balamand\nMaster, Electrical Engineering, Balamand',12,1,NULL,9,30,NULL,1,1,NULL,'2012-08-01 00:00:00',1,NULL,NULL),(334,'3977',NULL,'Nour','Halwani','nour.halwani@laceco.me','1989-11-18','Lebanon','Lebanese','Single','Bachelor, Electrical and Computer Engineering, AUB\nMaster, Engineering Management , AUB',14,1,NULL,72,122,NULL,1,1,NULL,'2012-08-27 00:00:00',1,NULL,NULL),(335,'4040',NULL,'Sara','Saad','sara.saad@laceco.me','1986-10-10','United Arab Emirates','Lebanese','Married','Bachelor, Business Administration, La Sagesse University',11,1,NULL,74,126,NULL,1,1,NULL,'2013-06-01 00:00:00',1,NULL,NULL),(336,'4044',NULL,'Jayson','Ramos','jayson.ramos@laceco.me','1985-12-01','United Arab Emirates','Philipino','Single','Bachelor, Mechanical Engineering, University of the East, Phillipines',15,1,NULL,4,37,NULL,1,1,NULL,'2023-02-17 00:00:00',1,NULL,NULL),(337,'4078',NULL,'Baheej','Saad','baheej.saad@laceco.me','1991-12-14','Lebanon','Lebanese','Single','Bachelor, Graphic Design, AUST',10,1,NULL,2,12,NULL,1,1,NULL,'2014-03-17 00:00:00',1,NULL,NULL),(338,'4082',NULL,'Yazane','Alayli','yazane.alaily@laceco.me','1983-05-12','Lebanon','Lebanese','Married','Bachelor, Electrical Engineering, AUB Master, Urban Planning, Harvard UniversityMaster, Public Administration, Harvard University Master, Management, Université de Lyon',11,1,NULL,70,117,NULL,1,1,NULL,'2014-08-06 00:00:00',1,NULL,NULL),(339,'4087',NULL,'Mohamad','Makkouk','mohamad.makkouk@laceco.me','1985-03-28','Lebanon','Lebanese','Single','Diploma, Architecture, Ecole D\'architecture de Paris La Villette ENSBA Master, Urban Planning, Institut D\'Urbanisme ParisCES, Regional and Urban Planning, Ecole Nationale des Ponts et Chaussées',17,1,NULL,2,8,NULL,1,1,NULL,'2013-08-01 00:00:00',1,NULL,NULL),(340,'4098',NULL,'Raed','Jawhar','raed.jawhar@laceco.me','1976-02-01','Saudi Arabia','Lebanese','Married','Advanced Certificate, Quantity Surveying, Reading University, England',26,1,NULL,65,92,NULL,1,1,NULL,'2015-01-22 00:00:00',1,NULL,NULL),(341,'6069',NULL,'Elie','El Asmar','elie.elasmar@laceco.me','1992-06-10','Lebanon','Lebanese','Single','Bachelor, Architecture, Balamand',8,1,NULL,80,57,NULL,1,1,NULL,'2016-10-21 00:00:00',1,NULL,NULL),(342,'6071',NULL,'Andira','Younes','andira.younes@laceco.me','1970-12-10','Lebanon','Lebanese','Married','Diploma, Electrical Engineering, Lebanese University',30,1,NULL,61,74,NULL,1,1,NULL,'2016-11-01 00:00:00',1,NULL,NULL),(343,'6073',NULL,'Sami','Kordab','sami.kordab@laceco.me','1989-01-04','Lebanon','Lebanese','Single','Bachelor, Architectural Engineering, BAU',7.3,1,NULL,80,61,NULL,1,1,NULL,'2017-02-20 00:00:00',1,NULL,NULL),(344,'6084',NULL,'Mansour','El Zarif','mansour.elzarif@laceco.me','1988-06-01','United Arab Emirates','Lebanese','Single','Bachelor, Civil Engineering, BAU',12,1,NULL,12,35,NULL,1,1,NULL,'2017-03-21 00:00:00',1,NULL,NULL),(345,'6116',NULL,'Abedelqader','Sobh','abedelqader.sobh@laceco.me','1978-08-24','United Arab Emirates','Jordanian','Married','Diploma, Mechanics, Hassan Khaled School',28,1,NULL,12,49,NULL,1,1,NULL,'2017-07-05 00:00:00',1,NULL,NULL),(346,'6118',NULL,'Joud','Arabi','joud.arabi@laceco.me','1986-11-29','United Arab Emirates','Lebanese','Single','Bachelor, Civil Engineering, BAU',14,1,NULL,4,21,NULL,1,1,NULL,'2017-07-07 00:00:00',1,NULL,NULL),(347,'6130',NULL,'Amer','Itani','amer.itani@laceco.me','1981-03-31','United Arab Emirates','Lebanese','Single','Bachelor, Architecture Engineering, BAU',15,1,NULL,12,28,NULL,1,1,NULL,'2017-08-01 00:00:00',1,NULL,NULL),(348,'6136',NULL,'Mangesh','Kumar','mangesh.kumar@laceco.me','1977-05-15','United Arab Emirates','Indian','Single','Bachelor, English, HNB Garhwal University, India',27,1,NULL,12,40,NULL,1,1,NULL,'2017-09-06 00:00:00',1,NULL,NULL),(349,'6144',NULL,'Sajid','Iqbal','sajid.iqbal@laceco.me','1990-01-01','United Arab Emirates','Pakistani','Single','Bachelor, Electrical Engineering, Taxila University',10,1,NULL,12,36,NULL,1,1,NULL,'2017-12-10 00:00:00',1,NULL,NULL),(350,'6146',NULL,'Ahamed Nabeel','Mohamed','ahmed.nabeel@laceco.me','1986-03-06','United Arab Emirates','Indian','Single','Bachelor, Electrical and Electronics, Anna University\nMaster, Business Administration, Alagappa University',15,1,NULL,12,1586,NULL,1,1,NULL,'2017-12-05 00:00:00',1,NULL,NULL),(351,'6159',NULL,'Dilshad','Ali','dilshad.ali@laceco.me','1988-05-13','United Arab Emirates','Indian','Single','Bachelor, Communication, IGNO',13,1,NULL,11,40,NULL,1,1,NULL,'2018-04-09 00:00:00',1,NULL,NULL),(352,'6174',NULL,'Moataz','Abdel Raouf','moataz.abdelraouf@laceco.me','1975-10-23','Saudi Arabia','Egyptian','Married','Bachelor, Architectural Engineering, Alexandria University',22,1,NULL,8,150,NULL,1,1,NULL,'2023-12-06 00:00:00',1,NULL,NULL),(353,'6190',NULL,'Haidee','Blanche','haidee.blanche@laceco.me','1981-06-20','United Arab Emirates','Philipino','Single','Bachelor, Architecture, Polytechnic University of the Philippines',20.3,1,NULL,12,28,NULL,1,1,NULL,'2018-10-21 00:00:00',1,NULL,NULL),(354,'6196',NULL,'Dina','Al Dahleh','unavailable@laceco.me','1986-09-27','United Arab Emirates','Jordanian','Married','Bachelor, Civil Engineering - Structure, Jordan University of Science and Technology',13,1,NULL,12,29,NULL,1,1,NULL,'2019-02-01 00:00:00',1,NULL,NULL),(355,'6161',NULL,'Mohammed','Jaweed','mohammed.jaweed@laceco.me','1985-11-15','United Arab Emirates','Indian','Single','Bachelor, Structural Engineering, India',6,1,NULL,12,35,NULL,1,1,NULL,'2018-04-16 00:00:00',1,NULL,NULL),(356,'6202',NULL,'Fadel','Makki','fadel.makki@laceco.me','1981-02-26','Lebanon','Lebanese','Married','Bachelor, Business Administration, AUCE\nMasters, Business Administration, AUCE\nMasters, Business Administration, NDU',16,1,NULL,76,140,NULL,1,1,NULL,'2019-06-06 00:00:00',1,NULL,NULL),(357,'6204',NULL,'Rasha','Seblany','rasha.seblany@laceco.me','1993-10-04','Lebanon','Lebanese','Single','Bachelor, Mechanical Engineering, Lebanese University\nMaster, Applied Energy, AUB',5,1,NULL,64,90,NULL,1,1,NULL,'2019-06-24 00:00:00',1,NULL,NULL),(358,'6209',NULL,'Mohammad Yasser','Sultan','unavailable@laceco.me','1952-05-09','United Arab Emirates','Syrian','Married','Bachelor, Civil Engineering, Damascus University',5,1,NULL,12,29,NULL,1,1,NULL,'2019-07-01 00:00:00',1,NULL,NULL),(359,'6214',NULL,'Karthikerwaran','Karthikerwaran','unavailable@laceco.me','1989-12-06','United Arab Emirates','Sri Lanka','Single','Unavailable',5.9,1,NULL,74,130,NULL,1,1,NULL,'2018-07-26 00:00:00',1,NULL,NULL),(360,'6215',NULL,'Abdel Kader','Ahmad','unavailable@laceco.me','1991-05-22','United Arab Emirates','Omanian','Single','Unavailable',26,1,NULL,74,131,NULL,1,1,NULL,'2018-03-25 00:00:00',1,NULL,NULL),(361,'6219',NULL,'Skandar Azam','Rodda','sikandar.azam@laceco.me','1978-05-25','United Arab Emirates','Indian','Married','Bachelor, Mechanical Engineering, Visvesvaraya Technological University',21,1,NULL,3,31,NULL,1,1,NULL,'2019-10-15 00:00:00',1,NULL,NULL),(362,'6221',NULL,'Shakeeb','Ahmed','shakeeb.ahmed@laceco.me','1986-03-08','United Arab Emirates','Indian','Single','Bachelor, Civil Engineering, Osmania University\nMaster, Structural Engineering, Osmania University',16,1,NULL,3,29,NULL,1,1,NULL,'2019-10-15 00:00:00',1,NULL,NULL),(363,'6223',NULL,'Sanjay','Maurya','sanjay.maurya@laceco.me','1984-12-15','United Arab Emirates','Indian','Married','Bachelor, Electrical Engineering, Skyline Institute of Engineering & Technology',16,1,NULL,3,30,NULL,1,1,NULL,'2020-01-02 00:00:00',1,NULL,NULL),(364,'6230',NULL,'Elie','El Sammour','elie.sammour@laceco.me','1992-07-21','Saudi Arabia','Lebanese','Single','Bachelor, Architecture, ALBA',9,1,NULL,78,151,NULL,1,1,NULL,'2022-01-17 00:00:00',1,NULL,NULL),(365,'6232',NULL,'Mohammad','Al-Achi Al-Chami Shbeeb','mohammad.shbeeb@laceco.me','1979-05-29','Lebanon','Lebanese','Married','Bachelor, Civil Engineering, BAU\nMaster, Civil Engineering, BAU',19,1,NULL,66,97,NULL,1,1,NULL,'2021-01-01 00:00:00',1,NULL,NULL),(366,'6237',NULL,'Samar','Mehanna','samar.mehanna@laceco.me','1983-05-18','Lebanon','Lebanese','Married','Masters, Civil Engineering, Lebanese University',19,1,NULL,68,109,NULL,1,1,NULL,'2021-04-12 00:00:00',1,NULL,NULL),(367,'6238',NULL,'Wassim','Chahine','wassim.chahine@laceco.me','1980-12-08','Lebanon','Lebanese','Single','Bachelor, Civil and Environmental Engineering, AUB\nMaster, Structural and Geotechnical Engineering, USJ',20,1,NULL,68,108,NULL,1,1,NULL,'2021-05-04 00:00:00',1,NULL,NULL),(368,'6240',NULL,'Meshari','AlSubhi','meshari.alsubbhi@laceco.me','1988-12-11','Saudi Arabia','Saudi','Single','Bachelor, Architecture and Environmental Design, Morgan State University, Baltimore, MD USA',6,1,NULL,1,6,NULL,1,1,NULL,'2021-03-17 00:00:00',1,NULL,NULL),(369,'6244',NULL,'Remi','El Ghazal','remi.elghazal@laceco.me','1998-11-21','Lebanon','Lebanese','Single','Bachelor, Human Resources Management, La Sagesse University\nMBA, Human Resources Management, La Sagesse University',2.9,1,NULL,77,147,NULL,1,1,NULL,'2021-07-22 00:00:00',1,NULL,NULL),(370,'6247',NULL,'Khalid','Yehya','khalid.yahia@laceco.me','1985-02-26','Saudi Arabia','Jordanian','Married','Master, Civil Engineering, An-Najah National University\nMaster, Business Administration, Edinburgh Business School – Heriot Watt University, Edinburgh – UK',15,1,NULL,1,5,NULL,1,1,NULL,'2021-08-24 00:00:00',1,NULL,NULL),(371,'6248',NULL,'Louay','Ghezzawi','louay.ghezzawi@laceco.me','1999-01-03','Lebanon','Lebanese','Single','Bachelor, Architectural Engineering, BAU',2.7,1,NULL,80,61,NULL,1,1,NULL,'2021-09-14 00:00:00',1,NULL,NULL),(372,'6251',NULL,'Rima','Lahoud','rima.lahoud@laceco.me','1975-04-08','Lebanon','Lebanese','Single','Lebanese Baccalaureate, Philosophy, College des Saints Antonine\nTS3, International Hospitality and Tourism,Tourism Institute Dekwaneh',23,1,NULL,74,128,NULL,1,1,NULL,'2021-10-13 00:00:00',1,NULL,NULL),(373,'6252',NULL,'Rony','Al Ghadban','rony.ghadban@laceco.me','1978-06-22','Jordan','Jordanian','Married','Bachelor, Architecture, Applied Science University-Amman\nMaster, Emergent Technologies and Design, Architectural Association School or Architecture\nBIM Project Information Practitioner, BSI (British Standards Institute)',22,1,NULL,60,71,NULL,1,1,NULL,'2020-05-27 00:00:00',1,NULL,NULL),(374,'6254',NULL,'AbdelRahman','Itani','abdelrahman.itani@laceco.me','1999-06-23','Lebanon','Lebanese','Single','Bachelor, Civil Engineering, LAU',2.5,1,NULL,69,115,NULL,1,1,NULL,'2021-11-25 00:00:00',1,NULL,NULL),(375,'6256',NULL,'Maroun ','Abou Saab','maroun.abousaab@laceco.me','1981-08-15','Lebanon','Lebanese','Married','Bachelor, Information Technology, USEK',18,1,NULL,75,132,NULL,1,1,NULL,'2022-05-09 00:00:00',1,NULL,NULL),(376,'6258',NULL,'Tala','Basbous','tala.basbous@laceco.me','1998-09-05','Lebanon','Lebanese','Single','Bachelor, Architectural Engineering, BAU',4,1,NULL,80,61,NULL,1,1,NULL,'2022-05-16 00:00:00',1,NULL,NULL),(377,'6262',NULL,'Ghida','Takieddine','ghida.takieddine@laceco.me','1997-06-23','Lebanon','Lebanese','Single','Bachelor, Interior Architecture, LAU',4,1,NULL,84,62,NULL,1,1,NULL,'2022-05-31 00:00:00',1,NULL,NULL),(378,'6263',NULL,'Georges','Abi Saad','georges.abisaad@laceco.me','1977-08-05','Lebanon','Lebanese','Married','Master, Civil Engineering, Lebanese University',23,1,NULL,68,107,NULL,1,1,NULL,'2022-06-01 00:00:00',1,NULL,NULL),(379,'6265',NULL,'Malik','Al Ghazzawi','malik.alghazzawi@laceco.me','1990-02-12','United Arab Emirates','Jordanian','Single','Bachelor, Architectural Engineering, Al Bait University, Jordan',12,1,NULL,12,34,NULL,1,1,NULL,'2022-06-16 00:00:00',1,NULL,NULL),(380,'6266',NULL,'Sarah','Mokbel','sarah.mokbel@laceco.me','1996-09-29','Lebanon','Lebanese','Single','Bachelor, Architectural Engineering, BAU',4,1,NULL,80,61,NULL,1,1,NULL,'2022-06-13 00:00:00',1,NULL,NULL),(381,'6268',NULL,'Lama','Al Chaar','lama.alchaar@laceco.me','1985-08-28','Lebanon','Lebanese','Married','Bachelor, Architectural Engineering, BAU',14,2,'2024-07-31',84,58,NULL,1,1,NULL,'2022-06-01 00:00:00',1,NULL,NULL),(382,'6269',NULL,'Samy','Abou Assaly','samy.abouassaly@laceco.me','1989-09-25','Lebanon','Lebanese','Married','Bachelor, Civil Engineering, NDU',13,1,NULL,65,95,NULL,1,1,NULL,'2022-07-21 00:00:00',1,NULL,NULL),(383,'6270',NULL,'Muhammad Asif','Abdul Rasheed','muhammad.asif@laceco.me','1990-06-04','United Arab Emirates','Pakistani','Single','Bachelor, Mechanical Engineering, University of Technology, Taxila Pakistan',10,1,NULL,12,37,NULL,1,1,NULL,'2022-06-30 00:00:00',1,NULL,NULL),(384,'6271',NULL,'Julie','Lahoud','julie.lahoud@laceco.me','1998-09-07','Lebanon','Lebanese','Single','Bachelor, Architecture, LAU',1.9,1,NULL,80,61,NULL,1,1,NULL,'2022-07-07 00:00:00',1,NULL,NULL),(385,'6273',NULL,'Sarah','Kassouf','sarah.kassouf@laceco.me','1987-07-16','Lebanon','Lebanese','Single','Master, Architecture, ALBA\nMBA, ESA',12,1,NULL,78,151,NULL,1,1,NULL,'2022-08-01 00:00:00',1,NULL,NULL),(386,'6275',NULL,'Amany','Khalil','amany.khalil@laceco.me','1992-05-25','Lebanon','Palestinian','Single','Master, Electrical Engineering, LIU',7,1,NULL,61,73,NULL,1,1,NULL,'2022-08-04 00:00:00',1,NULL,NULL),(387,'6283',NULL,'Mohamad','Haidar','mohamad.haidar@laceco.me','1996-07-24','Lebanon','Lebanese','Single','M1, Civil Engineering Buildings specialization, Lebanese University\nM2, Highway Transportation and Traffic Engineering, Lebanese University',5,1,NULL,68,110,NULL,1,1,NULL,'2022-09-12 00:00:00',1,NULL,NULL),(388,'6284',NULL,'Hala','El Balaa','hala.elbalaa@laceco.me','1997-04-06','Lebanon','Lebanese','Single','Master, Islamic Art and Architecture, LAU',4,1,NULL,80,61,NULL,1,1,NULL,'2022-09-12 00:00:00',1,NULL,NULL),(389,'6285',NULL,'Huda','Bhar','huda.bhar@laceco.me','1998-01-01','Lebanon','Palestinian','Single','Bachelor, Mechanical Engineering, LAU',4,2,'2024-06-30',64,90,NULL,1,1,NULL,'2022-09-09 00:00:00',1,NULL,NULL),(390,'6288',NULL,'Pamela','Salame','pamela.salame@laceco.me','1993-10-14','Lebanon','Lebanese','Single','Master, Civil Engineering, USJ',7,1,NULL,66,99,NULL,1,1,NULL,'2022-11-01 00:00:00',1,NULL,NULL),(391,'6290',NULL,'Sultan','Hijazi','sultan.hijazi@laceco.me','1994-09-05','Saudi Arabia','Saudi','Married','Bachelor, Architecture & Environmental Design, Morgan State University',4,1,NULL,80,61,NULL,1,1,NULL,'2022-10-11 00:00:00',1,NULL,NULL),(392,'6292',NULL,'Sami','Matar','sami.matar@laceco.me','1964-12-01','Lebanon','Lebanese','Married','Master, Architecture, Lebanese University',34,2,'2024-06-30',80,53,NULL,1,1,NULL,'2022-11-01 00:00:00',1,NULL,NULL),(393,'6295',NULL,'Mohammad','Awwad','mohammad.awwad@laceco.me','2000-11-25','Lebanon','Palestinian','Single','Bachelor, Civil Engineering, LAU',1.6,2,'2024-06-30',69,115,NULL,1,1,NULL,'2022-11-01 00:00:00',1,NULL,NULL),(394,'6299',NULL,'Jihad','Dib','jihad.dib@laceco.me','1958-01-01','Saudi Arabia','Canadian','Married','Bachelor, Civil Engineering, University of Toronto',42,1,NULL,81,29,NULL,1,1,NULL,'2022-09-20 00:00:00',1,NULL,NULL),(395,'6300',NULL,'Yasser','Saad','yasser.saad@laceco.me','1968-09-18','United Arab Emirates','Egyptian','Married','Bachelor, Electrical Power and Mechanics, Mansoura University',15,1,NULL,4,30,NULL,1,1,NULL,'2022-11-21 00:00:00',1,NULL,NULL),(396,'6302',NULL,'Dana','Al Anzi','dana.alanzi@laceco.me','2003-06-19','Saudi Arabia','Saudi','Single','Unavailable',1.5,1,NULL,74,127,NULL,1,1,NULL,'2022-11-18 00:00:00',1,NULL,NULL),(397,'6303',NULL,'Ghada','Al Anzi','ghada.alanzi@laceco.me','2003-08-13','Saudi Arabia','Saudi','Single','Unavailable',1.5,1,NULL,74,128,NULL,1,1,NULL,'2022-11-18 00:00:00',1,NULL,NULL),(398,'6304',NULL,'Naseer','Shah','naseer.shah@laceco.me','1981-10-17','United Arab Emirates','Pakistani','Married','Bachelor, Civil Engineering',9,1,NULL,3,35,NULL,1,1,NULL,'2022-11-28 00:00:00',1,NULL,NULL),(399,'6305',NULL,'Elie','Nini','elie.nini@laceco.me','1968-09-01','Lebanon','Lebanese','Married','Diploma, Civil Engineering, Lebanese University',32,1,NULL,9,1585,NULL,1,1,NULL,'2022-12-01 00:00:00',1,NULL,NULL),(400,'6309',NULL,'Elmer','Recongco','elmer.recongco@laceco.me','1982-02-04','United Arab Emirates','Philipino','Married','Bachelor, Marine Engineering, Mariners Polytechnic College Foundation, Philippines',17,1,NULL,4,40,NULL,1,1,NULL,'2022-12-13 00:00:00',1,NULL,NULL),(401,'6310',NULL,'Maroun','Semaan','maroun.semaan@laceco.me','1996-06-26','Lebanon','Lebanese','Single','Bachelor, Architecture, NDU MBA, Project Management, NDU',4,1,NULL,78,152,NULL,1,1,NULL,'2022-11-22 00:00:00',1,NULL,NULL),(402,'6311',NULL,'Amal','Humayri','amal.alhumayri@laceco.me','1993-11-21','Saudi Arabia','Saudi','Married','Unavailable',1.5,1,NULL,2,11,NULL,1,1,NULL,'2022-12-13 00:00:00',1,NULL,NULL),(403,'6312',NULL,'Afaf','Al Ghamdi','afaf.alghamdi@laceco.me','1992-04-19','Saudi Arabia','Saudi','Married','Unavailable',1.5,1,NULL,71,120,NULL,1,1,NULL,'2022-12-13 00:00:00',1,NULL,NULL),(404,'6313',NULL,'Mohamad','Abu Khalaf','mohammad.abukhalaf@laceco.me','1978-08-29','Saudi Arabia','Jordanian','Married','Bachelor, Civil Engineering, Jordan University',21,1,NULL,10,21,NULL,1,1,NULL,'2023-01-01 00:00:00',1,NULL,NULL),(405,'6314',NULL,'Moataz','Younes','moataz.younes@laceco.me','1999-11-08','Lebanon','Lebanese','Single','Bachelor, Electrical Power and Mechanics Engineering, BAU',1.4,2,'2024-06-30',61,73,NULL,1,1,NULL,'2023-01-07 00:00:00',1,NULL,NULL),(406,'6316',NULL,'Faizan','Rasool','faizan.rasool@laceco.me','1987-04-04','Saudi Arabia','Pakistani','Single','Master, Business Administration, University of South Asia Lahore Pakistan',12,1,NULL,10,40,NULL,1,1,NULL,'2023-01-17 00:00:00',1,NULL,NULL),(407,'6318',NULL,'Nahil','Zeineddine','nahil.zeineddine@laceco.me','1997-09-22','Lebanon','Lebanese','Single','Master, Civil and Environmental Engineering, USJ',5,1,NULL,68,110,NULL,1,1,NULL,'2023-02-06 00:00:00',1,NULL,NULL),(408,'6320',NULL,'Maram','Al Anzi','maram.alanazi@laceco.me','1996-02-21','Saudi Arabia','Saudi','Single','Unavailable',1.4,1,NULL,74,127,NULL,1,1,NULL,'2023-01-16 00:00:00',1,NULL,NULL),(409,'6322',NULL,'Sarah','Al Subhi','sarah.alsubhi@laceco.me','1986-07-23','Saudi Arabia','Saudi','Single','Bachelor, English Literature, King Abdulaziz University\nMaster, Teaching English to Speakers of Other Language, Notre Dame of Maryland University – Baltimore',1.3,1,NULL,74,127,NULL,1,1,NULL,'2023-02-14 00:00:00',1,NULL,NULL),(410,'6328',NULL,'Tariq','Al Siddiq','tariq.alsiddiq@laceco.me','1986-12-08','Saudi Arabia','Lebanese','Married','Bachelor, Architecture, Beirut Arab University',13,1,NULL,81,20,NULL,1,1,NULL,'2023-03-06 00:00:00',1,NULL,NULL),(411,'6329',NULL,'Faisal Q','Memon','faisal.qmemon@laceco.me','1984-01-04','Saudi Arabia','Pakistani','Married','Bachelor, Electrical Engineering, Quaid-E-Awam University of Engineering',17,1,NULL,81,30,NULL,1,1,NULL,'2023-03-06 00:00:00',1,NULL,NULL),(412,'6336',NULL,'Mohammed','Ayub','mohammed.ayub@laceco.me','1985-02-02','Saudi Arabia','Indian','Single','Bachelor of Technology, Mechanical engineering\nMSc, Quantity Surveying, BCU.UK',16,1,NULL,10,27,NULL,1,1,NULL,'2023-03-14 00:00:00',1,NULL,NULL),(413,'6338',NULL,'Jane Faith','Manubag','jane.manubag@laceco.me','1983-08-30','United Arab Emirates','Philipino','Single','Bachelor, Civil Engineering, La Salle University',15,1,NULL,3,40,NULL,1,1,NULL,'2023-04-17 00:00:00',1,NULL,NULL),(414,'6340',NULL,'Usama','Maqbool','usama.maqbool@laceco.me','1998-09-20','Saudi Arabia','Pakistani','Single','Diploma in Associates Engineering (DAE), CA Intermediate (Institute of Charted Accountants of Pakistan (ICAP)',7,1,NULL,81,40,NULL,1,1,NULL,'2023-04-13 00:00:00',1,NULL,NULL),(415,'6341',NULL,'Florendo','Agosto','florendo.agosto@laceco.me','1954-04-11','United Arab Emirates','Philipino','Married','Bachelor, Mechanical Engineering Saint Louis University, Baguio City, Philippines',47,1,NULL,5,21,NULL,1,1,NULL,'2021-09-30 00:00:00',1,NULL,NULL),(416,'6342',NULL,'Asma','Alenazi','asma.alanazi@laceco.me','1995-11-18','Saudi Arabia','Saudi','Married','Unavailable',1.3,1,NULL,74,127,NULL,1,1,NULL,'2023-03-01 00:00:00',1,NULL,NULL),(417,'6343',NULL,'Nawal','Al mufayrij','nawal.almufayrij@laceco.me','1968-09-23','Saudi Arabia','Saudi','Married','Unavailable',1.3,1,NULL,74,127,NULL,1,1,NULL,'2023-03-01 00:00:00',1,NULL,NULL),(418,'6344',NULL,'Aryam','Alotaibi','aryam.alotaibi@laceco.me','2000-12-09','Saudi Arabia','Saudi','Single','Unavailable',1.2,1,NULL,2,11,NULL,1,1,NULL,'2023-04-12 00:00:00',1,NULL,NULL),(419,'6345',NULL,'Amal','Zamzami','amal.zamzami@laceco.me','1999-04-07','Saudi Arabia','Saudi','Single','Unavailable',1.1,1,NULL,74,127,NULL,1,1,NULL,'2023-05-03 00:00:00',1,NULL,NULL),(420,'6346',NULL,'Munirah','Alshammari','munirah.alshammari@laceco.me','1999-09-11','Saudi Arabia','Saudi','Single','Unavailable',1.2,1,NULL,74,127,NULL,1,1,NULL,'2023-04-05 00:00:00',1,NULL,NULL),(421,'6348',NULL,'Ahmad','Hejazi','ahmad.hejazi@laceco.me','1994-05-09','Saudi Arabia','Saudi','Married','Unavailable',1.3,1,NULL,74,127,NULL,1,1,NULL,'2023-03-05 00:00:00',1,NULL,NULL),(422,'6351',NULL,'Widad','El Zein','widad.elzein@laceco.me','1992-11-27','Lebanon','Lebanese','Single','Bachelor, Architecture, Kuwait University\nMaster, Urban Design, AUB',7,1,NULL,80,65,NULL,1,1,NULL,'2023-07-03 00:00:00',1,NULL,NULL),(423,'6352',NULL,'Ahmed','Shareef','ahmed.shareef@laceco.me','1987-05-02','United Arab Emirates','Indian','Single','Bachelor, Electrical and Electronics Engineering, Jawaharlal Nihru Technological University',13,1,NULL,5,30,NULL,1,1,NULL,'2023-07-03 00:00:00',1,NULL,NULL),(424,'6354',NULL,'Wally','Plarisan','wally.plarisan@laceco.me','1983-06-21','United Arab Emirates','Philipino','Single','Bachelor, Elementary Education, Cebu Technological University',20,1,NULL,5,40,NULL,1,1,NULL,'2023-07-10 00:00:00',1,NULL,NULL),(425,'6357',NULL,'Mohammed','El Fakharani','mohammed.elfakharani@laceco.me','1982-02-27','United Arab Emirates','Egyptian','Married','Bachelor, Architectural Engineering, Zagazig University',20,1,NULL,11,21,NULL,1,1,NULL,'2023-08-07 00:00:00',1,NULL,NULL),(426,'6358',NULL,'Khalid','Yaghi','khalid.yaghi@laceco.me','1987-09-07','United Arab Emirates','Palestinian','Married','Bachelor, Civil Engineering, Islamic University; Palestine\nMaster, Construction Management, Islamic University; Palestine',14,1,NULL,11,29,NULL,1,1,NULL,'2023-07-24 00:00:00',1,NULL,NULL),(427,'6359',NULL,'Najah','Al Anzi','najah.alanazi@laceco.me','1979-12-30','Saudi Arabia','Saudi','Married','Unavailable',1.2,1,NULL,74,127,NULL,1,1,NULL,'2023-04-05 00:00:00',1,NULL,NULL),(428,'6360',NULL,'Eliano','Fenianos','eliano.fenianos@laceco.me','1991-08-02','Lebanon','Lebanese','Single','Bachelor, Electrical Engineering, LIU Master, Power and Control Engineering, LIU ',10,1,NULL,61,73,NULL,1,1,NULL,'2023-08-21 00:00:00',1,NULL,NULL),(429,'6363',NULL,'Gina','Al Ghaoui','gina.alghaoui@laceco.me','1994-11-30','Lebanon','Lebanese','Single','Master, Architecture, USEK ',5,1,NULL,80,61,NULL,1,1,NULL,'2023-10-16 00:00:00',1,NULL,NULL),(430,'6364',NULL,'Malek','Dimachkieh','malek.dimachkieh@laceco.me','1996-09-30','Lebanon','Lebanese','Single','Bachelor, Architecture, BAU \nMaster, Architecture, BAU ',1,2,'2024-08-31',84,61,NULL,1,1,NULL,'2023-08-29 00:00:00',1,NULL,NULL),(431,'6367',NULL,'Sara','Abdulkhalek','sara.abdulkhalek@laceco.me','1996-03-02','Lebanon','Lebanese','Single','Bachelor, Human Resources Management, Antonine University\nPHR, Haigazian University',3,1,NULL,77,146,NULL,1,1,NULL,'2023-09-25 00:00:00',1,NULL,NULL),(432,'6368',NULL,'Ibrahim','Al Rawi','ibrahim.alrawi@laceco.me','1967-06-10','United Arab Emirates','British','Married','Bachelor, Civil Engineering, University of Technology\nMaster, Management in Construction, Kingston University, UK',23,1,NULL,3,21,NULL,1,1,NULL,'2023-09-20 00:00:00',1,NULL,NULL),(433,'6370',NULL,'Walid','Nassar','walid.nassar@laceco.me','2000-03-08','Lebanon','Lebanese','Single','Bachelor, Electric Power and Machine Engineering, BAU',0.7,2,'2024-06-30',61,73,NULL,1,1,NULL,'2023-10-02 00:00:00',1,NULL,NULL),(434,'6371',NULL,'Aya','Itani','aya.itani@laceco.me','1994-01-16','Lebanon','Lebanese','Single','Bachelor, Landscape Architecture, AUB\nMaster, Urban Studies, UNIVERSITÉ LIBRE DE BRUXELLES (BRUSSELS, BELGIUM)',5,1,NULL,83,63,NULL,1,1,NULL,'2023-10-09 00:00:00',1,NULL,NULL),(435,'6372',NULL,'Mohammad','Mansour','mohammad.mansour@laceco.me','1999-07-05','Lebanon','Lebanese','Single','Bachelor, Civil Engineering, BAU',0.7,2,'2024-06-30',68,110,NULL,1,1,NULL,'2023-10-03 00:00:00',1,NULL,NULL),(436,'6374',NULL,'Aicha','Zakaria','aicha.zakaria@laceco.me','1980-06-01','Lebanon','Lebanese','Married','Master, Agriculture Engineering, USEK',15,1,NULL,63,81,NULL,1,1,NULL,'2023-10-02 00:00:00',1,NULL,NULL),(437,'6375',NULL,'Munwar','Ali','munwar.ali@laceco.me','1993-08-22','Saudi Arabia','Pakistani','Single','Bachelor, Mechanical Engineering',8,1,NULL,81,37,NULL,1,1,NULL,'2023-10-01 00:00:00',1,NULL,NULL),(438,'6376',NULL,'Wassim','Hmadeh','wassim.hmadeh@laceco.me','2000-03-28','Lebanon','Lebanese','Single','Bachelor, Architecture, NDU',3,2,'2024-06-30',80,61,NULL,1,1,NULL,'2023-10-10 00:00:00',1,NULL,NULL),(439,'6377',NULL,'Farah','Ghalayini','farah.ghalayini@laceco.me','1996-04-01','Lebanon','Lebanese','Single','Bachelor, Architecture, AUB',4,2,'2024-11-01',2,13,NULL,1,1,NULL,'2023-11-01 00:00:00',1,NULL,NULL),(440,'6378',NULL,'Tony','Tahan','tony.tahan@laceco.me','1996-06-05','Lebanon','Lebanese','Single','Master, Civil Engineering, CNAM',10,1,NULL,65,95,NULL,1,1,NULL,'2023-10-16 00:00:00',1,NULL,NULL),(441,'6379',NULL,'Sami','Samaha','sami.samaha@laceco.me','1971-05-28','United Arab Emirates','Lebanese','Married','Bachelor, Civil Engineering, University of Dayton\nMaster, Civil Engineering, University of Dayton',26,1,NULL,5,21,NULL,1,1,NULL,'2023-10-16 00:00:00',1,NULL,NULL),(442,'6380',NULL,'Fawziah','Al Anzi','fawziah.alanazi@laceco.me','1986-07-30','Saudi Arabia','Saudi','Single','Unavailable',0.7,1,NULL,74,127,NULL,1,1,NULL,'2023-10-03 00:00:00',1,NULL,NULL),(443,'6381',NULL,'Sahar','Assaf','sahar.assaf@laceco.me','1990-10-08','Lebanon','Lebanese','Single','Bachelor, Civil Engineering, Lebanese University Master, Civil Engineering-Project Management, NDU Master, Engineering Management, Lebanese University',8,1,NULL,73,124,NULL,1,1,NULL,'2023-11-06 00:00:00',1,NULL,NULL),(444,'6382',NULL,'Naziha','Ali','naziha.ali@laceco.me','2001-05-07','Lebanon','Lebanese','Single','Bachelor, Civil and Environmental Engineering, BAU',0.6,2,'2024-06-14',68,110,NULL,1,1,NULL,'2023-11-13 00:00:00',1,NULL,NULL),(445,'6384',NULL,'Mohammad','Abboud','mohammad.abboud@laceco.me','1961-04-26','United Arab Emirates','Lebanese','Married','Bachelor, Architectural Engineering, BAU',33,1,NULL,11,28,NULL,1,1,NULL,'2023-12-15 00:00:00',1,NULL,NULL),(446,'6385',NULL,'Malak','Al Anzi','malak.alanazi@laceco.me','1995-04-21','Saudi Arabia','Saudi','Single','Unavailable',0.4,1,NULL,74,127,NULL,1,1,NULL,'2023-12-25 00:00:00',1,NULL,NULL),(447,'6386',NULL,'Momen','El Sous','momen.alsous@laceco.me','1994-01-31','United Arab Emirates','Palestinian','Single','Bachelor, Civil Engineering, Palestine University',7,1,NULL,11,39,NULL,1,1,NULL,'2024-01-08 00:00:00',1,NULL,NULL),(448,'6387',NULL,'Gheed','Khiami','gheed.khiami@laceco.me','2001-06-30','Lebanon','Lebanese','Single','Bachelor, Architecture, LAU',0.4,2,'2024-06-30',80,61,NULL,1,1,NULL,'2024-01-02 00:00:00',1,NULL,NULL),(449,'6388',NULL,'Mohammad','Manzoor','mohammad.manzoor@laceco.me','1981-12-07','Saudi Arabia','Indian','Single','Diploma in Civil Engineering',11,1,NULL,10,39,NULL,1,1,NULL,'2024-01-15 00:00:00',1,NULL,NULL),(450,'6389',NULL,'Hossam','Badawy','hossam.badawy@laceco.me','1980-07-27','Saudi Arabia','Egyptian','Married','Bachelor, Architecture, Cairo University ',22,1,NULL,10,63,NULL,1,1,NULL,'2024-02-01 00:00:00',1,NULL,NULL),(451,'6392',NULL,'Joseph','Bou Saleh','joseph.bousaleh@laceco.me','1992-05-03','Lebanon','Lebanese','Single','Master, Architecture, Lebanese University\nMaster, City and Technology, Institute for Advanced Architecture of Catalonia, Spain',9,1,NULL,80,60,NULL,1,1,NULL,'2024-03-04 00:00:00',1,NULL,NULL),(452,'6394',NULL,'Omar','Tag Eldeen','omar.tageldeen@laceco.me','1989-09-13','United Arab Emirates','Sudanese','Married','Bachelor, Electrical Engineering, Sudan University',12,1,NULL,11,41,NULL,1,1,NULL,'2024-03-04 00:00:00',1,NULL,NULL),(453,'6395',NULL,'Badiul','Alam','unavailable@laceco.me','1993-01-01','Saudi Arabia','Bengladchi','Married','Unavailable',0.3,1,NULL,74,130,NULL,1,1,NULL,'2024-02-12 00:00:00',1,NULL,NULL),(454,'6396',NULL,'Mohammed','Parwez','mohammed.parwez@laceco.me','1988-11-25','United Arab Emirates','Indian','Married','Bachelor, Mechanical Engineering, Jawaharlal Nehru Technological University',15,1,NULL,11,90,NULL,1,1,NULL,'2024-03-15 00:00:00',1,NULL,NULL),(455,'6397',NULL,'Syed','Mohsin','syed.mohsin@laceco.me','1991-04-22','United Arab Emirates','Indian','Married','Bachelor of Technology, Electrical and Electronics Engineering',12,1,NULL,11,73,NULL,1,1,NULL,'2024-03-15 00:00:00',1,NULL,NULL),(456,'6398',NULL,'Abdulkhalam','Kandy','abdulkhalam.kandy@laceco.me','1967-01-05','United Arab Emirates','Indian','Married','Pre-Degree, Calicut University',16,1,NULL,12,40,NULL,1,1,NULL,'2024-03-16 00:00:00',1,NULL,NULL),(457,'6399',NULL,'Ahmad','Hussein','ahmad.hussein@laceco.me','1992-02-19','United Arab Emirates','Jordanian','Married','Bachelor, Civil Engineering, Al Israa University, Jordan',8,1,NULL,11,39,NULL,1,1,NULL,'2024-03-25 00:00:00',1,NULL,NULL),(458,'6400',NULL,'Mahmoud','Azmy','mahmoud.azmy@laceco.me','1994-04-10','United Arab Emirates','Egyptian','Single','Bachelor, Mechanical Engineering, Tanta University',7,1,NULL,11,44,NULL,1,1,NULL,'2024-04-01 00:00:00',1,NULL,NULL),(459,'6403',NULL,'Abdullatif','Alhuthayel','abdullatif.alhuthayel@laceco.me','2000-11-05','Saudi Arabia','Saudi','Single','Bachelor, Urban and Regional Planning, Imam AbdulRahman Bin Faisal University',0.1,1,NULL,74,127,NULL,1,1,NULL,'2024-05-02 00:00:00',1,NULL,NULL),(460,'6404',NULL,'Ali','Aslam','ali.aslam@laceco.me','1988-07-01','Saudi Arabia','Pakistani','Married','Bachelor, Chemistry, Karachi University',12,1,NULL,63,83,NULL,1,1,NULL,'2024-05-19 00:00:00',1,NULL,NULL),(461,'9004',NULL,'Abdul','Sabuj','unavailable@laceco.me','1985-01-23','Lebanon','Bangladeshi','Married','Unavailable',16,1,NULL,74,130,NULL,1,1,NULL,'2008-06-24 00:00:00',1,NULL,NULL),(462,'9006',NULL,'Mohammad','Dhenu','unavailable@laceco.me','1983-01-01','Lebanon','Bangladeshi','Married','Unavailable',15.9,1,NULL,74,130,NULL,1,1,NULL,'2008-07-11 00:00:00',1,NULL,NULL),(464,NULL,NULL,'Naji','El Souki','testemployee@laceco.me','1958-11-21','Lebanon','Lebanese','Married','Unavailable',23,1,NULL,63,1589,NULL,1,1,NULL,'2001-11-01 00:00:00',1,NULL,NULL);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_employee_update_status` AFTER UPDATE ON `employee` FOR EACH ROW BEGIN
    IF OLD.employee_status_id != NEW.employee_status_id THEN
        INSERT INTO employee_status_history (employee_id, new_status_id, changed_on, changed_by)
        VALUES (NEW.employee_id,  NEW.employee_status_id, CURRENT_TIMESTAMP, NEW.changed_by);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_employee_update_position` AFTER UPDATE ON `employee` FOR EACH ROW BEGIN
    IF OLD.position_id != NEW.position_id THEN
        INSERT INTO position_history (employee_id,  new_position_id, changed_on, changed_by)
        VALUES (OLD.employee_id,  NEW.position_id, CURRENT_TIMESTAMP, NEW.changed_by);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_employee_update_discipline` AFTER UPDATE ON `employee` FOR EACH ROW BEGIN
    IF OLD.discipline_id != NEW.discipline_id THEN
        INSERT INTO discipline_history (employee_id, new_discipline_id, changed_on, changed_by)
        VALUES (NEW.employee_id, NEW.discipline_id, CURRENT_TIMESTAMP, NEW.changed_by);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_status`
--

LOCK TABLES `employee_status` WRITE;
/*!40000 ALTER TABLE `employee_status` DISABLE KEYS */;
INSERT INTO `employee_status` VALUES (1,'Active'),(2,'Resigned');
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
  `new_status_id` int NOT NULL,
  `changed_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changed_by` int NOT NULL,
  PRIMARY KEY (`employee_status_history_id`),
  KEY `employee_id` (`employee_id`),
  KEY `new_status_id` (`new_status_id`),
  KEY `changed_by_employee_id_idx` (`changed_by`),
  CONSTRAINT `changed_by_employee_id` FOREIGN KEY (`changed_by`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employee_status_history_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employee_status_history_ibfk_3` FOREIGN KEY (`new_status_id`) REFERENCES `employee_status` (`employee_status_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_status_history`
--

LOCK TABLES `employee_status_history` WRITE;
/*!40000 ALTER TABLE `employee_status_history` DISABLE KEYS */;
INSERT INTO `employee_status_history` VALUES (35,289,2,'2024-08-07 10:24:26',1),(36,289,1,'2024-08-07 10:24:42',1),(37,1,1,'2024-08-07 10:37:50',1);
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
  `actioned_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rejection_reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`employee_work_day_id`),
  KEY `phase_assignee_id` (`phase_assignee_id`),
  KEY `actioned_by` (`actioned_by`),
  CONSTRAINT `employee_work_day_ibfk_1` FOREIGN KEY (`phase_assignee_id`) REFERENCES `phase_assignee` (`phase_assignee_id`),
  CONSTRAINT `employee_work_day_ibfk_2` FOREIGN KEY (`actioned_by`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_work_day`
--

LOCK TABLES `employee_work_day` WRITE;
/*!40000 ALTER TABLE `employee_work_day` DISABLE KEYS */;
INSERT INTO `employee_work_day` VALUES (1,78,'2024-08-07',5,'Pending',1,'2024-08-09 14:32:45',NULL);
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
-- Table structure for table `error_log`
--

DROP TABLE IF EXISTS `error_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `error_log` (
  `error_log_id` int NOT NULL AUTO_INCREMENT,
  `error_name` longtext,
  `error_message` longtext,
  `error_stack` longtext,
  `custom_message` longtext,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  PRIMARY KEY (`error_log_id`),
  KEY `created_by_fk_idx` (`created_by`),
  CONSTRAINT `created_by_error_log_fk` FOREIGN KEY (`created_by`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=234 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `error_log`
--

LOCK TABLES `error_log` WRITE;
/*!40000 ALTER TABLE `error_log` DISABLE KEYS */;
INSERT INTO `error_log` VALUES (1,'Error','Table \'lacecodb.projectss\' doesn\'t exist','Error: Table \'lacecodb.projectss\' doesn\'t exist\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:165:40)\n    at updateProject (webpack-internal:///(rsc)/./src/utilities/project/project-utils.js:124:73)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\compiled\\next-server\\app-page.runtime.dev.js:39:418\n    at async rS (C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\compiled\\next-server\\app-page.runtime.dev.js:38:7978)\n    at async r2 (C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\compiled\\next-server\\app-page.runtime.dev.js:41:1251)\n    at async doRender (C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\server\\base-server.js:1438:30)\n    at async cacheEntry.responseCache.get.routeKind (C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\server\\base-server.js:1587:40)\n    at async DevServer.renderToResponseWithComponentsImpl (C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\server\\base-server.js:1507:28)\n    at async DevServer.renderPageComponent (C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\server\\base-server.js:1924:24)\n    at async DevServer.renderToResponseImpl (C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\server\\base-server.js:1962:32)\n    at async DevServer.pipeImpl (C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\server\\base-server.js:920:25)\n    at async NextNodeServer.handleCatchallRenderRequest (C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\server\\next-server.js:272:17)\n    at async DevServer.handleRequestImpl (C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\server\\base-server.js:816:17)\n    at async C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\server\\dev\\next-dev-server.js:339:20\n    at async Span.traceAsyncFn (C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\trace\\trace.js:154:20)\n    at async DevServer.handleRequest (C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\server\\dev\\next-dev-server.js:336:24)\n    at async invokeRender (C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\server\\lib\\router-server.js:174:21)\n    at async handleRequest (C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\server\\lib\\router-server.js:353:24)\n    at async requestHandlerImpl (C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\server\\lib\\router-server.js:377:13)\n    at async Server.requestListener (C:\\Users\\Juliano.Gharzeddine\\Documents\\GitHub\\LacecoPortal\\node_modules\\next\\dist\\server\\lib\\start-server.js:141:13)',NULL,'2024-08-07 12:07:17',1),(8,'ReferenceError','a is not defined','ReferenceError: a is not defined\n    at getProjectData (webpack-internal:///(rsc)/./src/utilities/project/project-utils.js:383:9)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ProjectDeployment (webpack-internal:///(rsc)/./src/app/(pages)/planning/project/deployment/[project_id]/page.jsx:29:28)',NULL,'2024-08-07 12:28:44',1),(9,'ReferenceError','selectClause is not defined','ReferenceError: selectClause is not defined\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:52:31)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error fetching errors list','2024-08-07 13:02:41',1),(10,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'FROM error_log err\n                     JOIN employee e ON err.created_by = e.em\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'FROM error_log err\n                     JOIN employee e ON err.created_by = e.em\' at line 2\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:56:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error in executing SQL query','2024-08-07 13:02:42',1),(11,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'FROM error_log err\n                     JOIN employee e ON err.created_by = e.em\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'FROM error_log err\n                     JOIN employee e ON err.created_by = e.em\' at line 2\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:56:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error fetching project details','2024-08-07 13:02:42',1),(12,'Error','Unknown column \'err\' in \'field list\'','Error: Unknown column \'err\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:56:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error in executing SQL query','2024-08-07 13:02:46',1),(13,'Error','Unknown column \'err\' in \'field list\'','Error: Unknown column \'err\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:56:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error fetching project details','2024-08-07 13:02:46',1),(14,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'.*,\n v    e.first_name,\n v    e.last_name\n v  FROM \n v    error_log err\n v  JOIN\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'.*,\n v    e.first_name,\n v    e.last_name\n v  FROM \n v    error_log err\n v  JOIN\' at line 2\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:61:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error in executing SQL query','2024-08-07 13:03:24',1),(15,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'.*,\n v    e.first_name,\n v    e.last_name\n v  FROM \n v    error_log err\n v  JOIN\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'.*,\n v    e.first_name,\n v    e.last_name\n v  FROM \n v    error_log err\n v  JOIN\' at line 2\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:61:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error fetching project details','2024-08-07 13:03:24',1),(16,'Error','Unknown column \'e.last_name.e\' in \'field list\'','Error: Unknown column \'e.last_name.e\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:62:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error in executing SQL query','2024-08-07 13:03:37',1),(17,'Error','Unknown column \'e.last_name.e\' in \'field list\'','Error: Unknown column \'e.last_name.e\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:62:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error fetching project details','2024-08-07 13:03:37',1),(18,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'.employee_id\n                   FROM \n                     error_log err\n       \' at line 5','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'.employee_id\n                   FROM \n                     error_log err\n       \' at line 5\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:62:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error in executing SQL query','2024-08-07 13:03:41',1),(19,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'.employee_id\n                   FROM \n                     error_log err\n       \' at line 5','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'.employee_id\n                   FROM \n                     error_log err\n       \' at line 5\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:62:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error fetching project details','2024-08-07 13:03:41',1),(20,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'.employee_id\n                   FROM \n                     error_log err\n       \' at line 5','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'.employee_id\n                   FROM \n                     error_log err\n       \' at line 5\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:62:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error in executing SQL query','2024-08-07 13:04:07',1),(21,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'.employee_id\n                   FROM \n                     error_log err\n       \' at line 5','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'.employee_id\n                   FROM \n                     error_log err\n       \' at line 5\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:62:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error fetching project details','2024-08-07 13:04:07',1),(22,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'.employee_id\n                   FROM \n                     error_log err\n       \' at line 5','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'.employee_id\n                   FROM \n                     error_log err\n       \' at line 5\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:62:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error in executing SQL query','2024-08-07 13:05:32',1),(23,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'.employee_id\n                   FROM \n                     error_log err\n       \' at line 5','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'.employee_id\n                   FROM \n                     error_log err\n       \' at line 5\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:62:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error fetching project details','2024-08-07 13:05:32',1),(24,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE LOWER(err.error_log_id ) LIKE LOWER(?) OR LOWER(err.error_name ) LIKE LOWE\' at line 7','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE LOWER(err.error_log_id ) LIKE LOWER(?) OR LOWER(err.error_name ) LIKE LOWE\' at line 7\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:59:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error in executing SQL query','2024-08-07 13:18:59',1),(25,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE LOWER(err.error_log_id ) LIKE LOWER(?) OR LOWER(err.error_name ) LIKE LOWE\' at line 7','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE LOWER(err.error_log_id ) LIKE LOWER(?) OR LOWER(err.error_name ) LIKE LOWE\' at line 7\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:59:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error fetching project details','2024-08-07 13:18:59',1),(26,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE LOWER(err.error_log_id ) LIKE LOWER(?) OR LOWER(err.error_name ) LIKE LOWE\' at line 7','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE LOWER(err.error_log_id ) LIKE LOWER(?) OR LOWER(err.error_name ) LIKE LOWE\' at line 7\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:59:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error in executing SQL query','2024-08-07 13:18:59',1),(27,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE LOWER(err.error_log_id ) LIKE LOWER(?) OR LOWER(err.error_name ) LIKE LOWE\' at line 7','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE LOWER(err.error_log_id ) LIKE LOWER(?) OR LOWER(err.error_name ) LIKE LOWE\' at line 7\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:59:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error fetching project details','2024-08-07 13:18:59',1),(28,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE LOWER(err.error_log_id ) LIKE LOWER(?) OR LOWER(err.error_name ) LIKE LOWE\' at line 7','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE LOWER(err.error_log_id ) LIKE LOWER(?) OR LOWER(err.error_name ) LIKE LOWE\' at line 7\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:59:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error in executing SQL query','2024-08-07 13:20:29',1),(29,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE LOWER(err.error_log_id ) LIKE LOWER(?) OR LOWER(err.error_name ) LIKE LOWE\' at line 7','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE LOWER(err.error_log_id ) LIKE LOWER(?) OR LOWER(err.error_name ) LIKE LOWE\' at line 7\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:59:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error fetching project details','2024-08-07 13:20:30',1),(30,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE LOWER(err.error_log_id ) LIKE LOWER(?) OR LOWER(err.error_name ) LIKE LOWE\' at line 7','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE LOWER(err.error_log_id ) LIKE LOWER(?) OR LOWER(err.error_name ) LIKE LOWE\' at line 7\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:59:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error in executing SQL query','2024-08-07 13:20:30',1),(31,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE LOWER(err.error_log_id ) LIKE LOWER(?) OR LOWER(err.error_name ) LIKE LOWE\' at line 7','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE LOWER(err.error_log_id ) LIKE LOWER(?) OR LOWER(err.error_name ) LIKE LOWE\' at line 7\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:59:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error fetching project details','2024-08-07 13:20:30',1),(32,'Error','Unknown column \'err\' in \'field list\'','Error: Unknown column \'err\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:57:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error in executing SQL query','2024-08-07 13:22:21',1),(33,'Error','Unknown column \'err\' in \'field list\'','Error: Unknown column \'err\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:57:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error fetching project details','2024-08-07 13:22:21',1),(34,'Error','Unknown column \'err\' in \'field list\'','Error: Unknown column \'err\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:56:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error in executing SQL query','2024-08-07 13:22:50',1),(35,'Error','Unknown column \'err\' in \'field list\'','Error: Unknown column \'err\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at dynamicQuery (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:123:31)\n    at getErrorLog (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:56:88)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async ErrorLogPage (webpack-internal:///(rsc)/./src/app/(pages)/administrator/errors/page.jsx:15:21)','Error fetching project details','2024-08-07 13:22:50',1),(36,'Error','Bind parameters must not contain undefined. To pass SQL NULL specify JS null','Error: Bind parameters must not contain undefined. To pass SQL NULL specify JS null\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:79)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:12:02',1),(37,'Error','Bind parameters must not contain undefined. To pass SQL NULL specify JS null','Error: Bind parameters must not contain undefined. To pass SQL NULL specify JS null\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:79)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:12:02',1),(38,'Error','Table \'lacecodb.sidebar_link_roles\' doesn\'t exist','Error: Table \'lacecodb.sidebar_link_roles\' doesn\'t exist\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:79)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:19:00',1),(39,'Error','Table \'lacecodb.sidebar_link_roles\' doesn\'t exist','Error: Table \'lacecodb.sidebar_link_roles\' doesn\'t exist\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:79)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:19:00',1),(40,'Error','Table \'lacecodb.sidebar_link_roles\' doesn\'t exist','Error: Table \'lacecodb.sidebar_link_roles\' doesn\'t exist\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:79)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:19:04',1),(41,'Error','Table \'lacecodb.sidebar_link_roles\' doesn\'t exist','Error: Table \'lacecodb.sidebar_link_roles\' doesn\'t exist\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:79)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:19:04',1),(42,'Error','The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received undefined','Error: The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received undefined\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:84)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:21:23',1),(43,'Error','Unknown column \'isCommmon\' in \'where clause\'','Error: Unknown column \'isCommmon\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:84)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:21:25',1),(44,'Error','Unknown column \'isCommmon\' in \'where clause\'','Error: Unknown column \'isCommmon\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:84)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:21:28',1),(45,'Error','Unknown column \'isCommmon\' in \'where clause\'','Error: Unknown column \'isCommmon\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:84)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:21:33',1),(46,'Error','Unknown column \'isCommmon\' in \'where clause\'','Error: Unknown column \'isCommmon\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:84)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:21:37',1),(47,'Error','Unknown column \'isCommmon\' in \'where clause\'','Error: Unknown column \'isCommmon\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:84)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:21:40',1),(48,'Error','Unknown column \'isCommmon\' in \'where clause\'','Error: Unknown column \'isCommmon\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:84)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:21:44',1),(49,'Error','Unknown column \'isCommmon\' in \'where clause\'','Error: Unknown column \'isCommmon\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:84)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:21:44',1),(50,'Error','Unknown column \'isCommmon\' in \'where clause\'','Error: Unknown column \'isCommmon\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:84)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:21:47',1),(51,'Error','Unknown column \'isCommmon\' in \'where clause\'','Error: Unknown column \'isCommmon\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:84)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:21:54',1),(52,'Error','Unknown column \'isCommmon\' in \'where clause\'','Error: Unknown column \'isCommmon\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:84)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:21:57',1),(53,'Error','Unknown column \'isCommmon\' in \'where clause\'','Error: Unknown column \'isCommmon\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:84)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:22:03',1),(54,'Error','Unknown column \'isCommmon\' in \'where clause\'','Error: Unknown column \'isCommmon\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:84)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:22:06',1),(55,'Error','Unknown column \'isCommmon\' in \'where clause\'','Error: Unknown column \'isCommmon\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeLinkOptions (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:330:84)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:42:118)','Error in executing SQL query','2024-08-07 15:22:11',1),(56,'Error','Column \'project_id\' in field list is ambiguous','Error: Column \'project_id\' in field list is ambiguous\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:350:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:05:50',1),(57,'Error','Column \'project_id\' in field list is ambiguous','Error: Column \'project_id\' in field list is ambiguous\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:350:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:05:50',1),(58,'Error','Column \'project_id\' in field list is ambiguous','Error: Column \'project_id\' in field list is ambiguous\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:350:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:05:50',1),(59,'Error','Column \'project_id\' in field list is ambiguous','Error: Column \'project_id\' in field list is ambiguous\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:350:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:05:53',1),(60,'Error','Unknown column \'projproject_id\' in \'field list\'','Error: Unknown column \'projproject_id\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:350:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:06:06',1),(61,'Error','Unknown column \'projproject_id\' in \'field list\'','Error: Unknown column \'projproject_id\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:350:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:06:07',1),(62,'Error','Unknown column \'ph\' in \'field list\'','Error: Unknown column \'ph\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:350:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:06:12',1),(63,'Error','Unknown column \'ph\' in \'field list\'','Error: Unknown column \'ph\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:350:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:06:14',1),(64,'Error','Unknown column \'ph\' in \'field list\'','Error: Unknown column \'ph\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:350:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:06:14',1),(65,'Error','Unknown column \'phas\' in \'field list\'','Error: Unknown column \'phas\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:350:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:06:19',1),(66,'Error','Unknown column \'phas\' in \'field list\'','Error: Unknown column \'phas\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:350:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:06:20',1),(67,'Error','Unknown column \'phas\' in \'field list\'','Error: Unknown column \'phas\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:350:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:06:20',1),(68,'Error','Unknown column \'phas\' in \'field list\'','Error: Unknown column \'phas\' in \'field list\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:350:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:06:23',1),(69,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE pa.assignee_id = ? AND proj.project_status = \'Active\'\' at line 6','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE pa.assignee_id = ? AND proj.project_status = \'Active\'\' at line 6\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:351:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:07:03',1),(70,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE pa.assignee_id = ? AND proj.project_status = \'Active\'\' at line 6','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE pa.assignee_id = ? AND proj.project_status = \'Active\'\' at line 6\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:351:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:07:04',1),(71,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE pa.assignee_id = ? AND proj.project_status = \'Active\'\' at line 6','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE pa.assignee_id = ? AND proj.project_status = \'Active\'\' at line 6\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:351:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:07:29',1),(72,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE pa.assignee_id = ? AND proj.project_status = \'Active\'\' at line 6','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE pa.assignee_id = ? AND proj.project_status = \'Active\'\' at line 6\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:351:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:07:30',1),(73,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE pa.assignee_id = ? AND proj.project_status = \'Active\'\' at line 6','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE pa.assignee_id = ? AND proj.project_status = \'Active\'\' at line 6\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:351:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:07:30',1),(74,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE pa.assignee_id = ? AND proj.project_status = \'Active\'\' at line 6','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'WHERE pa.assignee_id = ? AND proj.project_status = \'Active\'\' at line 6\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:351:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:07:30',1),(75,'Error','Unknown column \'p\' in \'on clause\'','Error: Unknown column \'p\' in \'on clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:352:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:08:07',1),(76,'Error','Unknown column \'p\' in \'on clause\'','Error: Unknown column \'p\' in \'on clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:352:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:08:07',1),(77,'Error','Unknown column \'p\' in \'on clause\'','Error: Unknown column \'p\' in \'on clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:352:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:08:07',1),(78,'Error','Unknown column \'p\' in \'on clause\'','Error: Unknown column \'p\' in \'on clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:352:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:08:07',1),(79,'Error','Unknown column \'p\' in \'on clause\'','Error: Unknown column \'p\' in \'on clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:352:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:08:09',1),(80,'Error','Unknown column \'p\' in \'on clause\'','Error: Unknown column \'p\' in \'on clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:352:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:08:16',1),(81,'Error','Unknown column \'p\' in \'on clause\'','Error: Unknown column \'p\' in \'on clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:352:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:08:16',1),(82,'Error','Unknown table \'pa\'','Error: Unknown table \'pa\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:351:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:10:00',1),(83,'Error','Unknown table \'pa\'','Error: Unknown table \'pa\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:351:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:10:00',1),(84,'Error','Unknown table \'pa\'','Error: Unknown table \'pa\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:351:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:10:00',1),(85,'Error','Unknown table \'pa\'','Error: Unknown table \'pa\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:351:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:10:00',1),(86,'Error','Unknown column \'pa.assignee_id\' in \'where clause\'','Error: Unknown column \'pa.assignee_id\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:351:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:10:05',1),(87,'Error','Unknown column \'pa.assignee_id\' in \'where clause\'','Error: Unknown column \'pa.assignee_id\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:351:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:10:05',1),(88,'Error','Unknown column \'pa.assignee_id\' in \'where clause\'','Error: Unknown column \'pa.assignee_id\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:351:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:10:08',1),(89,'Error','Unknown column \'pa.assignee_id\' in \'where clause\'','Error: Unknown column \'pa.assignee_id\' in \'where clause\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:351:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:10:09',1),(90,'Error','Unknown table \'pa\'','Error: Unknown table \'pa\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:351:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:10:26',1),(91,'Error','Unknown table \'pa\'','Error: Unknown table \'pa\'\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:351:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:10:27',1),(92,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \', ph.phase_id , phase_name , first_name ,last_name , position_name\n             \' at line 1','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \', ph.phase_id , phase_name , first_name ,last_name , position_name\n             \' at line 1\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:352:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:10:36',1),(93,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \', ph.phase_id , phase_name , first_name ,last_name , position_name\n             \' at line 1','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \', ph.phase_id , phase_name , first_name ,last_name , position_name\n             \' at line 1\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:352:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:10:36',1),(94,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \', ph.phase_id , phase_name , first_name ,last_name , position_name\n             \' at line 1','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \', ph.phase_id , phase_name , first_name ,last_name , position_name\n             \' at line 1\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:352:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:10:38',1),(95,'Error','Too many connections','Error: Too many connections\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:366:77)\n    at RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:114)','Error in executing SQL query','2024-08-09 12:19:38',1),(96,'Error','Too many connections','Error: Too many connections\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at logError (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:27:68)\n    at async execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:36:9)\n    at async getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:366:18)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error in executing SQL query','2024-08-09 12:19:42',1),(97,'ReferenceError','data is not defined','ReferenceError: data is not defined\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:21)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:34:28',1),(98,'ReferenceError','data is not defined','ReferenceError: data is not defined\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:21)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:34:46',1),(99,'ReferenceError','data is not defined','ReferenceError: data is not defined\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:21)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:34:46',1),(100,'ReferenceError','data is not defined','ReferenceError: data is not defined\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:21)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:34:47',1),(101,'ReferenceError','data is not defined','ReferenceError: data is not defined\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:21)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:34:47',1),(102,'ReferenceError','data is not defined','ReferenceError: data is not defined\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:21)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:34:47',1),(103,'ReferenceError','data is not defined','ReferenceError: data is not defined\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:21)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:34:49',1),(104,'ReferenceError','data is not defined','ReferenceError: data is not defined\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:21)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:34:49',1),(105,'ReferenceError','data is not defined','ReferenceError: data is not defined\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:21)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:35:00',1),(106,'ReferenceError','data is not defined','ReferenceError: data is not defined\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:21)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:35:02',1),(107,'ReferenceError','data is not defined','ReferenceError: data is not defined\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:21)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:35:02',1),(108,'TypeError','JSON.stringuify is not a function','TypeError: JSON.stringuify is not a function\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:26)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:35:36',1),(109,'TypeError','JSON.stringuify is not a function','TypeError: JSON.stringuify is not a function\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:26)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:35:36',1),(110,'TypeError','JSON.stringuify is not a function','TypeError: JSON.stringuify is not a function\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:26)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:35:37',1),(111,'TypeError','JSON.strinfy is not a function','TypeError: JSON.strinfy is not a function\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:26)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:35:43',1),(112,'ReferenceError','project is not defined','ReferenceError: project is not defined\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:391:21)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:59:11',1),(113,'ReferenceError','project is not defined','ReferenceError: project is not defined\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:391:21)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 12:59:11',1),(114,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 23','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 23\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:371:90)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:02:17',1),(115,'Error','Malformed communication packet.','Error: Malformed communication packet.\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:371:90)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:02:21',1),(116,'Error','Too many connections','Error: Too many connections\n    at PromisePool.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:374:22)\n    at execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:31:79)\n    at logError (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:27:68)\n    at async execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:36:9)\n    at async logError (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:27:9)\n    at async execute (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:36:9)\n    at async logError (webpack-internal:///(rsc)/./src/utilities/misc-utils.js:27:9)\n    at async getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:405:9)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error in executing SQL query','2024-08-09 13:10:44',1),(117,'Error','Unknown column \'pa.assignee\' in \'where clause\'','Error: Unknown column \'pa.assignee\' in \'where clause\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:366:90)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:13:00',1),(118,'Error','Unknown column \'pa.assignee\' in \'where clause\'','Error: Unknown column \'pa.assignee\' in \'where clause\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:366:90)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:13:00',1),(119,'Error','Malformed communication packet.','Error: Malformed communication packet.\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:366:90)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:13:04',1),(121,'Error','Unknown column \'p.phase_id\' in \'field list\'','Error: Unknown column \'p.phase_id\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:376:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:26:18',1),(122,'Error','Unknown column \'p.phase_id\' in \'field list\'','Error: Unknown column \'p.phase_id\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:376:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:26:18',1),(123,'Error','Unknown column \'p.phase_id\' in \'field list\'','Error: Unknown column \'p.phase_id\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:376:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:26:24',1),(124,'Error','Unknown column \'p.phase_id\' in \'field list\'','Error: Unknown column \'p.phase_id\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:376:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:26:24',1),(125,'Error','Unknown column \'p.phase_id\' in \'field list\'','Error: Unknown column \'p.phase_id\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:376:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:26:26',1),(126,'Error','Unknown column \'p.phase_id\' in \'field list\'','Error: Unknown column \'p.phase_id\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:376:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:26:26',1),(127,'Error','Unknown column \'p.phase_id\' in \'field list\'','Error: Unknown column \'p.phase_id\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:376:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:26:28',1),(129,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'\' at line 4','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'\' at line 4\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:377:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:27:22',1),(130,'Error','Unknown column \'assignee\' in \'where clause\'','Error: Unknown column \'assignee\' in \'where clause\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:377:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:27:25',1),(131,'Error','Unknown column \'assignee\' in \'where clause\'','Error: Unknown column \'assignee\' in \'where clause\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:377:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:27:25',1),(135,'Error','Malformed communication packet.','Error: Malformed communication packet.\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:377:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:27:36',1),(136,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 8','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 8\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:393:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:32:26',1),(137,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 8','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 8\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:393:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:32:29',1),(138,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 8','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 8\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:393:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:32:29',1),(139,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 8','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 8\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:393:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:32:29',1),(140,'Error','Unknown column \'pww.p\' in \'where clause\'','Error: Unknown column \'pww.p\' in \'where clause\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:393:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:32:33',1),(141,'Error','Unknown column \'pww.p\' in \'where clause\'','Error: Unknown column \'pww.p\' in \'where clause\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:393:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:32:33',1),(143,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'\' at line 4','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'\' at line 4\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:377:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:34:08',1),(144,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'\' at line 4','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'\' at line 4\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:377:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:34:08',1),(145,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'\' at line 5','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'\' at line 5\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:34:16',1),(146,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'\' at line 5','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'\' at line 5\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:34:16',1),(147,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'\' at line 5','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'\' at line 5\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:34:19',1),(148,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'\' at line 5','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'\' at line 5\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:34:20',1),(149,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'\' at line 5','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'\' at line 5\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:378:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:34:21',1),(150,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 7','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 7\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:380:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:34:30',1),(151,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 8','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 8\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:381:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:34:48',1),(152,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 8','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 8\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:381:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:34:48',1),(153,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 8','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 8\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:381:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:34:57',1),(154,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 8','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 8\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:381:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:34:57',1),(155,'Error','Unknown column \'pww.phase_assignee\' in \'where clause\'','Error: Unknown column \'pww.phase_assignee\' in \'where clause\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:382:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:35:06',1),(156,'Error','Unknown column \'pww.phase_assignee\' in \'where clause\'','Error: Unknown column \'pww.phase_assignee\' in \'where clause\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:382:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:35:06',1),(157,'Error','Unknown column \'pa.phase_assigne_id\' in \'where clause\'','Error: Unknown column \'pa.phase_assigne_id\' in \'where clause\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:382:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:35:14',1),(158,'Error','Unknown column \'pa.phase_assigne_id\' in \'where clause\'','Error: Unknown column \'pa.phase_assigne_id\' in \'where clause\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:382:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:35:14',1),(159,'Error','Unknown column \'pa.phase_assigne_id\' in \'where clause\'','Error: Unknown column \'pa.phase_assigne_id\' in \'where clause\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:382:92)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:35:24',1),(160,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'const query = \n            SELECT proj.project_id, \n                   code, \n  \' at line 1','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'const query = \n            SELECT proj.project_id, \n                   code, \n  \' at line 1\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:367:90)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:42:44',1),(161,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'const query = \n            SELECT proj.project_id, \n                   code, \n  \' at line 1','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'const query = \n            SELECT proj.project_id, \n                   code, \n  \' at line 1\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:367:90)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:42:44',1),(162,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'const query = \n            SELECT proj.project_id, \n                   code, \n  \' at line 1','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'const query = \n            SELECT proj.project_id, \n                   code, \n  \' at line 1\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:367:90)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:42:45',1),(163,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'const query = \n            SELECT proj.project_id, \n                   code, \n  \' at line 1','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'const query = \n            SELECT proj.project_id, \n                   code, \n  \' at line 1\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:367:90)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:42:46',1),(164,'Error','Unknown column \'SIproj.project_id\' in \'field list\'','Error: Unknown column \'SIproj.project_id\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:366:90)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:43:31',1),(165,'Error','Unknown column \'SIproj.project_id\' in \'field list\'','Error: Unknown column \'SIproj.project_id\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:366:90)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 13:43:31',1),(168,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'FROM phase_assignee pa\n                    JOIN phase p ON pa.phase_id = p.phase\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'FROM phase_assignee pa\n                    JOIN phase p ON pa.phase_id = p.phase\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:394:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:15:42',1),(169,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'FROM phase_assignee pa\n                    JOIN phase p ON pa.phase_id = p.phase\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'FROM phase_assignee pa\n                    JOIN phase p ON pa.phase_id = p.phase\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:394:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:15:42',1),(170,'Error','Unknown column \'work_done_hr\' in \'field list\'','Error: Unknown column \'work_done_hr\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:394:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:16:00',1),(171,'Error','Unknown column \'work_done_hr\' in \'field list\'','Error: Unknown column \'work_done_hr\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:394:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:16:00',1),(172,'Error','Unknown column \'work_done_hr\' in \'field list\'','Error: Unknown column \'work_done_hr\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:394:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:16:08',1),(173,'Error','Unknown column \'work_done_hr\' in \'field list\'','Error: Unknown column \'work_done_hr\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:394:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:16:08',1),(174,'Error','Unknown column \'work_done_hr\' in \'field list\'','Error: Unknown column \'work_done_hr\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:394:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:16:14',1),(175,'Error','Unknown column \'work_done_hr\' in \'field list\'','Error: Unknown column \'work_done_hr\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:394:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:16:14',1),(176,'Error','Unknown column \'pa.work_done_hr\' in \'field list\'','Error: Unknown column \'pa.work_done_hr\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:394:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:16:22',1),(177,'Error','Unknown column \'pa.work_done_hr\' in \'field list\'','Error: Unknown column \'pa.work_done_hr\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:394:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:16:22',1),(178,'Error','Unknown column \'pa.work_done_hr\' in \'field list\'','Error: Unknown column \'pa.work_done_hr\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:394:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:16:24',1),(179,'Error','Unknown column \'pa.work_done_hr\' in \'field list\'','Error: Unknown column \'pa.work_done_hr\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:394:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:16:24',1),(180,'Error','Unknown column \'p.work_done_hr\' in \'field list\'','Error: Unknown column \'p.work_done_hr\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:394:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:16:46',1),(181,'Error','Unknown column \'p.work_done_hr\' in \'field list\'','Error: Unknown column \'p.work_done_hr\' in \'field list\'\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:394:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:16:46',1),(182,'TypeError','Cannot read properties of undefined (reading \'execute\')','TypeError: Cannot read properties of undefined (reading \'execute\')\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:33:55',1),(183,'TypeError','Cannot read properties of undefined (reading \'execute\')','TypeError: Cannot read properties of undefined (reading \'execute\')\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:34:08',1),(184,'TypeError','Cannot read properties of undefined (reading \'execute\')','TypeError: Cannot read properties of undefined (reading \'execute\')\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:34:08',1),(185,'TypeError','Cannot read properties of undefined (reading \'execute\')','TypeError: Cannot read properties of undefined (reading \'execute\')\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:34:21',1),(186,'TypeError','Cannot read properties of undefined (reading \'execute\')','TypeError: Cannot read properties of undefined (reading \'execute\')\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:34:22',1),(188,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day\n                    WHERE phase_assignee_id = ?\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day\n                    WHERE phase_assignee_id = ?\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:35:23',1),(189,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day\n                    WHERE phase_assignee_id = ?\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day\n                    WHERE phase_assignee_id = ?\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:35:23',1),(190,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day)()\n                    WHERE phase_assignee_id = ?\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day)()\n                    WHERE phase_assignee_id = ?\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:35:25',1),(191,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day)()\n                    WHERE phase_assignee_id = ?\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day)()\n                    WHERE phase_assignee_id = ?\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:35:26',1),(192,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day)\n                    WHERE phase_assignee_id = ?\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day)\n                    WHERE phase_assignee_id = ?\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:35:29',1),(194,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , )\n                    WHERE phase_assignee_id = ?\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , )\n                    WHERE phase_assignee_id = ?\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:35:37',1),(195,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , )\n                    WHERE phase_assignee_id = ?\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , )\n                    WHERE phase_assignee_id = ?\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:35:37',1),(196,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , )\n                    WHERE phase_assignee_id = ?\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , )\n                    WHERE phase_assignee_id = ?\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:35:40',1),(198,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , )\n                    WHERE phase_assignee_id = ?\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , )\n                    WHERE phase_assignee_id = ?\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:35:47',1),(202,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , %Y % )\n                    WHERE phase_assignee_id = ?\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , %Y % )\n                    WHERE phase_assignee_id = ?\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:36:53',1),(203,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , %Y % )\n                    WHERE phase_assignee_id = ?\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , %Y % )\n                    WHERE phase_assignee_id = ?\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:36:53',1),(204,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , %Y % )\n                    WHERE phase_assignee_id = ?\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , %Y % )\n                    WHERE phase_assignee_id = ?\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:36:53',1),(205,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , %Y %M %d )\n                    WHERE phase_assignee_id = ?\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , %Y %M %d )\n                    WHERE phase_assignee_id = ?\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:36:58',1),(206,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , %Y %M %d )\n                    WHERE phase_assignee_id = ?\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , %Y %M %d )\n                    WHERE phase_assignee_id = ?\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:36:58',1),(207,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , %Y %M %d ) as employee_work_d\n                    WHERE pha\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , %Y %M %d ) as employee_work_d\n                    WHERE pha\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:37:10',1),(208,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , %Y %M %d ) as employee_work_d\n                    WHERE pha\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , %Y %M %d ) as employee_work_d\n                    WHERE pha\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:37:10',1),(209,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , %Y %M %d ) as employee_work_day\n                    WHERE p\' at line 2','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'(employee_work_day , %Y %M %d ) as employee_work_day\n                    WHERE p\' at line 2\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:37:14',1),(211,'ReferenceError','tra is not defined','ReferenceError: tra is not defined\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:412:24)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:37:35',1),(212,'ReferenceError','tra is not defined','ReferenceError: tra is not defined\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:412:24)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:37:35',1),(213,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'%Y %M %d )work_day , hours_worked \n                    FROM employee_work_day\n  \' at line 1','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'%Y %M %d )work_day , hours_worked \n                    FROM employee_work_day\n  \' at line 1\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:37:38',1),(215,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'%Y %M %d )work_day , hours_worked \n                    FROM employee_work_day\n  \' at line 1','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'%Y %M %d )work_day , hours_worked \n                    FROM employee_work_day\n  \' at line 1\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:37:39',1),(216,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'%Y %M %d ) , hours_worked \n                    FROM employee_work_day\n          \' at line 1','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'%Y %M %d ) , hours_worked \n                    FROM employee_work_day\n          \' at line 1\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:37:44',1),(217,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'%Y %M %d ) , hours_worked \n                    FROM employee_work_day\n          \' at line 1','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'%Y %M %d ) , hours_worked \n                    FROM employee_work_day\n          \' at line 1\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:37:44',1),(218,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'%Y %M %d ) as work_day , hours_worked \n                    FROM employee_work_da\' at line 1','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'%Y %M %d ) as work_day , hours_worked \n                    FROM employee_work_da\' at line 1\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:37:48',1),(224,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'%Y %M %D ) as work_day , hours_worked \n                    FROM employee_work_da\' at line 1','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'%Y %M %D ) as work_day , hours_worked \n                    FROM employee_work_da\' at line 1\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:38:39',1),(225,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'%Y %M %D ) as work_day , hours_worked \n                    FROM employee_work_da\' at line 1','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'%Y %M %D ) as work_day , hours_worked \n                    FROM employee_work_da\' at line 1\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:38:39',1),(228,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'hours_worked \n                    FROM employee_work_day   \n                    \' at line 1','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \'hours_worked \n                    FROM employee_work_day   \n                    \' at line 1\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:40:33',1),(230,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 3','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 3\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:42:55',1),(231,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 3','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 3\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:42:55',1),(232,'Error','You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 3','Error: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near \')\' at line 3\n    at PromisePoolConnection.execute (webpack-internal:///(rsc)/./node_modules/mysql2/promise.js:112:22)\n    at $$ACTION_1 (webpack-internal:///(rsc)/./src/utilities/db/db-utils.js:167:40)\n    at getEmployeeAssignments (webpack-internal:///(rsc)/./src/utilities/employee/employee-utils.js:410:105)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async RootLayout (webpack-internal:///(rsc)/./src/app/layout.js:36:18)','Error fetching employee timesheet assignments','2024-08-09 14:42:58',1);
/*!40000 ALTER TABLE `error_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grade`
--

DROP TABLE IF EXISTS `grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade` (
  `grade_id` int NOT NULL AUTO_INCREMENT,
  `grade_code` varchar(55) NOT NULL,
  PRIMARY KEY (`grade_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade`
--

LOCK TABLES `grade` WRITE;
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
INSERT INTO `grade` VALUES (3,'G0'),(4,'G1'),(5,'G2'),(6,'G3'),(7,'G4'),(8,'G5'),(9,'G6'),(10,'G7'),(11,'Ungraded');
/*!40000 ALTER TABLE `grade` ENABLE KEYS */;
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
-- Table structure for table `leave`
--

DROP TABLE IF EXISTS `leave`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave` (
  `leave_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `leave_type_id` int NOT NULL,
  `leave_date` date NOT NULL,
  `no_of_hours` int NOT NULL,
  PRIMARY KEY (`leave_id`),
  KEY `ibfk_employee_id_fk_idx` (`employee_id`),
  KEY `ibfk_leave_type_id_fk_idx` (`leave_type_id`),
  CONSTRAINT `ibfk_employee_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `ibfk_leave_type_id_fk` FOREIGN KEY (`leave_type_id`) REFERENCES `leave_type` (`leave_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave`
--

LOCK TABLES `leave` WRITE;
/*!40000 ALTER TABLE `leave` DISABLE KEYS */;
INSERT INTO `leave` VALUES (23,464,10,'2024-04-03',8);
/*!40000 ALTER TABLE `leave` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_type`
--

DROP TABLE IF EXISTS `leave_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_type` (
  `leave_type_id` int NOT NULL AUTO_INCREMENT,
  `leave_type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`leave_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_type`
--

LOCK TABLES `leave_type` WRITE;
/*!40000 ALTER TABLE `leave_type` DISABLE KEYS */;
INSERT INTO `leave_type` VALUES (1,'Annual Leave'),(2,'Sick Leave'),(3,'Compassionate Leave'),(4,'Maternity'),(5,'Paternity'),(6,'Wedding Leave'),(7,'Unpaid Leave'),(8,'Paid Absence'),(9,'CNSS Leave'),(10,'Excused Leave');
/*!40000 ALTER TABLE `leave_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `level_of_management`
--

DROP TABLE IF EXISTS `level_of_management`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `level_of_management` (
  `level_of_management_id` int NOT NULL AUTO_INCREMENT,
  `level_of_management_name` varchar(255) NOT NULL,
  PRIMARY KEY (`level_of_management_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `level_of_management`
--

LOCK TABLES `level_of_management` WRITE;
/*!40000 ALTER TABLE `level_of_management` DISABLE KEYS */;
INSERT INTO `level_of_management` VALUES (1,'Executive Level'),(2,'Senior Level'),(3,'Middle Level'),(4,'Entry Level'),(5,'Administrative Level'),(6,'Staff'),(7,'Intern');
/*!40000 ALTER TABLE `level_of_management` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'Add Employee'),(2,'Edit Employee');
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
  `phase_name` varchar(255) NOT NULL,
  `planned_startdate` date NOT NULL,
  `planned_enddate` date NOT NULL,
  `expected_work_hours` int NOT NULL DEFAULT '0',
  `completed_work_hours` int NOT NULL DEFAULT '0',
  `project_id` int NOT NULL,
  `actioned_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `actioned_by` int NOT NULL,
  PRIMARY KEY (`phase_id`),
  KEY `actioned_by` (`actioned_by`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `phase_ibfk_1` FOREIGN KEY (`actioned_by`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `phase_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase`
--

LOCK TABLES `phase` WRITE;
/*!40000 ALTER TABLE `phase` DISABLE KEYS */;
INSERT INTO `phase` VALUES (13,'Master Plan','2025-04-03','2026-04-03',36,0,20,'2024-06-07 16:13:29',1),(121,'Hydrology Coordination','2025-03-04','2026-03-04',214,0,28,'2024-07-30 13:27:15',1),(122,'Master Plan','2025-03-04','2026-03-04',332,0,28,'2024-07-30 13:27:15',1),(123,'100% DD','2025-03-04','2026-03-04',512,0,28,'2024-07-30 13:27:15',1),(126,'Master Plan','2025-03-04','2026-03-04',90,0,25,'2024-07-30 16:25:20',1),(127,'Master Plan','2025-03-04','2026-03-04',0,0,27,'2024-07-30 16:25:32',1),(129,'Building Permit','2025-03-04','2026-03-04',120,0,31,'2024-08-01 22:31:13',1),(135,'Pre-Conceptual Design','2025-04-03','2026-04-03',0,0,20,'2024-08-07 11:09:55',1),(136,'Conceptual Design','2025-04-03','2026-04-03',0,0,20,'2024-08-07 11:09:55',1),(137,'Schematic Design','2025-04-03','2026-04-03',0,0,20,'2024-08-07 11:09:55',1),(138,'TD','2025-03-04','2026-03-04',0,0,28,'2024-08-09 11:59:59',1);
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
  `work_done_hrs` int NOT NULL DEFAULT '0',
  `expected_work_hrs` int NOT NULL DEFAULT '0',
  `phase_id` int NOT NULL,
  PRIMARY KEY (`phase_assignee_id`),
  KEY `assignee_id` (`assignee_id`),
  KEY `phase_id` (`phase_id`),
  CONSTRAINT `phase_assignee_ibfk_1` FOREIGN KEY (`assignee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `phase_assignee_ibfk_2` FOREIGN KEY (`phase_id`) REFERENCES `phase` (`phase_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase_assignee`
--

LOCK TABLES `phase_assignee` WRITE;
/*!40000 ALTER TABLE `phase_assignee` DISABLE KEYS */;
INSERT INTO `phase_assignee` VALUES (19,385,0,108,121),(20,343,0,64,121),(21,318,0,42,121),(22,385,0,41,122),(23,343,0,60,122),(24,434,0,10,122),(25,378,0,10,122),(26,366,0,20,122),(27,308,0,5,122),(28,323,0,10,122),(29,342,0,10,122),(30,332,0,40,122),(31,405,0,20,122),(32,295,0,8,122),(33,304,0,8,122),(34,374,0,30,122),(35,385,0,115,123),(36,318,0,30,122),(37,436,0,30,122),(38,343,0,110,123),(39,378,0,15,123),(40,366,0,55,123),(41,387,0,110,123),(42,308,0,23,123),(43,323,0,25,123),(44,342,0,5,123),(45,332,0,40,123),(52,428,0,14,123),(54,405,0,0,127),(67,373,0,48,129),(68,365,0,48,129),(72,365,0,90,126),(73,373,0,36,13),(78,1,0,24,129);
/*!40000 ALTER TABLE `phase_assignee` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_insert_phase_assignee` AFTER INSERT ON `phase_assignee` FOR EACH ROW BEGIN
    -- Update expected_work_hours in the phase table
    CALL update_phase_expected_work_hours(NEW.phase_id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_update_phase_assignee` AFTER UPDATE ON `phase_assignee` FOR EACH ROW BEGIN
    -- Update expected_work_hours in the phase table
    CALL update_phase_expected_work_hours(NEW.phase_id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_delete_phase_assignee` AFTER DELETE ON `phase_assignee` FOR EACH ROW BEGIN
    -- Update expected_work_hours in the phase table
    CALL update_phase_expected_work_hours(OLD.phase_id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `phase_id` int NOT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`phase_assignee_id`),
  KEY `assignee_id` (`assignee_id`),
  KEY `phase_id` (`phase_id`),
  CONSTRAINT `phase_assignee_versions_ibfk_1` FOREIGN KEY (`assignee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `phase_assignee_versions_ibfk_2` FOREIGN KEY (`phase_id`) REFERENCES `phase_versions` (`phase_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1893 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase_assignee_versions`
--

LOCK TABLES `phase_assignee_versions` WRITE;
/*!40000 ALTER TABLE `phase_assignee_versions` DISABLE KEYS */;
INSERT INTO `phase_assignee_versions` VALUES (1854,373,0,39,410,1),(1855,365,0,39,410,1),(1856,405,0,0,411,1),(1857,460,0,48,412,1),(1858,365,0,90,416,1),(1859,373,0,48,417,2),(1860,365,0,36,417,2),(1861,376,0,36,417,2),(1862,422,0,36,417,2),(1863,460,0,36,418,2),(1864,385,0,108,422,1),(1865,343,0,64,422,1),(1866,318,0,42,422,1),(1867,385,0,41,423,1),(1868,343,0,60,423,1),(1869,434,0,10,423,1),(1870,378,0,10,423,1),(1871,366,0,20,423,1),(1872,308,0,5,423,1),(1873,323,0,10,423,1),(1874,342,0,10,423,1),(1875,332,0,40,423,1),(1876,405,0,20,423,1),(1877,295,0,8,423,1),(1878,304,0,8,423,1),(1879,374,0,30,423,1),(1880,318,0,30,423,1),(1881,436,0,30,423,1),(1882,385,0,115,424,1),(1883,343,0,110,424,1),(1884,378,0,15,424,1),(1885,366,0,55,424,1),(1886,387,0,110,424,1),(1887,308,0,23,424,1),(1888,323,0,25,424,1),(1889,342,0,5,424,1),(1890,332,0,40,424,1),(1891,428,0,14,424,1),(1892,1,0,12,425,1);
/*!40000 ALTER TABLE `phase_assignee_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phase_name`
--

DROP TABLE IF EXISTS `phase_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phase_name` (
  `phase_name_id` int NOT NULL AUTO_INCREMENT,
  `phase_name` varchar(255) NOT NULL,
  PRIMARY KEY (`phase_name_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase_name`
--

LOCK TABLES `phase_name` WRITE;
/*!40000 ALTER TABLE `phase_name` DISABLE KEYS */;
INSERT INTO `phase_name` VALUES (1,'Master Plan'),(2,'Pre-Conceptual Design'),(3,'Conceptual Design'),(4,'Schematic Design'),(5,'Building Permit'),(6,'Detailed Design'),(7,'Tender Documents'),(25,'Hydrology Coordination'),(26,'100% DD'),(27,'TD');
/*!40000 ALTER TABLE `phase_name` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phase_versions`
--

DROP TABLE IF EXISTS `phase_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phase_versions` (
  `phase_id` int NOT NULL AUTO_INCREMENT,
  `phase_name` varchar(255) NOT NULL,
  `planned_startdate` date NOT NULL,
  `planned_enddate` date NOT NULL,
  `expected_work_hours` int NOT NULL DEFAULT '0',
  `completed_work_hours` int NOT NULL DEFAULT '0',
  `initial_phase_id` int NOT NULL,
  `version` int NOT NULL,
  `actioned_on` date NOT NULL,
  `actioned_by` int NOT NULL,
  PRIMARY KEY (`phase_id`),
  KEY `initial_phase_id` (`initial_phase_id`),
  KEY `actioned_by` (`actioned_by`),
  CONSTRAINT `phase_versions_ibfk_1` FOREIGN KEY (`initial_phase_id`) REFERENCES `phase` (`phase_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `phase_versions_ibfk_3` FOREIGN KEY (`actioned_by`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=426 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase_versions`
--

LOCK TABLES `phase_versions` WRITE;
/*!40000 ALTER TABLE `phase_versions` DISABLE KEYS */;
INSERT INTO `phase_versions` VALUES (410,'Building Permit','2025-03-04','2026-03-04',78,0,129,1,'2024-08-01',1),(411,'Master Plan','2025-03-04','2026-03-04',0,0,127,1,'2024-07-30',1),(412,'Master Plan','2025-04-03','2026-04-03',48,0,13,1,'2024-06-07',1),(416,'Master Plan','2025-03-04','2026-03-04',90,0,126,1,'2024-07-30',1),(417,'Building Permit','2025-03-04','2026-03-04',156,0,129,2,'2024-08-01',1),(418,'Master Plan','2025-04-03','2026-04-03',36,0,13,2,'2024-06-07',1),(422,'Hydrology Coordination','2025-03-04','2026-03-04',214,0,121,1,'2024-07-30',1),(423,'Master Plan','2025-03-04','2026-03-04',332,0,122,1,'2024-07-30',1),(424,'100% DD','2025-03-04','2026-03-04',512,0,123,1,'2024-07-30',1),(425,'TD','2025-03-04','2026-03-04',12,0,138,1,'2024-08-09',1);
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
  `level_of_management_id` int NOT NULL,
  `grade_id` int NOT NULL,
  PRIMARY KEY (`position_id`),
  KEY `ibfk_level_of_management_id_FK_idx` (`level_of_management_id`),
  KEY `ibfk_grade_id_FK_idx` (`grade_id`),
  CONSTRAINT `ibfk_grade_id_FK` FOREIGN KEY (`grade_id`) REFERENCES `grade` (`grade_id`),
  CONSTRAINT `ibfk_level_of_management_id_FK` FOREIGN KEY (`level_of_management_id`) REFERENCES `level_of_management` (`level_of_management_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1590 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (2,'Director of Operations',1,3),(3,'Partner',1,3),(4,'Design Principal',1,3),(5,'Director of Business Development',2,5),(6,'Business Development Manager',3,6),(7,'Business Development Coordinator',4,9),(8,'Marketing Manager',3,6),(9,'Senior Graphic Designer',4,8),(10,'Senior Marketing Coordinator',4,8),(11,'Public Relations Specialist',4,9),(12,'Graphic Designer',4,9),(13,'Marketing Coordinator',4,9),(14,'Contracts Manager',3,6),(15,'Head of Contracts',3,6),(16,'Contracts Administrator',4,8),(17,'Director of Construction',2,4),(18,'HSE Manager',3,6),(19,'Site Project Manager',3,6),(20,'Resident Architect',3,6),(21,'Resident Engineer',3,6),(22,'Senior Site Project Manager',3,6),(23,'Lead Site Architect',4,7),(24,'Lead Site Civil Engineer',4,7),(25,'Lead Site Electrical Engineer',4,7),(26,'Lead Site Mechanical Engineer',4,7),(27,'Senior Quantity Surveyor',4,8),(28,'Senior Site Architect',4,8),(29,'Senior Site Civil Engineer',4,8),(30,'Senior Site Electrical Engineer',4,8),(31,'Senior Site Mechanical Engineer',4,8),(32,'Quantity Surveyor',4,9),(33,'Senior Safety Officer',4,9),(34,'Site Architect',4,9),(35,'Site Civil Engineer',4,9),(36,'Site Electrical Engineer',4,9),(37,'Site Mechanical Engineer',4,9),(38,'Architectural Inspector',5,10),(39,'Civil Inspector',5,10),(40,'Document Controller',5,10),(41,'Electrical Inspector',5,10),(42,'Finishing Inspector',5,10),(43,'HSE Engineer',5,10),(44,'Mechanical Inspector',5,10),(45,'Safety Officer',5,10),(46,'Senior Architectural Inspector',5,10),(47,'Senior Civil Inspector',5,10),(48,'Senior Document Controller',5,10),(49,'Senior Electrical Inspector',5,10),(50,'Senior Finishing Inspector',5,10),(51,'Senior Mechanical Inspector',5,10),(52,'Head of Architecture',3,6),(53,'Lead Architect',3,7),(54,'Lead Interior Designer',3,7),(55,'Lead Landscape Architect',3,7),(56,'Lead Urban Designer',3,7),(57,'Senior Architect',4,8),(58,'Senior Interior Designer',4,8),(59,'Senior Landscape Architect',4,8),(60,'Senior Urban Designer',4,8),(61,'Architect',4,9),(62,'Interior Designer',4,9),(63,'Landscape Architect',4,9),(64,'Senior Draftsman',4,9),(65,'Urban Designer',4,9),(66,'Draftsman',5,10),(67,'Junior Architect',5,10),(68,'Junior Interior Designer',5,10),(69,'Junior Landscape Architect',5,10),(70,'Junior Urban Designer',5,10),(71,'BIM Manager',4,8),(72,'BIM Coordinator',4,9),(73,'Electrical Engineer',4,9),(74,'Head of Electrical',3,6),(75,'Lead Electrical Engineer',3,7),(76,'Senior Electrical Engineer',4,8),(77,'Junior Electrical Engineer',5,10),(78,'Director of Engineering',2,5),(79,'Head of Environmental',3,8),(80,'Lead Environmental Engineer',3,7),(81,'Senior Environmental Engineer',4,8),(82,'Solid Waste Expert',4,8),(83,'Environmental Engineer',4,9),(84,'Junior Environmental Engineer',5,10),(85,'Forman',5,10),(86,'Director Of Design and Advisory',2,4),(87,'Head of Mechanical',3,6),(88,'Lead Mechanical Engineer',3,7),(89,'Senior Mechanical Engineer',4,8),(90,'Mechanical Engineer',4,9),(91,'Junior Mechanical Engineer',5,10),(92,'Head of Proposals',3,6),(93,'Lead Proposals Coordinator',3,7),(94,'Senior Proposals Coordinator',4,8),(95,'Proposals Coordinator',4,9),(96,'Junior Proposals Coordinator',5,10),(97,'Head of Quantity Surveying',3,6),(98,'Lead Quantity Surveyor',3,7),(99,'Senior Quantity Surveyor',4,8),(100,'Quantity Surveyor',4,9),(101,'Junior Quantity Surveyor',5,10),(102,'Head of Road & Transportation Engineer',3,6),(103,'Lead Road & Transportation Engineer',3,7),(104,'Senior Road & Transportation Engineer',4,8),(105,'Road & Transportation Engineer',4,9),(106,'Junior Road & Transportation Engineer',5,10),(107,'Head of Structure',3,6),(108,'Lead Structural Engineer',3,7),(109,'Senior Structural Engineer',4,8),(110,'Structural Engineer',4,9),(111,'Junior Structural Engineer',5,10),(112,'Head of Wet Utilities',3,6),(113,'Lead Wet Infrastructure Utilities Engineer',3,7),(114,'Senior Wet Infrastructure Utilities Engineer',4,8),(115,'Wet Infrastructure Utilities Engineer',4,9),(116,'Junior Wet Infrastructure Utilities Engineer',5,10),(117,'Chief Executive Officer',1,3),(118,'Director of Finance',2,5),(119,'Senior Accountant',4,8),(120,'Accountant',4,9),(121,'Junior Accountant',5,10),(122,'Organizational Performance Lead',3,6),(124,'Planning Engineer',4,9),(125,'Administrative Manager',4,8),(126,'Office Manager',4,9),(127,'Administrative Assistant',5,10),(128,'Receptionist',5,10),(129,'Driver',7,11),(130,'Office Boy',7,11),(131,'PRO',7,11),(132,'IT Manager',3,7),(133,'Plotting Officer',5,10),(134,'Senior Software Developer',4,8),(135,'Senior System Administrator',4,8),(136,'Software Developer',4,9),(137,'Junior Software Developer',5,10),(138,'System Administrator',4,9),(139,'Junior System Administrator',5,10),(140,'Director of HR and OD',2,4),(141,'Senior Human Resource Coordinator',4,8),(142,'Senior Human Resource Officer',4,8),(143,'Senior Recruitment Coordinator',4,8),(144,'HR Business Partner',4,8),(145,'Senior Compensation and Benefits Officer',4,8),(146,'Human Resource Coordinator',4,9),(147,'Human Resource Officer',4,9),(148,'Recruitment Coordinator',4,9),(149,'Compensation and Benefits Officer',4,9),(150,'Senior Project Manager',3,6),(151,'Project Manager',3,7),(152,'PMU Coordinator',4,9),(1585,'Assistant Project Manager',4,8),(1586,'Senior Planning Engineer',4,8),(1587,'Lead Planning Engineer',3,7),(1588,'Head Planning Engineer',6,7),(1589,'Foreman',7,11);
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
  `new_position_id` int DEFAULT NULL,
  `new_employee_hourly_cost` float DEFAULT NULL,
  `changed_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changed_by` int NOT NULL,
  PRIMARY KEY (`position_history_id`),
  KEY `employee_id` (`employee_id`),
  KEY `position_history_changed_by_employee_id_idx` (`changed_by`),
  CONSTRAINT `position_history_changed_by_employee_id` FOREIGN KEY (`changed_by`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `position_history_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position_history`
--

LOCK TABLES `position_history` WRITE;
/*!40000 ALTER TABLE `position_history` DISABLE KEYS */;
INSERT INTO `position_history` VALUES (68,289,2,NULL,'2024-08-07 10:23:55',1),(69,289,3,NULL,'2024-08-07 10:24:05',1),(70,1,135,NULL,'2024-08-07 10:51:52',1),(71,1,136,NULL,'2024-08-07 10:52:09',1);
/*!40000 ALTER TABLE `position_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `geography` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `client_id` int NOT NULL,
  `typology` varchar(255) NOT NULL,
  `sector` varchar(255) NOT NULL,
  `intervention` varchar(255) NOT NULL,
  `baseline_budget` bigint NOT NULL,
  `BUA` int NOT NULL,
  `Landscape` int NOT NULL,
  `ParkingArea` int NOT NULL,
  `DesignArea` int NOT NULL,
  `planned_startdate` date NOT NULL,
  `planned_enddate` date NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `variance` float NOT NULL DEFAULT '0',
  `employee_id` int NOT NULL,
  `project_status` varchar(50) NOT NULL DEFAULT 'Highly Probable',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int NOT NULL,
  `isBaselined` varchar(3) NOT NULL DEFAULT 'No',
  PRIMARY KEY (`project_id`),
  KEY `client_id` (`client_id`),
  KEY `head_of_department_id` (`employee_id`),
  KEY `project_status_id` (`project_status`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `project_ibfk_5` FOREIGN KEY (`created_by`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (20,'JABAL','JABAL_961_2024','Albania','ALBANIAN CITY',4,'Sports','Public','Infrastructure Engineering',150000,12510,12150,7000,18000,'2024-08-01','2025-08-06','2024-08-05',NULL,0,295,'Active','2024-06-07 16:13:29',1,'Yes'),(25,'KALBA','KALBA_961_2024','Lebanon','Beirut',2,'Residential','Private','Masterplanning',1250000,12000,9000,6000,18000,'2025-03-04','2026-03-04',NULL,NULL,0,364,'Active','2024-06-11 10:46:14',1,'No'),(27,'DEMO_PROJECT','PROJECT_DEMO_961_2024','Lebanon','Beirut',6,'Residential','Private','Masterplanning',180000,12000,14200,1200,1400,'2025-04-03','2026-04-03',NULL,NULL,0,385,'Active','2024-07-22 14:38:10',1,'No'),(28,'NOMAD-KL','NOMAD_KL_961_2024','Saudi Arabia','Riyadh',7,'Residential','Private','Masterplanning',1752,12000,9000,6000,18000,'2023-12-11','2024-09-11','2024-08-09',NULL,0,385,'Active','2024-07-30 13:24:51',1,'Yes'),(31,'BASELINE_TEST','BASELINE_TEST_961_2024','Lebanon','Beirut',6,'Residential','Private','Masterplanning',180000,180000,180000,180000,18000,'2026-03-04','2027-03-04','2024-08-05',NULL,0,1,'Active','2024-08-01 22:31:13',1,'No');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_comment`
--

DROP TABLE IF EXISTS `project_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment_text` varchar(255) NOT NULL,
  `project_id` int NOT NULL,
  `is_reply` bit(1) NOT NULL,
  `reply_to_id` int DEFAULT NULL,
  `posted_on` bigint NOT NULL,
  `posted_by` int NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `project_id` (`project_id`),
  KEY `poster_id` (`posted_by`),
  KEY `reply_to_id_comment_id_idx` (`reply_to_id`),
  CONSTRAINT `project_comment_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`),
  CONSTRAINT `project_comment_ibfk_2` FOREIGN KEY (`posted_by`) REFERENCES `employee` (`employee_id`),
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
-- Table structure for table `project_disciplines`
--

DROP TABLE IF EXISTS `project_disciplines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_disciplines` (
  `project_discipline_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `discipline_id` int NOT NULL,
  PRIMARY KEY (`project_discipline_id`),
  KEY `ibfk_project_id_idx` (`project_id`),
  KEY `ibfk_discipline_id_idx` (`discipline_id`),
  CONSTRAINT `ibfk_discipline_id` FOREIGN KEY (`discipline_id`) REFERENCES `discipline` (`discipline_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ibfk_project_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=518 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_disciplines`
--

LOCK TABLES `project_disciplines` WRITE;
/*!40000 ALTER TABLE `project_disciplines` DISABLE KEYS */;
INSERT INTO `project_disciplines` VALUES (366,25,65),(367,25,66),(368,25,68),(369,25,61),(370,25,64),(399,27,61),(400,27,66),(401,27,60),(402,27,80),(403,27,78),(460,20,63),(461,20,66),(462,20,60),(463,20,61),(464,20,84),(465,20,78),(501,31,60),(502,31,62),(503,31,78),(504,31,80),(505,31,66),(506,31,75),(507,28,80),(508,28,83),(509,28,67),(510,28,63),(511,28,68),(512,28,66),(513,28,61),(514,28,64),(515,28,69),(516,28,78),(517,28,75);
/*!40000 ALTER TABLE `project_disciplines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_disciplines_versions`
--

DROP TABLE IF EXISTS `project_disciplines_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_disciplines_versions` (
  `project_discipline_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `discipline_id` int NOT NULL,
  `version` int NOT NULL,
  PRIMARY KEY (`project_discipline_id`),
  KEY `ibfk_project_id_idx` (`project_id`),
  KEY `ibfk_discipline_id_idx` (`discipline_id`),
  CONSTRAINT `ibfk_discipline_id_proj_versions` FOREIGN KEY (`discipline_id`) REFERENCES `discipline` (`discipline_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ibfk_project_id_proj_versions` FOREIGN KEY (`project_id`) REFERENCES `project_versions` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=978 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_disciplines_versions`
--

LOCK TABLES `project_disciplines_versions` WRITE;
/*!40000 ALTER TABLE `project_disciplines_versions` DISABLE KEYS */;
INSERT INTO `project_disciplines_versions` VALUES (936,83,60,1),(937,83,62,1),(938,83,66,1),(939,83,80,1),(940,83,78,1),(941,84,61,1),(942,84,66,1),(943,84,60,1),(944,84,80,1),(945,85,63,1),(946,85,66,1),(947,85,60,1),(948,85,61,1),(949,85,84,1),(950,85,78,1),(951,86,65,1),(952,86,66,1),(953,86,68,1),(954,86,61,1),(955,86,64,1),(956,87,60,2),(957,87,62,2),(958,87,66,2),(959,87,80,2),(960,87,78,2),(961,88,63,2),(962,88,66,2),(963,88,60,2),(964,88,61,2),(965,88,84,2),(966,88,78,2),(967,89,80,1),(968,89,83,1),(969,89,67,1),(970,89,63,1),(971,89,68,1),(972,89,66,1),(973,89,61,1),(974,89,64,1),(975,89,69,1),(976,89,78,1),(977,89,75,1);
/*!40000 ALTER TABLE `project_disciplines_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_versions`
--

DROP TABLE IF EXISTS `project_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_versions` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `geography` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `client_id` int NOT NULL,
  `typology` varchar(255) NOT NULL,
  `sector` varchar(255) NOT NULL,
  `intervention` varchar(255) NOT NULL,
  `baseline_budget` bigint NOT NULL,
  `BUA` int NOT NULL,
  `Landscape` int NOT NULL,
  `ParkingArea` int NOT NULL,
  `DesignArea` int NOT NULL,
  `planned_startdate` date NOT NULL,
  `planned_enddate` date NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `variance` float NOT NULL,
  `employee_id` int NOT NULL,
  `project_status` varchar(50) NOT NULL DEFAULT 'Highly Probable',
  `initial_project_id` int NOT NULL,
  `version` int NOT NULL,
  `created_on` date NOT NULL,
  `created_by` int NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `client_id` (`client_id`),
  KEY `created_by` (`created_by`),
  KEY `intial_project_id` (`initial_project_id`),
  CONSTRAINT `project_versions_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `project_versions_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `project_versions_ibfk_3` FOREIGN KEY (`initial_project_id`) REFERENCES `project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_versions`
--

LOCK TABLES `project_versions` WRITE;
/*!40000 ALTER TABLE `project_versions` DISABLE KEYS */;
INSERT INTO `project_versions` VALUES (83,'BASELINE_TEST','BASELINE_TEST_961_2024','Lebanon','Beirut',6,'Residential','Private','Masterplanning',180000,180000,180000,180000,18000,'2025-03-04','2026-03-04',NULL,NULL,0,1,'Highly Probable',31,1,'2024-08-01',1),(84,'DEMO_PROJECT','PROJECT_DEMO_961_2024','Lebanon','Beirut',6,'Residential','Private','Masterplanning',180000,12000,14200,1200,1400,'2025-04-03','2026-04-03',NULL,NULL,0,385,'Active',27,1,'2024-07-22',1),(85,'JABAL','JABAL_961_2024','Albania','ALBANIAN CITY',4,'Sports','Public','Infrastructure Engineering',150000,12510,12150,7000,18000,'2024-08-01','2025-08-06',NULL,NULL,0,295,'Active',20,1,'2024-06-07',1),(86,'KALBA','KALBA_961_2024','Lebanon','Beirut',2,'Residential','Private','Masterplanning',1250000,12000,9000,6000,18000,'2025-03-04','2026-03-04',NULL,NULL,0,364,'Active',25,1,'2024-06-11',1),(87,'BASELINE_TEST','BASELINE_TEST_961_2024','Lebanon','Beirut',6,'Residential','Private','Masterplanning',180000,180000,180000,180000,18000,'2025-03-04','2026-03-04','2024-08-05',NULL,0,1,'Active',31,2,'2024-08-01',1),(88,'JABAL','JABAL_961_2024','Albania','ALBANIAN CITY',4,'Sports','Public','Infrastructure Engineering',150000,12510,12150,7000,18000,'2024-08-01','2025-08-06','2024-08-05',NULL,0,295,'Active',20,2,'2024-08-05',1),(89,'NOMAD-KL','NOMAD_KL_961_2024','Saudi Arabia','Riyadh',7,'Residential','Private','Masterplanning',1752,12000,9000,6000,18000,'2023-12-11','2024-09-11','2024-08-09',NULL,0,385,'Active',28,1,'2024-08-09',1);
/*!40000 ALTER TABLE `project_versions` ENABLE KEYS */;
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
  CONSTRAINT `projected_work_week_ibfk_1` FOREIGN KEY (`phase_assignee_id`) REFERENCES `phase_assignee` (`phase_assignee_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=479 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projected_work_week`
--

LOCK TABLES `projected_work_week` WRITE;
/*!40000 ALTER TABLE `projected_work_week` DISABLE KEYS */;
INSERT INTO `projected_work_week` VALUES (246,19,'2023-12-11',10),(247,19,'2023-12-18',10),(248,19,'2023-12-25',10),(249,19,'2024-01-01',15),(251,20,'2023-12-18',8),(252,20,'2023-12-25',8),(253,21,'2023-12-18',10),(254,21,'2023-12-25',20),(255,22,'2024-01-15',25),(256,22,'2024-01-29',8),(257,22,'2024-02-05',8),(258,23,'2024-01-15',30),(259,23,'2024-01-29',15),(260,23,'2024-02-05',15),(261,24,'2024-01-29',5),(262,24,'2024-02-05',5),(263,25,'2023-12-18',5),(264,25,'2024-02-05',5),(265,26,'2023-12-18',10),(266,26,'2024-01-29',10),(267,27,'2023-12-18',3),(268,27,'2024-01-29',2),(269,28,'2023-12-18',5),(270,28,'2024-01-29',5),(271,29,'2023-12-18',5),(272,29,'2024-01-29',5),(273,30,'2023-12-18',20),(274,30,'2024-01-29',20),(275,31,'2023-12-18',10),(276,31,'2024-01-29',10),(277,32,'2023-12-18',4),(278,32,'2024-01-29',4),(279,33,'2023-12-18',4),(280,33,'2024-01-29',4),(281,34,'2023-12-18',15),(282,34,'2024-01-29',15),(283,35,'2024-05-13',10),(284,35,'2024-05-20',25),(285,35,'2024-05-27',25),(286,35,'2024-06-03',15),(287,35,'2024-06-10',10),(288,35,'2024-06-17',10),(289,35,'2024-06-24',10),(290,35,'2024-07-01',10),(291,36,'2024-01-29',30),(292,37,'2023-12-18',10),(293,37,'2024-01-29',20),(294,38,'2024-05-20',30),(295,38,'2024-05-27',20),(296,38,'2024-06-03',20),(297,38,'2024-06-10',10),(298,38,'2024-06-17',10),(299,38,'2024-06-24',10),(300,38,'2024-07-01',10),(301,39,'2024-05-27',3),(302,39,'2024-06-03',3),(303,39,'2024-06-10',3),(304,39,'2024-06-24',3),(305,39,'2024-07-01',3),(306,40,'2024-05-27',11),(307,40,'2024-06-03',11),(308,40,'2024-06-10',11),(309,40,'2024-06-24',11),(310,40,'2024-07-01',11),(311,41,'2024-05-27',22),(312,41,'2024-06-03',22),(313,41,'2024-06-10',22),(314,41,'2024-06-24',22),(315,41,'2024-07-01',22),(316,42,'2024-05-20',3),(317,42,'2024-05-27',5),(318,42,'2024-06-03',5),(319,42,'2024-06-10',5),(320,42,'2024-06-24',5),(323,43,'2024-06-03',5),(324,43,'2024-06-10',5),(325,43,'2024-06-24',5),(326,43,'2024-07-01',10),(327,44,'2024-07-01',5),(328,45,'2024-05-20',15),(329,45,'2024-05-27',5),(330,45,'2024-06-03',5),(331,45,'2024-06-10',5),(332,45,'2024-06-24',5),(333,45,'2024-07-01',5),(374,52,'2024-05-27',1),(375,52,'2024-06-03',12),(378,19,'2024-01-08',15),(382,52,'2024-07-01',1),(384,67,'2024-07-01',12),(398,68,'2024-07-01',12),(412,19,'2024-08-26',12),(413,20,'2024-08-26',12),(418,19,'2024-08-19',12),(419,20,'2024-08-19',12),(420,21,'2024-08-19',12),(423,19,'2024-07-01',12),(424,19,'2024-07-08',12),(425,20,'2024-07-01',12),(426,20,'2024-07-08',12),(450,67,'2024-07-08',12),(451,67,'2024-07-15',12),(452,68,'2024-07-08',12),(453,68,'2024-07-15',12),(459,67,'2024-07-22',12),(464,72,'2024-07-01',90),(465,73,'2024-07-01',12),(466,73,'2024-07-08',12),(467,73,'2024-07-15',12),(468,68,'2024-07-22',12),(477,78,'2024-07-01',12),(478,78,'2024-07-08',12);
/*!40000 ALTER TABLE `projected_work_week` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_insert_projected_work_week` AFTER INSERT ON `projected_work_week` FOR EACH ROW BEGIN
    DECLARE phase_id INT;

    -- Update expected_work_hrs in phase_assignee
    UPDATE phase_assignee
    SET expected_work_hrs = (
        SELECT IFNULL(SUM(hours_expected), 0)
        FROM projected_work_week
        WHERE phase_assignee_id = NEW.phase_assignee_id
    )
    WHERE phase_assignee_id = NEW.phase_assignee_id;

    -- Get the phase_id for the affected phase_assignee
    SELECT phase_id INTO phase_id FROM phase_assignee WHERE phase_assignee_id = NEW.phase_assignee_id;

    -- Update expected_work_hours in the phase table
    CALL update_phase_expected_work_hours(phase_id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_update_projected_work_week` AFTER UPDATE ON `projected_work_week` FOR EACH ROW BEGIN
    DECLARE phase_id INT;

    -- Update expected_work_hrs in phase_assignee
    UPDATE phase_assignee
    SET expected_work_hrs = (
        SELECT IFNULL(SUM(hours_expected), 0)
        FROM projected_work_week
        WHERE phase_assignee_id = NEW.phase_assignee_id
    )
    WHERE phase_assignee_id = NEW.phase_assignee_id;

    -- Get the phase_id for the affected phase_assignee
    SELECT phase_id INTO phase_id FROM phase_assignee WHERE phase_assignee_id = NEW.phase_assignee_id;

    -- Update expected_work_hours in the phase table
    CALL update_phase_expected_work_hours(phase_id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_delete_projected_work_week` AFTER DELETE ON `projected_work_week` FOR EACH ROW BEGIN
    DECLARE phase_id INT;

    -- Update expected_work_hrs in phase_assignee
    UPDATE phase_assignee
    SET expected_work_hrs = (
        SELECT IFNULL(SUM(hours_expected), 0)
        FROM projected_work_week
        WHERE phase_assignee_id = OLD.phase_assignee_id
    )
    WHERE phase_assignee_id = OLD.phase_assignee_id;

    -- Get the phase_id for the affected phase_assignee
    SELECT phase_id INTO phase_id FROM phase_assignee WHERE phase_assignee_id = OLD.phase_assignee_id;

    -- Update expected_work_hours in the phase table
    CALL update_phase_expected_work_hours(phase_id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `version` int NOT NULL,
  PRIMARY KEY (`projected_work_week_id`),
  KEY `phase_assignee_id` (`phase_assignee_id`),
  CONSTRAINT `projected_work_week_versions_ibfk_1` FOREIGN KEY (`phase_assignee_id`) REFERENCES `phase_assignee_versions` (`phase_assignee_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6054 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projected_work_week_versions`
--

LOCK TABLES `projected_work_week_versions` WRITE;
/*!40000 ALTER TABLE `projected_work_week_versions` DISABLE KEYS */;
INSERT INTO `projected_work_week_versions` VALUES (5928,1854,'2024-07-01',12,1),(5929,1854,'2024-07-08',12,1),(5930,1854,'2024-07-15',15,1),(5931,1855,'2024-07-01',12,1),(5932,1855,'2024-07-08',12,1),(5933,1855,'2024-07-15',15,1),(5934,1857,'2024-07-01',12,1),(5935,1857,'2024-07-08',12,1),(5936,1857,'2024-07-15',12,1),(5937,1857,'2024-07-22',12,1),(5938,1858,'2024-07-01',90,1),(5939,1859,'2024-07-01',12,2),(5940,1859,'2024-07-08',12,2),(5941,1859,'2024-07-15',12,2),(5942,1859,'2024-07-22',12,2),(5943,1860,'2024-07-01',12,2),(5944,1860,'2024-07-08',12,2),(5945,1860,'2024-07-15',12,2),(5946,1861,'2024-07-01',12,2),(5947,1861,'2024-07-08',12,2),(5948,1861,'2024-07-15',12,2),(5949,1862,'2024-07-01',12,2),(5950,1862,'2024-07-08',12,2),(5951,1862,'2024-07-15',12,2),(5952,1863,'2024-07-01',12,2),(5953,1863,'2024-07-08',12,2),(5954,1863,'2024-07-15',12,2),(5955,1864,'2023-12-11',10,1),(5956,1864,'2023-12-18',10,1),(5957,1864,'2023-12-25',10,1),(5958,1864,'2024-01-01',15,1),(5959,1864,'2024-01-08',15,1),(5960,1864,'2024-08-26',12,1),(5961,1864,'2024-08-19',12,1),(5962,1864,'2024-07-01',12,1),(5963,1864,'2024-07-08',12,1),(5964,1865,'2023-12-18',8,1),(5965,1865,'2023-12-25',8,1),(5966,1865,'2024-08-26',12,1),(5967,1865,'2024-08-19',12,1),(5968,1865,'2024-07-01',12,1),(5969,1865,'2024-07-08',12,1),(5970,1866,'2023-12-18',10,1),(5971,1866,'2023-12-25',20,1),(5972,1866,'2024-08-19',12,1),(5973,1867,'2024-01-15',25,1),(5974,1867,'2024-01-29',8,1),(5975,1867,'2024-02-05',8,1),(5976,1868,'2024-01-15',30,1),(5977,1868,'2024-01-29',15,1),(5978,1868,'2024-02-05',15,1),(5979,1869,'2024-01-29',5,1),(5980,1869,'2024-02-05',5,1),(5981,1870,'2023-12-18',5,1),(5982,1870,'2024-02-05',5,1),(5983,1871,'2023-12-18',10,1),(5984,1871,'2024-01-29',10,1),(5985,1872,'2023-12-18',3,1),(5986,1872,'2024-01-29',2,1),(5987,1873,'2023-12-18',5,1),(5988,1873,'2024-01-29',5,1),(5989,1874,'2023-12-18',5,1),(5990,1874,'2024-01-29',5,1),(5991,1875,'2023-12-18',20,1),(5992,1875,'2024-01-29',20,1),(5993,1876,'2023-12-18',10,1),(5994,1876,'2024-01-29',10,1),(5995,1877,'2023-12-18',4,1),(5996,1877,'2024-01-29',4,1),(5997,1878,'2023-12-18',4,1),(5998,1878,'2024-01-29',4,1),(5999,1879,'2023-12-18',15,1),(6000,1879,'2024-01-29',15,1),(6001,1880,'2024-01-29',30,1),(6002,1881,'2023-12-18',10,1),(6003,1881,'2024-01-29',20,1),(6004,1882,'2024-05-13',10,1),(6005,1882,'2024-05-20',25,1),(6006,1882,'2024-05-27',25,1),(6007,1882,'2024-06-03',15,1),(6008,1882,'2024-06-10',10,1),(6009,1882,'2024-06-17',10,1),(6010,1882,'2024-06-24',10,1),(6011,1882,'2024-07-01',10,1),(6012,1883,'2024-05-20',30,1),(6013,1883,'2024-05-27',20,1),(6014,1883,'2024-06-03',20,1),(6015,1883,'2024-06-10',10,1),(6016,1883,'2024-06-17',10,1),(6017,1883,'2024-06-24',10,1),(6018,1883,'2024-07-01',10,1),(6019,1884,'2024-05-27',3,1),(6020,1884,'2024-06-03',3,1),(6021,1884,'2024-06-10',3,1),(6022,1884,'2024-06-24',3,1),(6023,1884,'2024-07-01',3,1),(6024,1885,'2024-05-27',11,1),(6025,1885,'2024-06-03',11,1),(6026,1885,'2024-06-10',11,1),(6027,1885,'2024-06-24',11,1),(6028,1885,'2024-07-01',11,1),(6029,1886,'2024-05-27',22,1),(6030,1886,'2024-06-03',22,1),(6031,1886,'2024-06-10',22,1),(6032,1886,'2024-06-24',22,1),(6033,1886,'2024-07-01',22,1),(6034,1887,'2024-05-20',3,1),(6035,1887,'2024-05-27',5,1),(6036,1887,'2024-06-03',5,1),(6037,1887,'2024-06-10',5,1),(6038,1887,'2024-06-24',5,1),(6039,1888,'2024-06-03',5,1),(6040,1888,'2024-06-10',5,1),(6041,1888,'2024-06-24',5,1),(6042,1888,'2024-07-01',10,1),(6043,1889,'2024-07-01',5,1),(6044,1890,'2024-05-20',15,1),(6045,1890,'2024-05-27',5,1),(6046,1890,'2024-06-03',5,1),(6047,1890,'2024-06-10',5,1),(6048,1890,'2024-06-24',5,1),(6049,1890,'2024-07-01',5,1),(6050,1891,'2024-05-27',1,1),(6051,1891,'2024-06-03',12,1),(6052,1891,'2024-07-01',1,1),(6053,1892,'2024-07-01',12,1);
/*!40000 ALTER TABLE `projected_work_week_versions` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'HR'),(2,'Planning Administrator'),(3,'Super Admin'),(4,'Architect/Engineer'),(5,'Project Manager');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
INSERT INTO `role_permission` VALUES (1,1,1),(2,1,2);
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
-- Table structure for table `sidebar_link`
--

DROP TABLE IF EXISTS `sidebar_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sidebar_link` (
  `sidebar_link_id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `redirects_to` varchar(255) NOT NULL,
  `icon_name` varchar(255) NOT NULL,
  `isCommon` varchar(4) NOT NULL DEFAULT 'No',
  PRIMARY KEY (`sidebar_link_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sidebar_link`
--

LOCK TABLES `sidebar_link` WRITE;
/*!40000 ALTER TABLE `sidebar_link` DISABLE KEYS */;
INSERT INTO `sidebar_link` VALUES (1,'Home Page','/','home','Yes'),(2,'Error Log','/administrator/errors','warning-triangle','Yes'),(3,'Add Employee','/hr/employee/add','add-employee','No'),(4,'Employee Management','/hr/employee/all','employee-list','No'),(5,'Employee Leaves','/hr/employee/leaves','calendar-off','No'),(6,'New Project','/planning/project/add','new-project','No'),(7,'Project List','/planning/project/all','project-list','No');
/*!40000 ALTER TABLE `sidebar_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sidebar_link_role`
--

DROP TABLE IF EXISTS `sidebar_link_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sidebar_link_role` (
  `sidebar_link_role_id` int NOT NULL AUTO_INCREMENT,
  `sidebar_link_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`sidebar_link_role_id`),
  KEY `role_id_link_fk_idx` (`role_id`),
  KEY `sidebar_link_fk_idx` (`sidebar_link_id`),
  CONSTRAINT `role_id_link_fk` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `sidebar_link_fk` FOREIGN KEY (`sidebar_link_id`) REFERENCES `sidebar_link` (`sidebar_link_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sidebar_link_role`
--

LOCK TABLES `sidebar_link_role` WRITE;
/*!40000 ALTER TABLE `sidebar_link_role` DISABLE KEYS */;
INSERT INTO `sidebar_link_role` VALUES (1,3,1),(2,4,1),(3,5,1),(4,6,2),(5,7,2);
/*!40000 ALTER TABLE `sidebar_link_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'lacecodb'
--

--
-- Dumping routines for database 'lacecodb'
--
/*!50003 DROP PROCEDURE IF EXISTS `CopyProjectToVersion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CopyProjectToVersion`(IN input_project_id INT)
BEGIN
    DECLARE current_title VARCHAR(255);
    DECLARE current_code VARCHAR(255);
    DECLARE current_geography VARCHAR(255);
    DECLARE current_city VARCHAR(255);
    DECLARE current_client_id INT;
    DECLARE current_typology VARCHAR(255);
    DECLARE current_sector VARCHAR(255);
    DECLARE current_intervention VARCHAR(255);
    DECLARE current_baseline_budget BIGINT;
    DECLARE current_BUA INT;
    DECLARE current_Landscape INT;
    DECLARE current_ParkingArea INT;
    DECLARE current_DesignArea INT;
    DECLARE current_planned_startdate DATE;
    DECLARE current_planned_enddate DATE;
    DECLARE current_start_date DATE;
    DECLARE current_end_date DATE;
    DECLARE current_variance FLOAT;
    DECLARE current_employee_id INT;
    DECLARE current_project_status VARCHAR(50);
    DECLARE current_created_on DATETIME;
    DECLARE current_created_by INT;
    DECLARE current_isBaselined VARCHAR(3);
    DECLARE new_version_num INT;
    DECLARE new_project_version_id INT;


     UPDATE project SET isBaselined = 'Yes' WHERE project_id = input_project_id ;
     UPDATE project SET project_status = 'Active' WHERE project_id = input_project_id ;
      UPDATE project SET start_date = current_date() WHERE project_id = input_project_id ;
     
    -- Select the project data from the project table
    SELECT 
        title, code, geography, city, client_id, typology, sector, intervention,
        baseline_budget, BUA, Landscape, ParkingArea, DesignArea, planned_startdate,
        planned_enddate, start_date, end_date, variance, employee_id, project_status,
        created_on, created_by, isBaselined
    INTO 
        current_title, current_code, current_geography, current_city, current_client_id, 
        current_typology, current_sector, current_intervention, current_baseline_budget, 
        current_BUA, current_Landscape, current_ParkingArea, current_DesignArea, 
        current_planned_startdate, current_planned_enddate, current_start_date, 
        current_end_date, current_variance, current_employee_id, current_project_status, 
        current_created_on, current_created_by, current_isBaselined
    FROM 
        project
    WHERE 
        project_id = input_project_id;

    -- Count the number of versions for this project
    SELECT COUNT(*) INTO new_version_num
    FROM project_versions
    WHERE initial_project_id = input_project_id;

    -- Increment the count to set the new version number
    SET new_version_num = new_version_num + 1;

    -- Insert the data into the project_versions table with date formatting
    INSERT INTO project_versions (
        title, code, geography, city, client_id, typology, sector, intervention, baseline_budget, 
        BUA, Landscape, ParkingArea, DesignArea, planned_startdate, planned_enddate, start_date, 
        end_date, variance, employee_id, project_status, initial_project_id, version, created_on, created_by
    ) VALUES (
        current_title, current_code, current_geography, current_city, current_client_id, 
        current_typology, current_sector, current_intervention, current_baseline_budget, 
        current_BUA, current_Landscape, current_ParkingArea, current_DesignArea, 
        DATE_FORMAT(current_planned_startdate, '%Y-%m-%d'), DATE_FORMAT(current_planned_enddate, '%Y-%m-%d'), 
        DATE_FORMAT(current_start_date, '%Y-%m-%d'), DATE_FORMAT(current_end_date, '%Y-%m-%d'), 
        current_variance, current_employee_id, current_project_status, 
        input_project_id, new_version_num, current_timestamp(), current_created_by
    );

    -- Get the last inserted ID
    SET new_project_version_id = LAST_INSERT_ID();
    
    -- Call the procedure to insert phases into phase versions
    CALL InsertPhasesIntoPhaseVersions(input_project_id, new_version_num);

    -- Call the procedure to insert project disciplines into project disciplines versions
    CALL InsertProjectDisciplineVersions(input_project_id, new_version_num, new_project_version_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertPhaseAssigneesIntoPhaseAssigneeVersions` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertPhaseAssigneesIntoPhaseAssigneeVersions`(
    IN original_phase_id INT,
    IN new_phase_version_id INT,
    IN version_num INT
)
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE current_phase_assignee_id INT;
    DECLARE current_assignee_id INT;
    DECLARE current_work_done_hrs INT;
    DECLARE current_expected_work_hrs INT;
    DECLARE new_phase_assignee_id INT;

    -- Declare the cursor for iterating over phase assignees
    DECLARE assignee_cursor CURSOR FOR
        SELECT 
            phase_assignee_id, assignee_id, work_done_hrs, expected_work_hrs
        FROM 
            phase_assignee
        WHERE 
            phase_id = original_phase_id;

    -- Declare the handler for the end of the cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Open the cursor
    OPEN assignee_cursor;

    -- Loop through the cursor
    read_loop: LOOP
        FETCH assignee_cursor INTO 
            current_phase_assignee_id, current_assignee_id, current_work_done_hrs, current_expected_work_hrs;
        
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Insert each phase assignee into phase_assignee_versions
        INSERT INTO phase_assignee_versions (
            assignee_id, work_done_hrs, expected_work_hrs, phase_id , version
        ) VALUES (
            current_assignee_id, current_work_done_hrs, current_expected_work_hrs, 
            new_phase_version_id , version_num
        );

        -- Get the last inserted ID
        SET new_phase_assignee_id = LAST_INSERT_ID();
        
        -- Call the procedure to copy projected work weeks
        CALL InsertProjectedWorkWeeksIntoProjectedWorkWeekVersions(current_phase_assignee_id, new_phase_assignee_id , version_num);
        
    END LOOP;

    -- Close the cursor
    CLOSE assignee_cursor;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertPhasesIntoPhaseVersions` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertPhasesIntoPhaseVersions`(
    IN input_project_id INT,
    IN version_num INT
)
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE current_phase_id INT;
    DECLARE current_phase_name VARCHAR(255);
    DECLARE current_planned_startdate DATE;
    DECLARE current_planned_enddate DATE;
    DECLARE current_actioned_on DATETIME;
    DECLARE current_actioned_by INT;
    DECLARE new_phase_version_id INT;
    DECLARE current_expected_work_hours INT ;
    DECLARE current_completed_work_hours INT ;
    
    -- Declare the cursor for iterating over project phases
    DECLARE phase_cursor CURSOR FOR
        SELECT 
            phase_id, phase_name, planned_startdate, planned_enddate, actioned_on, actioned_by , expected_work_hours , completed_work_hours
        FROM 
            phase
        WHERE 
            project_id = input_project_id;
    
    -- Declare the handler for the end of the cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    -- Open the cursor
    OPEN phase_cursor;
    
    -- Loop through the cursor
    read_loop: LOOP
        FETCH phase_cursor INTO 
            current_phase_id, current_phase_name, current_planned_startdate, current_planned_enddate, current_actioned_on, current_actioned_by , current_expected_work_hours , current_completed_work_hours ;
        
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Insert each phase into phase_versions
        INSERT INTO phase_versions (
            phase_name, planned_startdate, planned_enddate, initial_phase_id, actioned_on, actioned_by, version , expected_work_hours , completed_work_hours
        ) VALUES (
            current_phase_name, DATE_FORMAT(current_planned_startdate, '%Y-%m-%d'), 
            DATE_FORMAT(current_planned_enddate, '%Y-%m-%d'), current_phase_id, 
            DATE_FORMAT(current_actioned_on, '%Y-%m-%d'), current_actioned_by, version_num , current_expected_work_hours , current_completed_work_hours 
        );
        
        -- Get the last inserted phase_version_id
        SET new_phase_version_id = LAST_INSERT_ID();
        
        -- Call the stored procedure to insert phase assignees into phase_assignee_versions
        CALL InsertPhaseAssigneesIntoPhaseAssigneeVersions(current_phase_id, new_phase_version_id, version_num);
        
    END LOOP;
    
    -- Close the cursor
    CLOSE phase_cursor;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertProjectDisciplineVersions` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertProjectDisciplineVersions`(
    IN input_project_id INT,
    IN new_version_num INT,
    IN new_project_version_id INT
)
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE current_discipline_id INT;

    -- Declare the cursor for iterating over project disciplines
    DECLARE discipline_cursor CURSOR FOR
        SELECT discipline_id
        FROM project_disciplines
        WHERE project_id = input_project_id;

    -- Declare the handler for the end of the cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Open the cursor
    OPEN discipline_cursor;

    -- Loop through the cursor
    read_loop: LOOP
        FETCH discipline_cursor INTO current_discipline_id;

        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Insert each project discipline into project_disciplines_versions
        INSERT INTO project_disciplines_versions (
            project_id, discipline_id, version
        ) VALUES (
            new_project_version_id, current_discipline_id, new_version_num
        );

    END LOOP;

    -- Close the cursor
    CLOSE discipline_cursor;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertProjectedWorkWeeksIntoProjectedWorkWeekVersions` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertProjectedWorkWeeksIntoProjectedWorkWeekVersions`(
    IN old_phase_assignee_id INT,
    IN new_phase_assignee_id INT,
    IN version_num INT
)
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE current_week_start DATE;
    DECLARE current_hours_expected INT;

    -- Declare the cursor for iterating over projected work weeks
    DECLARE work_week_cursor CURSOR FOR
        SELECT 
            week_start, hours_expected
        FROM 
            projected_work_week
        WHERE 
            phase_assignee_id = old_phase_assignee_id;

    -- Declare the handler for the end of the cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Open the cursor
    OPEN work_week_cursor;

    -- Loop through the cursor
    read_loop: LOOP
        FETCH work_week_cursor INTO 
            current_week_start, current_hours_expected;
        
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Insert each projected work week into projected_work_week_versions
        INSERT INTO projected_work_week_versions (
            phase_assignee_id, week_start, hours_expected , version
        ) VALUES (
            new_phase_assignee_id, current_week_start, current_hours_expected , version_num
        );
        
    END LOOP;

    -- Close the cursor
    CLOSE work_week_cursor;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_all_phase_assignees` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_all_phase_assignees`()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE current_phase_assignee_id INT;
    DECLARE current_phase_id INT;

    -- Declare the cursor for iterating over phase_assignees
    DECLARE phase_assignee_cursor CURSOR FOR
        SELECT phase_assignee_id, phase_id FROM phase_assignee;

    -- Declare the handler for the end of the cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Open the cursor
    OPEN phase_assignee_cursor;

    -- Loop through the cursor
    read_loop: LOOP
        FETCH phase_assignee_cursor INTO current_phase_assignee_id, current_phase_id;

        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Update expected_work_hrs for the current phase_assignee_id
        UPDATE phase_assignee
        SET expected_work_hrs = (
            SELECT IFNULL(SUM(hours_expected), 0)
            FROM projected_work_week
            WHERE phase_assignee_id = current_phase_assignee_id
        )
        WHERE phase_assignee_id = current_phase_assignee_id;

        -- Update expected_work_hours in the phase table
        CALL update_phase_expected_work_hours(current_phase_id);
    END LOOP;

    -- Close the cursor
    CLOSE phase_assignee_cursor;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_phase_expected_work_hours` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_phase_expected_work_hours`(phaseId INT)
BEGIN
    UPDATE phase
    SET expected_work_hours = (
        SELECT IFNULL(SUM(expected_work_hrs), 0)
        FROM phase_assignee
        WHERE phase_id = phaseId
    )
    WHERE phase_id = phaseId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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

-- Dump completed on 2024-08-09 14:48:45
