import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  Suspense,
  lazy,
} from "react";
import { Card, Typography, button } from "@material-tailwind/react";
import {
  FaCalendarAlt,
  FaStar,
  FaClock,
  FaGlobe,
  FaMoneyBillWave,
} from "react-icons/fa";
import { PlayIcon } from "@heroicons/react/24/solid";
import { IoArrowBackOutline } from "react-icons/io5";

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import NotFound from "../notFound/NotFound";
import MovieLoader from "../loading/MovieLoader";

// Redux Thunks (unchanged)
import { getMovieDetails } from "../../redux/moviesSlices/getMovieDetails";
import { GetMovieCredits } from "../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieCredits";
import { GetMovieRecommendations } from "../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieRecommendations";
import { GetMovieSimilar } from "../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieSimilar";
import { GetMovieReviews } from "../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieReviews";
import { GetMovieImages } from "../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieImages";
import { GetMovieExternalLinks } from "../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieExternalLinks";
import { GetMovieVideos } from "../../redux/moviesSlices/GetRequest/MovieDetails/GetMovieVideos";

/* -------------------------
   Lazy-load heavy child sections
   ------------------------- */
const MovieCastSection = lazy(() => import("./sections/MovieCastSection"));
const MovieCrewSection = lazy(() => import("./sections/MovieCrewSection"));
const MovieReviewsSection = lazy(() =>
  import("./sections/MovieReviewsSection")
);
const MovieRecommendationsSection = lazy(() =>
  import("./sections/MovieRecommendationsSection")
);
const MovieSimilarSection = lazy(() =>
  import("./sections/MovieSimilarSection")
);
const MovieMediaSection = lazy(() => import("./sections/MovieMediaSection"));
const MovieExternalLinksSection = lazy(() =>
  import("./sections/MovieExternalLinksSection")
);
const MovieTrailersSection = lazy(() =>
  import("./sections/MovieTrailersSection")
);
const MovieProductionCompaniesSection = lazy(() =>
  import("./sections/MovieProductionCompaniesSection")
);
const MovieRatingIcons = lazy(() =>
  import("./userInterActions/MovieRatingIcons")
);
const MovieFavouriteWishlistSection = lazy(() =>
  import("./userInterActions/MovieFavouriteWishlistSection")
);
const MovieWatchProvidersSection = lazy(() =>
  import("./sections/MovieWatchProvidersSection")
);

/* Simple animation variants */
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

const MovieDetailsCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // UI state
  const [showMedia, setShowMedia] = useState(true);
  const [isTrailerOn, setIsTrailerOn] = useState(false);

  // Use shallowEqual to avoid unnecessary rerenders on unrelated redux changes
  const { selectedMovieDetails, detailsLoading, detailsError } = useSelector(
    (state) => state.movieDetailsReducer,
    shallowEqual
  );

  // Derived/memoized data to avoid recalculation
  const movieId =
    selectedMovieDetails?.id ?? localStorage.getItem("movieId") ?? null;
  const title = selectedMovieDetails?.title ?? "Unknown Title";
  const releaseDate = selectedMovieDetails?.release_date ?? "N/A";
  const posterPath = selectedMovieDetails?.poster_path ?? null;
  const backdropPath = selectedMovieDetails?.backdrop_path ?? null;
  const genres = selectedMovieDetails?.genres ?? [];
  const voteAverage = selectedMovieDetails?.vote_average ?? 0;
  const voteCount = selectedMovieDetails?.vote_count ?? 0;
  const runtime = selectedMovieDetails?.runtime ?? 0;
  const originalLang = (
    selectedMovieDetails?.original_language || ""
  ).toUpperCase();
  const budget = selectedMovieDetails?.budget ?? 0;
  const revenue = selectedMovieDetails?.revenue ?? 0;
  const overview = selectedMovieDetails?.overview ?? "No overview available.";

  const posterSrc = useMemo(
    () =>
      posterPath
        ? `https://image.tmdb.org/t/p/w500${posterPath}`
        : "/Image-not-found.png",
    [posterPath]
  );

  // Use a more optimized backdrop size instead of `original`
  const backdropSrc = useMemo(
    () =>
      backdropPath ? `https://image.tmdb.org/t/p/w780${backdropPath}` : "",
    [backdropPath]
  );

  /* -------------------------
     Lifecycle / Data fetching
     ------------------------- */

  // Scroll to top when movie changes
  useEffect(() => {
    if (movieId) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [movieId]);

  // Fetch data with prioritization:
  // 1) essential: details, credits, videos
  // 2) secondary: similar, recommendations, reviews, images, external links (deferred)
  useEffect(() => {
    const storedId = localStorage.getItem("movieId") || movieId;
    if (!storedId) return;

    // store id if not set
    if (!localStorage.getItem("movieId"))
      localStorage.setItem("movieId", storedId);

    // essential data first
    dispatch(getMovieDetails(storedId));
    dispatch(GetMovieCredits({ movieId: storedId }));
    dispatch(GetMovieVideos(storedId));

    // load secondary data after a small delay (improves Time-to-interactive)
    const timer = setTimeout(() => {
      dispatch(GetMovieSimilar({ movieId: storedId }));
      dispatch(GetMovieRecommendations({ movieId: storedId }));
      dispatch(GetMovieReviews({ movieId: storedId }));
      dispatch(GetMovieImages({ movieId: storedId }));
      dispatch(GetMovieExternalLinks({ movieId: storedId }));
    }, 450); // 450ms gives the UI a chance to render essential pieces first

    return () => clearTimeout(timer);
  }, [dispatch, movieId]);

  // sync back movieId when details arrive
  useEffect(() => {
    if (selectedMovieDetails?.id) {
      localStorage.setItem("movieId", selectedMovieDetails.id);
    }
  }, [selectedMovieDetails?.id]);

  // Guards
  if (!localStorage.getItem("movieId") && !detailsLoading) return <NotFound />;
  if (detailsError) return <NotFound />;
  if (detailsLoading) return <MovieLoader />;

  /* -------------------------
     Handlers (memoized)
     ------------------------- */
  const handleToggleMedia = useCallback(() => {
    setShowMedia((v) => !v);
  }, []);

  const handleWatchTrailer = useCallback(() => {
    // lightweight: re-dispatch videos if needed and toggle trailer UI
    if (movieId) dispatch(GetMovieVideos(movieId));
    setIsTrailerOn((v) => !v);
  }, [dispatch, movieId]);

  /* -------------------------
     Render
     ------------------------- */
  return (
    <div className="relative w-full min-h-screen bg-black text-white font-poppins overflow-x-hidden">
      {/* ================= Backdrop ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[400px] w-full"
      >
        {backdropSrc ? (
          <img
            src={backdropSrc}
            alt="Backdrop"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            loading="lazy"
            decoding="async"
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="absolute bottom-6 left-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent drop-shadow-lg">
            {title}
          </h1>
          <p className="text-sm text-gray-300 flex items-center gap-2">
            <FaCalendarAlt className="text-red-500" />
            Release: {releaseDate}
          </p>
        </motion.div>
      </motion.div>

      {/* ================= Main grid ================= */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
        }}
        className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        {/* Poster column */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center md:justify-start relative"
        >
          <Card className="rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform bg-[#0f0f0f]">
            <img
              src={posterSrc}
              alt="Poster"
              className="object-cover w-[250px] md:w-full h-full"
              loading="lazy"
              decoding="async"
            />
          </Card>

          {/* Rating icons container positioned relative to parent */}
          <div className="absolute top-3 right-3 bg-black/20 rounded-xl px-3 flex items-center gap-3 shadow-lg">
            <Suspense
              fallback={
                <div className="w-8 h-8 rounded bg-gray-700 animate-pulse" />
              }
            >
              <MovieRatingIcons />
            </Suspense>
          </div>
        </motion.div>

        {/* Details column */}
        <motion.div
          variants={fadeUp}
          className="md:col-span-2 space-y-6 flex flex-col justify-center"
        >
          <Typography variant="h2" className="text-white font-bold">
            Overview
          </Typography>

          <Typography className="text-gray-300 text-lg leading-relaxed">
            {overview}
          </Typography>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-6 text-gray-300 mt-4"
          >
            <div className="flex items-center gap-2">
              <FaStar className="text-red-500" />
              <span>
                <strong className="text-red-500">Rating:</strong>{" "}
                {voteAverage.toFixed(1)} ⭐ ({voteCount} votes)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaClock className="text-red-500" />
              <span>
                <strong className="text-red-500">Runtime:</strong> {runtime} min
              </span>
            </div>

            <div className="flex items-center gap-2">
              <PlayIcon className="w-5 h-5 text-red-500" />
              <span>
                <strong className="text-red-500">Genres:</strong>{" "}
                {genres.map((g) => (
                  <span key={g.id} className="ml-1">
                    {g.name}
                  </span>
                ))}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaGlobe className="text-red-500" />
              <span>
                <strong className="text-red-500">Language:</strong>{" "}
                {originalLang || "N/A"}
              </span>
            </div>

            {budget > 0 && (
              <div className="flex items-center gap-2">
                <FaMoneyBillWave className="text-red-500" />
                <span>
                  <strong className="text-red-500">Budget:</strong> $
                  {budget.toLocaleString()}
                </span>
              </div>
            )}

            {revenue > 0 && (
              <div className="flex items-center gap-2">
                <FaMoneyBillWave className="text-red-500" />
                <span>
                  <strong className="text-red-500">Revenue:</strong> $
                  {revenue.toLocaleString()}
                </span>
              </div>
            )}
          </motion.div>

          {/* Favourite & action buttons */}
          <Suspense fallback={<div className="h-10" />}>
            <MovieFavouriteWishlistSection />
          </Suspense>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              color="red"
              className="rounded-full flex items-center gap-2"
              onClick={handleWatchTrailer}
            >
              <PlayIcon className="w-5 h-5 text-white" />
              Watch Trailer
            </button>

            <button
              color="gray"
              className="rounded-full flex items-center gap-2"
              onClick={() => navigate("/movies")}
            >
              <IoArrowBackOutline className="w-5 h-5 text-white" />
              Movies Page
            </button>
          </div>

          {/* Official & Social Links */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col w-full sm:w-3/4 mt-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <PlayIcon className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                Official & Social Links
              </h2>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              Official and social media links related to this movie
            </p>

            <Suspense
              fallback={
                <div className="h-12 animate-pulse bg-gray-800 rounded" />
              }
            >
              <MovieExternalLinksSection />
            </Suspense>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ================= Secondary content area (full width, centered) ================= */}
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <div className="flex justify-center items-center">
          <Suspense
            fallback={
              <div className="h-12 w-full max-w-6xl animate-pulse bg-gray-800 rounded" />
            }
          >
            <MovieWatchProvidersSection />
          </Suspense>
        </div>

        {/* lazy-heavy sections with small fallback */}
        <Suspense fallback={<MovieLoader />}>
          <MovieTrailersSection isTrailerOn={isTrailerOn} />
          <MovieReviewsSection />
          <MovieCastSection />
          <MovieCrewSection />
        </Suspense>

        {/* Media toggle + deferred media */}
        <div className="flex justify-center">
          <button
            onClick={handleToggleMedia}
            className="rounded-full bg-accent-primary text-white px-6 py-2"
          >
            {showMedia ? "Hide Media" : "Show Media"}
          </button>
        </div>

        {showMedia && (
          <div className="mt-4">
            <Suspense
              fallback={
                <div className="h-48 animate-pulse bg-zinc-900 rounded" />
              }
            >
              <MovieMediaSection />
            </Suspense>
          </div>
        )}

        <Suspense fallback={<div className="h-20 animate-pulse" />}>
          <MovieProductionCompaniesSection />
          <MovieSimilarSection />
          <MovieRecommendationsSection />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsCard;
