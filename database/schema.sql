CREATE DATABASE IF NOT EXISTS daycare_db;
USE daycare_db;

-- Table: students
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    dob DATE,
    parent_name VARCHAR(255),
    parent_email VARCHAR(255),
    parent_phone VARCHAR(50),
    enrollment_date DATE,
    tuition_due_date DATE,
    renewal_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: staff
CREATE TABLE IF NOT EXISTS staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    hired_date DATE,
    pay_date DATE,
    certificate_expiration DATE,
    training_due_date DATE,
    day_off VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: reminders_log (future)
CREATE TABLE IF NOT EXISTS reminders_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50),
    target_id INT,
    sent_at TIMESTAMP,
    status VARCHAR(50)
);
