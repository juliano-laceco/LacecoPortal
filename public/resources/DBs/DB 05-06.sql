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
  `joined_on` date NOT NULL,
  `geography` varchar(255) NOT NULL,
  `sector` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'Ministry of Finance','2024-04-08','Lebanon','Construction',NULL),(2,'SAIP','2024-08-04','Saudi','Construction',NULL);
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
  `head_of_department_id` int NOT NULL,
  `division_id` int DEFAULT NULL,
  PRIMARY KEY (`discipline_id`),
  KEY `head_of_department_id` (`head_of_department_id`),
  KEY `division_id` (`division_id`),
  CONSTRAINT `discipline_ibfk_1` FOREIGN KEY (`head_of_department_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `discipline_ibfk_2` FOREIGN KEY (`division_id`) REFERENCES `division` (`division_id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discipline`
--

LOCK TABLES `discipline` WRITE;
/*!40000 ALTER TABLE `discipline` DISABLE KEYS */;
INSERT INTO `discipline` VALUES (1,'Business Development','2024-05-14',1,1),(2,'Business Development & Marketing','2024-05-14',1,1),(3,'Ajman Supervision','2024-05-14',1,2),(4,'Al Jabal Supervision','2024-05-14',1,2),(5,'Bridi Supervision','2024-05-14',1,2),(6,'Construction Supervision','2024-05-14',1,2),(7,'Contracts','2024-05-14',1,2),(8,'Hevolution Supervision','2024-05-14',1,2),(9,'LUNC Supervision','2024-05-14',1,2),(10,'Mekkah Supervision','2024-05-14',1,2),(11,'Myriam Island Supervision','2024-05-14',1,2),(12,'Sharjah Supervision','2024-05-14',1,2),(60,'BIM','2024-05-14',1,8),(61,'Electrical','2024-05-14',1,8),(62,'Engineering','2024-05-14',1,8),(63,'Environment','2024-05-14',1,8),(64,'Mechanical','2024-05-14',1,8),(65,'Proposals','2024-05-14',1,8),(66,'Quantity Surveying','2024-05-14',1,8),(67,'Roads','2024-05-14',1,8),(68,'Structure','2024-05-14',1,8),(69,'Wet Utilities','2024-05-14',1,8),(70,'Executive Management','2024-05-14',1,3),(71,'Finance','2024-05-14',1,4),(72,'Operational Excellence','2024-05-14',1,5),(73,'Planning','2024-05-14',1,5),(74,'Administration','2024-05-14',1,6),(75,'Information Technology','2024-05-14',1,6),(76,'Organization & Culture','2024-05-14',1,6),(77,'Talent Management','2024-05-14',1,6),(78,'Project Management Unit','2024-05-14',1,7),(79,'Board','2024-05-14',1,9),(80,'Architecture, Landscape , Interior Design','2024-05-14',1,8);
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
  `date_of_birth` date NOT NULL,
  `country` varchar(150) NOT NULL,
  `nationality` varchar(500) NOT NULL,
  `marital_status` char(10) NOT NULL,
  `major` varchar(500) NOT NULL,
  `years_of_experience` float NOT NULL,
  `contract_type_id` int NOT NULL,
  `contract_valid_till` date DEFAULT NULL,
  `position_id` int NOT NULL,
  `employee_hourly_cost` float DEFAULT NULL,
  `employee_status_id` int NOT NULL DEFAULT '1',
  `role_id` int NOT NULL DEFAULT '1',
  `work_end_date` date DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`,`position_id`),
  KEY `role_id_fk_idx` (`role_id`),
  KEY `contract_type_id_fk` (`contract_type_id`),
  KEY `status_id_fk` (`employee_status_id`),
  KEY `pos_id_fk_idx` (`position_id`),
  CONSTRAINT `contract_type_id_fk` FOREIGN KEY (`contract_type_id`) REFERENCES `contract_type` (`contract_type_id`),
  CONSTRAINT `pos_id_fk` FOREIGN KEY (`position_id`) REFERENCES `position` (`position_id`),
  CONSTRAINT `role_id_fk` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  CONSTRAINT `status_id_fk` FOREIGN KEY (`employee_status_id`) REFERENCES `employee_status` (`employee_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,NULL,'104245244317726462006','Juliano','Gharzeddine','juliano.gharzeddine@laceco.me','2000-03-04','Lebanon','Lebanese','Single','Software Engineering',3,2,'2029-04-03',6,150,1,1,NULL,'2000-03-04 00:00:00'),(51,'320',NULL,'Fayez','Makkouk','Fayez.Makkouk@laceco.me','1949-11-13','Lebanon','Lebanese','Married','Master, Engineering, Azerbaijan Red Banner Older Institute of Petroleum and Chemistry',41,1,NULL,3,NULL,1,1,NULL,'1990-01-01 00:00:00'),(52,'1304',NULL,'Bilal','Alayli','bilal.alayeli@laceco.me','1949-04-10','Lebanon','Lebanese','Married','Bachelor, Physics, Lebanese University\nDiploma, Civil Engineering, Ecole Centrale de Lyon\nPhD, Nuclear Physics, Universite de Lyon',48,1,NULL,3,NULL,1,1,NULL,'1990-01-01 00:00:00'),(53,'3097',NULL,'Wael','Debian','Wael.Debian@laceco.me','1972-06-22','Lebanon','Lebanese','Married','Diploma, Mechanical Engineering, Lebanese University',25.8,1,NULL,78,NULL,1,1,NULL,'1998-09-01 00:00:00'),(54,'3110',NULL,'Marwan','Saleh','msaleh@laceco.me','1953-02-12','Lebanon','Lebanese','Married','Diploma, Architecture, Ecole D\'architecture de Paris La Villette ENSBA\nMaster, Urban Planning, Institut D\'urbanisme Paris\nCES, Regional and Urban Planning, Ecole Nationale des Ponts et Chaussées',43,1,NULL,4,NULL,1,1,NULL,'1993-01-01 00:00:00'),(55,'3118',NULL,'Muhieddine','Berjawi','moheidine.berjawi@laceco.me','1971-04-23','Lebanon','Lebanese','Married','Bachelor, Architecture, BAU',30,1,NULL,53,NULL,1,1,NULL,'1994-08-01 00:00:00'),(56,'3120',NULL,'Mohamed','Chawwa','Mohamad.Chawa@laceco.me','1969-10-10','United Arab Emirates','Lebanese','Married','Bachelor, Architecture, Lebanese University',32,1,NULL,53,NULL,1,1,NULL,'1994-01-01 00:00:00'),(57,'3147',NULL,'Abir','Joumaa','Abir.Joumaa@laceco.me','1971-08-14','Lebanon','Lebanese','Married','Bachelor, Civil Engineering, BAU',30,1,NULL,112,NULL,1,1,NULL,'1994-08-01 00:00:00'),(58,'3163',NULL,'Ahmad','Hajjar','Ahmad.Hajjar@laceco.me','1966-07-11','United Arab Emirates','Lebanese','Married','Bachelor, Electrical Engineering, BAU',33,1,NULL,25,NULL,1,1,NULL,'1991-01-01 00:00:00'),(59,'3214',NULL,'Youssef','Bohloq','Youssef.Bohlok@laceco.me','1969-02-27','Lebanon','Lebanese','Married','-',28.4,1,NULL,133,NULL,1,1,NULL,'1996-02-01 00:00:00'),(60,'3235',NULL,'Ferial','Sleiman','Ferial.Sleiman@laceco.me','1951-05-29','Lebanon','Lebanese','Married','-',28,1,NULL,3,NULL,1,1,NULL,'1996-01-01 00:00:00'),(61,'3284',NULL,'Mustapha','El Zarif','Mustapha.ElZarif@laceco.me','1967-01-01','United Arab Emirates','Lebanese','Married','Bachelor, Industrial/ Civil Engineering, Ecole H.E.I Lille\nMaster, Physics/ Mechanical, University of Lille',31,1,NULL,21,NULL,1,1,NULL,'1998-11-04 00:00:00'),(62,'3319',NULL,'Diala','Saad','Diala.Saad@laceco.me','1978-06-28','Lebanon','Lebanese','Married','Bachelor, Gestion et Management, USJ\nMaster, Financial analysis, stock markets, USJ',23,1,NULL,118,NULL,1,1,NULL,'2001-08-13 00:00:00'),(63,'3326',NULL,'Josef','El Ghoul','josef.elghoul@laceco.me','1967-08-28','Lebanon','Lebanese','Married','Bachelor, Engineering, Makeevka University\nMaster, Engineering, Makeevka University',22.7,1,NULL,82,NULL,1,1,NULL,'2001-10-01 00:00:00'),(64,'3346',NULL,'Mohamed','Mazboudi','-','1972-03-03','Lebanon','Lebanese','Married','-',21.8,1,NULL,129,NULL,1,1,NULL,'2002-08-17 00:00:00'),(65,'3379',NULL,'Ali','Deeb','Ali.Deeb@laceco.me','1979-08-24','Lebanon','Lebanese','Married','Diploma, Civil Engineering, Lebanese University\nMaster, Water Resources and Environmental Engineering, AUB ',22,1,NULL,113,NULL,1,1,NULL,'2004-04-08 00:00:00'),(66,'3383',NULL,'Amine','Dobeissy','Amin.Dobeissy@laceco.me','1979-03-01','Lebanon','Lebanese','Married','Bachelor, Architectural Engineering, BAU',24,1,NULL,150,NULL,1,1,NULL,'2007-03-07 00:00:00'),(67,'3388',NULL,'Ola','Baghdadi','Ola.Baghdadi@laceco.me','1973-02-17','United Arab Emirates','Egyptian','Single','Bachelor, Civil Engineering, BAU',27,1,NULL,29,NULL,1,1,NULL,'2004-08-02 00:00:00'),(68,'3412',NULL,'Rami','Saad','Rami.Saad@laceco.me','1979-11-19','Lebanon','Lebanese','Married','Diploma Universitaire de la Technologie , Genie Industriel et Maintenance, Lebanese University\nDiploma, Grade de Master Energetique, CNAM',19.5,1,NULL,89,NULL,1,1,NULL,'2004-12-23 00:00:00'),(69,'3430',NULL,'Walid','Koteich','walid.koteich@laceco.me','1976-02-01','Lebanon','Lebanese','Married','Diploma, Mechanical Engineering , General Mechanics, Lebanese University ',24,1,NULL,87,NULL,1,1,NULL,'2005-04-01 00:00:00'),(70,'3454',NULL,'Bassel','Ismail','Bassel.Ismail@laceco.me','1980-08-09','Lebanon','Lebanese','Married','Bachelor, Civil Engineering, BAU',22,1,NULL,29,NULL,1,1,NULL,'2005-07-11 00:00:00'),(71,'3456',NULL,'Ghassan','Hajjar','Ghassan.Hajjar@laceco.me','1979-11-03','Lebanon','Lebanese','Married','Diploma, Civil Engineering, Lebanese University\nMaster, Civil Engineering, Balamand',21,1,NULL,27,NULL,1,1,NULL,'2005-07-19 00:00:00'),(72,'3457',NULL,'Hana','Haddar','Hana.Haddar@laceco.me','1982-01-01','Lebanon','Lebanese','Married','Bachelor, Architecture, Lebanese University',18.9,1,NULL,52,NULL,1,1,NULL,'2005-07-19 00:00:00'),(73,'3468',NULL,'Dania','Ourabi','Dania.Ourabi@laceco.me','1978-11-03','Lebanon','Lebanese','Married','Master, Architecture, Lebanese University',22,1,NULL,21,NULL,1,1,NULL,'2005-09-05 00:00:00'),(74,'3474',NULL,'Salwa','Koleilat','salwa.koleilat@laceco.me','1957-03-17','Lebanon','Lebanese','Single','Certificate, Computer Programming, BATC\nCertificate, MCSE, Formatec ',43,1,NULL,125,NULL,1,1,NULL,'2005-10-01 00:00:00'),(75,'3483',NULL,'Kamal','Mawla','-','1979-06-20','Lebanon','Lebanese','Married','-',18.6,1,NULL,129,NULL,1,1,NULL,'2005-11-01 00:00:00'),(76,'3487',NULL,'Georges','Abou Ghannam','Georges.AbouGhannam@laceco.me','1982-06-15','Lebanon','Lebanese','Married','Bachelor, Urban Planning and Environmental Science, USJ',19,1,NULL,128,NULL,1,1,NULL,'2006-01-01 00:00:00'),(77,'3494',NULL,'Hala','Daou','hala.daou@laceco.me','1982-03-14','Lebanon','Lebanese','Married','Diploma, Mechanical Engineering, Lebanese University\nMaster, Thermal Engineering, Lebanese University',17.9,1,NULL,87,NULL,1,1,NULL,'2006-04-01 00:00:00'),(78,'3502',NULL,'Fady','Yazbeck','fady.yazbeck@laceco.me','1980-12-21','Lebanon','Lebanese','Married','Diploma, Electrical and Electronics Engineering, CNAM\nMaster, Electronics Engineering, CNAM',19,1,NULL,104,NULL,1,1,NULL,'2006-06-05 00:00:00'),(79,'3503',NULL,'Wissam','Boutros','wissam.boutros@laceco.me','1982-07-09','Lebanon','Lebanese','Married','Bachelor, Architecture, Lebanese University',19,1,NULL,140,NULL,1,1,NULL,'2006-06-19 00:00:00'),(80,'3510',NULL,'Kholoud','Sayegh','Kholoud.Sayegh@laceco.me','1980-01-01','Lebanon','Lebanese','Married','Bachelor, Urban Planning, Lebanese University\nMaster, Urban Planning, Balamand',17.5,1,NULL,128,NULL,1,1,NULL,'2006-09-01 00:00:00'),(81,'3525',NULL,'Marwan','Rashed','Marwan.Rashed@laceco.me','1981-03-15','Lebanon','Lebanese','Married','Bachelor, Urban Planning, Lebanese University',18,1,NULL,140,NULL,1,1,NULL,'2006-10-15 00:00:00'),(82,'3548',NULL,'Mahmoud','Bukhari','mahmoud.bukhari@laceco.me','1981-05-27','Lebanon','Lebanese','Married','Bachelor, Landscape Architecture, AUB',16.8,1,NULL,147,NULL,1,1,NULL,'2007-01-15 00:00:00'),(83,'3549',NULL,'Lina','Saadallah','Lina.Saadallah@laceco.me','1980-08-09','Lebanon','Lebanese','Married','Diploma, Architecture, Lebanese University',18,1,NULL,140,NULL,1,1,NULL,'2007-01-01 00:00:00'),(84,'3550',NULL,'Jamil','Sibai','jamil.sibai@laceco.me','1981-07-20','Lebanon','Lebanese','Married','Bachelor, Architecture, Lebanese University\nMaster, Architecture, AUB',18,1,NULL,140,NULL,1,1,NULL,'2007-02-19 00:00:00'),(85,'3588',NULL,'Marwan','Khachfa','marwan.khachfa@laceco.me','1983-09-17','Lebanon','Lebanese','Married','Bachelor, Civil Engineering, BAU',18,1,NULL,149,NULL,1,1,NULL,'2007-06-18 00:00:00'),(86,'3591',NULL,'Elie','Bishara','Elie.Bishara@laceco.me','1984-08-13','Lebanon','Lebanese','Single','Diploma, Civil Engineering, Lebanese University\nMaster, Structure and Material, Lebanese University',17.5,1,NULL,147,NULL,1,1,NULL,'2007-09-01 00:00:00'),(87,'3594',NULL,'Sari','Sarieddine','Sari.Sarieddine@laceco.me','1985-09-01','Lebanon','Lebanese','Single','Diploma, Architecture, BAU',17,1,NULL,140,NULL,1,1,NULL,'2007-11-01 00:00:00'),(88,'3595',NULL,'Mohammed','Abdallah','mohammed.abdallah@laceco.me','1985-10-01','Lebanon','Lebanese','Single','Diploma, Electrical Engineering, Lebanese University\nMaster, Electrical Engineering, Lebanese University',16.5,1,NULL,130,NULL,1,1,NULL,'2007-12-01 00:00:00'),(89,'3602',NULL,'Aya','Bitar','Aya.Bitar@laceco.me','1984-10-01','Lebanon','Lebanese','Married','Diploma, Architecture, Lebanese University\nMaster, Urban Planning, Lebanese University',16,1,NULL,140,NULL,1,1,NULL,'2008-01-01 00:00:00'),(90,'3605',NULL,'Kassem','Chalhoub','Kassem.Chalhoub@laceco.me','1986-01-01','Lebanon','Lebanese','Single','Diploma, Architecture, Lebanese University\nMaster, Architecture, Lebanese University',15.5,1,NULL,140,NULL,1,1,NULL,'2008-03-01 00:00:00'),(91,'3621',NULL,'Fatima','Chamas','Fatima.Chamas@laceco.me','1983-06-01','Lebanon','Lebanese','Single','Diploma, Architecture, Lebanese University',15,1,NULL,140,NULL,1,1,NULL,'2008-06-01 00:00:00'),(92,'3627',NULL,'Ahmad','Said','Ahmad.Said@laceco.me','1984-08-01','Lebanon','Lebanese','Married','Diploma, Civil Engineering, Lebanese University',15,1,NULL,27,NULL,1,1,NULL,'2008-09-01 00:00:00'),(93,'3628',NULL,'Lana','Zain','Lana.Zain@laceco.me','1986-11-03','Lebanon','Lebanese','Married','Bachelor, Architecture, BAU',14.9,1,NULL,140,NULL,1,1,NULL,'2008-09-02 00:00:00'),(94,'3629',NULL,'Leila','Habib','Leila.Habib@laceco.me','1985-07-05','Lebanon','Lebanese','Single','Bachelor, Architecture, Lebanese University\nMaster, Architecture, Lebanese University',14.9,1,NULL,140,NULL,1,1,NULL,'2008-09-03 00:00:00'),(95,'3630',NULL,'Nadim','Salem','Nadim.Salem@laceco.me','1984-03-05','Lebanon','Lebanese','Single','Diploma, Architecture, Lebanese University',14.9,1,NULL,140,NULL,1,1,NULL,'2008-09-04 00:00:00'),(96,'3640',NULL,'Jihad','Hamieh','Jihad.Hamieh@laceco.me','1983-02-14','Lebanon','Lebanese','Married','Bachelor, Architecture, BAU\nMaster, Urban Planning, BAU',15,1,NULL,140,NULL,1,1,NULL,'2008-10-01 00:00:00'),(97,'3641',NULL,'Mayssa','Omar','Mayssa.Omar@laceco.me','1984-09-02','Lebanon','Lebanese','Married','Bachelor, Architecture, BAU',15,1,NULL,140,NULL,1,1,NULL,'2008-10-02 00:00:00'),(98,'3642',NULL,'Rima','Nassar','Rima.Nassar@laceco.me','1983-11-03','Lebanon','Lebanese','Married','Diploma, Civil Engineering, Lebanese University',14.9,1,NULL,27,NULL,1,1,NULL,'2008-10-03 00:00:00'),(99,'3646',NULL,'Ramy','Nasrallah','Ramy.Nasrallah@laceco.me','1981-12-05','Lebanon','Lebanese','Single','Bachelor, Civil Engineering, Lebanese University',15,1,NULL,27,NULL,1,1,NULL,'2008-11-01 00:00:00'),(100,'3650',NULL,'Elie','Saleh','elie.saleh@laceco.me','1986-04-20','Lebanon','Lebanese','Single','Diploma, Architecture, Lebanese University',15,1,NULL,140,NULL,1,1,NULL,'2008-11-02 00:00:00'),(101,'3652',NULL,'Ahmad','Nohra','Ahmad.Nohra@laceco.me','1985-02-28','Lebanon','Lebanese','Single','Diploma, Architecture, Lebanese University\nMaster, Urban Planning, Lebanese University',14.9,1,NULL,140,NULL,1,1,NULL,'2008-12-01 00:00:00'),(102,'3653',NULL,'Nabil','Fouad','Nabil.Fouad@laceco.me','1984-11-20','Lebanon','Lebanese','Single','Diploma, Architecture, Lebanese University',14.8,1,NULL,140,NULL,1,1,NULL,'2008-12-02 00:00:00'),(103,'3654',NULL,'Fadi','Atallah','Fadi.Atallah@laceco.me','1982-10-01','Lebanon','Lebanese','Married','Bachelor, Architecture, Lebanese University\nMaster, Urban Planning, Lebanese University',14.8,1,NULL,140,NULL,1,1,NULL,'2008-12-03 00:00:00'),(104,'3660',NULL,'Zeinab','Itani','Zeinab.Itani@laceco.me','1986-01-25','Lebanon','Lebanese','Single','Diploma, Architecture, Lebanese University',14.7,1,NULL,140,NULL,1,1,NULL,'2009-01-01 00:00:00'),(105,'3662',NULL,'Rasha','Ali','Rasha.Ali@laceco.me','1983-03-15','Lebanon','Lebanese','Single','Diploma, Architecture, Lebanese University\nMaster, Urban Planning, Lebanese University',14.7,1,NULL,140,NULL,1,1,NULL,'2009-01-01 00:00:00'),(106,'3663',NULL,'Hassan','Moussawi','Hassan.Moussawi@laceco.me','1984-06-01','Lebanon','Lebanese','Single','Diploma, Architecture, Lebanese University',14.7,1,NULL,140,NULL,1,1,NULL,'2009-01-01 00:00:00'),(107,'3666',NULL,'Hussein','Mehdi','Hussein.Mehdi@laceco.me','1984-09-07','Lebanon','Lebanese','Single','Diploma, Architecture, Lebanese University\nMaster, Urban Planning, Lebanese University',14.7,1,NULL,140,NULL,1,1,NULL,'2009-01-02 00:00:00'),(108,'3667',NULL,'Aya','Amine','Aya.Amine@laceco.me','1983-10-02','Lebanon','Lebanese','Single','Diploma, Architecture, Lebanese University\nMaster, Architecture, Lebanese University',14.6,1,NULL,140,NULL,1,1,NULL,'2009-01-02 00:00:00'),(109,'3668',NULL,'Nada','Nadim','Nada.Nadim@laceco.me','1983-11-03','Lebanon','Lebanese','Single','Bachelor, Architecture, Lebanese University\nMaster, Urban Planning, Lebanese University',14.6,1,NULL,140,NULL,1,1,NULL,'2009-01-02 00:00:00'),(110,'3669',NULL,'Hussein','Saad','Hussein.Saad@laceco.me','1986-12-03','Lebanon','Lebanese','Single','Bachelor, Architecture, Lebanese University\nMaster, Urban Planning, Lebanese University',14.6,1,NULL,140,NULL,1,1,NULL,'2009-01-03 00:00:00');
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
  CONSTRAINT `changed_by_employee_id` FOREIGN KEY (`changed_by`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `employee_status_history_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `employee_status_history_ibfk_3` FOREIGN KEY (`new_status_id`) REFERENCES `employee_status` (`employee_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave`
--

LOCK TABLES `leave` WRITE;
/*!40000 ALTER TABLE `leave` DISABLE KEYS */;
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
  `phase_name` bigint NOT NULL,
  `planned_startdate` date NOT NULL,
  `planned_enddate` date NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `phase_status` varchar(255) NOT NULL,
  `project_id` int NOT NULL,
  `actioned_on` date NOT NULL,
  `actioned_by` int NOT NULL,
  PRIMARY KEY (`phase_id`),
  KEY `actioned_by` (`actioned_by`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `phase_ibfk_1` FOREIGN KEY (`actioned_by`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `phase_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `project` (`project_id`)
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
  `old_start_date` date NOT NULL,
  `new_start_date` date NOT NULL,
  `old_end_date` date NOT NULL,
  `new_end_date` date NOT NULL,
  `phase_status` varchar(255) DEFAULT NULL,
  `actioned_on` date NOT NULL,
  `actioned_by` int NOT NULL,
  PRIMARY KEY (`phase_history_id`,`actioned_by`),
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
-- Table structure for table `phase_name`
--

DROP TABLE IF EXISTS `phase_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phase_name` (
  `phase_name_id` int NOT NULL AUTO_INCREMENT,
  `phase_name` varchar(255) NOT NULL,
  PRIMARY KEY (`phase_name_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phase_name`
--

LOCK TABLES `phase_name` WRITE;
/*!40000 ALTER TABLE `phase_name` DISABLE KEYS */;
INSERT INTO `phase_name` VALUES (1,'Master Plan'),(2,'Pre-Conceptual Design'),(3,'Conceptual Design'),(4,'Schematic Design'),(5,'Building Permit'),(6,'Detailed Design'),(7,'Tender Documents');
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
  `phase_name` bigint NOT NULL,
  `planned_startdate` date NOT NULL,
  `planned_enddate` date NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `phase_status` varchar(255) NOT NULL,
  `initial_phase_id` int NOT NULL,
  `version` int NOT NULL,
  `actioned_on` date NOT NULL,
  `actioned_by` int NOT NULL,
  PRIMARY KEY (`phase_id`),
  KEY `initial_phase_id` (`initial_phase_id`),
  KEY `actioned_by` (`actioned_by`),
  CONSTRAINT `phase_versions_ibfk_1` FOREIGN KEY (`initial_phase_id`) REFERENCES `phase` (`phase_id`),
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
  `discipline_id` int NOT NULL,
  `level_of_management_id` int NOT NULL,
  `grade_id` int NOT NULL,
  PRIMARY KEY (`position_id`),
  KEY `ibfk_discipline_id_FK_idx` (`discipline_id`),
  KEY `ibfk_level_of_management_id_FK_idx` (`level_of_management_id`),
  KEY `ibfk_grade_id_FK_idx` (`grade_id`),
  CONSTRAINT `ibfk_discipline_id_FK` FOREIGN KEY (`discipline_id`) REFERENCES `discipline` (`discipline_id`),
  CONSTRAINT `ibfk_grade_id_FK` FOREIGN KEY (`grade_id`) REFERENCES `grade` (`grade_id`),
  CONSTRAINT `ibfk_level_of_management_id_FK` FOREIGN KEY (`level_of_management_id`) REFERENCES `level_of_management` (`level_of_management_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1589 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (2,'Director of Operations',9,1,3),(3,'Partner',9,1,3),(4,'Design Principal',9,1,3),(5,'Director of Business Development',1,2,5),(6,'Business Development Manager',1,3,6),(7,'Business Development Coordinator',1,4,9),(8,'Marketing Manager',2,3,6),(9,'Senior Graphic Designer',2,4,8),(10,'Senior Marketing Coordinator',2,4,8),(11,'Public Relations Specialist',2,4,9),(12,'Graphic Designer',2,4,9),(13,'Marketing Coordinator',2,4,9),(14,'Contracts Manager',7,3,6),(15,'Head of Contracts',7,3,6),(16,'Contracts Administrator',7,4,8),(17,'Director of Construction',6,2,4),(18,'HSE Manager',6,3,6),(19,'Site Project Manager',6,3,6),(20,'Resident Architect',6,3,6),(21,'Resident Engineer',6,3,6),(22,'Senior Site Project Manager',6,3,6),(23,'Lead Site Architect',6,4,7),(24,'Lead Site Civil Engineer',6,4,7),(25,'Lead Site Electrical Engineer',6,4,7),(26,'Lead Site Mechanical Engineer',6,4,7),(27,'Senior Quantity Surveyor',6,4,8),(28,'Senior Site Architect',6,4,8),(29,'Senior Site Civil Engineer',6,4,8),(30,'Senior Site Electrical Engineer',6,4,8),(31,'Senior Site Mechanical Engineer',6,4,8),(32,'Quantity Surveyor',6,4,9),(33,'Senior Safety Officer',6,4,9),(34,'Site Architect',6,4,9),(35,'Site Civil Engineer',6,4,9),(36,'Site Electrical Engineer',6,4,9),(37,'Site Mechanical Engineer',6,4,9),(38,'Architectural Inspector',6,5,10),(39,'Civil Inspector',6,5,10),(40,'Document Controller',6,5,10),(41,'Electrical Inspector',6,5,10),(42,'Finishing Inspector',6,5,10),(43,'HSE Engineer',6,5,10),(44,'Mechanical Inspector',6,5,10),(45,'Safety Officer',6,5,10),(46,'Senior Architectural Inspector',6,5,10),(47,'Senior Civil Inspector',6,5,10),(48,'Senior Document Controller',6,5,10),(49,'Senior Electrical Inspector',6,5,10),(50,'Senior Finishing Inspector',6,5,10),(51,'Senior Mechanical Inspector',6,5,10),(52,'Head of Architecture',80,3,6),(53,'Lead Architect',80,3,7),(54,'Lead Interior Designer',80,3,7),(55,'Lead Landscape Architect',80,3,7),(56,'Lead Urban Designer',80,3,7),(57,'Senior Architect',80,4,8),(58,'Senior Interior Designer',80,4,8),(59,'Senior Landscape Architect',80,4,8),(60,'Senior Urban Designer',80,4,8),(61,'Architect',80,4,9),(62,'Interior Designer',80,4,9),(63,'Landscape Architect',80,4,9),(64,'Senior Draftsman',80,4,9),(65,'Urban Designer',80,4,9),(66,'Draftsman',80,5,10),(67,'Junior Architect',80,5,10),(68,'Junior Interior Designer',80,5,10),(69,'Junior Landscape Architect',80,5,10),(70,'Junior Urban Designer',80,5,10),(71,'BIM Manager',60,4,8),(72,'BIM Coordinator',60,4,9),(73,'Electrical Engineer',61,4,9),(74,'Head of Electrical',61,3,6),(75,'Lead Electrical Engineer',61,3,7),(76,'Senior Electrical Engineer',61,4,8),(77,'Junior Electrical Engineer',61,5,10),(78,'Director of Engineering',62,2,5),(79,'Head of Environmental',63,3,8),(80,'Lead Environmental Engineer',63,3,7),(81,'Senior Environmental Engineer',63,4,8),(82,'Solid Waste Expert',63,4,8),(83,'Environmental Engineer',63,4,9),(84,'Junior Environmental Engineer',63,5,10),(85,'Forman',63,5,10),(86,'Director Of Design and Advisory',80,2,4),(87,'Head of Mechanical',64,3,6),(88,'Lead Mechanical Engineer',64,3,7),(89,'Senior Mechanical Engineer',64,4,8),(90,'Mechanical Engineer',64,4,9),(91,'Junior Mechanical Engineer',64,5,10),(92,'Head of Proposals',65,3,6),(93,'Lead Proposals Coordinator',65,3,7),(94,'Senior Proposals Coordinator',65,4,8),(95,'Proposals Coordinator',65,4,9),(96,'Junior Proposals Coordinator',65,5,10),(97,'Head of Quantity Surveying',66,3,6),(98,'Lead Quantity Surveyor',66,3,7),(99,'Senior Quantity Surveyor',66,4,8),(100,'Quantity Surveyor',66,4,9),(101,'Junior Quantity Surveyor',66,5,10),(102,'Head of Road & Transportation Engineer',67,3,6),(103,'Lead Road & Transportation Engineer',67,3,7),(104,'Senior Road & Transportation Engineer',67,4,8),(105,'Road & Transportation Engineer',67,4,9),(106,'Junior Road & Transportation Engineer',67,5,10),(107,'Head of Structure',68,3,6),(108,'Lead Structural Engineer',68,3,7),(109,'Senior Structural Engineer',68,4,8),(110,'Structural Engineer',68,4,9),(111,'Junior Structural Engineer',68,5,10),(112,'Head of Wet Utilities',69,3,6),(113,'Lead Wet Infrastructure Utilities Engineer',69,3,7),(114,'Senior Wet Infrastructure Utilities Engineer',69,4,8),(115,'Wet Infrastructure Utilities Engineer',69,4,9),(116,'Junior Wet Infrastructure Utilities Engineer',69,5,10),(117,'Chief Executive Officer',70,1,3),(118,'Director of Finance',71,2,5),(119,'Senior Accountant',71,4,8),(120,'Accountant',71,4,9),(121,'Junior Accountant',71,5,10),(122,'Organizational Performance Lead',72,3,6),(123,'Developer',73,4,9),(124,'Planning Engineer',73,4,9),(125,'Administrative Manager',74,4,8),(126,'Office Manager',74,4,9),(127,'Administrative Assistant',74,5,10),(128,'Receptionist',74,5,10),(129,'Driver',74,7,11),(130,'Office Boy',74,7,11),(131,'PRO',74,7,11),(132,'IT Manager',75,3,7),(133,'Plotting Officer',75,5,10),(134,'Senior Software Developer',75,4,8),(135,'Senior System Administrator',75,4,8),(136,'Software Developer',75,4,9),(137,'Junior Software Developer',75,5,10),(138,'System Administrator',75,4,9),(139,'Junior System Administrator',75,5,10),(140,'Director of HR and OD',76,2,4),(141,'Senior Human Resource Coordinator',77,4,8),(142,'Senior Human Resource Officer',77,4,8),(143,'Senior Recruitment Coordinator',77,4,8),(144,'HR Business Partner',77,4,8),(145,'Senior Compensation and Benefits Officer',77,4,8),(146,'Human Resource Coordinator',77,4,9),(147,'Human Resource Officer',77,4,9),(148,'Recruitment Coordinator',77,4,9),(149,'Compensation and Benefits Officer',77,4,9),(150,'Senior Project Manager',78,3,6),(151,'Project Manager',78,3,7),(152,'PMU Coordinator',78,4,9),(1585,'Assistant Project Manager',78,4,8),(1586,'Senior Planning Engineer',73,4,8),(1587,'Lead Planning Engineer',73,3,7),(1588,'Head Planning Engineer',73,6,7);
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
  CONSTRAINT `position_history_changed_by_employee_id` FOREIGN KEY (`changed_by`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `position_history_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position_history`
--

LOCK TABLES `position_history` WRITE;
/*!40000 ALTER TABLE `position_history` DISABLE KEYS */;
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
  PRIMARY KEY (`project_id`),
  KEY `client_id` (`client_id`),
  KEY `head_of_department_id` (`employee_id`),
  KEY `project_status_id` (`project_status`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `project_ibfk_5` FOREIGN KEY (`created_by`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
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
-- Table structure for table `projects_versions`
--

DROP TABLE IF EXISTS `projects_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects_versions` (
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
  `intial_project_id` int NOT NULL,
  `version` int NOT NULL,
  `created_on` date NOT NULL,
  `created_by` int NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `client_id` (`client_id`),
  KEY `created_by` (`created_by`),
  KEY `intial_project_id` (`intial_project_id`),
  CONSTRAINT `projects_versions_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  CONSTRAINT `projects_versions_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `projects_versions_ibfk_3` FOREIGN KEY (`intial_project_id`) REFERENCES `project` (`project_id`)
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
INSERT INTO `role` VALUES (1,'HR'),(2,'Planning Administrator');
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

-- Dump completed on 2024-06-05 17:14:30
