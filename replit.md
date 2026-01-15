# Business Paraguaná

## Overview
A React/TypeScript business application for Business Paraguaná, a consulting and services company. The app features client registration, profile management, real estate listings, services, and chat functionality.

## Project Structure
- `/screens` - React screen components (WelcomeScreen, HomeScreen, ProfileScreen, etc.)
- `/components` - Reusable UI components
- `/services` - Service utilities (NotificationService)
- `App.tsx` - Main application component with routing logic
- `types.ts` - TypeScript type definitions
- `index.tsx` - Application entry point

## Tech Stack
- React 19 with TypeScript
- Vite for build/dev server
- Tailwind CSS (via CDN)

## Development
- Frontend runs on port 5000
- Run with `npm run dev`

## Environment Variables
- `GEMINI_API_KEY` - API key for Gemini AI integration (optional)
