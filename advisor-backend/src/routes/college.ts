import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import College from '../models/College';

const router = express.Router();

// Get colleges with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      state,
      city,
      stream,
      type,
      search,
      sortBy = 'rating.overall',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter: any = {};
    
    if (state) filter['location.state'] = state;
    if (city) filter['location.city'] = city;
    if (stream) filter['programs.stream'] = stream;
    if (type) filter.type = type;
    
    if (search) {
      filter.$text = { $search: search as string };
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Execute query
    const colleges = await College.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .select('-__v');

    const total = await College.countDocuments(filter);

    res.json({
      colleges,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalColleges: total,
        hasNext: skip + Number(limit) < total,
        hasPrev: Number(page) > 1
      }
    });
  } catch (error) {
    console.error('Get colleges error:', error);
    res.status(500).json({ message: 'Failed to get colleges' });
  }
});

// Get college by ID
router.get('/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    res.json(college);
  } catch (error) {
    console.error('Get college error:', error);
    res.status(500).json({ message: 'Failed to get college details' });
  }
});

// Get colleges by location
router.get('/location/:state/:city?', async (req, res) => {
  try {
    const { state, city } = req.params;
    const { stream, type } = req.query;

    const filter: any = { 'location.state': state };
    if (city) filter['location.city'] = city;
    if (stream) filter['programs.stream'] = stream;
    if (type) filter.type = type;

    const colleges = await College.find(filter)
      .sort({ 'rating.overall': -1 })
      .limit(20);

    res.json(colleges);
  } catch (error) {
    console.error('Get colleges by location error:', error);
    res.status(500).json({ message: 'Failed to get colleges by location' });
  }
});

// Get recommended colleges for user
router.get('/recommendations/user', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user?._id;
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Build recommendation filter based on user profile
    const filter: any = {
      'location.state': user.location.state
    };

    if (user.stream) {
      filter['programs.stream'] = user.stream;
    }

    // Get recommended colleges
    const colleges = await College.find(filter)
      .sort({ 'rating.overall': -1 })
      .limit(10);

    res.json({
      colleges,
      recommendationReason: `Based on your location (${user.location.state}) and stream (${user.stream || 'any'})`
    });
  } catch (error) {
    console.error('Get user recommendations error:', error);
    res.status(500).json({ message: 'Failed to get college recommendations' });
  }
});

// Search colleges
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { limit = 10 } = req.query;

    const colleges = await College.find({
      $text: { $search: query }
    })
    .sort({ score: { $meta: 'textScore' } })
    .limit(Number(limit));

    res.json(colleges);
  } catch (error) {
    console.error('Search colleges error:', error);
    res.status(500).json({ message: 'Failed to search colleges' });
  }
});

// Get admission timelines
router.get('/admission/timelines', async (req, res) => {
  try {
    const { state, stream } = req.query;

    const filter: any = {};
    if (state) filter['location.state'] = state;
    if (stream) filter['programs.stream'] = stream;

    const colleges = await College.find(filter)
      .select('name location programs.admissionProcess')
      .sort({ 'programs.admissionProcess.applicationStart': 1 });

    // Extract and format admission timelines
    const timelines = colleges.flatMap(college => 
      college.programs.map(program => ({
        collegeName: college.name,
        collegeLocation: college.location,
        programName: program.name,
        applicationStart: college.admissionProcess?.applicationStart,
        applicationEnd: college.admissionProcess?.applicationEnd,
        entranceExam: college.admissionProcess?.entranceExam
      }))
    ).filter(timeline => timeline.applicationStart);

    res.json(timelines);
  } catch (error) {
    console.error('Get admission timelines error:', error);
    res.status(500).json({ message: 'Failed to get admission timelines' });
  }
});

export default router;
