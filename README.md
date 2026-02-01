# Software characteristics
## a. Application purpose
The primary purpose of the application is to provide an intuitive and efficient responsive web-based platform for language learning, specifically focusing on Polish-Spanish vocabulary. The application aims to bridge the gap between simple memorization and active recall through an interactive flashcard system. The application is designed to be fully accessible across various devices, including desktops, tablets, and smartphones, ensuring a consistent user experience regardless of screen size.

---

# Copyrights

## a. Authors:
Agnieszka Gazińska

## b. License terms:
Copyright (c) 2025 Agnieszka Gazińska

All Rights Reserved.

This software is proprietary and may not be copied, modified, distributed, or used in any way without the explicit permission of the author.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

---

# Software Requirements Specification

## 1.Notifications and User Engagement

### User Story 1.1: Notification Opt-in
#### As a new user, I want to be asked for permission to receive notification, so that I can receive study reminders.

### Acceptance Criteria:
#### System triggers a permission dialog upon the first app launch or a specific milestone.
#### User's choice (Allow/Deny) is saved in the local storage.
---
### User Story 1.2: Inactivity Reminders
#### As a system, I want to send a push notification to users who have been inactive for 24 hours, so that I can encourage them to return to their studies.

### Acceptance Criteria
#### System tracks the "Last Active" timestamp for each user.
#### If current time minus "Last Active" >= 24 hours, a notification is queued.
#### Notifications are only sent to users who granted permission to receive them (Story 1.1).

---

## 2. Dashboard and Content Management

### User Story 2.1: Home Screen Overview
#### As a user, I want to see a list of my categories on the home screen, so that I can easily access my study materials.

### Acceptance Criteria:
#### Dashboard displays all existing categories
#### Visible action buttons for managing categories and their contents (Add, Edit, Delete).
---
### User Story 2.2: Manual Data Refresh
#### As a user, I want to have a "Refresh" button, so that I can manually update the list with the latest data from the server.

### Acceptance Criteria:
#### Clicking the refresh button triggers a new API call to the backend.
#### The list updates without a full app reload.

---

## 3. Category CRUD Operations

## 3.1 Create Operation
### User Story 3.1.1: Create New Category
#### As a user, I want to add a new category through a pop-up modal, so that I can organize my learning topics.

### Acceptance Criteria:
#### Clicking "Add New Category" opens a dialog/modal.
#### Modal contains a text input for the category name.
#### "Save" button sends data to MSSQL; "Cancel" closes the modal.

---

## 3.2 Edit operation
### User Story 3.2.1: Edit Category Name
#### As a user, I want to edit the name of an existing category via a pen icon, so that I can correct mistakes or rename topics.

### Acceptance Criteria:
#### Clicking the edit icon opens a modal with the current name pre-filled.
#### "Save" updates the record in the database and refreshes the view.
#### "Cancel" discards changes and closes the modal.

---

## 3.3 Deletion workflow
### User Story 3.3.1: Toggle Deletion Mode
#### As a user, I want to enter a specific "Delete Mode", so that I don't accidentally delete categories while browsing.

### Acceptance Criteria:
#### Clicking "Delete Category" shows a red "X" icon next to every item.
#### The "Delete Category" button text changes to "Cancel Deletion."
#### Clicking "Cancel" in the pop-up closes the dialog without any changes.
---
### User Story 3.3.2: Exit Deletion Mode
#### As a user, I want to exit the deletion mode, so that the "X" icons disappear and the UI returns to its normal state.

### Acceptance Criteria:
#### Clicking "Cancel Deletion" (while in delete mode) hides all "X" icons.
#### The button text reverts back to "Delete Category."

---

## 4. Category Content CRUD Operations

## 4.1 Read operation
### User Story 4.1.1: View Word List
#### As a user, I want to access the content of a specific category, so that I can see all the Polish and Spanish word pairs I have added.

### Acceptance Criteria:
#### Displays a list of word pairs (Polish version followed by Spanish version).
#### Each pair has visible "Edit" (Pen) and "Delete" (X) icons.

---

## 4.2 Create operation
### User Story 4.2.1: Add New Vocabulary Pair
#### As a user, I want to add a new word pair via a "Add New Word" button, so that I can expand the vocabulary within that category.

### Acceptance Criteria:
#### Clicking the button opens a modal with inputs for both languages.
#### Clicking "Add" button saves the data to MSSQL database.
#### Clicking "Cancel" button closes the modal without changes.

---

## 4.3 Update operation
### User Story 4.3.1: Edit Vocabulary Pair
#### As a user, I want to modify an existing word pair by clicking the edit icon, so that I can fix typos or update translations.

### Acceptance Criteria:
#### Opens a pop-up modal with current values pre-loaded into the fields.
#### Changes are saved to the database upon clicking "Save."

---

## 4.4 Delete operation
### User Story 4.4.1: Delete Vocabulary Pair with Confirmation
#### As a user, I want to delete a word pair by clicking the "X" icon and confirming my choice, so that I can remove unnecessary items safely.

### Acceptance Criteria:
#### Clicking the "X" icon triggers a "Confirm Deletion" dialog.
#### Clicking "Delete" permanently removes the record from the database and the list.
#### Clicking "Cancel" closes the dialog, leaving the record intact.

---

## 5. Flashcard Learning System

## 5.1. Navigation & Study Mode
### User Story 5.1.1: Entry to Learning View
#### As a user, I want to click on a category name on the Home Screen, so that I am redirected to the Flashcard view to start learning.

### Acceptance Criteria:
#### The system navigates the user to the Learning View associated with the selected category ID.
#### The view loads only the words assigned to the selected category.
---
### User Story 5.1.2: Language Direction Toggle
#### As a user, I want to use "PL" and "ES" buttons to toggle the translation direction, so that I can practice translating in both directions.

### Acceptance Criteria:
#### Switching to "PL" sets Polish as the source (displayed) and Spanish as the target (to be typed).
#### Switching to "ES" reverses the logic.
#### The UI updates instantly without reloading the page.

---

## 5.2 Card Navigation & Progression
### User Story 5.2.1: Manual Card Switching
#### As a user, I want to use "Next" and "Previous" arrow buttons, so that I can move between words in the current category.

### Acceptance Criteria:
#### Forward arrow displays the next word in the list.
#### Backward arrow displays the previous word.
#### Current progress (e.g., "3 / 12") updates with every click.
---
### User Story 5.2.2: Session Completion & Summary
#### As a user, I want to be presented with a summary after navigating past the last card, so that I can see my results.

### Acceptance Criteria:
#### Clicking the "Next" arrow on the final card triggers a Summary Modal.
#### The modal displays the Total Time elapsed since entering the category.
#### The modal displays the Final Score (e.g., "Correct Answers: 8/10").

---

## 5.3 Answer Validation & Support
### User Story 5.3.1: Special Character Input
#### As a user, I want to use a dedicated toolbar with Spanish diacritics, so that I can accurately type translations without switching my system keyboard.

### Acceptance Criteria:
#### The interface includes a dedicated toolbar for Spanish diacritics (á, é, í, ó, ú, ñ, ü).
#### Each button appends the respective character to the translation string.
---
### User Story 5.3.2: Real-time Feedback
#### As a user, I want to check my answer and see immediate feedback, so that I know if I made a mistake.

### Acceptance Criteria:
#### "Check" button validates the input against the database.
#### A dynamic validation message appears inline directly below the input field to provide immediate feedback.
#### The system handles three feedback states in the same inline location:
####   Success: Displays "Correct!" when the answer matches.
####   Error: Displays "Incorrect" when the answer is wrong.
####   Warning: Displays "Please enter an answer" if the input field is empty.
---
### User Story 5.3.3: Correct Answer Reveal
#### As a user, I want to use the "Show correct answer" button, so that the system fills the field for me when I don't know the word.

### Acceptance Criteria:
#### Clicking the "Show correct answer" button retrieves the correct translation from the database (matching the current language mode).
#### The system automatically populates the input field with the retrieved correct answer.
#### The user can still click the "Check" button after the field is auto-filled to confirm the state as "Correct!".

---

# Software Architecture

## Development Architecture

| Name                       | Purpose                                                | Version            |
|----------------------------|--------------------------------------------------------|--------------------|
| Visual Studio Code         | Primary Integrated Development Environment (IDE)       | 1.108.2            |
| Windows 11                 | Operating system used during development               | 25H2               |
| Node.js                    | JavaScript runtime for backend and tooling             | 22.15.1            |
| Ionic CLI                  | Command-line interface for managing the Ionic project  | 7.2.1              |
| Vite                       | Local development server and project bundler           | 5.4.19             |
| TypeScript                 | Statically typed programming language                  | 5.6.2              |
| MSSQL (Management Studio)  | Database management and administration tool            | 20.2.30.0          |

---

## System Architecture

| Name                       | Purpose                                                | Version            |
|----------------------------|--------------------------------------------------------|--------------------|
| Vue.js                     | Core progressive interface framework                   | 3.3.0              |
| Ionic Vue                  | Ionic components integration for Vue                   | 8.6.2              |
| Node.js                    | JavaScript runtime for backend and tooling             | 22.15.1            |
| Capacitor Core             | Native bridge for hardware features and mobile runtime | 7.2.0              |
| Express.js                 | Backend API framework for handling requests            | 5.1.0              |
| mssql (Node driver)        | Official Microsoft SQL Server client for Node.js       | 11.0.1             |
| Axios                      | Promise-based HTTP client for API communication        | 1.9.0              |
| Ionicons                   | Official premium icon set for the UI                   | 7.4.0              |
| Dotenv                     | Module for managing environment variables (security)   | 16.5.0             |

---

## Runtime Architecture

| Name                       | Purpose                                                | Version                             |
|----------------------------|--------------------------------------------------------|-------------------------------------|
| Web Browser                | Client-side execution environment                      | Any modern web browser              |
| Android OS                 | Target mobile operating system                         | Android 7.0 (API 24) or later       |
| Node.js Runtime            | Server-side environment for logic processing           | 22.15.1                             |
| MSSQL Server               | Relational database for storage                        | 2022 Developer Edition (v16.0.1000) |
| Capacitor Android          | Native bridge for the Android application              | 7.2.0                               |

---

## Required Files and Configurations:
### package.json
### vite.config.ts
### .env
### capacitor.config.ts

---

# Database Implementation & Setup

## Database Scripts (/database folder)

### The system data layer is initialized using the following SQL scripts:
###   schema.sql: Creates Categories and Words tables.
###   procedures.sql: Adds Stored Procedures for data handling.
###   sample_data.sql: Populates the database with initial vocabulary.

## Configuration (Environment Variables)
### To connect the backend to the database:
### 1. Locate the env.example file in the backend directory.
### 2. Rename it to .env.
### 3. Fill in your local database credentials:
```env
DB_USER=your_username
DB_PASSWORD=your_password
DB_SERVER=your_server_address
DB_DATABASE=HiszpanskiDB
