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
*   `src/actions`: Server Actions for mutations (e.g., login, register, booking).
*   `src/services`: API data fetching logic.
*   `src/components/ui`: Shadcn base components.
*   `src/components/layout`: Global layouts (Navbar, Footer, Sidebar).
*   `src/components/modules`: Feature-specific components (e.g., `modules/home`, `modules/tutor`).
*   `src/app/(commonLayout)`: Public pages layout.
*   `src/app/(dashboardLayout)`: Protected dashboard pages.

---

## Phase 1: Project Setup & Architecture

### 1.1 Initialization
- [x] Initialize Next.js project with TypeScript.
- [x] Configure Tailwind CSS & `tailwind.config.ts`.
- [x] Set up absolute imports (`@/` -> `./src/`).
- [x] Initialize Shadcn UI & configure `components.json`.
- [x] **Structure Setup**: Create `actions`, `services`, `components/{ui,layout,modules}`, `types`, `lib`, `hooks` directories.

### 1.2 Core Integration
- [x] **Native Fetch**: Use standard `fetch` in Service layer.
- [x] Install **Better Auth** & set up client wrapper.
- [x] Install **Lucide React** & **Zod**.
- [x] Remove `api-client.ts` (Axios) in favor of `fetch` wrapper or direct usage.

### 1.3 Global UI Components
- [x] Install/Create base Shadcn components: Button, Input, Card, Dialog, Toast, Form, DropdownMenu.
- [x] Define **Theme/Colors** in globals.css for consistency.

---

## Phase 2: Layouts & Navigation

### 2.1 Common Layout (`app/(commonLayout)`)
- [x] Create `Navbar` Component:
    - [x] Logo, Navigation Links, Auth Buttons/User Menu.
    - [x] Responsive design (mobile menu).
- [x] Create `Footer` Component:
    - [x] Links, Copyright, Socials.
- [x] Implement `layout.tsx` for common public pages.

### 2.2 Dashboard Layout (`app/(dashboardLayout)`)
- [x] Create `Sidebar` Component:
    - [x] Dynamic links based on Role (Student/Tutor/Admin).
- [x] Create `DashboardHeader` Component.
- [x] Implement `layout.tsx` for protected routes.

---

## Phase 3: Authentication (Server Actions + Zod)

### 3.1 Auth Actions (`src/actions/auth.ts`)
- [x] `loginUser(data)`: Server action handling login via Better Auth.
- [x] `registerUser(data)`: Server action for registration.

### 3.2 Auth Forms (`src/components/modules/auth`)
- [x] **Login Form**: 
    - [x] Zod Schema Validation.
    - [x] Integration with `loginUser` action.
- [x] **Register Form**:
    - [x] Zod Schema (including Role selection).
    - [x] Integration with `registerUser` action.

### 3.3 Auth Pages
- [x] `/login`: Renders Login Form.
- [x] `/register`: Renders Register Form.

---

## Phase 4: Homepage & Public Modules (Mandatory: 4 Sections)

### 4.1 Hero Section
- [x] Design a high-impact Hero with "Find Tutors" CTA.
- [x] Animated elements or search bar integration.

### 4.2 Featured Tutors Section
- [x] Service: `tutor.service.ts` -> `getFeaturedTutors()`.
- [x] Component: Grid of `TutorCard`.

### 4.3 Categories Section
- [x] Service: `category.service.ts` -> `getAllCategories()`.
- [x] Component: Visual grid/list of categories.

### 4.4 Testimonial/Trust Section
- [x] "How it works" or "Student Reviews" section to build trust.

### 4.5 Tutor Listing Page (`/tutors`)
- [x] Filter Sidebar (Category, Price, Rating).
- [x] Search Functionality.
- [x] Pagination/Infinite Scroll (Simple Native Fetch implemented).

---

## Phase 5: Student Features (Dashboard)

### 5.1 Booking System
- [ ] **Action**: `createBooking(data)` in `src/actions/booking.ts`.
- [ ] **Validation**: Zod schema for booking dates/slots.
- [ ] **UI**: Calendar/Time-slot picker on Tutor Details page.

### 5.2 My Bookings
- [ ] Service: `booking.service.ts` -> `getUserBookings()`.
- [ ] UI: List of bookings with status (Pending, Confirmed).

---

## Phase 6: Tutor Features (Dashboard)

### 6.1 Profile & Availability
- [ ] **Action**: `updateProfile` and `updateAvailability`.
- [ ] **UI**: Form to manage bio, subjects, and calendar time slots.

---

## Phase 7: Admin Features (Dashboard)

### 7.1 User & Content Management
- [ ] Manage Users Table (Ban/Unban).
- [ ] Manage Categories.

---

## Phase 8: Polish & Deployment

### 8.1 Final UX Review
- [ ] Check responsive behavior on all sections.
- [ ] Ensure empty states, loading states, and error states are handled.

### 8.2 Deployment (Vercel)
- [ ] **Pre-Deployment Check**: Run `npm run build` locally to ensure no type errors.
- [ ] **Vercel Configuration**:
    - [ ] Import project from GitHub.
    - [ ] **Environment Variables**: Set `NEXT_PUBLIC_API_URL`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET` etc.
- [ ] **Verification**: Test live site (especially Auth cookies & API calls).
