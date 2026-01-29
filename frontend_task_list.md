# Frontend Task List - SkillBridge

This document outlines the step-by-step plan to build the frontend for the SkillBridge project, following strict architecture patterns and requirements.

**Mandatory Requirements:**
*   **Homepage:** Must have 4 meaningful sections + Navbar + Footer.
*   **UI/UX:** Clean, responsive design with consistent colors & spacing.
*   **Tech Pattern:** Server Actions for mutations, Zod for validation, Modular file structure.

**Tech Stack:**
*   **Framework:** Next.js (App Router, Layouts)
*   **Styling:** Tailwind CSS, Shadcn UI
*   **State/Data:** TanStack Query, TanStack Form
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
- [ ] Initialize Next.js project with TypeScript.
- [ ] Configure Tailwind CSS & `tailwind.config.ts`.
- [ ] Set up absolute imports (`@/` -> `./src/`).
- [ ] Initialize Shadcn UI & configure `components.json`.
- [ ] **Structure Setup**: Create `actions`, `services`, `components/{ui,layout,modules}`, `types`, `lib`, `hooks` directories.

### 1.2 Core Integration
- [ ] Install & Setup **TanStack Query** (`QueryClientProvider`).
- [ ] Install **Better Auth** & set up client wrapper.
- [ ] Install **Lucide React** & **Zod**.
- [ ] Setup `src/lib/api-client.ts` or base fetch wrapper for usage in Services.

### 1.3 Global UI Components
- [ ] Install/Create base Shadcn components: Button, Input, Card, Dialog, Toast, Form, DropdownMenu.
- [ ] Define **Theme/Colors** in globals.css for consistency.

---

## Phase 2: Layouts & Navigation

### 2.1 Common Layout (`app/(commonLayout)`)
- [ ] Create `Navbar` Component:
    - [ ] Logo, Navigation Links, Auth Buttons/User Menu.
    - [ ] Responsive design (mobile menu).
- [ ] Create `Footer` Component:
    - [ ] Links, Copyright, Socials.
- [ ] Implement `layout.tsx` for common public pages.

### 2.2 Dashboard Layout (`app/(dashboardLayout)`)
- [ ] Create `Sidebar` Component:
    - [ ] Dynamic links based on Role (Student/Tutor/Admin).
- [ ] Create `DashboardHeader` Component.
- [ ] Implement `layout.tsx` for protected routes.

---

## Phase 3: Authentication (Server Actions + Zod)

### 3.1 Auth Actions (`src/actions/auth.ts`)
- [ ] `loginUser(data)`: Server action handling login via Better Auth.
- [ ] `registerUser(data)`: Server action for registration.

### 3.2 Auth Forms (`src/components/modules/auth`)
- [ ] **Login Form**: 
    - [ ] Zod Schema Validation.
    - [ ] Integration with `loginUser` action.
- [ ] **Register Form**:
    - [ ] Zod Schema (including Role selection).
    - [ ] Integration with `registerUser` action.

### 3.3 Auth Pages
- [ ] `/login`: Renders Login Form.
- [ ] `/register`: Renders Register Form.

---

## Phase 4: Homepage & Public Modules (Mandatory: 4 Sections)

### 4.1 Hero Section
- [ ] Design a high-impact Hero with "Find Tutors" CTA.
- [ ] Animated elements or search bar integration.

### 4.2 Featured Tutors Section
- [ ] Service: `tutor.service.ts` -> `getFeaturedTutors()`.
- [ ] Component: Grid of `TutorCard`.

### 4.3 Categories Section
- [ ] Service: `category.service.ts` -> `getAllCategories()`.
- [ ] Component: Visual grid/list of categories.

### 4.4 Testimonial/Trust Section
- [ ] "How it works" or "Student Reviews" section to build trust.

### 4.5 Tutor Listing Page (`/tutors`)
- [ ] Filter Sidebar (Category, Price, Rating).
- [ ] Search Functionality.
- [ ] Pagination/Infinite Scroll (via TanStack Query).

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
