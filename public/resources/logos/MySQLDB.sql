CREATE DATABASE IF NOT EXISTS LacecoDB;
USE LacecoDB;

CREATE TABLE IF NOT EXISTS permission (
    permission_id INT AUTO_INCREMENT PRIMARY KEY,
    permission_name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS role (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS role_permission (
    role_permission_id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(role_id),
    FOREIGN KEY (permission_id) REFERENCES permission(permission_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS client (
    client_id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    joined_on DATE NOT NULL,
    geography VARCHAR(255) NOT NULL,
    sector VARCHAR(255) NOT NULL,
    website VARCHAR(255) NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS client_contact (
    client_contact_id INT AUTO_INCREMENT PRIMARY KEY,
    contact_name VARCHAR(255) NOT NULL,
    contact_info VARCHAR(255) NOT NULL,
    contact_location VARCHAR(255) NOT NULL,
    client_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES client(client_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS grade_history (
    grade_history_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    old_grade_id INT NULL,
    new_grade_id INT NOT NULL,
    changed_on DATE NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
    FOREIGN KEY (old_grade_id) REFERENCES grade(grade_id),
    FOREIGN KEY (new_grade_id) REFERENCES grade(grade_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS employee (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    google_sub VARCHAR(500) NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    work_email VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    nationality VARCHAR(500) NOT NULL,
    marital_status CHAR(10) NOT NULL,
    discipline_id INT NOT NULL,
    employee_hourly_cost FLOAT NOT NULL,
    major VARCHAR(500) NOT NULL,
    years_of_experience INT NOT NULL,
    contract_type_id INT NOT NULL,
    contract_valid_till DATE NULL,
    position_id INT NOT NULL,
    grade_id INT NOT NULL,
    country CHAR(10) NOT NULL,
    status_id INT NOT NULL,
    created_on DATE NOT NULL,
    FOREIGN KEY (grade_id) REFERENCES grade(grade_id),
    FOREIGN KEY (contract_type_id) REFERENCES contract_type(contract_type_id),
    FOREIGN KEY (position_id) REFERENCES position(position_id),
    FOREIGN KEY (status_id) REFERENCES employee_status(employee_status_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS employee_status_history (
    employee_status_history_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    old_status_id INT NOT NULL,
    new_status_id INT NOT NULL,
    changed_on DATE NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
    FOREIGN KEY (old_status_id) REFERENCES employee_status(employee_status_id),
    FOREIGN KEY (new_status_id) REFERENCES employee_status(employee_status_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS grade (
    grade_id INT AUTO_INCREMENT PRIMARY KEY,
    grade_code BIGINT NOT NULL,
    seniority_id INT NOT NULL,
    FOREIGN KEY (seniority_id) REFERENCES seniority(seniority_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS position_history (
    position_history_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    position_change_type VARCHAR(255) NOT NULL,
    old_position_id INT NULL,
    new_position_id INT NULL,
    old_employee_hourly_cost FLOAT NOT NULL,
    new_employee_hourly_cost FLOAT NOT NULL,
    changed_on DATE NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
    FOREIGN KEY (old_position_id) REFERENCES position(position_id),
    FOREIGN KEY (new_position_id) REFERENCES position(position_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS seniority (
    seniority_id INT AUTO_INCREMENT PRIMARY KEY,
    seniority_type VARCHAR(255) NOT NULL,
    seniority_level VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS holiday (
    holiday_id INT AUTO_INCREMENT PRIMARY KEY,
    holiday_name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS holiday_year (
    holiday_year_id INT AUTO_INCREMENT PRIMARY KEY,
    year CHAR(4) NOT NULL,
    holiday_start_date DATE NOT NULL,
    holiday_end_date DATE NOT NULL,
    holiday_id INT NOT NULL,
    FOREIGN KEY (holiday_id) REFERENCES holiday(holiday_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS schedule (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_name VARCHAR(255) NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS schedule_year (
    schedule_year_id INT AUTO_INCREMENT PRIMARY KEY,
    year CHAR(4) NOT NULL,
    schedule_start_date DATE NOT NULL,
    schedule_end_date DATE NOT NULL,
    daily_work_hours FLOAT NOT NULL,
    schedule_id INT NOT NULL,
    FOREIGN KEY (schedule_id) REFERENCES schedule(schedule_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS contract_type (
    contract_type_id INT AUTO_INCREMENT PRIMARY KEY,
    contract_type_name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS discipline (
    discipline_id INT AUTO_INCREMENT PRIMARY KEY,
    discipline_name VARCHAR(255) NOT NULL,
    assigned_on DATE NOT NULL,
    head_of_department_id INT NOT NULL,
    division_id INT NULL,
    FOREIGN KEY (division_id) REFERENCES division(division_id),
    FOREIGN KEY (head_of_department_id) REFERENCES employee(employee_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS division (
    division_id INT AUTO_INCREMENT PRIMARY KEY,
    division_name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS employee_status (
    employee_status_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_status_name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS phase_status (
    phase_status_id INT AUTO_INCREMENT PRIMARY KEY,
    phase_status_name BIGINT NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS position (
    position_id INT AUTO_INCREMENT PRIMARY KEY,
    position_name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS project_category (
    project_category_id INT AUTO_INCREMENT PRIMARY KEY,
    project_category_name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS project_status (
    project_status_id INT AUTO_INCREMENT PRIMARY KEY,
    project_status_name BIGINT NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS employee_work_day (
    employee_work_day_id INT AUTO_INCREMENT PRIMARY KEY,
   phase_assignee_id INT NOT NULL,
   work_day DATE NOT NULL,
   hours_worked FLOAT NOT NULL,
   status VARCHAR(255) NOT NULL,
   actioned_by INT NOT NULL,
   actioned_on DATETIME NOT NULL,
   rejection_reason VARCHAR(255) NULL,
   FOREIGN KEY (phase_assignee_id) REFERENCES phase_assignee(phase_assignee_id),
   FOREIGN KEY (actioned_by) REFERENCES employee(employee_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS employee_work_day_versions (
   employee_work_day_id INT AUTO_INCREMENT PRIMARY KEY,
   phase_assignee_id INT NOT NULL,
   work_day DATE NOT NULL,
   hours_worked FLOAT NOT NULL,
   status VARCHAR(255) NOT NULL,
   actioned_by INT NOT NULL,
   actioned_on DATETIME NOT NULL,
   rejection_reason VARCHAR(255) NULL,
   FOREIGN KEY (phase_assignee_id) REFERENCES phase_assignee_versions(phase_assignee_id),
   FOREIGN KEY (actioned_by) REFERENCES employee(employee_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS phase (
   phase_id INT AUTO_INCREMENT PRIMARY KEY,
   phase_name BIGINT NOT NULL,
   project_id INT NOT NULL,
   actioned_by INT NOT NULL,
   actioned_on DATE NOT NULL,
   planned_startdate DATE NOT NULL,
   planned_enddate DATE NOT NULL,
   start_date DATE NULL,
   end_date DATE NULL,
   status_id INT NOT NULL,
   FOREIGN KEY (actioned_by) REFERENCES employee(employee_id),
   FOREIGN KEY (status_id) REFERENCES phase_status(phase_status_id),
   FOREIGN KEY (project_id) REFERENCES projects(project_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS phase_assignee (
   phase_assignee_id INT AUTO_INCREMENT PRIMARY KEY,
   assignee_id INT NOT NULL,
   work_done_hrs INT NOT NULL,
   expected_work_hrs INT NOT NULL,
   expected_start_date DATE NOT NULL,
   phase_id INT NOT NULL,
   FOREIGN KEY (assignee_id) REFERENCES employee(employee_id),
   FOREIGN KEY (phase_id) REFERENCES phase(phase_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS phase_assignee_versions (
   phase_assignee_id INT AUTO_INCREMENT PRIMARY KEY,
   assignee_id INT NOT NULL,
   work_done_hrs BIGINT NOT NULL,
   expected_work_hrs BIGINT NOT NULL,
   expected_start_date DATE NOT NULL,
   phase_id INT NOT NULL,
   FOREIGN KEY (assignee_id) REFERENCES employee(employee_id),
   FOREIGN KEY (phase_id) REFERENCES phase_versions(phase_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS phase_history (
   phase_history_id INT AUTO_INCREMENT PRIMARY KEY,
   phase_id INT NOT NULL,
   actioned_on DATE NOT NULL,
   old_end_date DATE NOT NULL,
   new_end_date DATE NOT NULL,
   justification VARCHAR(255) NOT NULL,
   FOREIGN KEY (phase_id) REFERENCES phase(phase_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS phase_versions (
   phase_id INT AUTO_INCREMENT PRIMARY KEY,
   phase_name BIGINT NOT NULL,
   actioned_by INT NOT NULL,
   actioned_on DATE NOT NULL,
   planned_startdate DATE NOT NULL,
   planned_enddate DATE NOT NULL,
   start_date DATE NOT NULL,
   end_date DATE NOT NULL, 
   status_id INT NOT NULL,
   initial_phase_id INT NOT NULL,
   version INT NOT NULL,
   FOREIGN KEY (initial_phase_id) REFERENCES phase(phase_id),
   FOREIGN KEY (status_id) REFERENCES phase_status(phase_status_id),
   FOREIGN KEY (actioned_by) REFERENCES employee(employee_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS project_comment (
   comment_id INT AUTO_INCREMENT PRIMARY KEY,
   project_id INT NOT NULL,
   comment_text VARCHAR(255) NOT NULL,
   poster_id INT NOT NULL,
   is_reply BIT NOT NULL,
   reply_to_id INT NULL,
   posted_on BIGINT NOT NULL,
   FOREIGN KEY (project_id) REFERENCES projects(project_id),
   FOREIGN KEY (poster_id) REFERENCES employee(employee_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS projected_work_week (
   projected_work_week_id INT AUTO_INCREMENT PRIMARY KEY,
   phase_assignee_id INT NOT NULL,
   week_start DATE NOT NULL,
   hours_expected INT NOT NULL,
   FOREIGN KEY (phase_assignee_id) REFERENCES phase_assignee(phase_assignee_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS projected_work_week_versions (
   projected_work_week_id INT AUTO_INCREMENT PRIMARY KEY,
   phase_assignee_id INT NOT NULL,
   week_start DATE NOT NULL,
   hours_expected INT NOT NULL,
   FOREIGN KEY (phase_assignee_id) REFERENCES phase_assignee_versions(phase_assignee_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS projects (
   project_id INT AUTO_INCREMENT PRIMARY KEY,
   code VARCHAR(255) NOT NULL,
   title VARCHAR(255) NOT NULL,
   client_id INT NOT NULL,
   geography VARCHAR(255) NOT NULL,
   baseline_budget BIGINT NOT NULL,
   variance FLOAT NOT NULL DEFAULT 0,
   BUA INT NOT NULL,
   Landscape INT NOT NULL,
   ParkingArea INT NOT NULL,
   DesignArea INT NOT NULL,
   planned_startdate DATE NOT NULL,
   planned_enddate DATE NOT NULL,
   start_date DATE NULL,
   end_date DATE NULL,
   created_on DATETIME NOT NULL,
   head_of_department_id INT NOT NULL,
   project_status_id INT NOT NULL,
   category_id INT NOT NULL,
   created_by INT NOT NULL,
   FOREIGN KEY (client_id) REFERENCES client(client_id),
   FOREIGN KEY (head_of_department_id) REFERENCES employee(employee_id),
   FOREIGN KEY (project_status_id) REFERENCES project_status(project_status_id),
   FOREIGN KEY (category_id) REFERENCES project_category(project_category_id),
   FOREIGN KEY (created_by) REFERENCES employee(employee_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS projects_versions (
   project_id INT AUTO_INCREMENT PRIMARY KEY,
   code VARCHAR(255) NOT NULL,
   title VARCHAR(255) NOT NULL,
   client_id INT NOT NULL,
   geography VARCHAR(255) NOT NULL,
   baseline_budget BIGINT NOT NULL,
   variance FLOAT NOT NULL,
   BUA INT NOT NULL,
   Landscape INT NOT NULL, 
   ParkingArea INT NOT NULL,
   DesignArea INT NOT NULL,
   planned_startdate DATE NOT NULL,
   planned_enddate DATE NOT NULL,
   start_date DATE NULL,
   end_date DATE NULL,
   created_on DATE NOT NULL,
   head_of_department_id INT NOT NULL,
   project_status_id INT NOT NULL,
   category_id INT NOT NULL,
   intial_project_id INT NOT NULL,
   created_by INT NOT NULL,
   FOREIGN KEY (client_id) REFERENCES client(client_id),
   FOREIGN KEY (head_of_department_id) REFERENCES employee(employee_id),
   FOREIGN KEY (project_status_id) REFERENCES project_status(project_status_id),
   FOREIGN KEY (category_id) REFERENCES project_category(project_category_id),
   FOREIGN KEY (created_by) REFERENCES employee(employee_id),
FOREIGN KEY (intial_project_id) REFERENCES projects(project_id)
) ENGINE=InnoDB;