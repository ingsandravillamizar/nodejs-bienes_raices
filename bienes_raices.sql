-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.33 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para bienes_raices
CREATE DATABASE IF NOT EXISTS `bienes_raices` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bienes_raices`;

-- Volcando estructura para tabla bienes_raices.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla bienes_raices.categories: ~5 rows (aproximadamente)
INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Casa', '2024-03-18 19:56:19', '2024-03-18 19:56:19'),
	(2, 'Departamento', '2024-03-18 19:56:19', '2024-03-18 19:56:19'),
	(3, 'Local', '2024-03-18 19:56:19', '2024-03-18 19:56:19'),
	(4, 'Bodega', '2024-03-18 19:56:19', '2024-03-18 19:56:19'),
	(5, 'Lote', '2024-03-18 19:56:19', '2024-03-18 19:56:19');

-- Volcando estructura para tabla bienes_raices.messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `propertyId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `propertyId` (`propertyId`),
  KEY `userId` (`userId`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`propertyId`) REFERENCES `properties` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla bienes_raices.messages: ~3 rows (aproximadamente)
INSERT INTO `messages` (`id`, `message`, `createdAt`, `updatedAt`, `propertyId`, `userId`) VALUES
	(1, 'Hola estoy interesada, mi nombre es Sandra Villamizar, por favor comunicarse al 3202676640', '2024-04-15 14:42:48', '2024-04-15 14:42:48', '93158a25-cf31-44bb-9dd3-99d685a109a8', 1),
	(2, 'llamame 3202676640', '2024-04-15 14:55:06', '2024-04-15 14:55:06', '93158a25-cf31-44bb-9dd3-99d685a109a8', 1),
	(3, 'Hola por favor comunicarse urgente', '2024-04-15 14:57:52', '2024-04-15 14:57:52', '93158a25-cf31-44bb-9dd3-99d685a109a8', 1);

-- Volcando estructura para tabla bienes_raices.prices
CREATE TABLE IF NOT EXISTS `prices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla bienes_raices.prices: ~10 rows (aproximadamente)
INSERT INTO `prices` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, '0 - $10,000 USD', '2024-03-18 19:56:19', '2024-03-18 19:56:19'),
	(2, '$10,000 - $30,000 USD', '2024-03-18 19:56:19', '2024-03-18 19:56:19'),
	(3, '$30,000 - $50,000 USD', '2024-03-18 19:56:19', '2024-03-18 19:56:19'),
	(4, '$50,000 - $75,000 USD', '2024-03-18 19:56:19', '2024-03-18 19:56:19'),
	(5, '$75,000 - $100,000 USD', '2024-03-18 19:56:19', '2024-03-18 19:56:19'),
	(6, '$100,000 - $150,000 USD', '2024-03-18 19:56:19', '2024-03-18 19:56:19'),
	(7, '$150,000 - $200,000 USD', '2024-03-18 19:56:19', '2024-03-18 19:56:19'),
	(8, '$200,000 - $300,000 USD', '2024-03-18 19:56:19', '2024-03-18 19:56:19'),
	(9, '$300,000 - $500,000 USD', '2024-03-18 19:56:19', '2024-03-18 19:56:19'),
	(10, '+ $500,000 USD', '2024-03-18 19:56:19', '2024-03-18 19:56:19');

-- Volcando estructura para tabla bienes_raices.properties
CREATE TABLE IF NOT EXISTS `properties` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `rooms` int NOT NULL,
  `parking` int NOT NULL,
  `wc` int NOT NULL,
  `address` varchar(100) NOT NULL,
  `lat` varchar(255) NOT NULL,
  `lng` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `priceId` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `priceId` (`priceId`),
  KEY `categoryId` (`categoryId`),
  KEY `userId` (`userId`),
  CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`priceId`) REFERENCES `prices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `properties_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla bienes_raices.properties: ~16 rows (aproximadamente)
INSERT INTO `properties` (`id`, `title`, `description`, `rooms`, `parking`, `wc`, `address`, `lat`, `lng`, `image`, `published`, `createdAt`, `updatedAt`, `priceId`, `categoryId`, `userId`) VALUES
	('13936ae7-46c3-4b3a-b11a-4987dcd2a9ad', 'lote cuarenta-a', 'Lote 40-a No publicada', 2, 2, 2, 'Vía Ruitoque 36', '7.051858291228', '-73.089779377102', '', 0, '2024-04-08 12:51:03', '2024-04-15 21:47:14', 2, 5, 1),
	('2c8d6669-4d98-4293-889b-2b6c33d15d5c', 'Oficina Natura', 'Amplia oficina en Natura piso 4', 1, 1, 1, 'Calle 11 9A-16', '7.058544483245', '-73.083426000993', '1hqurpde9ep3l06s57lo.jpg', 1, '2024-04-08 12:43:57', '2024-04-08 12:44:05', 4, 3, 1),
	('3226f431-8cce-48db-90b8-2882d9bc63a4', 'local 10', 'Amplio en Giron ', 2, 1, 2, '', '7.052448338937', '-73.096976308921', '1hqus2p1jlj7vt0sj23.jpg', 1, '2024-04-08 12:49:05', '2024-04-08 12:49:11', 6, 3, 1),
	('3d078e6c-4705-47a3-b622-301e2784041b', 'casa3', 'casa en piedecuesta', 3, 1, 5, '', '7.053789942606', '-73.096439861879', '1hqusaglgmcck755k7k.jpg', 1, '2024-04-08 12:53:20', '2024-04-08 12:53:25', 6, 1, 1),
	('64648e3f-ada0-4ebb-9b29-25028f3ce53f', 'local 11', 'En el edificio monte lina', 2, 1, 2, 'Vía Ruitoque 32', '7.052662534717', '-73.090571549038', '1hqus4kq275ig4cj08jo.jpg', 1, '2024-04-08 12:50:07', '2024-04-08 12:50:13', 2, 3, 1),
	('6a7592ce-f6e2-4974-8f66-22f0ad5fa2f9', 'Lote Mesa Guayacan', 'Lote ubicado en la mesa de los santos, Una hectarea', 1, 1, 1, '', '7.05387512366', '-73.076591345853', '1hqurmrltar2si8kb7j8.jpg', 1, '2024-04-08 12:42:34', '2024-04-08 12:42:41', 4, 5, 1),
	('76170831-8a6a-4737-8bc8-0ddb8c007bdf', 'casa campo', 'casa en el campo ', 2, 1, 2, '', '7.051937250803', '-73.097319635027', '1hqus8ob27kuhah3aqo8.jpg', 1, '2024-04-08 12:52:17', '2024-04-08 12:52:27', 3, 4, 1),
	('7bcc963d-9857-49d7-9029-7e692a7fe4f8', 'lote cuarenta', 'Lote 40 40 40 40', 2, 2, 2, 'Vía Ruitoque 36', '7.151858291228', '-73.089779377102', '1hqus6njga319oesnaio.jpg', 1, '2024-04-08 12:51:15', '2024-04-08 12:51:21', 2, 5, 1),
	('800fb740-3571-4f12-9c7b-66b8ec4d7c88', 'lote cuarenta', 'Lote 40', 2, 2, 2, 'Vía Ruitoque 29', '7.053051739253', '-73.090862320133', '', 0, '2024-04-08 12:51:00', '2024-04-08 12:51:00', 2, 5, 1),
	('93158a25-cf31-44bb-9dd3-99d685a109a8', 'Departamento Central', 'Departamento central ciudad Bucaramanga', 2, 1, 1, '', '7.052959426508', '-73.094594478607', '1hrh14dc5bhipsgmucr8.jpg', 1, '2024-04-15 14:02:34', '2024-04-15 14:03:47', 5, 2, 2),
	('aec415b3-4668-4211-8a2a-1842ee908ce3', 'Casa Barichara', 'Casa en Barichara', 3, 1, 3, '', '7.079088026072', '-71.927244524642', '1hqurqssfjmduidlsubg.jpg', 1, '2024-04-08 12:44:46', '2024-04-08 12:44:53', 6, 1, 1),
	('bf4eee77-a225-442e-a389-c52483148932', 'Casa Bogotá', 'Casa en Bogota', 6, 1, 3, '', '4.58737615345', '-73.850106024824', '', 0, '2024-04-08 12:46:09', '2024-04-08 12:46:09', 5, 1, 1),
	('c3f5db73-3474-4411-916e-ab0ca824bc36', 'Apto Bucarmanaga-centro', 'Apartamento en Bucaramanga-centro', 5, 1, 2, 'Vía Ruitoque 27', '7.053556433983', '-73.091213999075', '1hqurvr80nam6qcs5v2g.jpg', 1, '2024-04-08 12:47:29', '2024-04-08 12:47:35', 6, 2, 1),
	('d4601cfb-384d-4676-9258-ddcf84a33cbb', 'local 12', 'local 12', 2, 1, 2, '', '7.053556433983', '-73.091213999075', '', 0, '2024-04-08 12:50:02', '2024-04-08 12:50:02', 2, 3, 1),
	('d4649bae-0c80-430c-8095-5a81b723d78b', 'lote cuarenta', 'Lote 40', 2, 2, 2, 'Vía Ruitoque 36', '7.021858291228', '-73.089779377102', '', 0, '2024-04-08 12:51:06', '2024-04-08 12:51:06', 2, 5, 1),
	('fe621e49-c488-4666-90ba-8e1362dce6d5', 'Apto Bucarmanaga-cabecera', 'Apartamento en Bucaramanga-cabecera', 5, 1, 2, '', '7.051858291228', '-75.089779377102', '', 1, '2024-04-08 12:47:24', '2024-04-08 12:48:08', 6, 2, 1);

-- Volcando estructura para tabla bienes_raices.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla bienes_raices.users: ~2 rows (aproximadamente)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `token`, `confirmed`, `createdAt`, `updatedAt`) VALUES
	(1, 'JOSE VESGA', 'jvesgamonroy@gmail.com', '$2b$10$EDLqZnsdHyuW8BIdTdcGZuiciLSG7CYOfyd13SCi0sZTEJGkl..ta', NULL, 1, '2024-03-18 21:01:10', '2024-03-18 21:01:24'),
	(2, 'SANDRA VILLAMIZAR', 'milena.villamizar@hotmail.com', '$2b$10$k4EXxjnxVQ4QEeVoyZlAK.HRtpdT4SN/I2qVkyKUPusnjKJr6eZl2', NULL, 1, '2024-04-15 13:57:11', '2024-04-15 14:01:01');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
