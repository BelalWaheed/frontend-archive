import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { RequestSingIn } from "../../../redux/AuthSlices/RequestSingIn";
import { GetMovieAccountStates } from "../../../redux/moviesSlices/user/MovieAccountStatesSlice";
import { AddMovieRating } from "../../../redux/moviesSlices/user/MovieRatingSlice";

const MovieRateSection = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const { isLogged } = useSelector((state) => state.AccountInfoSliceReducer);
  const { accountMovieStatesDetails, accountMovieStatesLoading } = useSelector(
    (state) => state.MovieAccountStatesReducer
  );

  const sessionId = localStorage.getItem("sessionId");
  const movieId = localStorage.getItem("movieId");

  // Fetch account states on mount if sessionId exists
  useEffect(() => {
    if (sessionId && movieId) {
      dispatch(GetMovieAccountStates({ movieId, sessionId }));
    }
  }, [dispatch, sessionId, movieId]);

  const showAlert = (options) =>
    Swal.fire({
      confirmbuttonColor: "#ef4444",
      background: "#111827",
      color: "#fff",
      ...options,
    });

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (/^\d{0,2}(\.\d?)?$/.test(newValue)) {
      const num = parseFloat(newValue);
      if (isNaN(num) || num <= 10) setValue(newValue);
    }
  };

  const handleBlur = () => {
    if (!value) return setValue("");
    let num = parseFloat(value.replace(",", "."));
    if (isNaN(num)) return setValue("");
    if (value.endsWith(".")) num = parseFloat(value + "0");
    num = Math.min(10, Math.max(0.5, Math.round(num * 2) / 2));
    setValue(num.toFixed(1));
  };

  const handleSubmit = () => {
    // If no sessionId → prompt login
    if (!sessionId) {
      showAlert({
        icon: "info",
        title: "TMDB Connection Required!",
        text: "You need to connect your TMDB account before rating movies.",
        showCancelbutton: true,
        confirmbuttonText: "Connect now",
        cancelbuttonText: "Maybe later",
      }).then((result) => {
        if (result.isConfirmed) dispatch(RequestSingIn());
      });
      return;
    }

    // If not logged in → stop
    if (!isLogged) {
      showAlert({
        icon: "warning",
        title: "Not Logged In",
        text: "Please log in to rate movies.",
      });
      return;
    }

    if (!value) {
      showAlert({
        icon: "warning",
        title: "No rating entered!",
        text: "Please enter a rating before submitting.",
      });
      return;
    }

    // Check if user already rated
    if (!accountMovieStatesDetails?.rated) {
      dispatch(AddMovieRating({ movieId, sessionId, rate: value })).then(() =>
        showAlert({
          icon: "success",
          title: "Success!",
          text: "Your rating has been submitted successfully.",
        })
      );
    } else {
      showAlert({
        title: "You've already rated this movie!",
        text: "Would you like to update your previous rating?",
        icon: "question",
        showCancelbutton: true,
        confirmbuttonText: "Yes, update it",
        cancelbuttonText: "No, keep old rating",
      }).then((result) => {
        if (result.isConfirmed) {
          if (accountMovieStatesDetails.rated.value == value) {
            showAlert({
              icon: "info",
              title: "Same rating detected!",
              text: "You already gave this movie the same rating before. Please choose a different score to update.",
            });
          } else {
            dispatch(AddMovieRating({ movieId, sessionId, rate: value })).then(
              () =>
                showAlert({
                  icon: "success",
                  title: "Updated!",
                  text: "Your rating has been updated successfully.",
                })
            );
          }
        }
      });
    }
  };

  return (
    <div className="flex items-center gap-3 bg-black/90 px-4 py-3 rounded-2xl border border-gray-900 w-fit shadow-md hover:shadow-lg transition-all duration-200">
      <FaStar className="text-yellow-400 text-2xl drop-shadow-[0_0_5px_rgba(255,215,0,0.4)]" />
      <span className="text-gray-100 text-sm font-semibold tracking-wide">
        Add Rate
      </span>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="0.5–10"
        className="w-16 h-9 text-white text-center text-sm rounded-lg border border-gray-900 focus:border-red-500 outline-none bg-transparent transition-all"
      />
      <Typography
        onClick={handleSubmit}
        as="div"
        size="sm"
        className={`rounded-lg px-3 py-2 flex items-center justify-center shadow-sm transition-all ${
          accountMovieStatesLoading
            ? "bg-red-400 cursor-not-allowed"
            : "cursor-pointer bg-red-600 hover:bg-red-800 hover:shadow-red-500/30"
        }`}
      >
        {accountMovieStatesLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <RiSendPlaneFill size={16} />
        )}
      </Typography>
    </div>
  );
};

export default MovieRateSection;
