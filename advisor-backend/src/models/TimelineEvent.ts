import mongoose, { Document, Schema } from 'mongoose';

export interface ITimelineEvent extends Document {
  title: string;
  description: string;
  date: Date;
  type: 'application' | 'exam' | 'result' | 'admission' | 'deadline';
  status: 'upcoming' | 'active' | 'completed' | 'missed';
  priority: 'high' | 'medium' | 'low';
  user: mongoose.Types.ObjectId;
  college?: mongoose.Types.ObjectId;
  course?: mongoose.Types.ObjectId;
  exam?: string;
  documents?: string[];
  reminder: boolean;
  reminderDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TimelineEventSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  date: {
    type: Date,
    required: [true, 'Please add a date']
  },
  type: {
    type: String,
    enum: ['application', 'exam', 'result', 'admission', 'deadline'],
    required: [true, 'Please specify event type']
  },
  status: {
    type: String,
    enum: ['upcoming', 'active', 'completed', 'missed'],
    default: 'upcoming'
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  college: {
    type: Schema.Types.ObjectId,
    ref: 'College'
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  exam: {
    type: String
  },
  documents: [{
    type: String
  }],
  reminder: {
    type: Boolean,
    default: true
  },
  reminderDate: {
    type: Date
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot be more than 1000 characters']
  }
}, {
  timestamps: true
});

// Index for better query performance
TimelineEventSchema.index({ user: 1, date: 1 });
TimelineEventSchema.index({ user: 1, status: 1 });
TimelineEventSchema.index({ user: 1, type: 1 });
TimelineEventSchema.index({ user: 1, priority: 1 });

export default mongoose.model<ITimelineEvent>('TimelineEvent', TimelineEventSchema);
