import express from 'express';
import { 
  getTimelineEvents, 
  getNotifications, 
  createTimelineEvent, 
  updateTimelineEvent, 
  deleteTimelineEvent,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getTimelineStats,
  createNotification
} from '../controllers/timelineController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All routes are protected
router.use(authenticateToken);

// Timeline Events
router.get('/events', getTimelineEvents);
router.post('/events', createTimelineEvent);
router.put('/events/:id', updateTimelineEvent);
router.delete('/events/:id', deleteTimelineEvent);

// Notifications
router.get('/notifications', getNotifications);
router.post('/notifications', createNotification);
router.put('/notifications/:id/read', markNotificationAsRead);
router.put('/notifications/read-all', markAllNotificationsAsRead);

// Statistics
router.get('/stats', getTimelineStats);

export default router;
