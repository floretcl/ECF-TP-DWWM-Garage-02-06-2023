--
-- Add field color to vehicle
--
ALTER TABLE `garage_vehicle` ADD COLUMN `color` varchar(30) DEFAULT 'couleur' NOT NULL;
ALTER TABLE `garage_vehicle` ALTER COLUMN `color` DROP DEFAULT;
--
-- Add field critair to vehicle
--
ALTER TABLE `garage_vehicle` ADD COLUMN `critair` integer UNSIGNED DEFAULT 0 NOT NULL CHECK (`critair` >= 0);
ALTER TABLE `garage_vehicle` ALTER COLUMN `critair` DROP DEFAULT;
--
-- Add field gearbox to vehicle
--
ALTER TABLE `garage_vehicle` ADD COLUMN `gearbox` varchar(30) DEFAULT 'Automatique' NOT NULL;
ALTER TABLE `garage_vehicle` ALTER COLUMN `gearbox` DROP DEFAULT;
--
-- Add field power to vehicle
--
ALTER TABLE `garage_vehicle` ADD COLUMN `power` integer UNSIGNED DEFAULT 5 NOT NULL CHECK (`power` >= 0);
ALTER TABLE `garage_vehicle` ALTER COLUMN `power` DROP DEFAULT;
--
-- Add field seats to vehicle
--
ALTER TABLE `garage_vehicle` ADD COLUMN `seats` integer UNSIGNED DEFAULT 5 NOT NULL CHECK (`seats` >= 0);
ALTER TABLE `garage_vehicle` ALTER COLUMN `seats` DROP DEFAULT;
--
-- Alter field brand on vehicle
--
ALTER TABLE `garage_vehicle` MODIFY `brand` varchar(30) NOT NULL;
--
-- Alter field energy on vehicle
--
ALTER TABLE `garage_vehicle` MODIFY `energy` varchar(30) NOT NULL;
--
-- Alter field model on vehicle
--
ALTER TABLE `garage_vehicle` MODIFY `model` varchar(30) NOT NULL;
