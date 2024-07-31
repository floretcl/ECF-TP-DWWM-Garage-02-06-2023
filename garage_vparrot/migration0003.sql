--
-- Add field model to vehicle
--
ALTER TABLE `garage_vehicle` ADD COLUMN `model` varchar(80) DEFAULT 'modèle' NOT NULL;
ALTER TABLE `garage_vehicle` ALTER COLUMN `model` DROP DEFAULT;
