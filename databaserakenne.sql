CREATE DATABASE  IF NOT EXISTS `teatteri` 
USE `teatteri`;


DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `name_en` varchar(255) DEFAULT NULL,
  `name_sv` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `contenttext`;

CREATE TABLE `contenttext` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` longtext,
  `subcategory_id` int DEFAULT NULL,
  `text_en` longtext,
  `text_sv` longtext,
  PRIMARY KEY (`id`),
  KEY `subcategory_id_idx` (`subcategory_id`),
  CONSTRAINT `subcategory_idd` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `esiintyjat`;
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


DROP TABLE IF EXISTS `lahteet`;

CREATE TABLE `lahteet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tekijat` longtext,
  `esiintyjat` longtext,
  `esiintyjat_en` longtext,
  `esiintyjat_sv` longtext,
  `lahteet` longtext,
  `subcategory_id` int DEFAULT NULL,
  `tekijat_sv` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `subcategory_id_UNIQUE` (`subcategory_id`),
  KEY `subcatid_idx` (`subcategory_id`),
  CONSTRAINT `subcatid` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `media`;
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
  `quality` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subcategory_id_idx` (`subcategory_id`),
  CONSTRAINT `subcategory_id` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=317 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `subcategory`;

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
  `vuosi` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `subcategory_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

