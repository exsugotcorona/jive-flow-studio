# Replit.md

## Overview

This is a full-stack dance studio web application built for teaching jive dancing. The application features a modern React frontend with Express.js backend, designed to showcase dance courses, handle payments, manage merchandise, and provide an admin dashboard for content management. The application uses PostgreSQL for data persistence and integrates with Instamojo for payment processing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development
- **Styling**: Tailwind CSS with shadcn/ui component library for modern, accessible UI components
- **Routing**: React Router for client-side navigation with protected routes
- **State Management**: React Query for server state and React Context for authentication
- **UI Components**: Radix UI primitives with custom styling for consistent design system
- **Animations**: Framer Motion for smooth page transitions and interactive elements

### Backend Architecture
- **Framework**: Express.js with TypeScript for API endpoints
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: Supabase Auth integration with custom authentication hooks
- **Session Management**: PostgreSQL-based session storage using connect-pg-simple
- **API Structure**: RESTful endpoints organized in `/api` routes with proper error handling
- **Development**: Hot module replacement with Vite integration for seamless development

### Database Design
- **Primary Database**: PostgreSQL with Drizzle ORM schema definitions
- **Schema Management**: Centralized schema in `shared/schema.ts` with Zod validation
- **Tables**: Users, profiles, user roles, and site settings with proper relationships
- **Migrations**: Drizzle Kit for database schema migrations and version control

### Authentication & Authorization
- **Provider**: Supabase Auth for user management and authentication flows
- **Role System**: Custom role-based access control with admin and user roles
- **Session Management**: Server-side session handling with PostgreSQL storage
- **Protected Routes**: Client-side route protection with authentication context

### Payment Integration
- **Payment Gateway**: Instamojo Classic API for Indian market payment processing
- **Webhook Handling**: Custom webhook endpoints for payment status updates
- **Payment Flow**: Secure payment request creation with proper error handling and success/failure redirects

## External Dependencies

### Third-Party Services
- **Supabase**: Authentication, user management, and supplementary database services
- **Instamojo**: Payment gateway for course enrollments and merchandise purchases
- **Neon Database**: PostgreSQL hosting for production database (via DATABASE_URL)

### Key Libraries & Frameworks
- **UI Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with shadcn/ui components for design consistency
- **Database**: Drizzle ORM with PostgreSQL adapter for type-safe queries
- **Validation**: Zod for runtime type checking and form validation
- **Forms**: React Hook Form with Zod resolvers for form handling
- **Animation**: Framer Motion for smooth user interactions
- **HTTP Client**: Native fetch with React Query for API state management

### Development Tools
- **Build Tool**: Vite for fast development and optimized production builds
- **Package Manager**: npm with Node.js ecosystem
- **TypeScript**: Full type safety across frontend and backend
- **Development Server**: Express with Vite middleware integration
- **Code Quality**: ESLint and TypeScript compiler for code validation