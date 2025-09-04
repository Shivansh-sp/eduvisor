import mongoose, { Document, Schema } from 'mongoose';

export interface ICollege extends Document {
  _id: string;
  name: string;
  type: 'Government' | 'Private' | 'Semi-Government';
  category: 'University' | 'College' | 'Institute';
  location: {
    state: string;
    city: string;
    address: string;
    pincode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  programs: {
    name: string;
    stream: 'Science' | 'Commerce' | 'Arts' | 'Vocational' | 'All';
    duration: string;
    eligibility: string;
    fees: {
      annual: number;
      total: number;
    };
    seats: number;
    cutoff?: number;
  }[];
  infrastructure: {
    library: boolean;
    laboratory: boolean;
    hostel: boolean;
    sports: boolean;
    cafeteria: boolean;
    wifi: boolean;
    transport: boolean;
  };
  facilities: string[];
  accreditation: string[];
  admissionProcess: {
    applicationStart: Date;
    applicationEnd: Date;
    entranceExam?: string;
    meritBased: boolean;
    documents: string[];
  };
  rating: {
    overall: number;
    academics: number;
    infrastructure: number;
    placement: number;
    reviews: number;
  };
  placement: {
    averagePackage: number;
    highestPackage: number;
    placementRate: number;
    topRecruiters: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const CollegeSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Government', 'Private', 'Semi-Government'],
    required: true
  },
  category: {
    type: String,
    enum: ['University', 'College', 'Institute'],
    required: true
  },
  location: {
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  programs: [{
    name: {
      type: String,
      required: true
    },
    stream: {
      type: String,
      enum: ['Science', 'Commerce', 'Arts', 'Vocational', 'All'],
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    eligibility: {
      type: String,
      required: true
    },
    fees: {
      annual: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    },
    seats: {
      type: Number,
      required: true
    },
    cutoff: Number
  }],
  infrastructure: {
    library: { type: Boolean, default: false },
    laboratory: { type: Boolean, default: false },
    hostel: { type: Boolean, default: false },
    sports: { type: Boolean, default: false },
    cafeteria: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false },
    transport: { type: Boolean, default: false }
  },
  facilities: [String],
  accreditation: [String],
  admissionProcess: {
    applicationStart: Date,
    applicationEnd: Date,
    entranceExam: String,
    meritBased: { type: Boolean, default: true },
    documents: [String]
  },
  rating: {
    overall: { type: Number, min: 0, max: 5, default: 0 },
    academics: { type: Number, min: 0, max: 5, default: 0 },
    infrastructure: { type: Number, min: 0, max: 5, default: 0 },
    placement: { type: Number, min: 0, max: 5, default: 0 },
    reviews: { type: Number, default: 0 }
  },
  placement: {
    averagePackage: Number,
    highestPackage: Number,
    placementRate: Number,
    topRecruiters: [String]
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
CollegeSchema.index({ name: 'text', location: 'text' });
CollegeSchema.index({ 'location.state': 1, 'location.city': 1 });
CollegeSchema.index({ type: 1 });
CollegeSchema.index({ 'programs.stream': 1 });
CollegeSchema.index({ 'rating.overall': -1 });

export default mongoose.model<ICollege>('College', CollegeSchema);
