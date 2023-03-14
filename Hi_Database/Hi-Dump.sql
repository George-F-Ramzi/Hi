CREATE DATABASE  IF NOT EXISTS `Hi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `Hi`;
-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: Hi
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `Contact_Request`
--

DROP TABLE IF EXISTS `Contact_Request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contact_Request` (
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sender_id`,`receiver_id`),
  KEY `fk_Contact_Request_Users2_idx` (`receiver_id`),
  CONSTRAINT `fk_Contact_Request_Users1` FOREIGN KEY (`sender_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `fk_Contact_Request_Users2` FOREIGN KEY (`receiver_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contact_Request`
--

LOCK TABLES `Contact_Request` WRITE;
/*!40000 ALTER TABLE `Contact_Request` DISABLE KEYS */;
/*!40000 ALTER TABLE `Contact_Request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Contacts`
--

DROP TABLE IF EXISTS `Contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contact_id` int NOT NULL,
  `contact_to` int NOT NULL,
  PRIMARY KEY (`id`,`contact_id`,`contact_to`),
  KEY `fk_Contacts_Users_idx` (`contact_id`),
  KEY `fk_Contacts_Users1_idx` (`contact_to`),
  CONSTRAINT `fk_Contacts_Users` FOREIGN KEY (`contact_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `fk_Contacts_Users1` FOREIGN KEY (`contact_to`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contacts`
--

LOCK TABLES `Contacts` WRITE;
/*!40000 ALTER TABLE `Contacts` DISABLE KEYS */;
INSERT INTO `Contacts` VALUES (28,7,11),(29,11,7);
/*!40000 ALTER TABLE `Contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Conversation`
--

DROP TABLE IF EXISTS `Conversation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Conversation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `message` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`sender_id`,`receiver_id`),
  KEY `fk_Converstion_Users1_idx` (`sender_id`),
  KEY `fk_Converstion_Users2_idx` (`receiver_id`),
  CONSTRAINT `fk_Converstion_Users1` FOREIGN KEY (`sender_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `fk_Converstion_Users2` FOREIGN KEY (`receiver_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1009 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Conversation`
--

LOCK TABLES `Conversation` WRITE;
/*!40000 ALTER TABLE `Conversation` DISABLE KEYS */;
INSERT INTO `Conversation` VALUES (989,11,7,'.','2023-03-14 09:02:23'),(990,7,11,'p','2023-03-14 09:02:30'),(991,11,7,'\'','2023-03-14 09:02:32'),(992,7,11,';','2023-03-14 09:02:34'),(993,7,11,'./','2023-03-14 09:02:41'),(994,11,7,']\\][\\[]','2023-03-14 09:02:44'),(995,7,11,'y','2023-03-14 09:09:39'),(996,11,7,'y','2023-03-14 09:09:42'),(997,11,7,'[','2023-03-14 09:09:51'),(998,7,11,'i','2023-03-14 09:09:54'),(999,11,7,'w','2023-03-14 09:29:35'),(1000,7,11,'o','2023-03-14 09:29:37'),(1001,7,11,'y','2023-03-14 09:31:35'),(1002,11,7,'y','2023-03-14 09:31:38'),(1003,7,11,'tyu','2023-03-14 09:31:40'),(1004,11,7,'op[','2023-03-14 09:31:42'),(1005,7,11,'o','2023-03-14 09:31:47'),(1006,11,7,'po','2023-03-14 09:31:49'),(1007,11,7,'?','2023-03-14 09:31:59'),(1008,7,11,']','2023-03-14 09:32:01');
/*!40000 ALTER TABLE `Conversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(455) NOT NULL,
  `email` varchar(255) NOT NULL,
  `photo` varchar(445) NOT NULL DEFAULT 'https://res.cloudinary.com/dwnvkwrox/image/upload/v1671018225/123456789.png',
  `photo_id` varchar(255) NOT NULL DEFAULT '123456789',
  `details` varchar(445) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (7,'george','$2b$10$8NSSE4eSuwqcMmxmuxELRuf0Zs4cwMxXMlYlwxZlqtJ.v3BvacTEG','1@1.com','https://res.cloudinary.com/dwnvkwrox/image/upload/v1672565998/puv5vned4slorzy1lfwf.jpg','puv5vned4slorzy1lfwf','Loren ispum dolr sit mit quit '),(8,'Maraim Khaild','$2b$10$b.BwkHd4q3bt3mHXDJa.4ukloMtlmFDlXts7mDxvkyuYw60Cwi6xy','332@3.com','https://res.cloudinary.com/dwnvkwrox/image/upload/v1677842385/150_savlep.jpg','150_savlep',NULL),(9,'Khalid','$2b$10$o1TJhpaEw8zul/e0zt4rieizYeT4NP.DdPGsCCDLr8wuDi65cAv0.','13@1.com','https://res.cloudinary.com/dwnvkwrox/image/upload/v1671018225/123456789.png','123456789',NULL),(10,'Sara','$2b$10$o1TJhpaEw8zul/e0zt4rieizYeT4NP.DdPGsCCDLr8wuDi65cAv0.','4@1.com','https://res.cloudinary.com/dwnvkwrox/image/upload/v1671018225/123456789.png','123456789',NULL),(11,'Karim','$2b$10$8NSSE4eSuwqcMmxmuxELRuf0Zs4cwMxXMlYlwxZlqtJ.v3BvacTEG','5@1.com','https://res.cloudinary.com/dwnvkwrox/image/upload/v1671018225/123456789.png','123456789',NULL);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-14 13:12:02
