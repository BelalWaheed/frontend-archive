import React from "react";

export const Nav = ({ darkMode, toggleTheme }) => {
  return (
    <div className={`navbar flex ${darkMode ? "bg-darkBg" : "bg-lightDev"} shadow-sm md:justify-between rounded-b-xl drop-shadow-xl`}>
      <div className="flex">
        {/* Mobile menu dropdown (unchanged) */}
        <div className="flex shrink ">
          <a className={`btn btn-ghost p-0 mr-2 md:text-xl text-3xl ${darkMode ? "text-darkDev1" : "text-lightBg"}`}>
            Scholar Compass
          </a>
        </div>
        {/* Desktop search input (unchanged) */}
      </div>

      <div className="hidden md:flex gap-1">
        <button className={`btn ${darkMode ? "bg-darkDev1" : "bg-darkDev2"}`}>Home</button>
        <button className={`btn ${darkMode ? "bg-darkDev1" : "bg-darkDev2"}`}>Service</button>
        <button className={`btn ${darkMode ? "bg-darkDev1" : "bg-darkDev2"}`}>Courses</button>
        <button className={`btn ${darkMode ? "bg-darkDev1" : "bg-darkDev2"}`}>Team</button>
        <button className={`btn ${darkMode ? "bg-darkDev1" : "bg-darkDev2"}`}>Events</button>
        <button className={`btn ${darkMode ? "bg-darkDev1" : "bg-darkDev2"}`}>Register Now</button>

        <label className="swap swap-rotate">
          <input 
            type="checkbox" 
            checked={darkMode}
            onChange={toggleTheme}
          />
          {/* Sun and Moon icons (unchanged) */}
        </label>
      </div>
    </div>
  );
};