import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetRatedMovies = createAsyncThunk(
  "GetRatedMovies",
  async ({ accountId, page = 1, sessionId }, { rejectWithValue }) => {
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
        `https://api.themoviedb.org/3/account/${accountId}/rated/movies?language=en-US&page=${page}&session_id=${sessionId}&sort_by=created_at.asc`,
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

const initialRatedMoviesState = {
  ratedMoviesDetails: null,
  ratedMoviesLoading: false,
  ratedMoviesError: false,
};

const RatedMoviesSlice = createSlice({
  name: "RatedMovies",
  initialState: initialRatedMoviesState,
  extraReducers: (builder) => {
    builder.addCase(GetRatedMovies.pending, (state) => {
      state.ratedMoviesLoading = true;
      state.ratedMoviesError = false;
    });
    builder.addCase(GetRatedMovies.fulfilled, (state, { payload }) => {
      state.ratedMoviesDetails = payload;
      state.ratedMoviesLoading = false;
    });
    builder.addCase(GetRatedMovies.rejected, (state, { payload }) => {
      state.ratedMoviesError = true;
      state.ratedMoviesLoading = false;
    });
  },
});

export const RatedMoviesReducer = RatedMoviesSlice.reducer;
