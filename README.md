# Trello Clone

A full-stack Trello clone application that allows users to manage projects and tasks using boards, lists, and cards. Try it out at: https://morello.onrender.com/

> **Note**: The application is hosted on a free Render account, so the server may take about a minute to start up on the first access.

## Features

- Create and manage multiple boards
- Add, edit, and delete lists within boards
- Drag and drop cards between lists
- Persistent data storage with MongoDB
- Responsive design for desktop and mobile devices

## Tech Stack

### Frontend
- React - UI library
- Redux - State management
- Vite - Build tool and development server
- React DnD - Drag and drop functionality
- Sass - Styling

### Backend
- Node.js - Runtime environment
- Express - Web framework
- MongoDB - Database

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. Clone the repository
```bash
git clone [repository-url]
cd trello
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
```
MONGO_URL=your_mongodb_connection_string
NODE_ENV=development/producion (development for local, production for production)
SECRET1=your_jwt_secret
```

## Running the Application

### Development Mode

Frontend:
```bash
cd frontend
npm run dev  # Starts Vite dev server
```

Backend:
```bash
cd backend
npm run dev  # Starts Node.js server with nodemon
```

### Production Build

Frontend:
```bash
cd frontend
npm run build
```

## Project Structure

```
trello/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── store/     # Redux store
│   │   └── styles/    # SCSS styles
│   └── package.json
│
└── backend/           # Node.js backend
    ├── api/          # API routes
    ├── models/       # MongoDB models
    ├── middleware/   # Custom middleware
    └── package.json
```
