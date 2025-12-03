# AlumniConnect - India Edition 🇮🇳

A full-stack Alumni Network Platform built with Next.js and Express.js, featuring India-specific job opportunities and tech events.

## 🚀 Features

- **User Authentication** - Secure login/registration with JWT tokens
- **Alumni Directory** - Browse and connect with alumni
- **Job Portal** - India-specific jobs from top companies (Infosys, TCS, Wipro, Flipkart, etc.)
- **Events Hub** - India tech events (GDG DevFest, PyCon India, ReactConf India, etc.)
- **Announcements** - Stay updated with community announcements
- **Connections** - Build your professional network
- **Professional UI** - Clean, modern interface with SVG illustrations

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components

### Backend
- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Axios** - HTTP client for external APIs

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
npm install
# Create .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=5000
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/external/jobs` - Get India jobs from external sources

### Events
- `GET /api/events` - Get all events
- `GET /api/external/events` - Get India tech events

### Profiles
- `GET /api/profile` - Get all profiles
- `GET /api/profile/:id` - Get profile by ID

## 🇮🇳 India-Specific Features

### Jobs
- Top Indian companies: Infosys, TCS, Wipro, HCL, Tech Mahindra
- Indian startups: Flipkart, Swiggy, Zomato, Paytm, Razorpay, CRED
- Indian locations: Bangalore, Hyderabad, Pune, Mumbai, Chennai, Delhi NCR, Noida, Gurgaon
- Salaries in ₹ LPA format

### Events
- GDG DevFest Bangalore
- PyCon India
- ReactConf India
- JSConf India
- AWS Community Day Mumbai
- Null Security Conference
- HasGeek Events
- And more...

## 📁 Project Structure

```
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Auth middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── services/       # External API services
│   └── utils/          # Helper utilities
│
├── frontend/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   ├── contexts/      # React contexts
│   └── lib/           # Utilities and types
```

## 👨‍💻 Author

**Yash** - [GitHub](https://github.com/Yashvvvv)

## 📄 License

This project is open source and available under the MIT License.
