# Software characteristics
## a. Application purpose


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

# Software requirements specification

## 1.Notifications and User Engagement

### User Story 1.1: Notification Opt-in
#### As a new user, I want to be asked for permission to receive receive notification, so that I can receive study reminders.

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

## 3. Category Operations (CRUD)

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
