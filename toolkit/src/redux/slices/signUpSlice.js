import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUser: {
    name: "",
    email: "",
    password: "",
    role: "user",
  },
  errors: {},
};

const signUserSlice = createSlice({
  name: "signUser",
  initialState,
  reducers: {
    updateSignField: (state, action) => {
      const { field, value } = action.payload;
      state.signUser[field] = value;
    },

    validateForm: (state) => {
      const { name, email, password } = state.signUser;
      const errors = {};

      if (
        name.trim() === "" ||
        name.includes(" ") ||
        name[0] !== name[0]?.toUpperCase() ||
        name.length < 3
      ) {
        errors.name =
          "Enter a valid Name ❌ (no spaces, start with uppercase, min 3 chars)";
      }
      const vEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!vEmail.test(email)) {
        errors.email = "Enter a valid Email ❌";
      }

      // Password validation
      if (password.length < 6 || !password.includes("$")) {
        errors.password =
          "Password must be at least 6 characters and include '$' ❌";
      }

      state.errors = errors;
    },

    resetSign: (state) => {
      state.signUser = {
        name: "",
        email: "",
        password: "",
        role: "user",
      };
    },

    resetErrors: (state) => {
      state.errors = {};
    },
  },
});

export const { updateSignField, validateForm, resetSign, resetErrors } =
  signUserSlice.actions;

export const signUser = signUserSlice.reducer;
