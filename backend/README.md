

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
CREATE DATABASE fluent;

6. Create .env file:
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/fluent

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
CREATE DATABASE fluent;

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

____________________________________________________________________________________________________
____________________________________________________________________________________________________
## PostgreSQL Commands

1. Start the PostgreSQL CLI: psql -U postgres
2. List all databases:\l
3. Connect to a database: \c fluent
4. List all tables: \dt
5. Describe a table (show table structure): \d users
6. Shows all rows stored in the table: SELECT * FROM users;
7. Exit PostgreSQL: \q


nieuwe komomn
ALTER TABLE flashcard_sets
ADD COLUMN level VARCHAR;

kolomn verwijderen
ALTER TABLE flashcard_sets
DROP COLUMN level;
