import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import TimelineEvent, { ITimelineEvent } from '../models/TimelineEvent';
import Notification, { INotification } from '../models/Notification';

// @desc    Get timeline events for user
// @route   GET /api/timeline/events
// @access  Private
export const getTimelineEvents = async (req: AuthRequest, res: Response) => {
  try {
    const { status, type, priority } = req.query;
    const userId = req.user?._id;

    // Build filter object
    const filter: Record<string, any> = { user: userId };
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (priority) filter.priority = priority;

    const events = await TimelineEvent.find(filter)
      .sort({ date: 1 })
      .populate('college', 'name location')
      .populate('course', 'name description');

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get notifications for user
// @route   GET /api/timeline/notifications
// @access  Private
export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const { read, type } = req.query;
    const userId = req.user?._id;

    // Build filter object
    const filter: Record<string, any> = { user: userId };
    if (read !== undefined) filter.read = read === 'true';
    if (type) filter.type = type;

    const notifications = await Notification.find(filter)
      .sort({ timestamp: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create timeline event
// @route   POST /api/timeline/events
// @access  Private
export const createTimelineEvent = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const eventData = { ...req.body, user: userId };

    const event = await TimelineEvent.create(eventData);

    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update timeline event
// @route   PUT /api/timeline/events/:id
// @access  Private
export const updateTimelineEvent = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const eventId = req.params.id;

    const event = await TimelineEvent.findOneAndUpdate(
      { _id: eventId, user: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Timeline event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete timeline event
// @route   DELETE /api/timeline/events/:id
// @access  Private
export const deleteTimelineEvent = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const eventId = req.params.id;

    const event = await TimelineEvent.findOneAndDelete({
      _id: eventId,
      user: userId
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Timeline event not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/timeline/notifications/:id/read
// @access  Private
export const markNotificationAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const notificationId = req.params.id;

    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: userId },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notification not found'
      });
    }

    res.status(200).json({
      success: true,
      data: notification
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/timeline/notifications/read-all
// @access  Private
export const markAllNotificationsAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    await Notification.updateMany(
      { user: userId, read: false },
      { read: true }
    );

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get timeline statistics
// @route   GET /api/timeline/stats
// @access  Private
export const getTimelineStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    const stats = await TimelineEvent.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: null,
          totalEvents: { $sum: 1 },
          upcomingEvents: {
            $sum: {
              $cond: [
                { $eq: ['$status', 'upcoming'] },
                1,
                0
              ]
            }
          },
          activeEvents: {
            $sum: {
              $cond: [
                { $eq: ['$status', 'active'] },
                1,
                0
              ]
            }
          },
          completedEvents: {
            $sum: {
              $cond: [
                { $eq: ['$status', 'completed'] },
                1,
                0
              ]
            }
          },
          highPriorityEvents: {
            $sum: {
              $cond: [
                { $eq: ['$priority', 'high'] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    const notificationStats = await Notification.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: null,
          totalNotifications: { $sum: 1 },
          unreadNotifications: {
            $sum: {
              $cond: [
                { $eq: ['$read', false] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        events: stats[0] || {
          totalEvents: 0,
          upcomingEvents: 0,
          activeEvents: 0,
          completedEvents: 0,
          highPriorityEvents: 0
        },
        notifications: notificationStats[0] || {
          totalNotifications: 0,
          unreadNotifications: 0
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create notification
// @route   POST /api/timeline/notifications
// @access  Private
export const createNotification = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const notificationData = { ...req.body, user: userId };

    const notification = await Notification.create(notificationData);

    res.status(201).json({
      success: true,
      data: notification
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
