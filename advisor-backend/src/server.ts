import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { 
  createRateLimit, 
  createSpeedLimit, 
  setSecurityHeaders, 
  securityLogger, 
  preventNoSQLInjection, 
  requestSizeLimit,
  corsOptions 
} from './middleware/security';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import assessmentRoutes from './routes/assessment';
import collegeRoutes from './routes/college';
import careerRoutes from './routes/career';
import timelineRoutes from './routes/timeline';
import chatbotRoutes from './routes/chatbot';
import recommendationRoutes from './routes/recommendation';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"]
    }
  }
}));
app.use(setSecurityHeaders);
app.use(securityLogger);
app.use(compression());
app.use(morgan('combined'));

// CORS with security options
app.use(cors(corsOptions));

// Request size and rate limiting
app.use(requestSizeLimit(5 * 1024 * 1024)); // 5MB limit
app.use(createRateLimit(15 * 60 * 1000, 100)); // 100 requests per 15 minutes
app.use(createSpeedLimit(15 * 60 * 1000, 50, 500)); // Slow down after 50 requests

// Input validation and sanitization
app.use(preventNoSQLInjection);
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/advisor', {
  // Remove deprecated options
})
.then(() => console.log('MongoDB connected successfully'))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/college', collegeRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Advisor API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
