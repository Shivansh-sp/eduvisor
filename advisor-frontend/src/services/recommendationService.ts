import api from './api';

interface UserProfile {
  academicBackground: {
    currentClass: string;
    stream: string;
    subjects: string[];
    overallPercentage: number;
  };
  interests: {
    subjects: string[];
    activities: string[];
    careerFields: string[];
  };
  preferences: {
    location: {
      preferredStates: string[];
      preferredCities: string[];
    };
    budget: {
      min: number;
      max: number;
    };
    collegeType: string[];
    courseType: string[];
  };
}

interface BehaviorData {
  action: 'search' | 'view_college' | 'view_career' | 'time_spent';
  data: any;
}

const getRecommendations = async () => {
  const response = await api.get('/recommendations');
  return response.data;
};

const getUserProfile = async () => {
  const response = await api.get('/recommendations/profile');
  return response.data;
};

const updateUserProfile = async (profileData: Partial<UserProfile>) => {
  const response = await api.put('/recommendations/profile', profileData);
  return response.data;
};

const trackUserBehavior = async (behaviorData: BehaviorData) => {
  const response = await api.post('/recommendations/track', behaviorData);
  return response.data;
};

const recommendationService = {
  getRecommendations,
  getUserProfile,
  updateUserProfile,
  trackUserBehavior,
};

export default recommendationService;
