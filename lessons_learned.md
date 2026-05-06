# Project Lessons Learned

A record of mistakes made during development, their impact, and how they were resolved. This document serves as a guide to maintain best practices for the Daycare Management project.

| Mistake | Impact | The Fix | Caught By |
| :--- | :--- | :--- | :--- |
| **Missing Frontend Validation** | Poor UX; user only sees errors after a server round-trip. | Added client-side checks and error messages in `AddStaffModal.tsx`. | **Human** |
| **Hard-coded API Address** | Brittle code; difficult to deploy or change ports. | Implemented a **Vite Proxy** in `vite.config.ts`. | **Human** |
| **Relative Database Paths** | `SQLITE_CANTOPEN` errors depending on startup folder. | Used `path.resolve` for absolute paths in `db.ts`. | **AI (Logs)** |
| **Brittle API Handling** | Frontend "Black Screen" crash when API returned an error object. | Added `Array.isArray()` safety checks in `StaffPage.tsx`. | **AI** |
| **Missing `dotenv` Import** | Backend server crash on startup. | Restored missing import in `index.ts`. | **AI (Logs)** |
| **Port Conflict (5000)** | Backend could not start (AirPlay conflict on Mac). | Migrated backend to Port 5001. | **AI (Logs)** |
| **Hardcoded Color Tokens** | Form inputs were invisible or unreadable in Light Mode. | Switched hardcoded `white` to `var(--text-color)` in `index.css`. | **AI** |
| **Inconsistent Code Structure** | Harder to maintain and compare parallel features (Staff vs Student). | Standardized naming and function ordering across Page components. | **Human** |
| **Stale Data (Race Condition)** | Users could edit outdated information if another user changed it. | Implemented **Fetch-on-Edit** pattern in modals. | **Human** |
| **Ambiguous Summary Labels** | Users confused by "Due Soon" card including overdue items. | Renamed cards to "Action Required" / "Actions" for clarity. | **Human** |
| **UI Highlighting Redundancy** | Table looked cluttered with both status tags and colored dates. | Removed date highlighting in favor of clear status tags. | **Human** |
| **Status Slug Inconsistency** | CSS failed to apply when status names had spaces (e.g., "Due Soon"). | Implemented `.replace(' ', '-')` for status-based CSS classes. | **AI** |
| **Rigid Date Filters** | Users couldn't see all upcoming tasks without hardcoding ranges. | Modified API to support default "All" view with optional filters. | **Human** |
| **Redundant Validation Logic** | Bloated code with repetitive trim() checks and JS errors. | Removed manual JS checks in favor of native browser `required` attribute. | **Human** |

## Summary of Best Practices for this Project
- **Validation**: Rely on native browser attributes (`required`, `type="email"`) for simple checks; use JS for complex logic only.
- **Race Conditions**: Always fetch a fresh record from the API when opening an edit modal to avoid stale data.
- **Consistency**: Keep parallel features (Staff, Student) structurally identical in both Frontend and Backend.
- **Paths**: Use absolute paths (`path.resolve`) for all file-system operations.
- **API**: Use relative paths with a development proxy.
- **Robustness**: Always check the type of data returned from an API before processing (e.g., sorting).
- **Controlled Inputs**: Ensure form state defaults to empty strings (`''`) rather than `null` to keep React inputs controlled.
