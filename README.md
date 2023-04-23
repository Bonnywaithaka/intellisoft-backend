# intellisoft-backend
#to create database HOSPPITAL run
nodemon createDB.js

#Run the following command to create the tables

#Creation of patients table
CREATE TABLE `patients` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `first_name` varchar(255) NOT NULL,
 `last_name` varchar(255) NOT NULL,
 `dob` date NOT NULL,
 `gender` varchar(100) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4


#Creation of patient_visits
CREATE TABLE `patient_visits` (
 `trn_id` int(11) NOT NULL AUTO_INCREMENT,
 `date` date NOT NULL,
 `height` double NOT NULL,
 `weight` int(11) NOT NULL,
 `bmi` int(11) NOT NULL,
 `id` int(11) NOT NULL,
 UNIQUE KEY `trn_id` (`trn_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4
