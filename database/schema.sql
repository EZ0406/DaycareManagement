-- Table: students
CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    dob DATE,
    parent_name TEXT,
    parent_email TEXT,
    parent_phone TEXT,
    enrollment_date DATE,
    tuition_due_date DATE,
    renewal_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: staff
CREATE TABLE IF NOT EXISTS staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    hired_date DATE,
    pay_date DATE,
    certificate_expiration DATE,
    training_due_date DATE,
    day_off TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: reminders_log
CREATE TABLE IF NOT EXISTS reminders_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    target_id INTEGER,
    sent_at TIMESTAMP,
    status TEXT
);
