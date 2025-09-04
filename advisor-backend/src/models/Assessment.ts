import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
  _id: string;
  question: string;
  type: 'multiple-choice' | 'rating' | 'yes-no' | 'text';
  options?: string[];
  category: 'aptitude' | 'interest' | 'personality' | 'career-preference';
  weight: number;
  skills: string[];
}

export interface IAssessment extends Document {
  _id: string;
  userId: string;
  questions: IQuestion[];
  responses: {
    questionId: string;
    answer: string | number;
    timestamp: Date;
  }[];
  scores: {
    logical: number;
    verbal: number;
    numerical: number;
    spatial: number;
    interpersonal: number;
    intrapersonal: number;
    creative: number;
    analytical: number;
  };
  recommendations: {
    streams: string[];
    careers: string[];
    colleges: string[];
    courses: string[];
  };
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema: Schema = new Schema({
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'rating', 'yes-no', 'text'],
    required: true
  },
  options: [String],
  category: {
    type: String,
    enum: ['aptitude', 'interest', 'personality', 'career-preference'],
    required: true
  },
  weight: {
    type: Number,
    default: 1
  },
  skills: [String]
});

const AssessmentSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [QuestionSchema],
  responses: [{
    questionId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    answer: {
      type: Schema.Types.Mixed,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  scores: {
    logical: { type: Number, min: 0, max: 100, default: 0 },
    verbal: { type: Number, min: 0, max: 100, default: 0 },
    numerical: { type: Number, min: 0, max: 100, default: 0 },
    spatial: { type: Number, min: 0, max: 100, default: 0 },
    interpersonal: { type: Number, min: 0, max: 100, default: 0 },
    intrapersonal: { type: Number, min: 0, max: 100, default: 0 },
    creative: { type: Number, min: 0, max: 100, default: 0 },
    analytical: { type: Number, min: 0, max: 100, default: 0 }
  },
  recommendations: {
    streams: [String],
    careers: [String],
    colleges: [String],
    courses: [String]
  },
  completedAt: Date
}, {
  timestamps: true
});

// Indexes
AssessmentSchema.index({ userId: 1 });
AssessmentSchema.index({ completedAt: -1 });

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
export default mongoose.model<IAssessment>('Assessment', AssessmentSchema);
