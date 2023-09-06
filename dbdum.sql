CREATE DATABASE  IF NOT EXISTS `teatteri` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `teatteri`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: teatteri
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `name_sv` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Teatteri','/images/teatteri.jpg','enklish','på svensk2a'),(2,'Ooppera','/images/ooppera.jpg','enklish2','på svens3ka'),(3,'Esitystaide','/images/capture3.png','enklish3','på sven4ska'),(4,'Sirkus','/images/sirkus.jpg','enklish4','på sven5ska'),(5,'Tanssitaide','/images/tanssi.jpg','enklish5','på sven6ska');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenttext`
--

DROP TABLE IF EXISTS `contenttext`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenttext` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` longtext,
  `subcategory_id` int DEFAULT NULL,
  `text_en` longtext,
  `text_sv` longtext,
  PRIMARY KEY (`id`),
  KEY `subcategory_id_idx` (`subcategory_id`),
  CONSTRAINT `subcategory_idd` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenttext`
--

LOCK TABLES `contenttext` WRITE;
/*!40000 ALTER TABLE `contenttext` DISABLE KEYS */;
INSERT INTO `contenttext` VALUES (8,'MARJO KUUSELAN koreografia Aleksis Kiven romaaniin Seitsemän\nveljestä on yksi eniten esitetyistä teoksista Suomen Kansallisbaletin\nohjelmistossa. Teos on palannut baletin ohjelmistoon vuosina 1992 ja\n2013, mikä on harvinaista tanssin kotimaiselle kantaesitykselle.\n\nMarjo Kuusela oli tullut tunnetuksi yhtenä suomalaisen tanssiteatterin\nuranuurtajista sekä Tanssiteatteri Raatikon perustajana (1972) yhdessä\ntanssija Maria Wolskan kanssa. Seitsemässä veljeksessä Kuusela kertoi\nkaikkien suomalaisten tunteman veljesten kasvutarinan klassisen\nbaletin ja modernin tanssin liikeilmaisua yhdistäen. Romaani oli liian\nlaaja tanssiteokseksi, mutta Kuusela onnistui tiivistämään teoksen\ntanssiesityksen raameihin sopivaksi. Koreografia syntyi vuorovaikutuksessa\ntanssijoiden kanssa, jotka toivat prosessiin baletin liikemateriaalia sillä\nkokeillen ja leikkien. Kuusela muistelee, että mikäli ”piruetti ei loppunut\ntäsmällisesti, virhe otettiin haltuun ja siitä tuli osa koreografiaa.”\n\nVeljesten erilaiset luonteet, heidän keskinäiset suhteensa ja jännitteet\nheidän ja ympäröivän yhteisön välillä piirtyvät esiin tanssijoiden vahvassa\nnäyttelijäntyössä sekä taitavasti sommitelluissa ryhmäkohtauksissa. Romaanin\nkuuluisan Hiidenkivi-kohtauksen härät ovat koreografiassa myös naisia, jotka\nhoukuttelevat nuoria miehiä synnin poluille.\nKohtaus, jossa haluttomat veljekset opettelevat aakkosia ankaran\nlukkarin opissa, kääntyy koreografiassa tanssiliikkeiden opetteluksi.\n\nTeosta on esitetty kiertueilla Suomessa ja ulkomailla, ja siitä on tullut\nkeskeinen osa suomalaisen tanssitaiteen kaanonia.',NULL,NULL,NULL),(9,'Marjo Kuuselan koreografia Aleksis Kiven romaaniin [Seitsemän veljestä] on yksi eniten esitetyistä teoksista Suomen Kansallisbaletin ohjelmistossa. Teos on palannut baletin ohjelmistoon vuosina 1992 ja 2013, mikä on harvinaista tanssin kotimaiselle kantaesitykselle.  \n\nMarjo Kuusela oli tullut tunnetuksi yhtenä suomalaisen tanssiteatterin uranuurtajista sekä Tanssiteatteri Raatikon perustajana (1972) yhdessä tanssija Maria Wolskan kanssa. [Seitsemässä veljeksessä] Kuusela kertoi kaikkien suomalaisten tunteman veljesten kasvutarinan klassisen baletin ja modernin tanssin liikeilmaisua yhdistäen. Romaani oli liian laaja tanssiteokseksi, mutta Kuusela onnistui tiivistämään teoksen tanssiesityksen raameihin sopivaksi. Koreografia syntyi vuorovaikutuksessa tanssijoiden kanssa, jotka toivat prosessiin baletin liikemateriaalia sillä kokeillen ja leikkien. Kuusela muistelee, että mikäli ”piruetti ei loppunut täsmällisesti, virhe otettiin haltuun ja siitä tuli osa koreografiaa.” \nMarjo Kuusela oli tullut tunnetuksi yhtenä suomalaisen tanssiteatterin uranuurtajista sekä Tanssiteatteri Raatikon perustajana (1972) yhdessä tanssija Maria Wolskan kanssa. [Seitsemässä veljeksessä] Kuusela kertoi kaikkien suomalaisten tunteman veljesten kasvutarinan klassisen baletin ja modernin tanssin liikeilmaisua yhdistäen. Romaani oli liian laaja tanssiteokseksi, mutta Kuusela onnistui tiivistämään teoksen tanssiesityksen raameihin sopivaksi. Koreografia syntyi vuorovaikutuksessa tanssijoiden kanssa, jotka toivat prosessiin baletin liikemateriaalia sillä kokeillen ja leikkien. Kuusela muistelee, että mikäli ”piruetti ei loppunut täsmällisesti, virhe otettiin haltuun ja siitä tuli osa koreografiaa.” \n\nVeljesten erilaiset luonteet, heidän keskinäiset suhteensa ja jännitteet heidän ja ympäröivän yhteisön välillä piirtyvät esiin tanssijoiden vahvassa näyttelijäntyössä sekä taitavasti sommitelluissa ryhmäkohtauksissa. Romaanin kuuluisan Hiidenkivi-kohtauksen härät ovat koreografiassa myös naisia, jotka houkuttelevat nuoria miehiä synnin poluille. Kohtaus, jossa haluttomat veljekset opettelevat aakkosia ankaran lukkarin opissa, kääntyy koreografiassa tanssiliikkeiden opetteluksi. \n\nTeosta on esitetty kiertueilla Suomessa ja ulkomailla, ja siitä on tullut keskeinen osa suomalaisen tanssitaiteen kaanonia.  ',1,'english','sweds'),(18,NULL,NULL,NULL,NULL),(25,'Marjo Kuuselan koreografia Aleksis Kiven romaaniin [Seitsemän veljestä] on yksi eniten esitetyistä teoksista Suomen Kansallisbaletin ohjelmistossa. Teos on palannut baletin ohjelmistoon vuosina 1992 ja 2013, mikä on harvinaista tanssin kotimaiselle kantaesitykselle.  \n\nMarjo Kuusela oli tullut tunnetuksi yhtenä suomalaisen tanssiteatterin uranuurtajista sekä Tanssiteatteri Raatikon perustajana (1972) yhdessä tanssija Maria Wolskan kanssa. [Seitsemässä veljeksessä] Kuusela kertoi kaikkien suomalaisten tunteman veljesten kasvutarinan klassisen baletin ja modernin tanssin liikeilmaisua yhdistäen. Romaani oli liian laaja tanssiteokseksi, mutta Kuusela onnistui tiivistämään teoksen tanssiesityksen raameihin sopivaksi. Koreografia syntyi vuorovaikutuksessa tanssijoiden kanssa, jotka toivat prosessiin baletin liikemateriaalia sillä kokeillen ja leikkien. Kuusela muistelee, että mikäli ”piruetti ei loppunut täsmällisesti, virhe otettiin haltuun ja siitä tuli osa koreografiaa.” \n\nMarjo Kuusela oli tullut tunnetuksi yhtenä suomalaisen tanssiteatterin uranuurtajista sekä Tanssiteatteri Raatikon perustajana (1972) yhdessä tanssija Maria Wolskan kanssa. [Seitsemässä veljeksessä] Kuusela kertoi kaikkien suomalaisten tunteman veljesten kasvutarinan klassisen baletin ja modernin tanssin liikeilmaisua yhdistäen. Romaani oli liian laaja tanssiteokseksi, mutta Kuusela onnistui tiivistämään teoksen tanssiesityksen raameihin sopivaksi. Koreografia syntyi vuorovaikutuksessa tanssijoiden kanssa, jotka toivat prosessiin baletin liikemateriaalia sillä kokeillen ja leikkien. Kuusela muistelee, että mikäli ”piruetti ei loppunut täsmällisesti, virhe otettiin haltuun ja siitä tuli osa koreografiaa.” \n\nVeljesten erilaiset luonteet, heidän keskinäiset suhteensa ja jännitteet heidän ja ympäröivän yhteisön välillä piirtyvät esiin tanssijoiden vahvassa näyttelijäntyössä sekä taitavasti sommitelluissa ryhmäkohtauksissa. Romaanin kuuluisan Hiidenkivi-kohtauksen härät ovat koreografiassa myös naisia, jotka houkuttelevat nuoria miehiä synnin poluille. Kohtaus, jossa haluttomat veljekset opettelevat aakkosia ankaran lukkarin opissa, kääntyy koreografiassa tanssiliikkeiden opetteluksi. \n\nTeosta on esitetty kiertueilla Suomessa ja ulkomailla, ja siitä on tullut keskeinen osa suomalaisen tanssitaiteen kaanonia.  ',51,'asd','dasdasf'),(26,'Marjo Kuuselan koreografia Aleksis Kiven romaaniin [Seitsemän veljestä] on yksi eniten esitetyistä teoksista Suomen Kansallisbaletin ohjelmistossa. Teos on palannut baletin ohjelmistoon vuosina 1992 ja 2013, mikä on harvinaista tanssin kotimaiselle kantaesitykselle.  \n\nMarjo Kuusela oli tullut tunnetuksi yhtenä suomalaisen tanssiteatterin uranuurtajista sekä Tanssiteatteri Raatikon perustajana (1972) yhdessä tanssija Maria Wolskan kanssa. [Seitsemässä veljeksessä] Kuusela kertoi kaikkien suomalaisten tunteman veljesten kasvutarinan klassisen baletin ja modernin tanssin liikeilmaisua yhdistäen. Romaani oli liian laaja tanssiteokseksi, mutta Kuusela onnistui tiivistämään teoksen tanssiesityksen raameihin sopivaksi. Koreografia syntyi vuorovaikutuksessa tanssijoiden kanssa, jotka toivat prosessiin baletin liikemateriaalia sillä kokeillen ja leikkien. Kuusela muistelee, että mikäli ”piruetti ei loppunut täsmällisesti, virhe otettiin haltuun ja siitä tuli osa koreografiaa.” \nMarjo Kuusela oli tullut tunnetuksi yhtenä suomalaisen tanssiteatterin uranuurtajista sekä Tanssiteatteri Raatikon perustajana (1972) yhdessä tanssija Maria Wolskan kanssa. [Seitsemässä veljeksessä] Kuusela kertoi kaikkien suomalaisten tunteman veljesten kasvutarinan klassisen baletin ja modernin tanssin liikeilmaisua yhdistäen. Romaani oli liian laaja tanssiteokseksi, mutta Kuusela onnistui tiivistämään teoksen tanssiesityksen raameihin sopivaksi. Koreografia syntyi vuorovaikutuksessa tanssijoiden kanssa, jotka toivat prosessiin baletin liikemateriaalia sillä kokeillen ja leikkien. Kuusela muistelee, että mikäli ”piruetti ei loppunut täsmällisesti, virhe otettiin haltuun ja siitä tuli osa koreografiaa.” \n\nVeljesten erilaiset luonteet, heidän keskinäiset suhteensa ja jännitteet heidän ja ympäröivän yhteisön välillä piirtyvät esiin tanssijoiden vahvassa näyttelijäntyössä sekä taitavasti sommitelluissa ryhmäkohtauksissa. Romaanin kuuluisan Hiidenkivi-kohtauksen härät ovat koreografiassa myös naisia, jotka houkuttelevat nuoria miehiä synnin poluille. Kohtaus, jossa haluttomat veljekset opettelevat aakkosia ankaran lukkarin opissa, kääntyy koreografiassa tanssiliikkeiden opetteluksi. \n\nTeosta on esitetty kiertueilla Suomessa ja ulkomailla, ja siitä on tullut keskeinen osa suomalaisen tanssitaiteen kaanonia.  ',62,'Marjo Kuuselan ENKKU koreografia Aleksis Kiven romaaniin [Seitsemän veljestä] on yksi eniten esitetyistä teoksista Suomen Kansallisbaletin ohjelmistossa. Teos on palannut baletin ohjelmistoon vuosina 1992 ja 2013, mikä on harvinaista tanssin kotimaiselle kantaesitykselle.  \n\nMarjo Kuusela oli tullut tunnetuksi yhtenä suomalaisen tanssiteatterin uranuurtajista sekä Tanssiteatteri Raatikon perustajana (1972) yhdessä tanssija Maria Wolskan kanssa. [Seitsemässä veljeksessä] Kuusela kertoi kaikkien suomalaisten tunteman veljesten kasvutarinan klassisen baletin ja modernin tanssin liikeilmaisua yhdistäen. Romaani oli liian laaja tanssiteokseksi, mutta Kuusela onnistui tiivistämään teoksen tanssiesityksen raameihin sopivaksi. Koreografia syntyi vuorovaikutuksessa tanssijoiden kanssa, jotka toivat prosessiin baletin liikemateriaalia sillä kokeillen ja leikkien. Kuusela muistelee, että mikäli ”piruetti ei loppunut täsmällisesti, virhe otettiin haltuun ja siitä tuli osa koreografiaa.” \nMarjo Kuusela oli tullut tunnetuksi yhtenä suomalaisen tanssiteatterin uranuurtajista sekä Tanssiteatteri Raatikon perustajana (1972) yhdessä tanssija Maria Wolskan kanssa. [Seitsemässä veljeksessä] Kuusela kertoi kaikkien suomalaisten tunteman veljesten kasvutarinan klassisen baletin ja modernin tanssin liikeilmaisua yhdistäen. Romaani oli liian laaja tanssiteokseksi, mutta Kuusela onnistui tiivistämään teoksen tanssiesityksen raameihin sopivaksi. Koreografia syntyi vuorovaikutuksessa tanssijoiden kanssa, jotka toivat prosessiin baletin liikemateriaalia sillä kokeillen ja leikkien. Kuusela muistelee, että mikäli ”piruetti ei loppunut täsmällisesti, virhe otettiin haltuun ja siitä tuli osa koreografiaa.” \n\nVeljesten erilaiset luonteet, heidän keskinäiset suhteensa ja jännitteet heidän ja ympäröivän yhteisön välillä piirtyvät esiin tanssijoiden vahvassa näyttelijäntyössä sekä taitavasti sommitelluissa ryhmäkohtauksissa. Romaanin kuuluisan Hiidenkivi-kohtauksen härät ovat koreografiassa myös naisia, jotka houkuttelevat nuoria miehiä synnin poluille. Kohtaus, jossa haluttomat veljekset opettelevat aakkosia ankaran lukkarin opissa, kääntyy koreografiassa tanssiliikkeiden opetteluksi. \n\nTeosta on esitetty kiertueilla Suomessa ja ulkomailla, ja siitä on tullut keskeinen osa suomalaisen tanssitaiteen kaanonia.  ','Marjo Kuuselan koreografia SVEKiven romaaniin [Seitsemän veljestä] on yksi eniten esitetyistä teoksista Suomen Kansallisbaletin ohjelmistossa. Teos on palannut baletin ohjelmistoon vuosina 1992 ja 2013, mikä on harvinaista tanssin kotimaiselle kantaesitykselle.  \n\nMarjo Kuusela oli tullut tunnetuksi yhtenä suomalaisen tanssiteatterin uranuurtajista sekä Tanssiteatteri Raatikon perustajana (1972) yhdessä tanssija Maria Wolskan kanssa. [Seitsemässä veljeksessä] Kuusela kertoi kaikkien suomalaisten tunteman veljesten kasvutarinan klassisen baletin ja modernin tanssin liikeilmaisua yhdistäen. Romaani oli liian laaja tanssiteokseksi, mutta Kuusela onnistui tiivistämään teoksen tanssiesityksen raameihin sopivaksi. Koreografia syntyi vuorovaikutuksessa tanssijoiden kanssa, jotka toivat prosessiin baletin liikemateriaalia sillä kokeillen ja leikkien. Kuusela muistelee, että mikäli ”piruetti ei loppunut täsmällisesti, virhe otettiin haltuun ja siitä tuli osa koreografiaa.” \nMarjo Kuusela oli tullut tunnetuksi yhtenä suomalaisen tanssiteatterin uranuurtajista sekä Tanssiteatteri Raatikon perustajana (1972) yhdessä tanssija Maria Wolskan kanssa. [Seitsemässä veljeksessä] Kuusela kertoi kaikkien suomalaisten tunteman veljesten kasvutarinan klassisen baletin ja modernin tanssin liikeilmaisua yhdistäen. Romaani oli liian laaja tanssiteokseksi, mutta Kuusela onnistui tiivistämään teoksen tanssiesityksen raameihin sopivaksi. Koreografia syntyi vuorovaikutuksessa tanssijoiden kanssa, jotka toivat prosessiin baletin liikemateriaalia sillä kokeillen ja leikkien. Kuusela muistelee, että mikäli ”piruetti ei loppunut täsmällisesti, virhe otettiin haltuun ja siitä tuli osa koreografiaa.” \n\nVeljesten erilaiset luonteet, heidän keskinäiset suhteensa ja jännitteet heidän ja ympäröivän yhteisön välillä piirtyvät esiin tanssijoiden vahvassa näyttelijäntyössä sekä taitavasti sommitelluissa ryhmäkohtauksissa. Romaanin kuuluisan Hiidenkivi-kohtauksen härät ovat koreografiassa myös naisia, jotka houkuttelevat nuoria miehiä synnin poluille. Kohtaus, jossa haluttomat veljekset opettelevat aakkosia ankaran lukkarin opissa, kääntyy koreografiassa tanssiliikkeiden opetteluksi. \n\nTeosta on esitetty kiertueilla Suomessa ja ulkomailla, ja siitä on tullut keskeinen osa suomalaisen tanssitaiteen kaanonia.  ');
/*!40000 ALTER TABLE `contenttext` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `esiintyjat`
--

DROP TABLE IF EXISTS `esiintyjat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `esiintyjat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `esiintyja` varchar(255) DEFAULT NULL,
  `hahmo` varchar(255) DEFAULT NULL,
  `rooli` mediumtext,
  `subcategory_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sub_idx` (`subcategory_id`),
  CONSTRAINT `sub` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `esiintyjat`
--

LOCK TABLES `esiintyjat` WRITE;
/*!40000 ALTER TABLE `esiintyjat` DISABLE KEYS */;
INSERT INTO `esiintyjat` VALUES (1,'ad','fsafasf','',1),(2,'asd','asd','',1),(3,'asd','asd','',1),(4,'asd','asd','Vienola-Lindfors, Irma. Kansallisbaletin veljekset. Voimalla',1);
/*!40000 ALTER TABLE `esiintyjat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lahteet`
--

DROP TABLE IF EXISTS `lahteet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lahteet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tekijat` longtext,
  `esiintyjat` longtext,
  `esiintyjat_en` longtext,
  `esiintyjat_sv` longtext,
  `lahteet` longtext,
  `subcategory_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subcategory_id_UNIQUE` (`subcategory_id`),
  KEY `subcatid_idx` (`subcategory_id`),
  CONSTRAINT `subcatid` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lahteet`
--

LOCK TABLES `lahteet` WRITE;
/*!40000 ALTER TABLE `lahteet` DISABLE KEYS */;
INSERT INTO `lahteet` VALUES (17,'ESIINTYJÄT:\nJuhani: Jarmo Rastas\nAapo: Jyrki Järvinen\nSimeoni: Lauri Lehto\nTuomas: Kimmo Sandell\nLauri: Eero Hut≈tunen\nTimo: Sakari Tiitinen\nEero: Aarne Mäntylä\nToukolan pojat: Mikko Siiskonen, Jorma Elo, Karl Hedman,\nAntti Honkanen, Ilkka Lampi, Stanislav Miltenov,\nVeli-Pekka Peltokallio, Raimo Puurtinen, Ari Savinen\nLukkari: Aku Ahjolinna\nLukkarin tytär: Jutta Mustakallio\nSeunalan Anna, Kalvea impi: Maija Hänninen\nMännistön muori: Venla Konttinen\nMännistön Venla: Maria Kivilahti\nTeeret: Kirsi Aromaa, Jaana Puupponen, Tiina Väre\nNaaraskettu: Ulla-Mari Mäkelä\nKettu: Karl Hedman\nHautajaisvieraat: Kirsi Aromaa, Kaarina Hjelm, Tiina Laxman (Väänänen),\nLiisa Palin, Ritva Räsänen, Merja Tuohimaa, Jorma Elo, Ilkka Lampi,\nRaimo Puurtinen, Ari Savinen\nTarinan renkipoika: Raimo Puurtinen\nPrinssi ja peikko: Jorma Koivumäki\nViertolan rengit: Antti Honkanen, Veli-Pekka Peltokallio\nHärät: Jaana Puupponen, Anne Ahola, Kirsi Aromaa, Kaarina Hjelm,\nMaija Hänninen, Maria Kivilahti, Outi Kokkola, Venla Konttinen,\nTiina Laxman (Väänänen), Tuija Lindholm, Jutta Mustakallio,\nRitva Räsänen, Riitta Teuronen, Irma Tirkkonen, Tuuli Tuominen-Sandell,\nMerja Tuohimaa\nNaiset Hämeenlinnassa: Tuuli Tuominen-Sandell, Kirsi Aromaa,\nMaija Hänninen, Jutta Mustakallio, Liisa Palin, Merja Tuohimaa\nIsäntä, sutenööri: Jorma Koivumäki\nRengit: Karl Hedman, Ari Savinen\nHintriikka: Merja Tuohimaa\nTuomaan akka: Tuija Lindholm\nKaksostytöt: Tiina Laxman (Väänänen), Irma Tirkkonen\nKyläntytöt: Kirsi Aromaa, Outi Kokkola, Ritva Räsänen, Riitta Teuronen,\nTuuli Tuominen-Sandell\nKylänpojat: Jorma Elo, Karl Hedman, Antti Honkanen, Stanislav Miltenov,\nRaimo Puurtinen, Ari Savinen\nViulisti: Jorma Koivumäki\nÄmmä: Kaarina Hjelm\nViertolan isäntä: Esko Lehto\nMetsän ötökkä: Jarmo Hyttinen\nOrkesteri: Suomen Kansallisoopperan orkesteri','Ensi-ilta 23.8.1980, päänäyttämö, vanha oopperatalo\n\nKOREOGRAFIA\nMarjo Kuusela\nSÄVELLYS\nEero Ojanen\nLIBRETTO\nEino Tuominen\nLAVASTUS\nMåns Hedström\nPUKUSUUNNITTELU\nMåns Hedström\nVALAISTUS\nSimo Järvinen','KOREOGRAFIA\nMarjo Kuusela\nSÄVELLYS\nEero Ojanen\nLIBRETTO\nEino Tuominen\nLAVASTUS\nMåns Hedström\nPUKUSUUNNITTELU\nMåns Hedström\nVALAISTUS\nSimo Järvinen','KOREOGRAFIA\nMarjo Kuusela\nSÄVELLYS\nEero Ojanen\nLIBRETTO\nEino Tuominen\nLAVASTUS\nMåns Hedström\nPUKUSUUNNITTELU\nMåns Hedström\nVALAISTUS\nSimo Järvinen','Vienola-Lindfors, Irma. Kansallisbaletin veljekset. Voimalla seitsemän tanssivan miehen.   [Helsingin Sanomat] 25.8.1980. \n\nSuhonen, Tiina: “Marjo Kuusela – Vierailevan koreografin muistiinpanoja.” Teoksessa Johanna Laakkonen, Aino Kukkonen, Raisa Rauhamaa, Riikka Korppi-Tommola ja Tiina Suhonen (toim.) [Se alkoi joutsenesta. Sata vuotta arkea ja unelmia Kansallisbaletissa]. Karisto, 2021, 217–221. ',1),(20,'ESIINTYJÄT:\nJuhani: Jarmo Rastas\nAapo: Jyrki Järvinen\nSimeoni: Lauri Lehto\nTuomas: Kimmo Sandell\nLauri: Eero Hut≈tunen\nTimo: Sakari Tiitinen\nEero: Aarne Mäntylä\nToukolan pojat: Mikko Siiskonen, Jorma Elo, Karl Hedman,\nAntti Honkanen, Ilkka Lampi, Stanislav Miltenov,\nVeli-Pekka Peltokallio, Raimo Puurtinen, Ari Savinen\nLukkari: Aku Ahjolinna\nLukkarin tytär: Jutta Mustakallio\nSeunalan Anna, Kalvea impi: Maija Hänninen\nMännistön muori: Venla Konttinen\nMännistön Venla: Maria Kivilahti\nTeeret: Kirsi Aromaa, Jaana Puupponen, Tiina Väre\nNaaraskettu: Ulla-Mari Mäkelä\nKettu: Karl Hedman\nHautajaisvieraat: Kirsi Aromaa, Kaarina Hjelm, Tiina Laxman (Väänänen),\nLiisa Palin, Ritva Räsänen, Merja Tuohimaa, Jorma Elo, Ilkka Lampi,\nRaimo Puurtinen, Ari Savinen\nTarinan renkipoika: Raimo Puurtinen\nPrinssi ja peikko: Jorma Koivumäki\nViertolan rengit: Antti Honkanen, Veli-Pekka Peltokallio\nHärät: Jaana Puupponen, Anne Ahola, Kirsi Aromaa, Kaarina Hjelm,\nMaija Hänninen, Maria Kivilahti, Outi Kokkola, Venla Konttinen,\nTiina Laxman (Väänänen), Tuija Lindholm, Jutta Mustakallio,\nRitva Räsänen, Riitta Teuronen, Irma Tirkkonen, Tuuli Tuominen-Sandell,\nMerja Tuohimaa\nNaiset Hämeenlinnassa: Tuuli Tuominen-Sandell, Kirsi Aromaa,\nMaija Hänninen, Jutta Mustakallio, Liisa Palin, Merja Tuohimaa\nIsäntä, sutenööri: Jorma Koivumäki\nRengit: Karl Hedman, Ari Savinen\nHintriikka: Merja Tuohimaa\nTuomaan akka: Tuija Lindholm\nKaksostytöt: Tiina Laxman (Väänänen), Irma Tirkkonen\nKyläntytöt: Kirsi Aromaa, Outi Kokkola, Ritva Räsänen, Riitta Teuronen,\nTuuli Tuominen-Sandell\nKylänpojat: Jorma Elo, Karl Hedman, Antti Honkanen, Stanislav Miltenov,\nRaimo Puurtinen, Ari Savinen\nViulisti: Jorma Koivumäki\nÄmmä: Kaarina Hjelm\nViertolan isäntä: Esko Lehto\nMetsän ötökkä: Jarmo Hyttinen\nOrkesteri: Suomen Kansallisoopperan orkesteri','Ensi-ilta 23.8.1980, päänäyttämö, vanha oopperatalo\n\nKOREOGRAFIA\nMarjo Kuusela\nSÄVELLYS\nEero Ojanen\nLIBRETTO\nEino Tuominen\nLAVASTUS\nMåns Hedström\nPUKUSUUNNITTELU\nMåns Hedström\nVALAISTUS\nSimo Järvinen','fsa','fsa','Vienola-Lindfors, Irma. Kansallisbaletin veljekset. Voimalla seitsemän tanssivan miehen.   [Helsingin Sanomat] 25.8.1980. \n\nSuhonen, Tiina: “Marjo Kuusela – Vierailevan koreografin muistiinpanoja.” Teoksessa Johanna Laakkonen, Aino Kukkonen, Raisa Rauhamaa, Riikka Korppi-Tommola ja Tiina Suhonen (toim.) [Se alkoi joutsenesta. Sata vuotta arkea ja unelmia Kansallisbaletissa]. Karisto, 2021, 217–221. ',51),(21,'Lista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\n','Lista: joku jokunen1\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\n','Lista: joku jokunen1\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\n','Lista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\nLista: joku jokunen\n','Joku joku Joku joku Joku joku Joku joku Joku joku Joku joku Joku joku Joku joku Joku joku Joku joku Joku joku Joku joku Joku joku Joku joku Joku joku Joku joku Joku joku Joku joku Joku joku ',62);
/*!40000 ALTER TABLE `lahteet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_path` varchar(255) DEFAULT NULL,
  `video_path` varchar(255) DEFAULT NULL,
  `subcategory_id` int DEFAULT NULL,
  `imagetext` varchar(1000) DEFAULT NULL,
  `imagetextbold` varchar(1000) DEFAULT NULL,
  `imagetext_en` varchar(1000) DEFAULT NULL,
  `imagetext_sv` varchar(1000) DEFAULT NULL,
  `imagetextbold_en` varchar(1000) DEFAULT NULL,
  `imagetextbold_sv` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subcategory_id_idx` (`subcategory_id`),
  CONSTRAINT `subcategory_id` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (21,'/images/pystytesti.PNG',NULL,1,'tässäkuvatässäkuvatässäkuva','tässäkuvatässäkuvatässäkuva','','','',''),(22,'/images/pystytesti.PNG',NULL,1,'Kuvassa esiintyvät henkilöt. Varataan merkkejä riittävästi, jotta ainakin tärkeimmät henkilöt mainitaan. Ei kuitenkaan liian pitkä. ','Kuva: Kari Hakli / Suomen Kansallisoopperan ja -baletin arkisto','Kuva: Kari Hakli / Suomen Kansallisoopperan ja -baletin arkisto','Kuva: Kari Hakli / Suomen Kansallisoopperan ja -baletin arkisto','Kuva: Kari Hakli / Suomen Kansallisoopperan ja -baletin arkisto','Kuva: Kari Hakli / Suomen Kansallisoopperan ja -baletin arkisto'),(23,'/images/t1.png',NULL,1,'Kuvassa esiintyvät henkilöt. Varataan merkkejä riittävästi, jotta ainakin tärkeimmät henkilöt mainitaan. Ei kuitenkaan liian pitkä. ','Kuva: Kari Hakli / Suomen Kansallisoopperan ja -baletin arkisto','','','',''),(34,'/images/t1.png',NULL,51,'Kuvassa esiintyvät henkilöt. Varataan merkkejä riittävästi, jotta ainakin tärkeimmät henkilöt mainitaan. Ei kuitenkaan liian pitkä.','Kuva: Kari Hakli / Suomen Kansallisoopperan ja -baletin arkisto.','fsa','fdsa','fasd','afds'),(35,'/images/pystytesti.PNG',NULL,51,'Kuvassa esiintyvät henkilöt. Varataan merkkejä riittävästi, jotta ainakin tärkeimmät henkilöt mainitaan. Ei kuitenkaan liian pitkä.','Kuva: Kari Hakli / Suomen Kansallisoopperan ja -baletin arkisto.','dsa','sad','saf','safd'),(36,'/images/t1.png',NULL,51,'dasdasfdasdfas','Kuva: Kari Hakli / Suomen Kansallisoopperan ja -baletin arkisto.','','','',''),(38,'/images/pysty.PNG',NULL,62,'tässäkuvasuomeksiinffoa','inffoainffoainffoainffoa','inffoainffoainffoa','inffoainffoainffoainffoa','inffoainffoainffoainffoa','inffoainffoainffoainffoainffoa'),(39,'/images/pysty.PNG',NULL,62,'Kuvassa esiintyvät henkilöt. Varataan merkkejä riittävästi, jotta ainakin tärkeimmät henkilöt mainitaan.','Kuva: Kari Hakli / Suomen Kansallisoopperan ja','asd','das','das','ads'),(40,'/images/t1.png',NULL,62,'fas','fsa','fsa','fas','fsa','fas');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `name_sv` varchar(255) DEFAULT NULL,
  `alateksti` varchar(255) DEFAULT NULL,
  `alateksti_en` varchar(255) DEFAULT NULL,
  `alateksti_sv` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `subcategory_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES (1,'Seitsemän veljestä','/images/puu.jpg',1,'sevenbrot','sjubro','kansallisbaletti 19202','enkkuts','åååå'),(51,'Esitys malalldsdass (koiran kanssa)','/images/puu.jpg',1,'eight','swed','1922','219','129'),(52,'asd','/images/puu.jpg',1,'fsafsa','fsaf','fsaf','sad','sadf'),(53,'fasfas','/images/puu.jpg',1,'fds','fasd','fsad','fasd','fasd'),(54,'fdsa','/images/Poltettu oranssi 19751105-04 ss.jpg',1,'fds','afd','fasd','fasd','dfas'),(55,'fasd','/images/puu.jpg',1,'fdsa','afds','afds','afsd','afds'),(56,'fsdfds','/images/puu.jpg',1,'fdsfds','fds','fdsfds','fds','fads'),(57,'fd','/images/Capture.PNG',1,'dsfg','dgfs','dgfs','gdfs','dgsf'),(58,'Seitsemän veljesta','/images/ooppera.jpg',1,'Seitsemän veljesta','Seitsemän veljesta','Seitsemän veljesta','Seitsemän veljesta','Seitsemän veljesta'),(59,'Seitsemän veljesta','/images/sirkus.jpg',1,'Seitsemän veljesta','Seitsemän veljesta','Seitsemän veljesta','Seitsemän veljesta','Seitsemän veljesta'),(60,'Seitsemän veljesta','/images/tanssi.jpg',1,'Seitsemän veljesta','Seitsemän veljesta','Seitsemän veljesta','Seitsemän veljesta','Seitsemän veljesta'),(61,'Seitsemän veljestä','/images/Gustafsson&Haapoja_The Trial_1_photo Terike Haapoja.jpg',1,'Seitsemän veljestä','Seitsemän veljestä','Seitsemän veljestä','Seitsemän veljestä','Seitsemän veljestä'),(62,'Koiran kissan koira (koiran kanssa)','/images/sirkus.jpg',2,'testone','testensve','testi1','testoneee','testennnsve');
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-06 12:48:33
