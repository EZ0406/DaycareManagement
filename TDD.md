# Daycare Management TDD

**Stack**: React + Node.js (Express) + SQLite + TypeScript

## 1. Detailed Design

### Front End

#### Home Page
- **Component 1: SummaryCards**
  - Shows:
    - Upcoming payments (next 3 days)
    - Expiring staff certificates
  - UI: Simple glassmorphism cards
- **Component 2: UpcomingList**
  - List of:
    - Student tuition due soon
    - Staff deadlines
  - Format: Name, Type (payment / certificate), Date
- **Component 3: CalendarPreview (optional P1)**
  - Small monthly calendar
  - Highlight important dates

#### Staffs Page
- **Component 1: StaffTable**
  - Columns: Name, Hired Date, Pay Date, Certificate Expiration, Training Due Date
- **Component 2: StaffForm (Add/Edit Modal)**
  - Fields: name, hiredDate, payDate, certificateExpiration, trainingDueDate, dayOff
- **Component 3: DeleteConfirmModal**
  - Confirm before delete

#### Students Page
- **Component 1: StudentTable**
  - Columns: Name, DOB, Parent Email, Tuition Due Date, Enrollment Date
- **Component 2: StudentForm (Add/Edit Modal)**
  - Fields: name, dob, parentName, parentEmail, parentPhone, tuitionDueDate, enrollmentDate, renewalDate

### Back End

#### Database (SQLite)

**Table: students**
```sql
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
```

**Table: staff**
```sql
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
```

**Table: reminders_log**
```sql
CREATE TABLE IF NOT EXISTS reminders_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    target_id INTEGER,
    sent_at TIMESTAMP,
    status TEXT
);
```

### API Design

#### Students APIs
- `GET /api/students` - Fetch all students
- `GET /api/students/:id` - Fetch single student
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

#### Staff APIs
- `GET /api/staff` - Fetch all staff
- `GET /api/staff/:id` - Fetch single staff member
- `POST /api/staff` - Create staff member
- `PUT /api/staff/:id` - Update staff member
- `DELETE /api/staff/:id` - Delete staff member

#### Reminders API (Dashboard)
- `GET /api/reminders/upcoming` - Fetch upcoming events for dashboard

**Reminder Logic (Backend)**:
- `SELECT * FROM students WHERE tuition_due_date BETWEEN date('now') AND date('now', '+3 days');`
- `SELECT * FROM staff WHERE certificate_expiration BETWEEN date('now') AND date('now', '+7 days');`
