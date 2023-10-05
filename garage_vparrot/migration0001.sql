--
-- Create model Garage
--
CREATE TABLE `garage_garage` (`id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `name` varchar(50) NOT NULL, `address` varchar(255) NOT NULL, `postal_code` varchar(10) NOT NULL, `city` varchar(80) NOT NULL, `phone_number` varchar(20) NOT NULL, `contact_email` varchar(254) NOT NULL);
--
-- Create model ServiceType
--
CREATE TABLE `garage_servicetype` (`id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `name` varchar(50) NOT NULL, `image` varchar(100) NOT NULL);
--
-- Create model Vehicle
--
CREATE TABLE `garage_vehicle` (`id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `name` varchar(80) NOT NULL, `price` integer UNSIGNED NOT NULL CHECK (`price` >= 0), `year` smallint UNSIGNED NOT NULL CHECK (`year` >= 0), `km` integer UNSIGNED NOT NULL CHECK (`km` >= 0), `garage_id` bigint NOT NULL);
--
-- Create model VehiclePicture
--
CREATE TABLE `garage_vehiclepicture` (`id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `picture` varchar(100) NOT NULL, `vehicle_id` bigint NOT NULL);
--
-- Create model Service
--
CREATE TABLE `garage_service` (`id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `name` varchar(80) NOT NULL, `garage_id` bigint NOT NULL, `type_id` bigint NOT NULL);
--
-- Create model OpeningTime
--
CREATE TABLE `garage_openingtime` (`id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `day` varchar(10) NOT NULL, `opening_hours` varchar(80) NOT NULL, `garage_id` bigint NOT NULL);
--
-- Create model CustomerReview
--
CREATE TABLE `garage_customerreview` (`id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `name` varchar(50) NOT NULL, `message` longtext NOT NULL, `rating` smallint UNSIGNED NOT NULL CHECK (`rating` >= 0), `valid` bool NULL, `date` datetime(6) NOT NULL, `garage_id` bigint NOT NULL, `validator_id` integer NOT NULL);
--
-- Create model CustomerMessage
--
CREATE TABLE `garage_customermessage` (`id` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `first_name` varchar(80) NOT NULL, `last_name` varchar(80) NOT NULL, `email` varchar(254) NOT NULL, `phone_number` varchar(20) NOT NULL, `subject` varchar(255) NULL, `message` longtext NOT NULL, `date` datetime(6) NOT NULL, `garage_id` bigint NOT NULL);
ALTER TABLE `garage_vehicle` ADD CONSTRAINT `garage_vehicle_garage_id_5fe89587_fk_garage_garage_id` FOREIGN KEY (`garage_id`) REFERENCES `garage_garage` (`id`);
ALTER TABLE `garage_vehiclepicture` ADD CONSTRAINT `garage_vehiclepicture_vehicle_id_8e525a55_fk_garage_vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `garage_vehicle` (`id`);
ALTER TABLE `garage_service` ADD CONSTRAINT `garage_service_garage_id_344958d0_fk_garage_garage_id` FOREIGN KEY (`garage_id`) REFERENCES `garage_garage` (`id`);
ALTER TABLE `garage_service` ADD CONSTRAINT `garage_service_type_id_ba0a8e92_fk_garage_servicetype_id` FOREIGN KEY (`type_id`) REFERENCES `garage_servicetype` (`id`);
ALTER TABLE `garage_openingtime` ADD CONSTRAINT `garage_openingtime_garage_id_ba029141_fk_garage_garage_id` FOREIGN KEY (`garage_id`) REFERENCES `garage_garage` (`id`);
ALTER TABLE `garage_customerreview` ADD CONSTRAINT `garage_customerreview_garage_id_5eace89d_fk_garage_garage_id` FOREIGN KEY (`garage_id`) REFERENCES `garage_garage` (`id`);
ALTER TABLE `garage_customerreview` ADD CONSTRAINT `garage_customerreview_validator_id_8f5cdd32_fk_auth_user_id` FOREIGN KEY (`validator_id`) REFERENCES `auth_user` (`id`);
ALTER TABLE `garage_customermessage` ADD CONSTRAINT `garage_customermessage_garage_id_d3b800ca_fk_garage_garage_id` FOREIGN KEY (`garage_id`) REFERENCES `garage_garage` (`id`);
