# DLMS (Deep Learning Management System) - Habit Tracker Application

## Overview

DLMS is a space-themed habit tracking application built with React and Express. It guides users through a journey of building healthy habits with a focus on fitness and consistency. The application features a multi-page wizard-style interface with progress tracking, workout timers, and reflection components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with custom space theme
- **UI Components**: Radix UI primitives with shadcn/ui components
- **State Management**: React hooks + localStorage for persistence
- **Data Fetching**: TanStack Query (React Query) for API calls
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Storage**: Currently using in-memory storage (MemStorage class) as fallback
- **API Design**: RESTful API with CRUD operations for user management
- **Session Management**: Connect-pg-simple for PostgreSQL session store

## Key Components

### Frontend Components
1. **Progress Header**: Shows current page indicator with space-themed design
2. **Space Background**: Animated starfield background effect
3. **Multi-page Wizard**: Welcome → Habit Tracker → Reflection → Workout Timer → Feedback
4. **Custom UI Components**: Timer, Workout Calendar, and various form inputs
5. **Responsive Design**: Mobile-first approach with glass-morphism effects

### Backend Components
1. **User Management**: CRUD operations for user profiles and progress
2. **Storage Interface**: Abstracted storage layer supporting both memory and database
3. **API Routes**: RESTful endpoints for user operations
4. **Middleware**: Request logging and error handling

### Database Schema
- **Users Table**: Stores user information, habits, progress, and feedback
- **Fields**: id, name, struggle, habit, learned, liked, feedback, completedWorkouts, workoutDays, createdAt
- **Validation**: Zod schemas for input validation and type safety

## Data Flow

1. **User Journey**: Welcome → Habit Selection → Reflection → Workout Tracking → Feedback
2. **Data Persistence**: localStorage for frontend state, PostgreSQL for backend persistence
3. **API Communication**: RESTful API calls using fetch with TanStack Query
4. **Real-time Updates**: Timer component with interval-based updates
5. **Form Handling**: React Hook Form with Zod validation

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Query
- **UI Library**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Form Handling**: React Hook Form, Zod validation
- **Routing**: Wouter
- **Date Handling**: date-fns

### Backend Dependencies
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Server**: Express.js, TypeScript
- **Session**: connect-pg-simple
- **Validation**: Zod with drizzle-zod integration

### Development Dependencies
- **Build Tools**: Vite, esbuild, TSX
- **TypeScript**: Full TypeScript support across frontend and backend
- **Development**: Replit-specific plugins for development environment

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations handle schema changes
4. **Environment**: Supports both development and production modes

### Environment Configuration
- **Development**: Uses Vite dev server with HMR
- **Production**: Serves static files from Express server
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Session**: PostgreSQL session store for production

### Hosting Considerations
- **Static Assets**: Served from Express in production
- **Database**: Requires PostgreSQL instance (Neon Database recommended)
- **Environment Variables**: DATABASE_URL required for database connection
- **Port**: Configurable via environment or defaults to standard Express setup

## Technical Decisions

### Architecture Choices
- **Monorepo Structure**: Shared types and schemas between frontend and backend
- **TypeScript**: Full type safety across the stack
- **Drizzle ORM**: Type-safe database queries with PostgreSQL
- **Memory Storage Fallback**: Graceful degradation when database is unavailable

### UI/UX Decisions
- **Space Theme**: Engaging visual design with animations and cosmic styling
- **Progressive Disclosure**: Wizard-style interface guides users through journey
- **Local Storage**: Persists user data across sessions for better UX
- **Responsive Design**: Mobile-first approach with glass-morphism effects

### Performance Considerations
- **Vite**: Fast development builds and optimized production bundles
- **TanStack Query**: Efficient data fetching with caching
- **Lazy Loading**: Components loaded as needed
- **Optimized Images**: External image references for backgrounds