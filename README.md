# task_meeting_calendar# 📅 Meeting Scheduler

This is a React + TypeScript project to schedule student meetings via a visual calendar interface. Meetings are assigned based on student age priority and can be downloaded as a styled Excel sheet.

---

## 🚀 Features

- ✅ **Calendar UI**: Select multiple future dates
- 🧠 **Age Priority Logic**: Older students are scheduled first
- 🔁 **Balanced Allocation**: Meetings are distributed evenly across selected dates
- 🔗 **Auto Meeting Link**: Unique meeting links are generated per student
- 📋 **Summary Table**: Displays all scheduled meetings
- 📥 **Excel Export**: Download styled `.xlsx` file with bold headers and clickable meeting links

---

## ⚙️ Calendar & Scheduling Logic

- The user can click on any future date to select it.
- Once dates are selected, clicking **"Schedule Meetings"**:
  - Sorts students by descending age.
  - Distributes each student's total meetings across selected dates.
  - Assigns one row per meeting (not per student).
  - Each row includes student name, class, age, and a unique meeting link.

---

## 📦 Tech Stack

- **React 18**
- **TypeScript**
- **Redux Toolkit** (for student data fetching)
- **xlsx** (for exporting Excel with formatting)

---

## 📂 Project Highlights

| File | Purpose |
|------|---------|
| `Calendar.tsx` | Calendar rendering, date selection, scheduling logic |
| `selected-dates-section.tsx` | Displays selected dates + Schedule/Update actions |
| `table.tsx` | Renders summary table |
| `http.ts` | Excel export logic with formatting (bold header + blue links) |

---

## ▶️ Run Locally

```bash
npm install
npm start
