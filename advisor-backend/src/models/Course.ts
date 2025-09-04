import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  description: string;
  duration: string;
  level: 'Certificate' | 'Diploma' | 'Bachelor' | 'Master' | 'PhD';
  category: string;
  subjects: string[];
  eligibility: {
    education: string;
    minPercentage?: number;
    entranceExams?: string[];
  };
  careerProspects: string[];
  colleges: mongoose.Types.ObjectId[];
  fees: {
    min: number;
    max: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a course name'],
    trim: true,
    maxlength: [100, 'Course name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  duration: {
    type: String,
    required: [true, 'Please specify course duration']
  },
  level: {
    type: String,
    enum: ['Certificate', 'Diploma', 'Bachelor', 'Master', 'PhD'],
    required: [true, 'Please specify course level']
  },
  category: {
    type: String,
    required: [true, 'Please specify course category'],
    enum: [
      'Engineering',
      'Medicine',
      'Business',
      'Arts',
      'Science',
      'Law',
      'Education',
      'Agriculture',
      'Technology',
      'Other'
    ]
  },
  subjects: [{
    type: String,
    required: true
  }],
  eligibility: {
    education: {
      type: String,
      required: [true, 'Please specify educational requirements']
    },
    minPercentage: {
      type: Number,
      min: [0, 'Percentage cannot be negative'],
      max: [100, 'Percentage cannot exceed 100']
    },
    entranceExams: [{
      type: String
    }]
  },
  careerProspects: [{
    type: String,
    required: true
  }],
  colleges: [{
    type: Schema.Types.ObjectId,
    ref: 'College'
  }],
  fees: {
    min: {
      type: Number,
      required: [true, 'Please add minimum fees'],
      min: [0, 'Fees cannot be negative']
    },
    max: {
      type: Number,
      required: [true, 'Please add maximum fees'],
      min: [0, 'Fees cannot be negative']
    }
  }
}, {
  timestamps: true
});

// Index for better search performance
CourseSchema.index({ name: 'text', description: 'text' });
CourseSchema.index({ category: 1 });
CourseSchema.index({ level: 1 });

export default mongoose.model<ICourse>('Course', CourseSchema);
