// src/redux/AccountInfoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const API_KEY = "a2cd04b33ce3164e397311c0fdf1a793"; // ← replace or use process.env

// existing AccountInfo thunk (keeps your logic, but return includes id needed)
export const AccountInfo = createAsyncThunk(
  "AccountInfo",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const params = new URLSearchParams(window.location.search);
      const approved = params.get("approved");
      const token = localStorage.getItem("token");
      const sessionId = localStorage.getItem("sessionId");

      if (sessionId) {
        const accountRes = await fetch(
          `https://api.themoviedb.org/3/account?session_id=${sessionId}&api_key=${API_KEY}`,
          { method: "GET", headers: { accept: "application/json" } }
        );
        const accountData = await accountRes.json();
        return accountData;
      } else {
        if (approved === "true" && token) {
          const request = await fetch(
            `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
            {
              method: "POST",
              headers: {
                accept: "application/json",
                "content-type": "application/json",
              },
              body: JSON.stringify({ request_token: token }),
            }
          );
          const response = await request.json();
          if (!response.success) return rejectWithValue(response);

          localStorage.setItem("sessionId", response.session_id);
          localStorage.removeItem("token");
          Swal.fire({
            icon: "success",
            title: "Connected Successfully!",
            text: "You have successfully connected your TMDB account.",
            confirmbuttonText: "Great!",
            confirmbuttonColor: "#01b4e4",
            theme: "dark",
          });

          const accountRes = await fetch(
            `https://api.themoviedb.org/3/account?session_id=${response.session_id}&api_key=${API_KEY}`,
            { method: "GET", headers: { accept: "application/json" } }
          );
          const accountData = await accountRes.json();
          return accountData;
        } else {
          return rejectWithValue({
            success: false,
            message: "User not approved or missing token",
          });
        }
      }
    } catch (e) {
      return rejectWithValue({ success: false, message: e.message });
    }
  }
);

/* ---------- helper to merge movie + tv lists and tag media_type ---------- */
const mergeWithMediaType = (
  moviesRes = [],
  tvRes = [],
  mediaTagForMovie = "movie",
  mediaTagForTv = "tv"
) => {
  const movies = (moviesRes.results || moviesRes).map((it) => ({
    ...it,
    media_type: mediaTagForMovie,
  }));
  const tv = (tvRes.results || tvRes).map((it) => ({
    ...it,
    media_type: mediaTagForTv,
  }));
  // Optionally sort by created_at or id - here we return movies then tv
  return [...movies, ...tv];
};

/* ---------- fetch combined watchlist ---------- */
export const getWatchlist = createAsyncThunk(
  "Account/getWatchlist",
  async (accountId, { rejectWithValue }) => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) throw new Error("Missing sessionId");

      const [moviesRes, tvRes] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}`
        ).then((r) => r.json()),

        fetch(
          `https://api.themoviedb.org/3/account/${accountId}/watchlist/tv?api_key=${API_KEY}&session_id=${sessionId}`
        ).then((r) => r.json()),
      ]);

      const combined = mergeWithMediaType(moviesRes, tvRes);
      return combined;
    } catch (e) {
      return rejectWithValue(e.message || e);
    }
  }
);

/* ---------- fetch combined favorites ---------- */
export const getFavorites = createAsyncThunk(
  "Account/getFavorites",
  async (accountId, { rejectWithValue }) => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) throw new Error("Missing sessionId");

      const [moviesRes, tvRes] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`
        ).then((r) => r.json()),

        fetch(
          `https://api.themoviedb.org/3/account/${accountId}/favorite/tv?api_key=${API_KEY}&session_id=${sessionId}`
        ).then((r) => r.json()),
      ]);

      const combined = mergeWithMediaType(moviesRes, tvRes);
      return combined;
    } catch (e) {
      return rejectWithValue(e.message || e);
    }
  }
);

/* ---------- fetch combined rated (movies + tv) ---------- */
export const getRated = createAsyncThunk(
  "Account/getRated",
  async (accountId, { rejectWithValue }) => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) throw new Error("Missing sessionId");

      const [moviesRes, tvRes] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/account/${accountId}/rated/movies?api_key=${API_KEY}&session_id=${sessionId}`
        ).then((r) => r.json()),

        fetch(
          `https://api.themoviedb.org/3/account/${accountId}/rated/tv?api_key=${API_KEY}&session_id=${sessionId}`
        ).then((r) => r.json()),
      ]);

      const combined = mergeWithMediaType(moviesRes, tvRes);
      return combined;
    } catch (e) {
      return rejectWithValue(e.message || e);
    }
  }
);

/* ---------- remove from watchlist (POST with watchlist:false) ---------- */
export const removeFromWatchlist = createAsyncThunk(
  "Account/removeFromWatchlist",
  async ({ accountId, media_type, media_id }, { rejectWithValue }) => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      const res = await fetch(
        `https://api.themoviedb.org/3/account/${accountId}/watchlist?api_key=${API_KEY}&session_id=${sessionId}`,
        {
          method: "POST",
          headers: { "content-type": "application/json;charset=utf-8" },
          body: JSON.stringify({ media_type, media_id, watchlist: false }),
        }
      );
      const data = await res.json();
      if (!data.success) return rejectWithValue(data);
      return { media_type, media_id };
    } catch (e) {
      return rejectWithValue(e.message || e);
    }
  }
);

/* ---------- remove from favorites (POST with favorite:false) ---------- */
export const removeFromFavorites = createAsyncThunk(
  "Account/removeFromFavorites",
  async ({ accountId, media_type, media_id }, { rejectWithValue }) => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      const res = await fetch(
        `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
        {
          method: "POST",
          headers: { "content-type": "application/json;charset=utf-8" },
          body: JSON.stringify({ media_type, media_id, favorite: false }),
        }
      );
      const data = await res.json();
      if (!data.success) return rejectWithValue(data);
      return { media_type, media_id };
    } catch (e) {
      return rejectWithValue(e.message || e);
    }
  }
);

/* ---------- remove rating (DELETE to /movie/{id}/rating or /tv/{id}/rating) ---------- */
export const removeRating = createAsyncThunk(
  "Account/removeRating",
  async ({ media_type, media_id }, { rejectWithValue }) => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      const endpoint =
        media_type === "movie"
          ? `https://api.themoviedb.org/3/movie/${media_id}/rating?api_key=${API_KEY}&session_id=${sessionId}`
          : `https://api.themoviedb.org/3/tv/${media_id}/rating?api_key=${API_KEY}&session_id=${sessionId}`;

      const res = await fetch(endpoint, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) return rejectWithValue(data);
      return { media_type, media_id };
    } catch (e) {
      return rejectWithValue(e.message || e);
    }
  }
);

const initialState = {
  AccountInfoDetails: null,
  AccountInfoDetailsLoading: false,
  AccountInfoDetailsError: false,
  isLogged: false,

  watchlist: [],
  favorites: [],
  rated: [],

  loadingWatchlist: false,
  loadingFavorites: false,
  loadingRated: false,
};

const AccountInfoSlice = createSlice({
  name: "AccountInfoSlice",
  initialState,
  reducers: {
    signOut: (state) => {
      localStorage.removeItem("sessionId");
      state.AccountInfoDetails = null;
      state.isLogged = false;
      state.watchlist = [];
      state.favorites = [];
      state.rated = [];
    },
  },
  extraReducers: (builder) => {
    // AccountInfo
    builder.addCase(AccountInfo.pending, (state) => {
      state.AccountInfoDetailsLoading = true;
    });
    builder.addCase(AccountInfo.fulfilled, (state, { payload }) => {
      state.AccountInfoDetails = payload;
      state.AccountInfoDetailsLoading = false;
      state.isLogged = true;
    });
    builder.addCase(AccountInfo.rejected, (state) => {
      state.AccountInfoDetailsError = true;
      state.AccountInfoDetailsLoading = false;
      state.isLogged = false;
    });

    // watchlist
    builder.addCase(getWatchlist.pending, (state) => {
      state.loadingWatchlist = true;
    });
    builder.addCase(getWatchlist.fulfilled, (state, { payload }) => {
      state.watchlist = payload;
      state.loadingWatchlist = false;
    });
    builder.addCase(getWatchlist.rejected, (state) => {
      state.loadingWatchlist = false;
    });

    // favorites
    builder.addCase(getFavorites.pending, (state) => {
      state.loadingFavorites = true;
    });
    builder.addCase(getFavorites.fulfilled, (state, { payload }) => {
      state.favorites = payload;
      state.loadingFavorites = false;
    });
    builder.addCase(getFavorites.rejected, (state) => {
      state.loadingFavorites = false;
    });

    // rated
    builder.addCase(getRated.pending, (state) => {
      state.loadingRated = true;
    });
    builder.addCase(getRated.fulfilled, (state, { payload }) => {
      state.rated = payload;
      state.loadingRated = false;
    });
    builder.addCase(getRated.rejected, (state) => {
      state.loadingRated = false;
    });

    // remove from watchlist
    builder.addCase(removeFromWatchlist.fulfilled, (state, { payload }) => {
      const { media_type, media_id } = payload;
      state.watchlist = state.watchlist.filter(
        (it) => !(it.media_type === media_type && it.id === media_id)
      );
    });

    // remove from favorites
    builder.addCase(removeFromFavorites.fulfilled, (state, { payload }) => {
      const { media_type, media_id } = payload;
      state.favorites = state.favorites.filter(
        (it) => !(it.media_type === media_type && it.id === media_id)
      );
    });

    // remove rating
    builder.addCase(removeRating.fulfilled, (state, { payload }) => {
      const { media_type, media_id } = payload;
      state.rated = state.rated.filter(
        (it) => !(it.media_type === media_type && it.id === media_id)
      );
    });
  },
});

export const AccountInfoSliceReducer = AccountInfoSlice.reducer;
export const { signOut } = AccountInfoSlice.actions;
export default AccountInfoSlice;
