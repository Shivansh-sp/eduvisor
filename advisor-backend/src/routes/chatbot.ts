import express, { Request, Response, NextFunction } from 'express';
import { 
  sendMessage, 
  getChatHistory, 
  getChatSessions,
  clearChatHistory 
} from '../controllers/chatbotController';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Public route for sending messages (can work without authentication)
router.post('/message', (req: Request, res: Response, next: NextFunction) => {
  // Optional authentication - will work for both authenticated and guest users
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    authenticateToken(req as AuthRequest, res, next);
  } else {
    next();
  }
}, sendMessage);

// Protected routes (require authentication)
router.get('/history/:sessionId', authenticateToken, getChatHistory);
router.get('/sessions', authenticateToken, getChatSessions);
router.delete('/history/:sessionId', authenticateToken, clearChatHistory);

export default router;
