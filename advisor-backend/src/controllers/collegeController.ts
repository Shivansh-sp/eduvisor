import { Request, Response } from 'express';
import College, { ICollege } from '../models/College';
import Course, { ICourse } from '../models/Course';

// @desc    Get all colleges with filtering and search
// @route   GET /api/colleges
// @access  Public
export const getColleges = async (req: Request, res: Response) => {
  try {
    const {
      search,
      type,
      state,
      course,
      minRating,
      maxFees,
      sortBy = 'name',
      page = 1,
      limit = 10
    } = req.query;

    // Build filter object
    const filter: Record<string, any> = {};

    if (type) filter.type = type;
    if (state) filter['location.state'] = state;
    if (minRating) filter.rating = { $gte: Number(minRating) };
    if (maxFees) filter['fees.max'] = { $lte: Number(maxFees) };

    // Build search query
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } },
        { 'location.state': { $regex: search, $options: 'i' } },
        { courses: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    let sort: Record<string, any> = {};
    switch (sortBy) {
      case 'name':
        sort = { name: 1 };
        break;
      case 'rating':
        sort = { rating: -1 };
        break;
      case 'fees':
        sort = { 'fees.min': 1 };
        break;
      case 'established':
        sort = { established: -1 };
        break;
      default:
        sort = { name: 1 };
    }

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Execute query
    const colleges = await College.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .populate('courses', 'name description');

    const total = await College.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: colleges.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: colleges
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get college by ID
// @route   GET /api/colleges/:id
// @access  Public
export const getCollege = async (req: Request, res: Response) => {
  try {
    const college = await College.findById(req.params.id)
      .populate('courses', 'name description duration level')
      .populate('programs', 'name description duration fees');

    if (!college) {
      return res.status(404).json({
        success: false,
        error: 'College not found'
      });
    }

    res.status(200).json({
      success: true,
      data: college
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get colleges by state
// @route   GET /api/colleges/state/:state
// @access  Public
export const getCollegesByState = async (req: Request, res: Response) => {
  try {
    const { state } = req.params;
    const colleges = await College.find({ 'location.state': state })
      .populate('courses', 'name description');

    res.status(200).json({
      success: true,
      count: colleges.length,
      data: colleges
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get colleges by course
// @route   GET /api/colleges/course/:courseId
// @access  Public
export const getCollegesByCourse = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const colleges = await College.find({ courses: courseId })
      .populate('courses', 'name description');

    res.status(200).json({
      success: true,
      count: colleges.length,
      data: colleges
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get filter options for college directory
// @route   GET /api/colleges/filters
// @access  Public
export const getCollegeFilters = async (req: Request, res: Response) => {
  try {
    const states = await College.distinct('location.state');
    const types = await College.distinct('type');
    const courses = await Course.distinct('name');
    
    // Get rating and fees ranges
    const ratingStats = await College.aggregate([
      {
        $group: {
          _id: null,
          minRating: { $min: '$rating' },
          maxRating: { $max: '$rating' },
          avgRating: { $avg: '$rating' }
        }
      }
    ]);

    const feesStats = await College.aggregate([
      {
        $group: {
          _id: null,
          minFees: { $min: '$fees.min' },
          maxFees: { $max: '$fees.max' },
          avgFees: { $avg: '$fees.min' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        states: states.sort(),
        types: types.sort(),
        courses: courses.sort(),
        ratingRange: ratingStats[0] || { minRating: 0, maxRating: 5, avgRating: 3 },
        feesRange: feesStats[0] || { minFees: 0, maxFees: 1000000, avgFees: 100000 }
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new college
// @route   POST /api/colleges
// @access  Private/Admin
export const createCollege = async (req: Request, res: Response) => {
  try {
    const college = await College.create(req.body);
    
    res.status(201).json({
      success: true,
      data: college
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update college
// @route   PUT /api/colleges/:id
// @access  Private/Admin
export const updateCollege = async (req: Request, res: Response) => {
  try {
    const college = await College.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!college) {
      return res.status(404).json({
        success: false,
        error: 'College not found'
      });
    }

    res.status(200).json({
      success: true,
      data: college
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete college
// @route   DELETE /api/colleges/:id
// @access  Private/Admin
export const deleteCollege = async (req: Request, res: Response) => {
  try {
    const college = await College.findByIdAndDelete(req.params.id);

    if (!college) {
      return res.status(404).json({
        success: false,
        error: 'College not found'
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
