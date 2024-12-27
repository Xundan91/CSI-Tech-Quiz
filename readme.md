

# Project Setup Instructions

### Prerequisites
- Node.js
- npm
- PostgreSQL database url from NeonDB 
https://console.neon.tech/

### Backend Setup



Clone the repository:

```bash
   git clone https://github.com/your-username/your-repo.git


# Navigate to backend directory
cd backend 

# Install dependencies
npm install

# Run Prisma migrations

# setup .env.example => rename to .env then Copy the url of neon db and paste there 

npx prisma migrate dev

# Start development server
npm run dev
```

### Environment Variables
Create `.env` file in backend directory:
```
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
```

### API Documentation
Server runs at `http://localhost:3000`