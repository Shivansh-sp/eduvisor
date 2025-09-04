import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

interface UserState {
  dashboard: any | null;
  recommendations: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  dashboard: null,
  recommendations: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const getDashboard = createAsyncThunk(
  'user/getDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/user/dashboard');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get dashboard');
    }
  }
);

export const getRecommendations = createAsyncThunk(
  'user/getRecommendations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/user/recommendations');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get recommendations');
    }
  }
);

export const updateInterests = createAsyncThunk(
  'user/updateInterests',
  async (interests: string[], { rejectWithValue }) => {
    try {
      const response = await api.put('/user/interests', { interests });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update interests');
    }
  }
);

export const updateCareerPreferences = createAsyncThunk(
  'user/updateCareerPreferences',
  async (careerPreferences: string[], { rejectWithValue }) => {
    try {
      const response = await api.put('/user/career-preferences', { careerPreferences });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update career preferences');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get dashboard
      .addCase(getDashboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboard = action.payload;
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get recommendations
      .addCase(getRecommendations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recommendations = action.payload;
      })
      .addCase(getRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update interests
      .addCase(updateInterests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateInterests.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.dashboard) {
          state.dashboard.user.interests = action.payload.interests;
        }
      })
      .addCase(updateInterests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update career preferences
      .addCase(updateCareerPreferences.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCareerPreferences.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.dashboard) {
          state.dashboard.user.careerPreferences = action.payload.careerPreferences;
        }
      })
      .addCase(updateCareerPreferences.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
