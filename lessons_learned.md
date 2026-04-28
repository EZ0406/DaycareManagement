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

## Summary of Best Practices for this Project
- **Validation**: Always implement validation on both Frontend and Backend.
- **Paths**: Use absolute paths (`path.resolve`) for all file-system operations.
- **API**: Use relative paths with a development proxy.
- **Robustness**: Always check the type of data returned from an API before processing (e.g., sorting).
