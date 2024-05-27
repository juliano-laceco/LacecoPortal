-- CreateTable
CREATE TABLE `client` (
    `client_id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_name` VARCHAR(255) NOT NULL,
    `joined_on` DATE NOT NULL,
    `geography` VARCHAR(255) NOT NULL,
    `sector` VARCHAR(255) NOT NULL,
    `website` VARCHAR(255) NULL,
    PRIMARY KEY (`client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client_contact` (
    `client_contact_id` INTEGER NOT NULL AUTO_INCREMENT,
    `contact_name` VARCHAR(255) NOT NULL,
    `contact_info` VARCHAR(255) NOT NULL,
    `contact_location` VARCHAR(255) NOT NULL,
    `client_id` INTEGER NOT NULL,

    INDEX `client_id`(`client_id`),
    PRIMARY KEY (`client_contact_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contract_type` (
    `contract_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `contract_type_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`contract_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `discipline` (
    `discipline_id` INTEGER NOT NULL AUTO_INCREMENT,
    `discipline_name` VARCHAR(255) NOT NULL,
    `assigned_on` DATE NOT NULL,
    `head_of_department_id` INTEGER NOT NULL,
    `division_id` INTEGER NULL,

    INDEX `division_id`(`division_id`),
    INDEX `head_of_department_id`(`head_of_department_id`),
    PRIMARY KEY (`discipline_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `division` (
    `division_id` INTEGER NOT NULL AUTO_INCREMENT,
    `division_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`division_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee` (
    `employee_id` INTEGER NOT NULL AUTO_INCREMENT,
    `google_sub` VARCHAR(500) NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `work_email` VARCHAR(255) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `nationality` VARCHAR(500) NOT NULL,
    `marital_status` CHAR(10) NOT NULL,
    `employee_hourly_cost` FLOAT NULL,
    `major` VARCHAR(500) NOT NULL,
    `years_of_experience` INTEGER NOT NULL,
    `contract_type_id` INTEGER NULL,
    `contract_valid_till` DATE NULL,
    `position_id` INTEGER NOT NULL,
    `country` VARCHAR(150) NOT NULL,
    `employee_status_id` INTEGER NOT NULL DEFAULT 1,
    `created_on` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `role_id` INTEGER NULL,

    INDEX `contract_type_id_fk`(`contract_type_id`),
    INDEX `pos_id_fk_idx`(`position_id`),
    INDEX `role_id_fk_idx`(`role_id`),
    INDEX `status_id_fk`(`employee_status_id`),
    PRIMARY KEY (`employee_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_status` (
    `employee_status_id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_status_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`employee_status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_status_history` (
    `employee_status_history_id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `old_status_id` INTEGER NOT NULL,
    `new_status_id` INTEGER NOT NULL,
    `changed_on` DATE NOT NULL,
    `changed_by` INTEGER NOT NULL,

    INDEX `changed_by_employee_id_idx`(`changed_by`),
    INDEX `employee_id`(`employee_id`),
    INDEX `new_status_id`(`new_status_id`),
    INDEX `old_status_id`(`old_status_id`),
    PRIMARY KEY (`employee_status_history_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_work_day` (
    `employee_work_day_id` INTEGER NOT NULL AUTO_INCREMENT,
    `phase_assignee_id` INTEGER NOT NULL,
    `work_day` DATE NOT NULL,
    `hours_worked` FLOAT NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `actioned_by` INTEGER NOT NULL,
    `actioned_on` DATETIME(0) NOT NULL,
    `rejection_reason` VARCHAR(255) NULL,

    INDEX `actioned_by`(`actioned_by`),
    INDEX `phase_assignee_id`(`phase_assignee_id`),
    PRIMARY KEY (`employee_work_day_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee_work_day_versions` (
    `employee_work_day_id` INTEGER NOT NULL AUTO_INCREMENT,
    `phase_assignee_id` INTEGER NOT NULL,
    `work_day` DATE NOT NULL,
    `hours_worked` FLOAT NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `actioned_by` INTEGER NOT NULL,
    `actioned_on` DATETIME(0) NOT NULL,
    `rejection_reason` VARCHAR(255) NULL,

    INDEX `actioned_by`(`actioned_by`),
    INDEX `phase_assignee_id`(`phase_assignee_id`),
    PRIMARY KEY (`employee_work_day_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grade` (
    `grade_id` INTEGER NOT NULL AUTO_INCREMENT,
    `grade_code` VARCHAR(55) NOT NULL,

    PRIMARY KEY (`grade_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grade_history` (
    `grade_history_id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `new_grade_id` INTEGER NOT NULL,
    `changed_on` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `changed_by` INTEGER NOT NULL,

    INDEX `employee_id`(`employee_id`),
    INDEX `grade_history_ibfk_3_idx`(`changed_by`),
    INDEX `new_grade_id`(`new_grade_id`),
    PRIMARY KEY (`grade_history_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `holiday` (
    `holiday_id` INTEGER NOT NULL AUTO_INCREMENT,
    `holiday_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`holiday_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `holiday_year` (
    `holiday_year_id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` CHAR(4) NOT NULL,
    `holiday_start_date` DATE NOT NULL,
    `holiday_end_date` DATE NOT NULL,
    `holiday_id` INTEGER NOT NULL,

    INDEX `holiday_id`(`holiday_id`),
    PRIMARY KEY (`holiday_year_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `level_of_management` (
    `level_of_management_id` INTEGER NOT NULL AUTO_INCREMENT,
    `level_of_management_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`level_of_management_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permission` (
    `permission_id` INTEGER NOT NULL AUTO_INCREMENT,
    `permission_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phase` (
    `phase_id` INTEGER NOT NULL AUTO_INCREMENT,
    `phase_name` BIGINT NOT NULL,
    `project_id` INTEGER NOT NULL,
    `actioned_by` INTEGER NOT NULL,
    `actioned_on` DATE NOT NULL,
    `planned_startdate` DATE NOT NULL,
    `planned_enddate` DATE NOT NULL,
    `start_date` DATE NULL,
    `end_date` DATE NULL,
    `status_id` INTEGER NOT NULL,

    INDEX `actioned_by`(`actioned_by`),
    INDEX `project_id`(`project_id`),
    INDEX `status_id`(`status_id`),
    PRIMARY KEY (`phase_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phase_assignee` (
    `phase_assignee_id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignee_id` INTEGER NOT NULL,
    `work_done_hrs` INTEGER NOT NULL,
    `expected_work_hrs` INTEGER NOT NULL,
    `expected_start_date` DATE NOT NULL,
    `phase_id` INTEGER NOT NULL,

    INDEX `assignee_id`(`assignee_id`),
    INDEX `phase_id`(`phase_id`),
    PRIMARY KEY (`phase_assignee_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phase_assignee_versions` (
    `phase_assignee_id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignee_id` INTEGER NOT NULL,
    `work_done_hrs` BIGINT NOT NULL,
    `expected_work_hrs` BIGINT NOT NULL,
    `expected_start_date` DATE NOT NULL,
    `phase_id` INTEGER NOT NULL,

    INDEX `assignee_id`(`assignee_id`),
    INDEX `phase_id`(`phase_id`),
    PRIMARY KEY (`phase_assignee_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phase_history` (
    `phase_history_id` INTEGER NOT NULL AUTO_INCREMENT,
    `phase_id` INTEGER NOT NULL,
    `actioned_on` DATE NOT NULL,
    `actioned_by` INTEGER NOT NULL,
    `old_end_date` DATE NOT NULL,
    `new_end_date` DATE NOT NULL,
    `justification` VARCHAR(255) NOT NULL,

    INDEX `changed_by_employee_id_idx`(`actioned_by`),
    INDEX `phase_id`(`phase_id`),
    PRIMARY KEY (`phase_history_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phase_status` (
    `phase_status_id` INTEGER NOT NULL AUTO_INCREMENT,
    `phase_status_name` BIGINT NOT NULL,

    PRIMARY KEY (`phase_status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phase_versions` (
    `phase_id` INTEGER NOT NULL AUTO_INCREMENT,
    `phase_name` BIGINT NOT NULL,
    `actioned_by` INTEGER NOT NULL,
    `actioned_on` DATE NOT NULL,
    `planned_startdate` DATE NOT NULL,
    `planned_enddate` DATE NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `status_id` INTEGER NOT NULL,
    `initial_phase_id` INTEGER NOT NULL,
    `version` INTEGER NOT NULL,

    INDEX `actioned_by`(`actioned_by`),
    INDEX `initial_phase_id`(`initial_phase_id`),
    INDEX `status_id`(`status_id`),
    PRIMARY KEY (`phase_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `position` (
    `position_id` INTEGER NOT NULL AUTO_INCREMENT,
    `position_name` VARCHAR(255) NOT NULL,
    `discipline_id` INTEGER NOT NULL,
    `level_of_management_id` INTEGER NOT NULL,
    `grade_id` INTEGER NOT NULL,

    INDEX `ibfk_discipline_id_FK_idx`(`discipline_id`),
    INDEX `ibfk_grade_id_FK_idx`(`grade_id`),
    INDEX `ibfk_level_of_management_id_FK_idx`(`level_of_management_id`),
    PRIMARY KEY (`position_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `position_history` (
    `position_history_id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `new_position_id` INTEGER NULL,
    `new_employee_hourly_cost` FLOAT NULL,
    `changed_on` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `changed_by` INTEGER NOT NULL,

    INDEX `employee_id`(`employee_id`),
    INDEX `position_history_changed_by_employee_id_idx`(`changed_by`),
    PRIMARY KEY (`position_history_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_category` (
    `project_category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_category_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`project_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_id` INTEGER NOT NULL,
    `comment_text` VARCHAR(255) NOT NULL,
    `poster_id` INTEGER NOT NULL,
    `is_reply` BIT(1) NOT NULL,
    `reply_to_id` INTEGER NULL,
    `posted_on` BIGINT NOT NULL,

    INDEX `poster_id`(`poster_id`),
    INDEX `project_id`(`project_id`),
    INDEX `reply_to_id_comment_id_idx`(`reply_to_id`),
    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_status` (
    `project_status_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_status_name` VARCHAR(55) NOT NULL,

    PRIMARY KEY (`project_status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projected_work_week` (
    `projected_work_week_id` INTEGER NOT NULL AUTO_INCREMENT,
    `phase_assignee_id` INTEGER NOT NULL,
    `week_start` DATE NOT NULL,
    `hours_expected` INTEGER NOT NULL,

    INDEX `phase_assignee_id`(`phase_assignee_id`),
    PRIMARY KEY (`projected_work_week_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projected_work_week_versions` (
    `projected_work_week_id` INTEGER NOT NULL AUTO_INCREMENT,
    `phase_assignee_id` INTEGER NOT NULL,
    `week_start` DATE NOT NULL,
    `hours_expected` INTEGER NOT NULL,

    INDEX `phase_assignee_id`(`phase_assignee_id`),
    PRIMARY KEY (`projected_work_week_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `project_id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `client_id` INTEGER NOT NULL,
    `geography` VARCHAR(255) NOT NULL,
    `baseline_budget` BIGINT NOT NULL,
    `variance` FLOAT NOT NULL DEFAULT 0,
    `BUA` INTEGER NOT NULL,
    `Landscape` INTEGER NOT NULL,
    `ParkingArea` INTEGER NOT NULL,
    `DesignArea` INTEGER NOT NULL,
    `planned_startdate` DATE NOT NULL,
    `planned_enddate` DATE NOT NULL,
    `start_date` DATE NULL,
    `end_date` DATE NULL,
    `head_of_department_id` INTEGER NOT NULL,
    `project_status_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `created_on` DATETIME(0) NOT NULL,
    `created_by` INTEGER NOT NULL,

    INDEX `category_id`(`category_id`),
    INDEX `client_id`(`client_id`),
    INDEX `created_by`(`created_by`),
    INDEX `head_of_department_id`(`head_of_department_id`),
    INDEX `project_status_id`(`project_status_id`),
    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects_versions` (
    `project_id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `client_id` INTEGER NOT NULL,
    `geography` VARCHAR(255) NOT NULL,
    `baseline_budget` BIGINT NOT NULL,
    `variance` FLOAT NOT NULL,
    `BUA` INTEGER NOT NULL,
    `Landscape` INTEGER NOT NULL,
    `ParkingArea` INTEGER NOT NULL,
    `DesignArea` INTEGER NOT NULL,
    `planned_startdate` DATE NOT NULL,
    `planned_enddate` DATE NOT NULL,
    `start_date` DATE NULL,
    `end_date` DATE NULL,
    `created_on` DATE NOT NULL,
    `head_of_department_id` INTEGER NOT NULL,
    `project_status_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `intial_project_id` INTEGER NOT NULL,
    `created_by` INTEGER NOT NULL,

    INDEX `category_id`(`category_id`),
    INDEX `client_id`(`client_id`),
    INDEX `created_by`(`created_by`),
    INDEX `head_of_department_id`(`head_of_department_id`),
    INDEX `intial_project_id`(`intial_project_id`),
    INDEX `project_status_id`(`project_status_id`),
    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_permission` (
    `role_permission_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,

    INDEX `permission_id`(`permission_id`),
    INDEX `role_id`(`role_id`),
    PRIMARY KEY (`role_permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule` (
    `schedule_id` INTEGER NOT NULL AUTO_INCREMENT,
    `schedule_name` VARCHAR(255) NULL,

    PRIMARY KEY (`schedule_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule_year` (
    `schedule_year_id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` CHAR(4) NOT NULL,
    `schedule_start_date` DATE NOT NULL,
    `schedule_end_date` DATE NOT NULL,
    `daily_work_hours` FLOAT NOT NULL,
    `schedule_id` INTEGER NOT NULL,

    INDEX `schedule_id`(`schedule_id`),
    PRIMARY KEY (`schedule_year_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `client_contact` ADD CONSTRAINT `client_contact_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client`(`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `discipline` ADD CONSTRAINT `discipline_ibfk_1` FOREIGN KEY (`head_of_department_id`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `discipline` ADD CONSTRAINT `discipline_ibfk_2` FOREIGN KEY (`division_id`) REFERENCES `division`(`division_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `contract_type_id_fk` FOREIGN KEY (`contract_type_id`) REFERENCES `contract_type`(`contract_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `pos_id_fk` FOREIGN KEY (`position_id`) REFERENCES `position`(`position_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `role_id_fk` FOREIGN KEY (`role_id`) REFERENCES `role`(`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `status_id_fk` FOREIGN KEY (`employee_status_id`) REFERENCES `employee_status`(`employee_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `employee_status_history` ADD CONSTRAINT `changed_by_employee_id` FOREIGN KEY (`changed_by`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `employee_status_history` ADD CONSTRAINT `employee_status_history_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `employee_status_history` ADD CONSTRAINT `employee_status_history_ibfk_2` FOREIGN KEY (`old_status_id`) REFERENCES `employee_status`(`employee_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `employee_status_history` ADD CONSTRAINT `employee_status_history_ibfk_3` FOREIGN KEY (`new_status_id`) REFERENCES `employee_status`(`employee_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `employee_work_day` ADD CONSTRAINT `employee_work_day_ibfk_1` FOREIGN KEY (`phase_assignee_id`) REFERENCES `phase_assignee`(`phase_assignee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `employee_work_day` ADD CONSTRAINT `employee_work_day_ibfk_2` FOREIGN KEY (`actioned_by`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `employee_work_day_versions` ADD CONSTRAINT `employee_work_day_versions_ibfk_1` FOREIGN KEY (`phase_assignee_id`) REFERENCES `phase_assignee_versions`(`phase_assignee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `employee_work_day_versions` ADD CONSTRAINT `employee_work_day_versions_ibfk_2` FOREIGN KEY (`actioned_by`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `grade_history` ADD CONSTRAINT `grade_history_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `grade_history` ADD CONSTRAINT `grade_history_ibfk_2` FOREIGN KEY (`new_grade_id`) REFERENCES `grade`(`grade_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `holiday_year` ADD CONSTRAINT `holiday_year_ibfk_1` FOREIGN KEY (`holiday_id`) REFERENCES `holiday`(`holiday_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `phase` ADD CONSTRAINT `phase_ibfk_1` FOREIGN KEY (`actioned_by`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `phase` ADD CONSTRAINT `phase_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `phase_status`(`phase_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `phase` ADD CONSTRAINT `phase_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `projects`(`project_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `phase_assignee` ADD CONSTRAINT `phase_assignee_ibfk_1` FOREIGN KEY (`assignee_id`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `phase_assignee` ADD CONSTRAINT `phase_assignee_ibfk_2` FOREIGN KEY (`phase_id`) REFERENCES `phase`(`phase_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `phase_assignee_versions` ADD CONSTRAINT `phase_assignee_versions_ibfk_1` FOREIGN KEY (`assignee_id`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `phase_assignee_versions` ADD CONSTRAINT `phase_assignee_versions_ibfk_2` FOREIGN KEY (`phase_id`) REFERENCES `phase_versions`(`phase_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `phase_history` ADD CONSTRAINT `phase_actioned_by_employee_id` FOREIGN KEY (`actioned_by`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `phase_history` ADD CONSTRAINT `phase_history_ibfk_1` FOREIGN KEY (`phase_id`) REFERENCES `phase`(`phase_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `phase_versions` ADD CONSTRAINT `phase_versions_ibfk_1` FOREIGN KEY (`initial_phase_id`) REFERENCES `phase`(`phase_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `phase_versions` ADD CONSTRAINT `phase_versions_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `phase_status`(`phase_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `phase_versions` ADD CONSTRAINT `phase_versions_ibfk_3` FOREIGN KEY (`actioned_by`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `position` ADD CONSTRAINT `ibfk_discipline_id_FK` FOREIGN KEY (`discipline_id`) REFERENCES `discipline`(`discipline_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `position` ADD CONSTRAINT `ibfk_grade_id_FK` FOREIGN KEY (`grade_id`) REFERENCES `grade`(`grade_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `position` ADD CONSTRAINT `ibfk_level_of_management_id_FK` FOREIGN KEY (`level_of_management_id`) REFERENCES `level_of_management`(`level_of_management_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `position_history` ADD CONSTRAINT `position_history_changed_by_employee_id` FOREIGN KEY (`changed_by`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `position_history` ADD CONSTRAINT `position_history_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `project_comment` ADD CONSTRAINT `project_comment_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects`(`project_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `project_comment` ADD CONSTRAINT `project_comment_ibfk_2` FOREIGN KEY (`poster_id`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `project_comment` ADD CONSTRAINT `reply_to_id_comment_id` FOREIGN KEY (`reply_to_id`) REFERENCES `project_comment`(`comment_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projected_work_week` ADD CONSTRAINT `projected_work_week_ibfk_1` FOREIGN KEY (`phase_assignee_id`) REFERENCES `phase_assignee`(`phase_assignee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projected_work_week_versions` ADD CONSTRAINT `projected_work_week_versions_ibfk_1` FOREIGN KEY (`phase_assignee_id`) REFERENCES `phase_assignee_versions`(`phase_assignee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client`(`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`head_of_department_id`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_ibfk_3` FOREIGN KEY (`project_status_id`) REFERENCES `project_status`(`project_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_ibfk_4` FOREIGN KEY (`category_id`) REFERENCES `project_category`(`project_category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_ibfk_5` FOREIGN KEY (`created_by`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projects_versions` ADD CONSTRAINT `projects_versions_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client`(`client_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projects_versions` ADD CONSTRAINT `projects_versions_ibfk_2` FOREIGN KEY (`head_of_department_id`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projects_versions` ADD CONSTRAINT `projects_versions_ibfk_3` FOREIGN KEY (`project_status_id`) REFERENCES `project_status`(`project_status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projects_versions` ADD CONSTRAINT `projects_versions_ibfk_4` FOREIGN KEY (`category_id`) REFERENCES `project_category`(`project_category_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projects_versions` ADD CONSTRAINT `projects_versions_ibfk_5` FOREIGN KEY (`created_by`) REFERENCES `employee`(`employee_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projects_versions` ADD CONSTRAINT `projects_versions_ibfk_6` FOREIGN KEY (`intial_project_id`) REFERENCES `projects`(`project_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `role_permission` ADD CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role`(`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `role_permission` ADD CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permission`(`permission_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `schedule_year` ADD CONSTRAINT `schedule_year_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`schedule_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

