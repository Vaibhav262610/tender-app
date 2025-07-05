# CRUD App with PostgreSQL

A full-stack B2B tender management platform built with Next.js frontend and Node.js/Express backend with PostgreSQL database.

## 🚀 Features

- **User Authentication**: Register, login, and profile management
- **Company Management**: Create and manage company profiles with logo uploads
- **Tender Management**: Create, view, and manage tenders
- **Application System**: Apply to tenders and track applications
- **File Storage**: Supabase storage integration for company logos
- **Responsive UI**: Modern interface built with Next.js and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - File storage for company logos
- **Radix UI** - UI components

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Zod** - Schema validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## 🗄️ Database Setup

### 1. Install PostgreSQL

**Windows:**
- Download from [PostgreSQL official website](https://www.postgresql.org/download/windows/)
- Install with default settings
- Remember the password you set for the `postgres` user

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE tender;

# Verify database creation
\l

# Exit psql
\q
```

## 🔧 Environment Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd crud-app-postgressql
```

### 2. Backend Environment Variables

Create a `.env` file in the `backend2` directory:

```bash
cd backend2
touch .env
```

Add the following variables to `backend2/.env`:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tender
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Supabase Configuration (for file storage)
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Frontend Environment Variables

Create a `.env.local` file in the `frontend` directory:

```bash
cd ../frontend
touch .env.local
```

Add the following variables to `frontend/.env.local`:

```env
# Backend API URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚀 Installation & Running

### 1. Install Dependencies

**Backend:**
```bash
cd backend2
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Database Migration

The database tables will be created automatically when you start the backend server. If you need to manually sync the database:

```bash
cd backend2
npm run dev
```

The server will automatically create the necessary tables on first run.

### 3. Start the Application

**Start Backend Server:**
```bash
cd backend2
npm run dev
```

The backend server will start on `http://localhost:5000`

**Start Frontend Development Server:**
```bash
cd frontend
npm run dev
```

The frontend application will start on `http://localhost:3000`

### 4. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
crud-app-postgressql/
├── backend2/                 # Backend server
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── db/              # Database connection
│   │   ├── lib/             # Utility libraries
│   │   ├── modules/         # Feature modules
│   │   │   ├── auth/        # Authentication
│   │   │   ├── company/     # Company management
│   │   │   ├── tender/      # Tender management
│   │   │   └── application/ # Application system
│   │   └── router/          # API routes
│   └── package.json
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # Next.js app router
│   │   ├── components/      # React components
│   │   └── lib/             # Utility functions
│   └── package.json
└── README.md
```

## 🔐 Authentication

The application uses JWT-based authentication:

1. **Register**: Create a new user account
2. **Login**: Authenticate with email and password
3. **Protected Routes**: Access to certain features requires authentication

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Companies
- `GET /api/companies` - Get all companies
- `POST /api/companies` - Create company
- `GET /api/companies/:id` - Get company by ID
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

### Tenders
- `GET /api/tenders` - Get all tenders
- `POST /api/tenders` - Create tender
- `GET /api/tenders/:id` - Get tender by ID
- `PUT /api/tenders/:id` - Update tender
- `DELETE /api/tenders/:id` - Delete tender

### Applications
- `GET /api/applications` - Get all applications
- `POST /api/applications` - Create application
- `GET /api/applications/:id` - Get application by ID

## 🗂️ File Storage Setup

For company logo uploads, you'll need to set up Supabase Storage. See [SUPABASE_STORAGE_SETUP.md](./SUPABASE_STORAGE_SETUP.md) for detailed instructions.

## 🐛 Troubleshooting

### Common Issues

**1. Database Connection Error**
- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Check if the `tender` database exists

**2. Port Already in Use**
- Backend: Change port in `backend2/.env` or kill process using port 5000
- Frontend: Change port in `frontend/package.json` or kill process using port 3000

**3. Module Not Found Errors**
- Run `npm install` in both `backend2` and `frontend` directories
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**4. CORS Errors**
- Ensure backend CORS is properly configured
- Check that frontend is making requests to the correct backend URL

**5. Environment Variables Not Loading**
- Verify `.env` files are in the correct directories
- Restart the development servers after adding environment variables

### Debug Commands

```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check database connection
psql -U postgres -d tender -c "\dt"

# Check Node.js version
node --version

# Check npm version
npm --version
```

## 🚀 Deployment

### Backend Deployment
1. Build the TypeScript code: `npm run build`
2. Set `NODE_ENV=production` in environment variables
3. Deploy to your preferred hosting service (Heroku, Railway, etc.)

### Frontend Deployment
1. Build the Next.js app: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred hosting service

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🤝 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the Supabase storage setup guide
3. Create an issue in the repository
4. Contact the development team

---

**Happy Coding! 🎉** 