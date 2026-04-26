# Daycare Management PRD

## 1. Objective
Build a simple, reliable system for home daycare owners to manage student and staff information, track important dates, and automate reminders for payments, certifications, and holidays.

The focus is **saving time, reducing missed deadlines, and keeping records organized.**

## 2. Goals & Success Metrics

### Goals
- Replace manual tracking (paper, spreadsheets, memory)
- Reduce missed tuition payments and expired certifications
- Provide a single dashboard for daily operations

### Success Metrics
- % of reminders successfully delivered
- Reduction in late payments
- Daily/weekly active usage
- Number of profiles created (students + staff)

## 3. Core Features (MVP Scope)

### 3.1 Student Management (Priority 0)
**Description**: Allow daycare owners to create, view, update, and delete student profiles.

**Functional Requirements**:
- Create student profile with:
  - Full Name
  - Date of Birth / Age (auto-calculated preferred)
  - Enrollment Date
  - Tuition Due Date (recurring)
  - Enrollment Renewal Date
  - Parent/Guardian Contact Info: Name, Phone, Email
- Edit/Delete student profile
- View list of all students
- Search/filter students (by name, status, etc.)

**Notes**:
- Tuition due date should support recurring logic (e.g., weekly/monthly)

### 3.2 Staff Management (Priority 0)
**Description**: Track staff details and compliance-related deadlines.

**Functional Requirements**:
- Create staff profile with:
  - Full Name
  - Hired Date
  - Pay Date (recurring)
  - Certificate Expiration Date
  - Training Due Date
  - Scheduled Days Off
- Edit/Delete staff profile
- View staff list
- Highlight upcoming expirations (certificates, training)

### 3.3 Payment Reminder System (Priority 1)
**Description**: Automatically notify parents about upcoming or overdue tuition payments.

**Functional Requirements**:
- Configure reminder timing (e.g., 3 days before, 1 day before, day of due date)
- Send reminders via Email (MVP required), SMS (optional/stretch)
- Trigger conditions: Upcoming payment, Overdue payment
- Log reminder history

**Non-Functional**:
- Reliable delivery (retry mechanism)
- Avoid duplicate messages

### 3.4 Calendar View (Priority 1)
**Description**: Central calendar showing all important dates.

**Events to Display**:
- Tuition due dates
- Enrollment renewals
- Staff pay dates
- Certificate expirations
- Training deadlines
- Holidays

**Functional Requirements**:
- Monthly view (MVP)
- Click on date → see events
- Color-coded event types

### 3.5 Holiday & General Reminder System (Priority 1)
**Description**: Notify both staff and families about upcoming holidays or closures.

**Functional Requirements**:
- Predefined holiday list (U.S. + customizable)
- Ability to add custom events (e.g., daycare closed days)
- Send reminders X days before holiday
- Recipients: Staff, Parents

## 4. User Flow (High-Level)

### Daycare Owner Flow
1. Logs in
2. Views dashboard:
   - Today’s events
   - Upcoming payments
   - Alerts (expiring certificates, overdue payments)
3. Manages: Students, Staff
4. Checks calendar
5. Configures reminders

## 5. Non-Functional Requirements

### Performance
- Load dashboard < 2 seconds
- Handle at least 100–300 profiles smoothly (realistic scale)

### Security
- Secure login (email + password)
- Encrypt sensitive data (contacts)
- Basic role-based access (future)

### Reliability
- Reminder system should not miss scheduled events
- Backup or logging of critical actions

## 6. Tech Considerations (Suggested)
- **Frontend**: React
- **Backend**: Node.js
- **Database**: SQLite (Updated from PostgreSQL/MySQL suggestion)
- **Notifications**: 
  - Email: SendGrid / AWS SES
  - SMS: Twilio (optional later)

## 7. Future Enhancements (Post-MVP)
- Online payment integration (Stripe)
- Attendance tracking (check-in/out)
- Document storage (immunization records, forms)
- Parent portal login
- Reporting (income, payroll, compliance)
- Mobile app

## 8. Risks & Constraints
- SMS costs (can scale badly if not controlled)
- Data privacy (handling children’s info)
- Overbuilding too early — keep MVP tight

## 9. MVP Scope Summary
**Must Have (P0)**:
- Student CRUD
- Staff CRUD

**Should Have (P1)**:
- Payment reminders
- Calendar view
- Holiday notifications
