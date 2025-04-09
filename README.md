# PingCRM

A modern CRM application built with React, TypeScript, FastAPI, and PostgreSQL. This is a migration of the original PingCRM (Rails) application to a modern tech stack.

## 🚀 Features

- Contact Management
  - List, create, edit, and delete contacts
  - Contact details include name, phone, city, and associated company
- Organization Management
  - List, create, edit, and delete organizations
  - Associate contacts with organizations
- Search & Filter
  - Dashboard-style list with filtering
  - Search by contact name or company

## 🛠️ Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling

### Backend
- FastAPI (Python)
- PostgreSQL database
- SQLAlchemy ORM
- Pydantic for data validation
- Alembic for database migrations

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Neon (PostgreSQL)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 📦 Project Structure

```
.
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── api/       # API client
│   │   ├── components/# React components
│   │   ├── pages/     # Page components
│   │   ├── types/     # TypeScript types
│   │   └── App.tsx    # Main application
│   ├── public/        # Static files
│   └── package.json   # Frontend dependencies
│
└── backend/           # FastAPI backend application
    ├── app/
    │   ├── api/      # API endpoints
    │   ├── core/     # Core configuration
    │   ├── crud/     # CRUD operations
    │   ├── db/       # Database models
    │   ├── models/   # SQLAlchemy models
    │   └── schemas/  # Pydantic schemas
    ├── alembic/      # Database migrations
    └── requirements.txt
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- Python (v3.11 or later)
- PostgreSQL
- Docker (optional)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pingcrm.git
   cd pingcrm
   ```

2. Set up the backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up the database:
   ```bash
   # Create a PostgreSQL database
   createdb pingcrm

   # Run migrations
   alembic upgrade head

   # Initialize sample data
   python -m scripts.init_db
   ```

4. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

5. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

6. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Environment Variables

#### Backend (.env)
```
POSTGRES_SERVER=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=pingcrm
SECRET_KEY=your_secret_key
ALLOWED_ORIGINS=http://localhost:5173
```

#### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## 📝 API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🛠️ Development

### Database Migrations

To create a new migration:
```bash
cd backend
alembic revision --autogenerate -m "description of changes"
```

To apply migrations:
```bash
cd backend
alembic upgrade head
```

## 📄 License

This project is licensed under the MIT License. 