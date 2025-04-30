# SkillSwap Project Documentation 

## Table of Contents
- [Overview](#overview)
- [Tech_Stack](#tech-stack)
- [Project_Steup](#project-setup)
- [Project_Implementation](#project-implementation)
- [PostgreSQL_Setup_&_Configuration](#postgresql-setup--configuration)
- [Errors,_Fixes_&_Debuggigng_Log](#errors-fixes--debugging-log)
- [Future_Enhancements_(Planned)](#future-enhancements-planned)

## overview
**SkillSwap** is a skill-sharing platform designed to connect learners and experts through real-world skill exchanges. The project integrates **React, Django, and PostgreSQL** to provide a seamless experience for users seeking mentorship, skill validation, and interactive learning.

### **Project Goals**
- **Professional-grade code** - Clean, modular, and scalable.
- **Unique & feature-rich** - AI-powered skill matching, real-time chat, gamification,etc.
- **Responsive & Cross-browser Compatible** - Works on all devices and browsers
- **Understandable Codebase** - No blind copy-pasting; full learning experience

## Tech Stack 
- **Frontend:** React (Vite-based setup)
- **Backend:** Django (REST framework)
- **Database:** PostgreSQL
- **Authentication:** Firebase/Django Auth
- **Styling:** (TO be decided,  previously Tailwind was dropped)
- **State Management:** COntent API/Redux (future)

---

## **Project Setup**
### **Frontend**
1. **Initialized React + Vite**
2. **Created Folder Structure:**
 /src 
├── components # Reusable UI Components
├── pages # Page-level components (Home, Profile, Dashboard, Signup, Login)├── context # Authentication & state management
├── styles # Custom styling (TBD) 
├── routes # Routing logic 
├── assets # Static assets (logos, images)

3. **Implemented Navbar (`AppNavbar` Component):**
- Uses **React Bootstrap** for styling.
- COntains navigation links (`Home`, `Profile`, `Dashboard`, `Signup`, `Login`)
- Displays users state (`Welcome, user!` or `Login` if not logged in)
- `Logout` button correctly clears user sessions

4. **Authentication Handling (`AuthContext.js`):**
- Integrated `useAuth()` context to manage `user` state
- `user` state updates on login/logout
- `useEffect` logs state changes for debugging

5. **Signup & Login Pages Created:**
- Basic form UI with **email/password fields**
- Authentication logic integrated (Firebase/Django expected)
- Redirects users after successful login/signup 

6. **Logout FUnctionality Added**
- Ensures a smooth session clearing mechanism

7. **Routing & Navigation:**
- React Router used for page navigation
- Navbar dynamically updates based on authentication state

8. **Dashboard & Profile Pages Added**
- **Dashboard:** Displays user-related features (to be expanded)
- **Profile:** Shows user details (to be connected with backend)

9. **Styling Approach Restarted**
- **Dropped Tailwind CSS** due to installation issues
- Exploring an **Alternative styling method**

---

## **Next Steps**
- Ensures `user` state updates correctly across all components
- Debug any remaining rendering/state issue
- continue building remaining UI components
- Improve styling with an alternative method

---

## **Future Enhancements (Planned)**
1. **Advanced Skill System** - SKill categories, learning levels, XP-based unlocking, verified badges
2. **Gamification & Rewards** - XP, leaderboards, streaks, achievements
3. **Learning & Community Features** - AI-powered skill recommendations, real time chat, mentorship
4. **Expanded User Profiles & Networking** - Portfolio showcase, community skill groups

**Tech stack for Future Features:**
- **Backend:** Django, PostgreSQL
- **Frontend:** React (Progress bars, UI for XP, badges, leaderboards)
- **Real-Time Features:** WebSockets (for chat, leaderboards)
- **AI/ML:** Tensorflow/Pytorch (for AI recommendations)
- **File Storage:** Firebase/Cloudinary (for portfolio uploads)
- **State Management:** Redux/Zustand (for tracking progress dynamically)

---

## Project Implementation 

### **Backend Implementation (Django & PostgreSQL)**
#### **Django Backend Setup**
- Created Django project and structured the app
- Configured PostgreSQL as the database

#### **Authentication API**
- Implemented user registration and login endpoints
- Token-based authentication system integrated

#### **Profile Management**
- API endpoints for retrieving and updating user profiles

#### **Skill Matching Backend**
- Users can **list skills** they offer
- Users can **search for skill matches** dynamically

---

## **PostgreSQL Setup & Configuration**

### **Installing PostgreSQL**
- DOwnload & install PostgreSQL from [official website](https://www.postgresql.org/download/)
- Ensure `psql` is accessible via the internet

### **Creating a New Database**
-```sh
-psql -U postgres
-CREATE DATABASE skillswap;

---

## Errors, Fixes & Debugging Log
Through out the development of **SkillSwap**, I encountered over **116+ errors, bugs, and unexpected behaviours**, spanning both frontend and backend. Instead of skipping past them, I carefully documented and resolved each one - treating them as key learning opportunities.
This section hignlights some of the most important errors, how they were identified, and how I solved them. It also reflects on how my debugging evolved during the project.

### Phase 1 - Initial Development & Setup (Frontend Core)  (March)
   ---------------------------------------------------------------------------------------
  | Category                      |Total Issues         | Resolved              |Unsolved|
  |-------------------------------|---------------------|-----------------------|--------|
- |Project Setup & Enviornment    | 9                   | 9                     | 0      |
- |Folder Str. & Component Design | 4                   | 4                     | 0      |
- |Authentication System          | 12                  | 10                    | 2      |
- |Navbar + Routing               | 6                   | 4                     | 2      |
- |Page Components                | 7                   | 5                     | 2      |
- |State Management & Data Flow   | 8                   | 5                     | 3      |
- |Styling & UX                   | 6                   | 6                     | 1      |
  ----------------------------------------------------------------------------------------

- **Summary**: In phase 1, the project faced foundational issues like Tailwind installation failures, routing conflicts and missing state. While most were resolved, some key areas like auth persistence and protected routes remained incomlete-- which motivated the phase 2 restart.

### Phase 2 - Frontend Reinitialization & Backend Setup (April)
   -----------------------------------------------------------------------------------------------------------
  |Category                                          | Total Issues         | Resolved              |Unsolved|
  |--------------------------------------------------|----------------------|-----------------------|--------|
- |Frontend Reinitialization & styling               | 11                   | 10                    | 1      |
- |Authentication & Context Bugs                     | 15                   | 13                    | 2      |
- |Routing, Navigation & Protected pages             | 9                    | 5                     | 4      |
- |Pages(Login, Signup, Dashboard, Profile)          | 11                   | 7                     | 4      |
- |State Management & Debugging                      | 10                   | 8                     | 2      |
- |Backend(Django+PostgreSQL)-Inittial setup phase   | 7                    | 4                     | 3      |
- |Misc & Decisions                                  | 1                    | 0                     | 1      |
  ------------------------------------------------------------------------------------------------------------

- **Summary**: Phase 2 involved a full frontend restart, ditching Tailwind in favor of React Bootstrap and modular CSS. This phase cleaned up the context bugs, clarified file structure, and introduced the Django backend -- though some integration tasks are still open.
> 📎 **Note:** For full detailes of each bug, refer to [Bug_Tracker_Appendix](bug-tracker.md)