import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

interface College {
  _id: string;
  name: string;
  type: 'Government' | 'Private' | 'Semi-Government';
  category: 'University' | 'College' | 'Institute';
  location: {
    state: string;
    city: string;
    address: string;
    pincode: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  programs: Array<{
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
  }>;
  rating: {
    overall: number;
    academics: number;
    infrastructure: number;
    placement: number;
    reviews: number;
  };
}

interface CollegeState {
  colleges: College[];
  selectedCollege: College | null;
  recommendedColleges: College[];
  searchResults: College[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalColleges: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    state: string;
    city: string;
    stream: string;
    type: string;
    search: string;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: CollegeState = {
  colleges: [],
  selectedCollege: null,
  recommendedColleges: [],
  searchResults: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalColleges: 0,
    hasNext: false,
    hasPrev: false,
  },
  filters: {
    state: '',
    city: '',
    stream: '',
    type: '',
    search: '',
  },
  isLoading: false,
  error: null,
};

// Async thunks
export const getColleges = createAsyncThunk(
  'college/getColleges',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/college', { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get colleges');
    }
  }
);

export const getCollegeById = createAsyncThunk(
  'college/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/college/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get college');
    }
  }
);

export const getRecommendedColleges = createAsyncThunk(
  'college/getRecommended',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/college/recommendations/user');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get recommendations');
    }
  }
);

export const searchColleges = createAsyncThunk(
  'college/search',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/college/search/${query}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search colleges');
    }
  }
);

export const getCollegesByLocation = createAsyncThunk(
  'college/getByLocation',
  async (params: { state: string; city?: string; stream?: string; type?: string }, { rejectWithValue }) => {
    try {
      const { state, city, ...queryParams } = params;
      const url = city ? `/college/location/${state}/${city}` : `/college/location/${state}`;
      const response = await api.get(url, { params: queryParams });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get colleges by location');
    }
  }
);

const collegeSlice = createSlice({
  name: 'college',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<CollegeState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        state: '',
        city: '',
        stream: '',
        type: '',
        search: '',
      };
    },
    setSelectedCollege: (state, action: PayloadAction<College | null>) => {
      state.selectedCollege = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get colleges
      .addCase(getColleges.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getColleges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.colleges = action.payload.colleges;
        state.pagination = action.payload.pagination;
      })
      .addCase(getColleges.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get college by ID
      .addCase(getCollegeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCollegeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCollege = action.payload;
      })
      .addCase(getCollegeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get recommended colleges
      .addCase(getRecommendedColleges.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRecommendedColleges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recommendedColleges = action.payload.colleges;
      })
      .addCase(getRecommendedColleges.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Search colleges
      .addCase(searchColleges.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchColleges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchColleges.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Get colleges by location
      .addCase(getCollegesByLocation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCollegesByLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.colleges = action.payload;
      })
      .addCase(getCollegesByLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearFilters, setSelectedCollege, clearError } = collegeSlice.actions;
export default collegeSlice.reducer;
