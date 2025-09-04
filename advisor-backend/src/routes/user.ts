import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import User from '../models/User';

const router = express.Router();

// Get user dashboard data
router.get('/dashboard', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?._id;
    
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's assessment history, saved colleges, etc.
    const dashboardData = {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        classCompleted: user.classCompleted,
        stream: user.stream,
        location: user.location,
        interests: user.interests,
        careerPreferences: user.careerPreferences,
        aptitudeScores: user.aptitudeScores
      },
      stats: {
        assessmentsCompleted: 0, // Will be calculated from assessment collection
        collegesSaved: 0, // Will be calculated from saved colleges
        recommendationsViewed: 0 // Will be calculated from user activity
      },
      recentActivity: [], // Will be populated from activity logs
      upcomingDeadlines: [] // Will be populated from admission timelines
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Failed to load dashboard' });
  }
});

// Update user interests
router.put('/interests', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { interests } = req.body;
    const userId = req.user?._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { interests } },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Interests updated successfully',
      interests: user.interests
    });
  } catch (error) {
    console.error('Update interests error:', error);
    res.status(500).json({ message: 'Failed to update interests' });
  }
});

// Update career preferences
router.put('/career-preferences', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { careerPreferences } = req.body;
    const userId = req.user?._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { careerPreferences } },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Career preferences updated successfully',
      careerPreferences: user.careerPreferences
    });
  } catch (error) {
    console.error('Update career preferences error:', error);
    res.status(500).json({ message: 'Failed to update career preferences' });
  }
});

// Get user recommendations
router.get('/recommendations', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // This would typically involve complex recommendation algorithms
    // For now, returning basic recommendations based on user profile
    const recommendations = {
      streams: user.stream ? [user.stream] : ['Science', 'Commerce', 'Arts'],
      careers: user.careerPreferences.length > 0 ? user.careerPreferences : [
        'Software Engineer',
        'Data Scientist',
        'Business Analyst',
        'Teacher',
        'Doctor'
      ],
      colleges: [], // Will be populated based on location and preferences
      courses: [] // Will be populated based on stream and interests
    };

    res.json(recommendations);
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ message: 'Failed to get recommendations' });
  }
});

export default router;
