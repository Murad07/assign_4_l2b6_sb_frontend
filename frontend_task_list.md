# Frontend Task List - SkillBridge

This document outlines the step-by-step plan to build the frontend for the SkillBridge project, following strict architecture patterns and requirements.

**Mandatory Requirements:**
*   **Homepage:** Must have 4 meaningful sections + Navbar + Footer.
*   **UI/UX:** Clean, responsive design with consistent colors & spacing.
*   **Tech Pattern:** Server Actions for mutations, Zod for validation, Modular file structure.

**Tech Stack:**
*   **Framework:** Next.js (App Router, Layouts)
*   **Styling:** Tailwind CSS, Shadcn UI
*   **State/Data:** Native Fetch (Server Components), Server Actions (Mutations), TanStack Form
*   **Auth:** Better Auth (Session-based cookies)
*   **Validation:** Zod
*   **Language:** TypeScript

**Project Structure Reference:**
*   `src/actions`: Server Actions for mutations.
*   `src/services`: API data fetching logic.
*   `src/components/ui`: Shadcn base components.
*   `src/components/layout`: Global layouts (Navbar, Footer, Sidebar).
*   `src/components/modules`: Feature-specific components.
*   `src/app/(commonLayout)`: Public pages.
*   `src/app/(dashboardLayout)`: Protected dashboard pages.

---

## Phase 1: Project Setup & Architecture
- [x] **1.1 Initialization**: Next.js, Tailwind, TypeScript, Absolute imports.
- [x] **1.2 Core Integration**: Better Auth, Native Fetch setup, Zod, Lucide.
- [x] **1.3 Global UI**: Shadcn basics (Button, Input, Card, etc.), Theme/Colors.

---

## Phase 2: Layouts & Navigation
- [x] **2.1 Common Layout**: Navbar (Logo, Links, Auth Buttons), Footer, `layout.tsx`.
- [x] **2.2 Dashboard Layout**: Sidebar (Role-based links), Dashboard Header, `layout.tsx`.
- [x] **2.3 Navigation Logic**: Logout Action, Navbar state updates (Login vs Dashboard).

---

## Phase 3: Authentication
- [x] **3.1 Auth Actions**: `loginUser`, `registerUser` with Better Auth.
- [x] **3.2 Auth Forms**: Login & Register Forms with Zod validation.
- [x] **3.3 Auth Pages**: `/login`, `/register`.
- [x] **3.4 Role-Based Redirection**: Route to specific dashboards after login.

---

## Phase 4: Public Modules (Homepage & Tutors)
- [x] **4.1 Hero Section**: High-impact design, Search CTA.
- [x] **4.2 Featured Tutors**: Fetch & Display grid of qualified tutors.
- [x] **4.3 Categories**: Browse tutors by subject category.
- [x] **4.4 Trust/Reviews**: Testimonials or "How it works" section.
- [x] **4.5 Tutor Listing Page** (`/tutors`): Filter Sidebar, Search, Pagination.
- [ ] **4.6 Tutor Details Page** (`/tutors/[id]`):
    - [x] Profile Info (Bio, Skills, Rates).
    - [x] Booking Modal Integration.
    - [x] **Display Reviews**: List student reviews for this tutor.

---

## Phase 5: Student Features (Dashboard)
- [x] **5.1 Booking System**:
    - [x] `createBooking` Server Action.
    - [x] Booking Modal with Calendar/Time-selection.
- [x] **5.2 My Bookings** (`/dashboard/bookings`):
    - [x] List user bookings with status labels.
- [x] **5.3 Student Profile** (`/dashboard/profile`):
    - [x] Create Profile Form via `updateStudentProfile` action.
- [x] **5.4 Reviews System**:
    - [x] `createReview` Server Action.
    - [x] UI to leave a review for completed sessions.

---

## Phase 6: Tutor Features (Dashboard)
- [x] **6.1 Tutor Dashboard** (`/tutor/dashboard`):
    - [x] Basic stats overview.
- [x] **6.2 Tutor Profile Management** (`/tutor/profile`):
    - [x] Create/Edit Profile Form (Bio, Expertise, Education, Rate).
    - [x] `updateTutorProfile` Server Action.
- [x] **6.3 Availability Management** (`/tutor/availability`):
    - [x] UI to add/remove time slots.
    - [x] `updateAvailability` Server Action.
- [x] **6.4 Session Management**:
    - [x] View upcoming sessions/bookings.

---

## Phase 7: Admin Features (Dashboard)
- [x] **7.1 Admin Dashboard** (`/admin`):
    - [x] Basic stats overview.
- [ ] **7.2 User Management** (`/admin/users`):
    - [ ] Table of all users.
    - [ ] Action to Ban/Unban users.
- [ ] **7.3 Booking Management** (`/admin/bookings`):
    - [ ] View all platform bookings.
- [ ] **7.4 Category Management** (`/api/admin/categories`):
    - [ ] List, Create, Delete Categories (optional UI).

---

## Phase 8: Deployment & Polish
- [ ] **8.1 Final UX Review**: Loading states, Error handling, Responsive checks.
- [ ] **8.2 Deployment**: Build check, Vercel config, Env variables, Live test.
