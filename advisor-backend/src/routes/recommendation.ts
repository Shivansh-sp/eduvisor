import express from 'express';
import { 
  getRecommendations, 
  updateUserProfile, 
  trackUserBehavior,
  getUserProfile
} from '../controllers/recommendationController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(authenticateToken);

// Get personalized recommendations
router.get('/', getRecommendations);

// User profile management
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

// Behavior tracking
router.post('/track', trackUserBehavior);

export default router;
