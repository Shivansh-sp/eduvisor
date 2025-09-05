# EduAdvisor - Career Guidance Platform

A career guidance platform that helps students discover their ideal career paths using Holland Codes (RIASEC) assessment. The platform provides personalized recommendations for careers, colleges, and educational pathways with a focus on government institutions.

## 🚀 Features

### 🧠 Career Assessment
- **Multi-part Assessment**:
  - Interest Areas (10 questions)
  - Aptitude Indicators (7 questions) 
  - Values & Preferences (4 questions)
- **Career Profiles**: Science & Tech, Creative, People-Centered, Business, Hands-On, Research
- **Recommendations**: Careers, degrees, and future scope based on assessment results

### 🎯 Career Explorer
- Browse and search career options
- Detailed career information with modal views
- Save favorite careers to profile
- Filter by categories and interests

### 🏛️ College Directory
- Database of Central and State Government institutions
- Includes IITs, NITs, Central Universities, and State Universities
- Search and filtering by location, type, courses, and rankings
- Information including placement stats, fees, admission criteria, and contact details
- Save preferred colleges to profile

### 📊 Dashboard
- Assessment results with Holland Code scores
- Saved careers and colleges overview
- Quick access to platform features

### 🔐 Authentication
- User registration and login
- Google OAuth integration
- Profile management with photo upload
- JWT-based authentication

### 🎨 UI/UX
- Animations using Anime.js
- Responsive design with Tailwind CSS
- Smooth transitions and interactive elements

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
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shivansh-sp/eduvisor.git
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
   - Frontend: Open your browser to the development server URL
   - Backend API: Available on the configured port

## 🧪 Assessment Details

The platform uses the Holland Codes (RIASEC) model:

- **R (Realistic)**: Practical, technical, hands-on
- **I (Investigative)**: Analytical, research-oriented
- **A (Artistic)**: Creative, design-focused
- **S (Social)**: Helping, teaching, service-oriented
- **E (Enterprising)**: Leadership, management, business
- **C (Conventional)**: Organizing, finance, detail-focused

Based on assessment results, users receive career profiles with:
- Recommended career paths
- Suitable degree programs
- Future scope and opportunities

## 🚀 Live Demo

The application is deployed and available at:
- **Frontend**: [View Live Demo](https://eduvisor-frontend.onrender.com)
- **Backend API**: [API Documentation](https://eduvisor-backend.railway.app)

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

## 🌐 Deployment

The application can be deployed to any hosting platform that supports Node.js and React applications. Common platforms include Netlify, Vercel, Railway, and Render.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📊 Data Sources

- **College Data**: Government directories and AISHE
- **Career Information**: Industry standards and career guidance resources
- **Assessment Model**: Holland Codes (RIASEC) career assessment framework
- **Institution Rankings**: NIRF data

## 🙏 Acknowledgments

- Holland Codes (RIASEC) model for career assessment
- AISHE and government education directories for college data
- Anime.js for animations
- Tailwind CSS for styling
- React community for documentation

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**EduAdvisor** - Helping students discover their career paths through assessment and guidance.
