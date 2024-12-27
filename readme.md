
# Project Setup Guide

## Prerequisites
- Node.js (v20 or higher)
- npm
- Database URL from [NeonDB](https://console.neon.tech/)

## Step-by-Step Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/your-repo.git
```

### 2. Backend Configuration

```bash
# Navigate to backend
cd backend 

# Install dependencies
npm install

# Configure environment
cp .env.example .env
```

### 3. Database Setup

1. Visit [NeonDB Console](https://console.neon.tech/)
2. Create new project
3. Copy connection string
4. Update `.env`:
```
DATABASE_URL="your-neondb-connection-string"
```

### 4. Initialize Database

```bash
# Run migrations
npx prisma migrate dev
```

### 5. Start Server

```bash
npm run dev
```
Server runs at `http://localhost:3000`

## Troubleshooting

- Ensure NeonDB connection string is correctly formatted
- Check if all migrations are applied
- Verify Node.js version compatibility(node -v) must be 22 

