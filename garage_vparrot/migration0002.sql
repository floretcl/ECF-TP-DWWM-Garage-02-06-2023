--
-- Add field brand to vehicle
--
ALTER TABLE `garage_vehicle` ADD COLUMN `brand` varchar(50) DEFAULT 'marque' NOT NULL;
ALTER TABLE `garage_vehicle` ALTER COLUMN `brand` DROP DEFAULT;
--
-- Add field energy to vehicle
--
ALTER TABLE `garage_vehicle` ADD COLUMN `energy` varchar(50) DEFAULT 'énergie' NOT NULL;
ALTER TABLE `garage_vehicle` ALTER COLUMN `energy` DROP DEFAULT;
