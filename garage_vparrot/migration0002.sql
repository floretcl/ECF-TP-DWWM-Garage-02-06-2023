--
-- Alter field validator on customerreview
--
ALTER TABLE `garage_customerreview` DROP FOREIGN KEY `garage_customerreview_validator_id_8f5cdd32_fk_auth_user_id`;
ALTER TABLE `garage_customerreview` MODIFY `validator_id` integer NULL;
ALTER TABLE `garage_customerreview` ADD CONSTRAINT `garage_customerreview_validator_id_8f5cdd32_fk_auth_user_id` FOREIGN KEY (`validator_id`) REFERENCES `auth_user` (`id`);
