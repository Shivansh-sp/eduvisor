import { Request, Response } from 'express';
import Career, { ICareer } from '../models/Career';
import Course, { ICourse } from '../models/Course';

// @desc    Get all career paths
// @route   GET /api/careers
// @access  Public
export const getCareers = async (req: Request, res: Response) => {
  try {
    const careers = await Career.find().populate('courses', 'name description');
    res.status(200).json({
      success: true,
      count: careers.length,
      data: careers
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get career paths by course
// @route   GET /api/careers/course/:courseId
// @access  Public
export const getCareersByCourse = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const careers = await Career.find({ courses: courseId }).populate('courses', 'name description');
    
    res.status(200).json({
      success: true,
      count: careers.length,
      data: careers
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get career path by ID
// @route   GET /api/careers/:id
// @access  Public
export const getCareer = async (req: Request, res: Response) => {
  try {
    const career = await Career.findById(req.params.id).populate('courses', 'name description');
    
    if (!career) {
      return res.status(404).json({
        success: false,
        error: 'Career path not found'
      });
    }

    res.status(200).json({
      success: true,
      data: career
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get career mapping data for charts
// @route   GET /api/careers/mapping/data
// @access  Public
export const getCareerMappingData = async (req: Request, res: Response) => {
  try {
    const careers = await Career.find().populate('courses', 'name');
    const courses = await Course.find();

    // Process data for charts
    const courseData = courses.map(course => {
      const relatedCareers = careers.filter(career => 
        career.courses.some(c => c.toString() === (course._id as any).toString())
      );
      
      const avgSalary = relatedCareers.length > 0 
        ? relatedCareers.reduce((sum, career) => sum + (career.salaryRange.min + career.salaryRange.max) / 2, 0) / relatedCareers.length
        : 0;

      const avgGrowthRate = relatedCareers.length > 0
        ? relatedCareers.reduce((sum, career) => sum + career.growthRate, 0) / relatedCareers.length
        : 0;

      return {
        name: course.name,
        careerPaths: relatedCareers.length,
        avgSalary: Math.round(avgSalary),
        growthRate: Math.round(avgGrowthRate)
      };
    });

    const skillsData = {
      technical: [
        { name: 'Programming', demand: 85 },
        { name: 'Data Analysis', demand: 75 },
        { name: 'Machine Learning', demand: 65 },
        { name: 'Cloud Computing', demand: 70 },
        { name: 'Cybersecurity', demand: 60 }
      ],
      soft: [
        { name: 'Communication', demand: 90 },
        { name: 'Leadership', demand: 80 },
        { name: 'Problem Solving', demand: 85 },
        { name: 'Teamwork', demand: 88 },
        { name: 'Adaptability', demand: 82 }
      ]
    };

    res.status(200).json({
      success: true,
      data: {
        courseData,
        skillsData,
        totalCareers: careers.length,
        totalCourses: courses.length
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new career path
// @route   POST /api/careers
// @access  Private/Admin
export const createCareer = async (req: Request, res: Response) => {
  try {
    const career = await Career.create(req.body);
    
    res.status(201).json({
      success: true,
      data: career
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update career path
// @route   PUT /api/careers/:id
// @access  Private/Admin
export const updateCareer = async (req: Request, res: Response) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!career) {
      return res.status(404).json({
        success: false,
        error: 'Career path not found'
      });
    }

    res.status(200).json({
      success: true,
      data: career
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete career path
// @route   DELETE /api/careers/:id
// @access  Private/Admin
export const deleteCareer = async (req: Request, res: Response) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        error: 'Career path not found'
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
