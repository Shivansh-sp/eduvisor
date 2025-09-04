import mongoose, { Document, Schema } from 'mongoose';

export interface IChatMessage extends Document {
  message: string;
  sender: 'user' | 'bot';
  sessionId: string;
  user?: mongoose.Types.ObjectId;
  timestamp: Date;
  metadata?: {
    intent?: string;
    confidence?: number;
    entities?: any[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const ChatMessageSchema: Schema = new Schema({
  message: {
    type: String,
    required: [true, 'Please add a message'],
    trim: true,
    maxlength: [2000, 'Message cannot be more than 2000 characters']
  },
  sender: {
    type: String,
    enum: ['user', 'bot'],
    required: [true, 'Please specify sender']
  },
  sessionId: {
    type: String,
    required: [true, 'Please provide session ID'],
    index: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  metadata: {
    intent: String,
    confidence: Number,
    entities: [Schema.Types.Mixed]
  }
}, {
  timestamps: true
});

// Index for better query performance
ChatMessageSchema.index({ sessionId: 1, timestamp: 1 });
ChatMessageSchema.index({ user: 1, timestamp: -1 });

export default mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);
