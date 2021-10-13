CREATE DATABASE  IF NOT EXISTS `e` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `eth-credentials`;
-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: localhost    Database: eth-credentials
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(45) DEFAULT NULL,
  `passphrase` varchar(45) DEFAULT NULL,
  `sKey` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'0x04fb94f5e2555d1e860462060337aa62ec6e919d','user-acc','test'),(2,'0xBde9AD0a1D6EaBABBFe53F517A76BFBa570ed3AC','passphrase-agg1','...'),(3,'0x8c9e37d1aBB9823fD71438538321942C94b2c9AF','passphrase-prosumer1','...'),(4,'0xD135b60F1b2e9E6C9b933D0a0b7437FdE87Ae17b','passphrase-prosumer2','...'),(5,'0x0b1232F6F7567dEcA878d7595183BBEd36459a1c','passphrase-prosumer3','...'),(6,'0x54D3FFAAD5B0952375430Cf459bAC25A29f4890E','passphrase-prosumer4','...'),(7,'0xECf495De29d285B6E54a48f54897226A3cdf5904','passphrase-prosumer5','...'),(8,'0xd468cc0ba65249CBca813900eC01751D6E2e2fE1','passphrase-prosumer6','...'),(9,'0x8950338c99E3D92bdA9EcE9832AA38194Da43586','passphrase-agg2','...'),(10,'0xc9f711F29512123360046fdE9f982CA085A093F9','passphrase-prosumer7','...'),(11,'0x32400130B82Fa81021393c84BFdDa05ffA610BB2','passphrase-prosumer8','...'),(12,'0x95058150A25546B4cECbC71AFcC63491A67CdEad','passphrase-prosumer9','...'),(13,'0x1D76B851e85F56aDB5B9858abeA4b39dc30E3411','passphrase-prosumer10','...'),(14,'0x57332ae0F524fC24d567cF286faBf3CEB8AcB37d','passphrase-prosumer11','...'),(15,'0x748239771DB9c367c05c7FD3E6AF35e4F04184B1','passphrase-prosumer12','...'),(23,'0x7639B9129ddA354F32c54d370D7BF2a1F68DE279','passphrase-battery','...'),(24,'0x76FBA49331c531564A67BdfEF8E0bD2F36653322','passphrase-generator','...'),(25,'0xf8291CEaE8347194aDAcb19752Ba6233E3e9aF10','pass-dso','...');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-21 15:22:28
