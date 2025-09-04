import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProfile extends Document {
  user: mongoose.Types.ObjectId;
  academicBackground: {
    currentClass: string;
    stream: 'Science' | 'Commerce' | 'Arts' | 'Vocational';
    subjects: string[];
    grades: {
      subject: string;
      marks: number;
      grade: string;
    }[];
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
    collegeType: ('Government' | 'Private' | 'Deemed')[];
    courseType: string[];
  };
  assessmentResults: {
    aptitudeScores: {
      logical: number;
      verbal: number;
      numerical: number;
      spatial: number;
      mechanical: number;
    };
    personalityTraits: {
      extroversion: number;
      openness: number;
      conscientiousness: number;
      agreeableness: number;
      neuroticism: number;
    };
    careerMatches: {
      career: string;
      matchPercentage: number;
      reasons: string[];
    }[];
  };
  behaviorData: {
    searchHistory: {
      query: string;
      category: string;
      timestamp: Date;
    }[];
    viewedColleges: mongoose.Types.ObjectId[];
    viewedCareers: mongoose.Types.ObjectId[];
    timeSpent: {
      section: string;
      duration: number;
      timestamp: Date;
    }[];
  };
  recommendations: {
    colleges: {
      college: mongoose.Types.ObjectId;
      score: number;
      reasons: string[];
      timestamp: Date;
    }[];
    careers: {
      career: mongoose.Types.ObjectId;
      score: number;
      reasons: string[];
      timestamp: Date;
    }[];
    courses: {
      course: string;
      score: number;
      reasons: string[];
      timestamp: Date;
    }[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  academicBackground: {
    currentClass: {
      type: String,
      enum: ['10th', '11th', '12th', 'Graduate', 'Post-Graduate'],
      required: true
    },
    stream: {
      type: String,
      enum: ['Science', 'Commerce', 'Arts', 'Vocational']
    },
    subjects: [String],
    grades: [{
      subject: String,
      marks: Number,
      grade: String
    }],
    overallPercentage: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  interests: {
    subjects: [String],
    activities: [String],
    careerFields: [String]
  },
  preferences: {
    location: {
      preferredStates: [String],
      preferredCities: [String]
    },
    budget: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 1000000
      }
    },
    collegeType: [{
      type: String,
      enum: ['Government', 'Private', 'Deemed']
    }],
    courseType: [String]
  },
  assessmentResults: {
    aptitudeScores: {
      logical: { type: Number, min: 0, max: 100 },
      verbal: { type: Number, min: 0, max: 100 },
      numerical: { type: Number, min: 0, max: 100 },
      spatial: { type: Number, min: 0, max: 100 },
      mechanical: { type: Number, min: 0, max: 100 }
    },
    personalityTraits: {
      extroversion: { type: Number, min: 0, max: 100 },
      openness: { type: Number, min: 0, max: 100 },
      conscientiousness: { type: Number, min: 0, max: 100 },
      agreeableness: { type: Number, min: 0, max: 100 },
      neuroticism: { type: Number, min: 0, max: 100 }
    },
    careerMatches: [{
      career: String,
      matchPercentage: { type: Number, min: 0, max: 100 },
      reasons: [String]
    }]
  },
  behaviorData: {
    searchHistory: [{
      query: String,
      category: String,
      timestamp: { type: Date, default: Date.now }
    }],
    viewedColleges: [{
      type: Schema.Types.ObjectId,
      ref: 'College'
    }],
    viewedCareers: [{
      type: Schema.Types.ObjectId,
      ref: 'Career'
    }],
    timeSpent: [{
      section: String,
      duration: Number,
      timestamp: { type: Date, default: Date.now }
    }]
  },
  recommendations: {
    colleges: [{
      college: {
        type: Schema.Types.ObjectId,
        ref: 'College'
      },
      score: { type: Number, min: 0, max: 100 },
      reasons: [String],
      timestamp: { type: Date, default: Date.now }
    }],
    careers: [{
      career: {
        type: Schema.Types.ObjectId,
        ref: 'Career'
      },
      score: { type: Number, min: 0, max: 100 },
      reasons: [String],
      timestamp: { type: Date, default: Date.now }
    }],
    courses: [{
      course: String,
      score: { type: Number, min: 0, max: 100 },
      reasons: [String],
      timestamp: { type: Date, default: Date.now }
    }]
  }
}, {
  timestamps: true
});

// Index for better query performance
UserProfileSchema.index({ user: 1 });
UserProfileSchema.index({ 'academicBackground.stream': 1 });
UserProfileSchema.index({ 'preferences.location.preferredStates': 1 });

export default mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);
