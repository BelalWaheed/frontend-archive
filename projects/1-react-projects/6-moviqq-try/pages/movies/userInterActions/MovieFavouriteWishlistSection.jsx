import { motion } from "framer-motion";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";

import { RequestSingIn } from "../../../redux/AuthSlices/RequestSingIn";
import { GetMovieAccountStates } from "../../../redux/moviesSlices/user/MovieAccountStatesSlice";

import { AddFavorite } from "../../../redux/SharedSlices/PostRequest/AddFavorite";
import { AddToWatchlist } from "../../../redux/SharedSlices/PostRequest/AddToWatchlist";

const MovieFavouriteWishlistSection = () => {
  const { AccountInfoDetails, isLogged } = useSelector(
    (state) => state.AccountInfoSliceReducer
  );
  const { accountMovieStatesDetails } = useSelector(
    (state) => state.MovieAccountStatesReducer
  );

  const dispatch = useDispatch();

  // Get movie account states on mount and when favorite/watchlist changes
  useEffect(() => {
    dispatch(
      GetMovieAccountStates({
        movieId: localStorage.getItem("movieId"),
        sessionId: localStorage.getItem("sessionId"),
      })
    );
  }, [accountMovieStatesDetails]);

  const handleAction = (type) => {
    if (!isLogged || !localStorage.getItem("sessionId")) {
      return Swal.fire({
        icon: "info",
        title: "TMDB Connection Required!",
        text: "You need to connect your TMDB account before interacting with movies.",
        showCancelbutton: true,
        confirmbuttonText: "Connect now",
        cancelbuttonText: "Maybe later",
        confirmbuttonColor: "#ef4444",
        cancelbuttonColor: "#6b7280",
        background: "#111827",
        color: "#fff",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(RequestSingIn());
        }
      });
    }

    const payload = {
      media_type: "movie",
      media_id: localStorage.getItem("movieId"),
      accountId: AccountInfoDetails?.id,
      sessionId: localStorage.getItem("sessionId"),
    };

    if (type === "favorite") {
      payload.favorite = !accountMovieStatesDetails?.favorite;
      dispatch(AddFavorite(payload));
    } else if (type === "watchlist") {
      payload.watchlist = !accountMovieStatesDetails?.watchlist;
      dispatch(AddToWatchlist(payload));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="
                flex flex-col sm:flex-row 
                gap-2 
                p-3 
                bg-black/40 backdrop-blur-md 
                rounded-2xl 
                shadow-lg 
                w-full sm:w-fit
            "
    >
      {/* Favourite button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleAction("favorite")}
        className={`
                    flex-1 text-xs sm:text-sm 
                    flex items-center justify-center gap-2 
                    py-2 px-4 
                    rounded-xl font-semibold 
                    transition-all duration-200
                    ${
                      accountMovieStatesDetails?.favorite
                        ? "bg-red-600 text-white"
                        : "bg-white/20 text-white hover:bg-red-600/50"
                    }
                `}
      >
        <FaHeart className="text-base sm:text-lg" />
        {accountMovieStatesDetails?.favorite
          ? "Added to Favourite"
          : "Add Favourite"}
      </motion.button>

      {/* Wishlist button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleAction("watchlist")}
        className={`
                    flex-1 text-xs sm:text-sm 
                    flex items-center justify-center gap-2 
                    py-2 px-4 
                    rounded-xl font-semibold 
                    transition-all duration-200
                    ${
                      accountMovieStatesDetails?.watchlist
                        ? "bg-yellow-500 text-black"
                        : "bg-white/20 text-white hover:bg-yellow-500/60 hover:text-black"
                    }
                `}
      >
        <FaBookmark className="text-base sm:text-lg" />
        {accountMovieStatesDetails?.watchlist
          ? "Added to Watchlist"
          : "Add to Watchlist"}
      </motion.button>
    </motion.div>
  );
};

export default MovieFavouriteWishlistSection;
