import React, { useState, useRef } from "react";
import { Nav } from "./Nav";

export const FPCenterDiv = ({ darkMode, toggleTheme }) => {
  const [currentBg, setCurrentBg] = useState("/fpimage.jpg");
  const cardRef = useRef(null);

  const changeCard = (type) => {
    setCurrentBg(type === "a" 
      ? "/fpimage.jpg"
      : "https://scholarcompass.vercel.app/images/banner-item-02.jpg");
  };

  return (
    <div className={`${darkMode ? "bg-darkBg" : "bg-lightBg"}`}>
      <div className={`${darkMode ? "bg-darkDev2" : "bg-lightDev"} h-screen rounded-br-[18rem]`}>
        <Nav darkMode={darkMode} toggleTheme={toggleTheme} />
        <div className="flex justify-center items-center h-3/4">
          <div
            ref={cardRef}
            className="card w-7/12 bg-center bg-cover h-3/4 flex justify-around items-center"
            style={{ backgroundImage: `url(${currentBg})` }}
          >
            <h1 className={`md:text-3xl text-[20px] ${darkMode ? "text-darkDev1" : "text-lightDev"} text-center`}>
              With Scholar Teachers, Everything Is Easier
            </h1>
            <h3 className={`md:text-xl text-[14px] ${darkMode ? "text-gray-300" : "text-amber-100"} text-center p-3`}>
              Scholar is a free CSS template designed by TemplateMo for online
              educational-related websites. This layout is based on the famous
              Bootstrap v5.3.0 framework.
            </h3>
            <div className="bt">
              <button
                type="button"
                onClick={() => changeCard("a")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 inline-flex items-center me-2"
              >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" d="M13 5H1m0 0l4 4M1 5l4-4" />
                </svg>
                <span className="sr-only">Change to Image 1</span>
              </button>
              <button
                type="button"
                onClick={() => changeCard("v")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 inline-flex items-center me-2"
              >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
                <span className="sr-only">Change to Image 2</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};