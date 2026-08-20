import { FaRegStar, FaStar } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetMovieAccountStates } from "../../../redux/moviesSlices/user/MovieAccountStatesSlice";

const MovieRatingIcons = () => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.AccountInfoSliceReducer);
  const { accountMovieStatesDetails } = useSelector(
    (state) => state.MovieAccountStatesReducer
  );

  // Fetch movie account states on load or when details update
  useEffect(() => {
    const movieId = localStorage.getItem("movieId");
    const sessionId = localStorage.getItem("sessionId");

    if (movieId && sessionId) {
      dispatch(GetMovieAccountStates({ movieId, sessionId }));
    }
  }, [dispatch, accountMovieStatesDetails]);

  return (
    <>
      {isLogged && localStorage.getItem("sessionId") && (
        <div className="flex items-center gap-4 mt-4 text-white select-none">
          {/* Rated */}
          <div className="flex items-center gap-1">
            {accountMovieStatesDetails?.rated ? (
              <>
                <FaStar className="text-yellow-500 text-lg" />
                <span className="text-sm text-gray-200">
                  {accountMovieStatesDetails.rated.value}/10
                </span>
              </>
            ) : (
              <FaRegStar className="text-gray-400 text-lg" />
            )}
          </div>

          {/* Watchlist */}
          <div className="flex items-center gap-1">
            {accountMovieStatesDetails?.watchlist ? (
              <FaBookmark className="text-blue-400 text-lg" />
            ) : (
              <FaRegBookmark className="text-gray-400 text-lg" />
            )}
          </div>

          {/* Favourite */}
          <div className="flex items-center gap-1">
            {accountMovieStatesDetails?.favorite ? (
              <FaHeart className="text-red-500 text-lg" />
            ) : (
              <FaRegHeart className="text-gray-400 text-lg" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieRatingIcons;
