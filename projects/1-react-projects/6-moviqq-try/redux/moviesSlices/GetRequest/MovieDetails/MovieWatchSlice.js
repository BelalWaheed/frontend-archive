import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetMovieWatchProviders = createAsyncThunk(
  "GetMovieWatchProviders",
  async ({ movieId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMmNkMDRiMzNjZTMxNjRlMzk3MzExYzBmZGYxYTc5MyIsIm5iZiI6MTc2MDA5OTc5Mi41NDQsInN1YiI6IjY4ZThmZGQwOWI0YTFhYWIxYWU2YWNkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r5AVkEHlxumduosln1i8Y_ixvvSk2_a-rJElwNV7KVg",
        },
      };

      const request = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
        options
      );
      const response = await request.json();

      if (response.success === false) {
        return rejectWithValue(response);
      }

      return response;
    } catch (e) {
      return rejectWithValue({ success: false, message: e.message });
    }
  }
);

// Initial state
const initialState = {
  MovieWatchProvidersDetails: null,
  MovieWatchProvidersDetailsLoading: false,
  MovieWatchProvidersDetailsError: false,
};

// Slice
const MovieWatchProviders = createSlice({
  name: "MovieWatchProviders",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(GetMovieWatchProviders.pending, (state) => {
      state.MovieWatchProvidersDetailsLoading = true;
      state.MovieWatchProvidersDetailsError = false;
    });
    builder.addCase(GetMovieWatchProviders.fulfilled, (state, { payload }) => {
      state.MovieWatchProvidersDetails = payload;
      state.MovieWatchProvidersDetailsLoading = false;
      state.MovieWatchProvidersDetailsError = false;
    });
    builder.addCase(GetMovieWatchProviders.rejected, (state) => {
      state.MovieWatchProvidersDetailsError = true;
      state.MovieWatchProvidersDetailsLoading = false;
    });
  },
});

export const MovieWatchProvidersReducer = MovieWatchProviders.reducer;
