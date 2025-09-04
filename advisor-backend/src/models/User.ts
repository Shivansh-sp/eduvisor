import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  classCompleted: '10th' | '12th';
  stream?: 'Science' | 'Commerce' | 'Arts' | 'Vocational';
  location: {
    state: string;
    city: string;
    pincode: string;
  };
  interests: string[];
  aptitudeScores?: {
    logical: number;
    verbal: number;
    numerical: number;
    spatial: number;
    interpersonal: number;
    intrapersonal: number;
  };
  careerPreferences: string[];
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  classCompleted: {
    type: String,
    enum: ['10th', '12th'],
    required: true
  },
  stream: {
    type: String,
    enum: ['Science', 'Commerce', 'Arts', 'Vocational']
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
    pincode: {
      type: String,
      required: true
    }
  },
  interests: [{
    type: String
  }],
  aptitudeScores: {
    logical: { type: Number, min: 0, max: 100 },
    verbal: { type: Number, min: 0, max: 100 },
    numerical: { type: Number, min: 0, max: 100 },
    spatial: { type: Number, min: 0, max: 100 },
    interpersonal: { type: Number, min: 0, max: 100 },
    intrapersonal: { type: Number, min: 0, max: 100 }
  },
  careerPreferences: [{
    type: String
  }],
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient queries
UserSchema.index({ email: 1 });
UserSchema.index({ phoneNumber: 1 });
UserSchema.index({ location: 1 });
UserSchema.index({ classCompleted: 1, stream: 1 });

export default mongoose.model<IUser>('User', UserSchema);
