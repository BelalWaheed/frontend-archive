import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.theme === "dark" ? false : true,
};

const homeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    darkMode: (state) => {
      state.theme = false;
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    },
    lightMode: (state) => {
      state.theme = true;
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    },
    initTheme: (state) => {
      if (localStorage.theme == "dark") {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
      }
    },
  },
});

export const { darkMode, lightMode, initTheme } = homeSlice.actions;
export const theme = homeSlice.reducer;
