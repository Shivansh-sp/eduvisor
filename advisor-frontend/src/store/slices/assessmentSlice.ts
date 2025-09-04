import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'rating' | 'yes-no' | 'text';
  options?: string[];
  category: 'aptitude' | 'interest' | 'personality' | 'career-preference';
}

interface AssessmentResponse {
  questionId: string;
  answer: string | number;
  timestamp: Date;
}

interface Scores {
  logical: number;
  verbal: number;
  numerical: number;
  spatial: number;
  interpersonal: number;
  intrapersonal: number;
  creative: number;
  analytical: number;
}

interface Recommendations {
  streams: string[];
  careers: string[];
  colleges: string[];
  courses: string[];
}

interface AssessmentState {
  questions: Question[];
  currentQuestionIndex: number;
  responses: AssessmentResponse[];
  scores: Scores | null;
  recommendations: Recommendations | null;
  isLoading: boolean;
  error: string | null;
  isCompleted: boolean;
}

const initialState: AssessmentState = {
  questions: [],
  currentQuestionIndex: 0,
  responses: [],
  scores: null,
  recommendations: null,
  isLoading: false,
  error: null,
  isCompleted: false,
};

// Async thunks
export const getQuestions = createAsyncThunk(
  'assessment/getQuestions',
  async (category: string = 'aptitude', { rejectWithValue }) => {
    try {
      const response = await api.get(`/assessment/questions?category=${category}`);
      return response.data.questions;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get questions');
    }
  }
);

export const submitAssessment = createAsyncThunk(
  'assessment/submit',
  async (responses: AssessmentResponse[], { rejectWithValue }) => {
    try {
      const response = await api.post('/assessment/submit', { responses });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit assessment');
    }
  }
);

export const getResults = createAsyncThunk(
  'assessment/getResults',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/assessment/results');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get results');
    }
  }
);

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
    },
    addResponse: (state, action: PayloadAction<AssessmentResponse>) => {
      const existingIndex = state.responses.findIndex(
        r => r.questionId === action.payload.questionId
      );
      if (existingIndex >= 0) {
        state.responses[existingIndex] = action.payload;
      } else {
        state.responses.push(action.payload);
      }
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    resetAssessment: (state) => {
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.responses = [];
      state.scores = null;
      state.recommendations = null;
      state.isCompleted = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get questions
      .addCase(getQuestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questions = action.payload;
        state.currentQuestionIndex = 0;
        state.responses = [];
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Submit assessment
      .addCase(submitAssessment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitAssessment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.scores = action.payload.scores;
        state.recommendations = action.payload.recommendations;
        state.isCompleted = true;
      })
      .addCase(submitAssessment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get results
      .addCase(getResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.scores = action.payload.scores;
        state.recommendations = action.payload.recommendations;
        state.isCompleted = true;
      })
      .addCase(getResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentQuestion,
  addResponse,
  nextQuestion,
  previousQuestion,
  resetAssessment,
  clearError,
} = assessmentSlice.actions;

export default assessmentSlice.reducer;
