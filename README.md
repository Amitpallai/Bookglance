# Bookglance

Bookglance is a full-stack web application for browsing, reviewing, and managing books. It features a React-based frontend and a Node.js/Express backend with MongoDB for data storage.

## Project Structure

- `frontend/` — React application for the user interface
- `backend/` — Node.js/Express REST API server

## Features
- Browse and search for books
- User authentication and profiles
- Add, edit, and review books
- Comment on books and reviews
- Responsive and modern UI

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- npm
- MongoDB (local or cloud instance)

### Setup

#### 1. Clone the repository
```bash
 git clone <repo-url>
 cd Bookglance
```

#### 2. Setup Backend
```bash
cd backend
npm install
# Configure environment variables (MongoDB URI, Cloudinary, etc.)
node index.js
```

#### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

## Usage
- Access the frontend at `http://localhost:5173` (or as specified by Vite)
- The backend runs on the port specified in `backend/index.js` (commonly `http://localhost:3000`)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE) 