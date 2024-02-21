-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.0.3-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for f8_project_classoffline
CREATE DATABASE IF NOT EXISTS `f8_project_classoffline` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `f8_project_classoffline`;

-- Dumping structure for table f8_project_classoffline.classes
CREATE TABLE IF NOT EXISTS `classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.classes: ~0 rows (approximately)

-- Dumping structure for table f8_project_classoffline.classes_teachers
CREATE TABLE IF NOT EXISTS `classes_teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacherId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId` (`teacherId`),
  KEY `classId` (`classId`),
  CONSTRAINT `classes_teachers_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`),
  CONSTRAINT `classes_teachers_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.classes_teachers: ~0 rows (approximately)

-- Dumping structure for table f8_project_classoffline.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classId` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.comments: ~0 rows (approximately)

-- Dumping structure for table f8_project_classoffline.coursemodules
CREATE TABLE IF NOT EXISTS `coursemodules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `coursemodules_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.coursemodules: ~0 rows (approximately)

-- Dumping structure for table f8_project_classoffline.courses
CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `price` int(11) DEFAULT 0,
  `teacherId` int(11) DEFAULT NULL,
  `tryLearn` tinyint(1) DEFAULT 0,
  `quantity` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId` (`teacherId`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.courses: ~0 rows (approximately)

-- Dumping structure for table f8_project_classoffline.exercises
CREATE TABLE IF NOT EXISTS `exercises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classId` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  CONSTRAINT `exercises_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.exercises: ~0 rows (approximately)

-- Dumping structure for table f8_project_classoffline.exercisessubmits
CREATE TABLE IF NOT EXISTS `exercisessubmits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `exerciseId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `exerciseId` (`exerciseId`),
  CONSTRAINT `exercisessubmits_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`),
  CONSTRAINT `exercisessubmits_ibfk_2` FOREIGN KEY (`exerciseId`) REFERENCES `exercises` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.exercisessubmits: ~0 rows (approximately)

-- Dumping structure for table f8_project_classoffline.learningstatuses
CREATE TABLE IF NOT EXISTS `learningstatuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.learningstatuses: ~3 rows (approximately)
INSERT INTO `learningstatuses` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Studying', '2024-02-19 09:56:27', '2024-02-19 09:56:27'),
	(2, 'Dropout', '2024-02-19 09:56:27', '2024-02-19 09:56:27'),
	(3, 'Reserve', '2024-02-19 09:56:27', '2024-02-19 09:56:27');

-- Dumping structure for table f8_project_classoffline.logintokens
CREATE TABLE IF NOT EXISTS `logintokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(100) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `logintokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.logintokens: ~2 rows (approximately)
INSERT INTO `logintokens` (`id`, `token`, `userId`, `createdAt`, `updatedAt`) VALUES
	(2, 'd439b1e842c98385f27ea54c45cfd5b6', 1, '2024-02-21 21:31:33', '2024-02-21 21:31:33'),
	(3, '52e3a65e59084f0dda756fc9a0c7a218', 2, '2024-02-21 21:34:45', '2024-02-21 21:34:45');

-- Dumping structure for table f8_project_classoffline.moduledocuments
CREATE TABLE IF NOT EXISTS `moduledocuments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text DEFAULT NULL,
  `pathName` varchar(200) DEFAULT NULL,
  `moduleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `moduleId` (`moduleId`),
  CONSTRAINT `moduledocuments_ibfk_1` FOREIGN KEY (`moduleId`) REFERENCES `coursemodules` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.moduledocuments: ~0 rows (approximately)

-- Dumping structure for table f8_project_classoffline.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `values` varchar(150) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.permissions: ~9 rows (approximately)
INSERT INTO `permissions` (`id`, `values`, `createdAt`, `updatedAt`) VALUES
	(1, 'users.read', '2024-02-19 09:56:27', '2024-02-19 09:56:27'),
	(2, 'users.permission', '2024-02-19 09:56:27', '2024-02-19 09:56:27'),
	(3, 'roles.read', '2024-02-19 09:56:27', '2024-02-19 09:56:27'),
	(4, 'roles.add', '2024-02-19 09:56:27', '2024-02-19 09:56:27'),
	(5, 'roles.update', '2024-02-19 09:56:27', '2024-02-19 09:56:27'),
	(6, 'courses.read', '2024-02-21 21:33:02', '2024-02-21 21:33:02'),
	(7, 'courses.add', '2024-02-21 21:33:02', '2024-02-21 21:33:02'),
	(8, 'courses.update', '2024-02-21 21:33:02', '2024-02-21 21:33:02'),
	(9, 'courses.delete', '2024-02-21 21:33:02', '2024-02-21 21:33:02');

-- Dumping structure for table f8_project_classoffline.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.roles: ~1 rows (approximately)
INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Super Admin', '2024-02-19 09:56:27', '2024-02-19 09:56:27');

-- Dumping structure for table f8_project_classoffline.role_permission
CREATE TABLE IF NOT EXISTS `role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) DEFAULT NULL,
  `permissionId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`),
  CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.role_permission: ~5 rows (approximately)
INSERT INTO `role_permission` (`id`, `roleId`, `permissionId`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, '2024-02-19 09:56:27', '2024-02-19 09:56:27'),
	(2, 1, 2, '2024-02-19 09:56:27', '2024-02-19 09:56:27'),
	(3, 1, 3, '2024-02-19 09:56:27', '2024-02-19 09:56:27'),
	(4, 1, 4, '2024-02-19 09:56:27', '2024-02-19 09:56:27'),
	(5, 1, 5, '2024-02-19 09:56:27', '2024-02-19 09:56:27');

-- Dumping structure for table f8_project_classoffline.scheduleclasses
CREATE TABLE IF NOT EXISTS `scheduleclasses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schedule` tinyint(1) DEFAULT NULL,
  `timeLearn` varchar(255) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  CONSTRAINT `scheduleclasses_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.scheduleclasses: ~0 rows (approximately)

-- Dumping structure for table f8_project_classoffline.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Dumping data for table f8_project_classoffline.sequelizemeta: ~25 rows (approximately)
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20231122024548-create-type.js'),
	('20231122024700-create-user.js'),
	('20231122024910-create-user-otp.js'),
	('20231122025151-create-user-column.js'),
	('20231122025912-create-user-social.js'),
	('20231122030153-create-login-token.js'),
	('20231122030554-create-role.js'),
	('20231122030815-create-permission.js'),
	('20231122031229-User_Role.js'),
	('20231122031614-Role_Permission.js'),
	('20231122031935-User_Permission.js'),
	('20231122032254-create-course.js'),
	('20231122032643-create-course-module.js'),
	('20231122032901-create-module-document.js'),
	('20231122033243-create-class.js'),
	('20231122034058-Classes_Teachers.js'),
	('20231122034752-create-teacher-calendar.js'),
	('20231122035036-create-learning-status.js'),
	('20231122035403-create-students-class.js'),
	('20231122035653-create-students-attendance.js'),
	('20231122035901-create-exercise.js'),
	('20231122040146-create-exercises-submit.js'),
	('20231122040419-create-comment.js'),
	('20231122040801-create-setting.js'),
	('20231228104254-create-schedule-class.js');

-- Dumping structure for table f8_project_classoffline.settings
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `otpKey` varchar(200) DEFAULT NULL,
  `otpValue` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.settings: ~0 rows (approximately)

-- Dumping structure for table f8_project_classoffline.studentsattendances
CREATE TABLE IF NOT EXISTS `studentsattendances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateLearn` datetime DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `classId` (`classId`),
  KEY `statusId` (`statusId`),
  CONSTRAINT `studentsattendances_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`),
  CONSTRAINT `studentsattendances_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`),
  CONSTRAINT `studentsattendances_ibfk_3` FOREIGN KEY (`statusId`) REFERENCES `learningstatuses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.studentsattendances: ~0 rows (approximately)

-- Dumping structure for table f8_project_classoffline.studentsclasses
CREATE TABLE IF NOT EXISTS `studentsclasses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL,
  `completeDate` datetime DEFAULT NULL,
  `dropDate` datetime DEFAULT NULL,
  `recover` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `classId` (`classId`),
  KEY `statusId` (`statusId`),
  CONSTRAINT `studentsclasses_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`),
  CONSTRAINT `studentsclasses_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`),
  CONSTRAINT `studentsclasses_ibfk_3` FOREIGN KEY (`statusId`) REFERENCES `learningstatuses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.studentsclasses: ~0 rows (approximately)

-- Dumping structure for table f8_project_classoffline.teachercalendars
CREATE TABLE IF NOT EXISTS `teachercalendars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacherId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `scheduleDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId` (`teacherId`),
  KEY `classId` (`classId`),
  CONSTRAINT `teachercalendars_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`),
  CONSTRAINT `teachercalendars_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.teachercalendars: ~0 rows (approximately)

-- Dumping structure for table f8_project_classoffline.types
CREATE TABLE IF NOT EXISTS `types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.types: ~4 rows (approximately)
INSERT INTO `types` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Admin', '2024-02-19 09:56:27', '2024-02-19 09:56:27'),
	(2, 'Teacher', '2024-02-19 09:56:27', '2024-02-19 09:56:27'),
	(3, 'TA', '2024-02-19 09:56:27', '2024-02-19 09:56:27'),
	(4, 'Student', '2024-02-19 09:56:27', '2024-02-19 09:56:27');

-- Dumping structure for table f8_project_classoffline.usercolumns
CREATE TABLE IF NOT EXISTS `usercolumns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `featureName` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `usercolumns_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.usercolumns: ~0 rows (approximately)

-- Dumping structure for table f8_project_classoffline.userotps
CREATE TABLE IF NOT EXISTS `userotps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `otp` varchar(10) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `otp` (`otp`),
  KEY `userId` (`userId`),
  CONSTRAINT `userotps_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.userotps: ~2 rows (approximately)
INSERT INTO `userotps` (`id`, `otp`, `userId`, `expires`, `createdAt`, `updatedAt`) VALUES
	(2, '75079', 1, '2024-02-21 21:32:33', '2024-02-21 21:31:33', '2024-02-21 21:31:33'),
	(3, '15689', 2, '2024-02-21 21:35:45', '2024-02-21 21:34:45', '2024-02-21 21:34:45');

-- Dumping structure for table f8_project_classoffline.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `firstLogin` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.users: ~4 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `address`, `typeId`, `firstLogin`, `createdAt`, `updatedAt`) VALUES
	(1, 'Đức Hiền', 'mdhien2302@gmail.com', '$2b$10$a0CQIMoFBZD9DCnG9wCwluRPrORvlIzMkmZQKrpSXlZtcZdGTtTqu', '0869998888', 'Hà Nội', 1, 1, '2024-02-19 09:56:27', '2024-02-21 21:14:03'),
	(2, 'Sơn Đặng', 'sondang@gmail.com', '$2b$10$CYOeg./g3Vj6ZuAnV7mJJO8yPMCSldpgvwrJCZ7lUbP1U4jEl7Dpy', '0869998888', 'Hà Nội', 2, 0, '2024-02-19 09:56:27', '2024-02-19 09:56:27'),
	(3, 'Hoàng An', 'hoangan@gmail.com', '$2b$10$t9fNPZ1PK5Ugt.92rR10EuVQD8hPssg4XXA/kCRMR6gI6T.M2MQda', '0869998888', 'Hà Nội', 2, 0, '2024-02-19 09:56:27', '2024-02-19 09:56:27'),
	(4, 'Đức Hiền', NULL, NULL, '0869998888', 'Hà Nội', 1, 0, '2024-02-21 21:32:34', '2024-02-21 21:32:34');

-- Dumping structure for table f8_project_classoffline.usersocials
CREATE TABLE IF NOT EXISTS `usersocials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `provider` varchar(100) DEFAULT NULL,
  `providerId` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `usersocials_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.usersocials: ~0 rows (approximately)

-- Dumping structure for table f8_project_classoffline.user_permissions
CREATE TABLE IF NOT EXISTS `user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `permissionId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `user_permissions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `user_permissions_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.user_permissions: ~4 rows (approximately)
INSERT INTO `user_permissions` (`id`, `userId`, `permissionId`, `createdAt`, `updatedAt`) VALUES
	(1, 4, 6, '2024-02-21 21:33:02', '2024-02-21 21:33:02'),
	(2, 4, 8, '2024-02-21 21:33:02', '2024-02-21 21:33:02'),
	(3, 4, 7, '2024-02-21 21:33:02', '2024-02-21 21:33:02'),
	(4, 4, 9, '2024-02-21 21:33:02', '2024-02-21 21:33:02');

-- Dumping structure for table f8_project_classoffline.user_role
CREATE TABLE IF NOT EXISTS `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_classoffline.user_role: ~1 rows (approximately)
INSERT INTO `user_role` (`id`, `userId`, `roleId`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, '2024-02-19 09:56:27', '2024-02-19 09:56:27');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
