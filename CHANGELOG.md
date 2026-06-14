# Changelog

## [Current Release] - June 2026

### 🚀 Features & Updates

#### 1. Remote Module 12 Grading System
*   **Centralized Admin Approval:** Teachers no longer need to walk over to student computers to enter an `ADMIN-0000` PIN. A brand new **"M12 Grading"** queue has been added to the Admin Dashboard.
*   **Real-time Synchronization:** Students who submit a task for review will automatically see their screen unlock when a teacher clicks "Approve" from the dashboard—no page refresh required!
*   **Class Filtering:** Added a search/filter bar directly inside the Grading Queue to allow instructors to isolate their class code (e.g., `SDUTC-26`) and easily manage their own students.
*   **Admin Visibility:** Removed restrictions so Admin users can now see their own course progress in the dashboard matrices, allowing instructors to properly test the curriculum.

#### 2. Upgraded Digital Certificates
*   **Personalization:** The final Certificate of Competence now dynamically pulls the student's actual name instead of a generic "School User" placeholder.
*   **Instructor Sign-off:** The "Verified By" section automatically queries the database to display the exact name of the Admin who approved the final task.
*   **Print-Ready Design:** 
    *   Added a "Print Certificate" button with a highly-polished print stylesheet (`@media print`).
    *   Forces A4 Landscape orientation, entirely stripping out sidebar/navigation elements.
    *   Added the ESW Logo, perfectly centered.
    *   Incorporated elegant cursive and serif typography (`Great Vibes` & `Playfair Display`).

#### 3. Modernized Core Modules
*   **Custom UI Alerts:** Completely eliminated clunky, browser-default Javascript `alert()` pop-ups. Built a sleek, custom modal component (`CustomAlert.tsx`) integrated across all modules to enforce explicit user acknowledgement.
*   **Module 1 (Screenshots):** Refactored the core learning materials and quizzes. Swapped out legacy `PrtScn` key instructions for modern Snipping Tool (`Windows + Shift + S`) best practices.
*   **Module 5 (Email Simulation):** Hardened the attachment validator to exclusively accept the correct `.docx` format, preventing users from passing with a `.txt` file. Fixed a CSS overflow bug where long file names pushed the "Send" button off the screen.
