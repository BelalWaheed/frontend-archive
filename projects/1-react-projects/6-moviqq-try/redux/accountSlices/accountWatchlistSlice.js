import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "a2cd04b33ce3164e397311c0fdf1a793";
const BASE = "https://api.themoviedb.org/3";

export const fetchWatchlist = createAsyncThunk(
  "watchlist/fetchWatchlist",
  async ({ accountId, sessionId }, thunkAPI) => {
    try {
      const [movies, tv] = await Promise.all([
        fetch(`${BASE}/account/${accountId}/watchlist/movies?api_key=${API}&session_id=${sessionId}`)
          .then(r => r.json()),
        fetch(`${BASE}/account/${accountId}/watchlist/tv?api_key=${API}&session_id=${sessionId}`)
          .then(r => r.json())
      ]);

      return [...movies.results, ...tv.results];
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// REMOVE ITEM
export const removeFromWatchlist = createAsyncThunk(
  "watchlist/remove",
  async ({ accountId, sessionId, mediaId, mediaType }, thunkAPI) => {
    try {
      await fetch(
        `${BASE}/account/${accountId}/watchlist?api_key=${API}&session_id=${sessionId}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            media_type: mediaType,
            media_id: mediaId,
            watchlist: false
          })
        }
      );

      return mediaId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWatchlist.pending, s => {
        s.loading = true;
      })
      .addCase(fetchWatchlist.fulfilled, (s, { payload }) => {
        s.items = payload;
        s.loading = false;
      })
      .addCase(fetchWatchlist.rejected, (s, { payload }) => {
        s.error = payload;
        s.loading = false;
      })
      .addCase(removeFromWatchlist.fulfilled, (s, { payload }) => {
        s.items = s.items.filter(i => i.id !== payload);
      });
  }
});

export const AccountWatchlistReducer = watchlistSlice.reducer;
