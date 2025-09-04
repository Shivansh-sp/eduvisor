import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import UserProfile, { IUserProfile } from '../models/UserProfile';
import College, { ICollege } from '../models/College';
import Career, { ICareer } from '../models/Career';
import Course, { ICourse } from '../models/Course';
import User from '../models/User';

// @desc    Get personalized recommendations
// @route   GET /api/recommendations
// @access  Private
export const getRecommendations = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    
    let userProfile = await UserProfile.findOne({ user: userId })
      .populate('recommendations.colleges.college')
      .populate('recommendations.careers.career');

    if (!userProfile) {
      // Create default profile if doesn't exist
      const newProfile = await createDefaultProfile(userId);
      if (newProfile) userProfile = newProfile;
    }

    // Generate fresh recommendations
    if (!userProfile) {
      return res.status(400).json({ success: false, message: 'Unable to create user profile' });
    }
    const recommendations = await generateRecommendations(userProfile);

    res.status(200).json({
      success: true,
      data: recommendations
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/recommendations/profile
// @access  Private
export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const profileData = req.body;

    let userProfile = await UserProfile.findOneAndUpdate(
      { user: userId },
      { $set: profileData },
      { new: true, upsert: true }
    );

    // Regenerate recommendations after profile update
    const recommendations = await generateRecommendations(userProfile);

    res.status(200).json({
      success: true,
      data: {
        profile: userProfile,
        recommendations
      }
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Track user behavior
// @route   POST /api/recommendations/track
// @access  Private
export const trackUserBehavior = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { action, data } = req.body;

    let userProfile = await UserProfile.findOne({ user: userId });
    if (!userProfile) {
      const newProfile = await createDefaultProfile(userId);
      if (newProfile) userProfile = newProfile;
    }

    if (!userProfile) {
      return res.status(400).json({ success: false, message: 'Unable to create user profile' });
    }

    // Update behavior data based on action
    switch (action) {
      case 'search':
        userProfile.behaviorData.searchHistory.push({
          query: data.query,
          category: data.category,
          timestamp: new Date()
        });
        break;
      
      case 'view_college':
        if (!userProfile.behaviorData.viewedColleges.includes(data.collegeId)) {
          userProfile.behaviorData.viewedColleges.push(data.collegeId);
        }
        break;
      
      case 'view_career':
        if (!userProfile.behaviorData.viewedCareers.includes(data.careerId)) {
          userProfile.behaviorData.viewedCareers.push(data.careerId);
        }
        break;
      
      case 'time_spent':
        userProfile.behaviorData.timeSpent.push({
          section: data.section,
          duration: data.duration,
          timestamp: new Date()
        });
        break;
    }

    await userProfile.save();

    res.status(200).json({
      success: true,
      message: 'Behavior tracked successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get user profile
// @route   GET /api/recommendations/profile
// @access  Private
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    
    let userProfile = await UserProfile.findOne({ user: userId });
    if (!userProfile) {
      const newProfile = await createDefaultProfile(userId);
      if (newProfile) userProfile = newProfile;
    }

    if (!userProfile) {
      return res.status(400).json({ success: false, message: 'Unable to create user profile' });
    }

    res.status(200).json({
      success: true,
      data: userProfile
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Helper function to create default profile
const createDefaultProfile = async (userId: string | undefined) => {
  if (!userId) return null;
  const user = await User.findById(userId);
  
  const defaultProfile = new UserProfile({
    user: userId,
    academicBackground: {
      currentClass: '12th',
      stream: 'Science',
      subjects: [],
      grades: [],
      overallPercentage: 0
    },
    interests: {
      subjects: [],
      activities: [],
      careerFields: []
    },
    preferences: {
      location: {
        preferredStates: [],
        preferredCities: []
      },
      budget: {
        min: 0,
        max: 500000
      },
      collegeType: ['Government', 'Private'],
      courseType: []
    },
    assessmentResults: {
      aptitudeScores: {
        logical: 0,
        verbal: 0,
        numerical: 0,
        spatial: 0,
        mechanical: 0
      },
      personalityTraits: {
        extroversion: 50,
        openness: 50,
        conscientiousness: 50,
        agreeableness: 50,
        neuroticism: 50
      },
      careerMatches: []
    },
    behaviorData: {
      searchHistory: [],
      viewedColleges: [],
      viewedCareers: [],
      timeSpent: []
    },
    recommendations: {
      colleges: [],
      careers: [],
      courses: []
    }
  });

  return await defaultProfile.save();
};

// AI-driven recommendation generation
const generateRecommendations = async (userProfile: IUserProfile) => {
  const recommendations = {
    colleges: await generateCollegeRecommendations(userProfile),
    careers: await generateCareerRecommendations(userProfile),
    courses: await generateCourseRecommendations(userProfile),
    insights: generatePersonalizedInsights(userProfile)
  };

  // Update user profile with new recommendations
  userProfile.recommendations = {
    colleges: recommendations.colleges.map(rec => ({
      college: rec.college._id as any,
      score: rec.score,
      reasons: rec.reasons,
      timestamp: new Date()
    })),
    careers: recommendations.careers.map(rec => ({
      career: rec.career._id as any,
      score: rec.score,
      reasons: rec.reasons,
      timestamp: new Date()
    })),
    courses: recommendations.courses.map(rec => ({
      course: rec.course,
      score: rec.score,
      reasons: rec.reasons,
      timestamp: new Date()
    }))
  };

  await userProfile.save();

  return recommendations;
};

// Generate college recommendations
const generateCollegeRecommendations = async (userProfile: IUserProfile) => {
  const filter: Record<string, any> = {};
  
  // Apply location preferences
  if (userProfile.preferences.location.preferredStates.length > 0) {
    filter['location.state'] = { $in: userProfile.preferences.location.preferredStates };
  }
  
  // Apply budget preferences
  if (userProfile.preferences.budget.max > 0) {
    filter['programs.fees.annual'] = { $lte: userProfile.preferences.budget.max };
  }
  
  // Apply college type preferences
  if (userProfile.preferences.collegeType.length > 0) {
    filter.type = { $in: userProfile.preferences.collegeType };
  }

  const colleges = await College.find(filter).limit(20);
  
  const recommendations = colleges.map(college => {
    let score = 50; // Base score
    const reasons: string[] = [];

    // Location match bonus
    if (userProfile.preferences.location.preferredStates.includes(college.location.state)) {
      score += 15;
      reasons.push(`Located in your preferred state: ${college.location.state}`);
    }

    // Budget compatibility
    const avgFees = college.programs.reduce((sum, program) => sum + program.fees.annual, 0) / college.programs.length;
    if (avgFees <= userProfile.preferences.budget.max) {
      score += 10;
      reasons.push('Within your budget range');
    }

    // College type preference
    if (userProfile.preferences.collegeType.includes(college.type as any)) {
      score += 10;
      reasons.push(`Matches your preference for ${college.type} colleges`);
    }

    // Rating bonus
    if (college.rating.overall >= 4) {
      score += 10;
      reasons.push('High-rated institution with excellent reviews');
    }

    // Stream compatibility
    const hasRelevantPrograms = college.programs.some(program => 
      program.stream === userProfile.academicBackground.stream || program.stream === 'All'
    );
    if (hasRelevantPrograms) {
      score += 15;
      reasons.push(`Offers programs in ${userProfile.academicBackground.stream}`);
    }

    return {
      college,
      score: Math.min(score, 100),
      reasons
    };
  });

  return recommendations.sort((a, b) => b.score - a.score).slice(0, 10);
};

// Generate career recommendations
const generateCareerRecommendations = async (userProfile: IUserProfile) => {
  const careers = await Career.find().limit(20);
  
  const recommendations = careers.map(career => {
    let score = 50; // Base score
    const reasons: string[] = [];

    // Interest alignment
    const interestMatch = userProfile.interests.careerFields.some(field => 
      career.name.toLowerCase().includes(field.toLowerCase()) ||
      career.industries.some(industry => industry.toLowerCase().includes(field.toLowerCase()))
    );
    if (interestMatch) {
      score += 20;
      reasons.push('Aligns with your career interests');
    }

    // Aptitude alignment
    const aptitudeScores = userProfile.assessmentResults.aptitudeScores;
    if (career.skills.some(skill => skill.toLowerCase().includes('analytical')) && aptitudeScores.logical > 70) {
      score += 15;
      reasons.push('Matches your strong analytical skills');
    }
    if (career.skills.some(skill => skill.toLowerCase().includes('communication')) && aptitudeScores.verbal > 70) {
      score += 15;
      reasons.push('Utilizes your excellent communication skills');
    }

    // Academic background compatibility
    const streamMatch = career.courses.some(course => 
      course.toString().toLowerCase().includes(userProfile.academicBackground.stream.toLowerCase())
    );
    if (streamMatch) {
      score += 15;
      reasons.push(`Suitable for ${userProfile.academicBackground.stream} background`);
    }

    // Market demand
    if (career.demand === 'High') {
      score += 10;
      reasons.push('High market demand with good job prospects');
    }

    // Growth potential
    if (career.growthRate > 10) {
      score += 10;
      reasons.push(`Strong growth potential (${career.growthRate}% annually)`);
    }

    return {
      career,
      score: Math.min(score, 100),
      reasons
    };
  });

  return recommendations.sort((a, b) => b.score - a.score).slice(0, 10);
};

// Generate course recommendations
const generateCourseRecommendations = async (userProfile: IUserProfile) => {
  const courses = await Course.find().limit(15);
  
  const recommendations = courses.map(course => {
    let score = 50; // Base score
    const reasons: string[] = [];

    // Stream compatibility
    if (course.category.toLowerCase() === userProfile.academicBackground.stream.toLowerCase()) {
      score += 20;
      reasons.push(`Perfect match for ${userProfile.academicBackground.stream} stream`);
    }

    // Interest alignment
    const subjectMatch = userProfile.interests.subjects.some(subject => 
      course.subjects.some(courseSubject => 
        courseSubject.toLowerCase().includes(subject.toLowerCase())
      )
    );
    if (subjectMatch) {
      score += 15;
      reasons.push('Includes subjects you\'re interested in');
    }

    // Budget compatibility
    if (course.fees.max <= userProfile.preferences.budget.max) {
      score += 10;
      reasons.push('Affordable within your budget');
    }

    // Career prospects alignment
    const careerMatch = userProfile.interests.careerFields.some(field => 
      course.careerProspects.some(prospect => 
        prospect.toLowerCase().includes(field.toLowerCase())
      )
    );
    if (careerMatch) {
      score += 15;
      reasons.push('Leads to careers you\'re interested in');
    }

    return {
      course: course.name,
      score: Math.min(score, 100),
      reasons,
      details: course
    };
  });

  return recommendations.sort((a, b) => b.score - a.score).slice(0, 8);
};

// Generate personalized insights
const generatePersonalizedInsights = (userProfile: IUserProfile) => {
  const insights = [];

  // Academic performance insights
  if (userProfile.academicBackground.overallPercentage > 85) {
    insights.push({
      type: 'academic',
      title: 'Excellent Academic Performance',
      message: 'Your strong academic record opens doors to top-tier colleges and competitive programs.',
      action: 'Consider applying to premier institutions and scholarship programs.'
    });
  }

  // Career alignment insights
  const topAptitude = Object.entries(userProfile.assessmentResults.aptitudeScores)
    .sort(([,a], [,b]) => b - a)[0];
  
  if (topAptitude && topAptitude[1] > 80) {
    insights.push({
      type: 'aptitude',
      title: `Strong ${topAptitude[0]} Skills`,
      message: `Your exceptional ${topAptitude[0]} abilities suggest great potential in related fields.`,
      action: `Explore careers that leverage ${topAptitude[0]} thinking.`
    });
  }

  // Behavioral insights
  const mostViewedSection = userProfile.behaviorData.timeSpent
    .reduce((acc, curr) => {
      acc[curr.section] = (acc[curr.section] || 0) + curr.duration;
      return acc;
    }, {} as Record<string, number>);

  const topSection = Object.entries(mostViewedSection).sort(([,a], [,b]) => b - a)[0];
  if (topSection) {
    insights.push({
      type: 'behavior',
      title: `High Interest in ${topSection[0]}`,
      message: `You've spent significant time exploring ${topSection[0]}, indicating strong interest.`,
      action: `Consider specializing in ${topSection[0]}-related fields.`
    });
  }

  return insights;
};

export { generateRecommendations };
