// loginSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginUser: {
    name: "",
    password: "",
  },
  errors: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateLoginField: (state, action) => {
      const { field, value } = action.payload;
      state.loginUser[field] = value;
    },
    validateLoginForm: (state) => {
      const { name, password } = state.loginUser;
      const errors = {};

      if (
        name.trim() === "" ||
        name.includes(" ") ||
        name[0] !== name[0]?.toUpperCase() ||
        name.length < 3
      ) {
        errors.name =
          "Invalid name ❌ (no spaces, min 3 letters, start uppercase)";
      }

      if (password.length < 6 || !password.includes("$")) {
        errors.password =
          "Password must be at least 6 characters and include '$' ❌";
      }

      state.errors = errors;
    },
    resetLogin: (state) => {
      state.loginUser = {
        name: "",
        password: "",
      };
    },
    resetLoginErrors: (state) => {
      state.errors = {};
    },
  },
});

export const {
  updateLoginField,
  validateLoginForm,
  resetLogin,
  resetLoginErrors,
} = loginSlice.actions;

export const loginUser = loginSlice.reducer;
