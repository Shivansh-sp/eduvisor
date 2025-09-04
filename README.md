# EduAdvisor - Career Guidance & Educational Planning Platform

A comprehensive career guidance platform that helps students discover their ideal career paths using scientifically-based Holland Codes (RIASEC) assessment and provides personalized recommendations for careers, colleges, and educational pathways.

## 🚀 Features

### 🧠 Holland Codes Assessment
- **3-Part Comprehensive Assessment**:
  - Interest Areas (10 questions)
  - Aptitude Indicators (7 questions) 
  - Values & Preferences (4 questions)
- **6 Career Profiles**: Science & Tech, Creative & Imaginative, People-Centered, Business & Management, Hands-On Practical, Research & Service
- **Personalized Recommendations**: Careers, degrees, and future scope based on assessment results

### 🎯 Career Explorer
- Browse and search career options
- Detailed career information with modal views
- Save favorite careers to profile
- Filter by categories and interests

### 🏛️ College Directory
- Comprehensive database of government colleges and universities
- Search and filter by location, type, and courses
- Save preferred colleges
- Detailed college information and course offerings

### 📊 Functional Dashboard
- Assessment results display with Holland Code scores
- Saved careers and colleges overview
- Progress tracking and statistics
- Quick access to all platform features

### 🔐 Authentication System
- User registration and login
- Real Google OAuth integration
- Profile management with photo upload
- Secure JWT-based authentication

### 🎨 Modern UI/UX
- Beautiful animations using Anime.js
- Responsive design with Tailwind CSS
- Glassmorphism effects and smooth transitions
- Interactive elements with magnetic effects

## 🛠️ Technology Stack

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Anime.js** for animations
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for state management

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS, Helmet, Morgan** for security and logging

## 📁 Project Structure

```
eduvisor/
├── advisor-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Main application pages
│   │   ├── hooks/            # Custom React hooks
│   │   ├── contexts/         # React contexts
│   │   ├── services/         # API services
│   │   └── utils/            # Utility functions
│   └── public/               # Static assets
├── advisor-backend/           # Node.js backend API
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   └── utils/           # Utility functions
│   └── dist/                # Compiled TypeScript
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/eduvisor.git
   cd eduvisor
   ```

2. **Install backend dependencies**
   ```bash
   cd advisor-backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../advisor-frontend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # In advisor-backend directory
   cp env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

5. **Start the backend server**
   ```bash
   cd advisor-backend
   npm run build
   npm start
   ```

6. **Start the frontend development server**
   ```bash
   cd advisor-frontend
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🧪 Assessment Details

The platform uses the scientifically-proven Holland Codes (RIASEC) model:

- **R (Realistic)**: Practical, technical, hands-on
- **I (Investigative)**: Analytical, research-oriented
- **A (Artistic)**: Creative, design-focused
- **S (Social)**: Helping, teaching, service-oriented
- **E (Enterprising)**: Leadership, management, business
- **C (Conventional)**: Organizing, finance, detail-focused

Based on assessment results, users receive personalized career profiles with:
- Recommended career paths
- Suitable degree programs
- Future scope and opportunities
- Government and private sector options

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Assessment
- `POST /api/assessment/submit` - Submit assessment
- `GET /api/assessment/results` - Get assessment results

### Careers & Colleges
- `GET /api/careers` - Get career listings
- `GET /api/colleges` - Get college listings
- `POST /api/careers/save` - Save career
- `POST /api/colleges/save` - Save college

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Holland Codes (RIASEC) model for career assessment
- Anime.js for beautiful animations
- Tailwind CSS for modern styling
- React community for excellent documentation

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**EduAdvisor** - Empowering students to discover their ideal career paths through science-based assessment and personalized guidance.