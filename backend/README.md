

# Fluent
Full stack language learning platform  
Frontend: Next.js  
Backend: FastAPI  
Database: PostgreSQL


____________________________________________________________________________________________________
____________________________________________________________________________________________________
## Requirements

- Node.js 18+
- Python 3.11+
- PostgreSQL 16.x


____________________________________________________________________________________________________
____________________________________________________________________________________________________

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication

### Database
- PostgreSQL 16


____________________________________________________________________________________________________
____________________________________________________________________________________________________
## Backend Setup

1. Navigate to backend: 
cd backend

2. Create virtual environment: 
python -m venv venv

3. Activate environment:
Windows:
venv\Scripts\activate

Mac/Linux:
source venv/bin/activate

4. Install dependencies:
pip install -r requirements.txt

5. Create PostgreSQL database:
CREATE DATABASE flashcards_db;

6. Create .env file:
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/flashcards_db

7. Run server:
uvicorn app.main:app --reload


____________________________________________________________________________________________________
____________________________________________________________________________________________________
## PostgreSQL Access (Windows)

Make sure PostgreSQL is installed and added to PATH.

### Connect to PostgreSQL
psql -U postgres

Enter the password you set during installation.

### Create Database
CREATE DATABASE flashcards_db;

### List Databases
\l

### Connect to Database
\c flashcards_db

### Exit PostgreSQL
\q


## PostgreSQL Service (Windows)
PostgreSQL runs automatically as a Windows service after installation.

If needed, you can check it via:
Win + R → services.msc

Look for:
postgresql-x64-16