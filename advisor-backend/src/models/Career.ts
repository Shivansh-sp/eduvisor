import mongoose, { Document, Schema } from 'mongoose';

export interface ICareer extends Document {
  name: string;
  description: string;
  courses: mongoose.Types.ObjectId[];
  salaryRange: {
    min: number;
    max: number;
  };
  growthRate: number;
  demand: 'High' | 'Medium' | 'Low';
  skills: string[];
  requirements: {
    education: string[];
    experience: string;
    certifications?: string[];
  };
  jobRoles: string[];
  industries: string[];
  createdAt: Date;
  updatedAt: Date;
}

const CareerSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a career name'],
    trim: true,
    maxlength: [100, 'Career name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }],
  salaryRange: {
    min: {
      type: Number,
      required: [true, 'Please add minimum salary'],
      min: [0, 'Salary cannot be negative']
    },
    max: {
      type: Number,
      required: [true, 'Please add maximum salary'],
      min: [0, 'Salary cannot be negative']
    }
  },
  growthRate: {
    type: Number,
    required: [true, 'Please add growth rate'],
    min: [0, 'Growth rate cannot be negative'],
    max: [100, 'Growth rate cannot exceed 100%']
  },
  demand: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: [true, 'Please specify demand level']
  },
  skills: [{
    type: String,
    required: true
  }],
  requirements: {
    education: [{
      type: String,
      required: true
    }],
    experience: {
      type: String,
      required: [true, 'Please specify experience requirements']
    },
    certifications: [{
      type: String
    }]
  },
  jobRoles: [{
    type: String,
    required: true
  }],
  industries: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true
});

// Index for better search performance
CareerSchema.index({ name: 'text', description: 'text' });
CareerSchema.index({ courses: 1 });
CareerSchema.index({ demand: 1 });

export default mongoose.model<ICareer>('Career', CareerSchema);
