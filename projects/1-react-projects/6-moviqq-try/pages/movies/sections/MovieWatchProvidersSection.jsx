import React, { useEffect, useState, useCallback } from "react";
import { Card, Radio } from "@material-tailwind/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { GetMovieWatchProviders } from "../../../redux/moviesSlices/GetRequest/MovieDetails/MovieWatchSlice";
import { useNavigate } from "react-router-dom";

const COUNTRIES_CACHE_KEY = "all_countries_v1";

const MovieWatchProvidersSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [allCountry, setAllCountry] = useState([]);

  const { MovieWatchProvidersDetails } = useSelector(
    (state) => state.MovieWatchProvidersReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get available country codes from TMDB response (may be undefined initially)
  const keys = MovieWatchProvidersDetails?.results
    ? Object.keys(MovieWatchProvidersDetails.results)
    : [];

  // Fetch movie watch providers (essential)
  useEffect(() => {
    const id = localStorage.getItem("movieId");
    if (!id) return;
    dispatch(
      GetMovieWatchProviders({
        movieId: id,
      })
    );
  }, [dispatch]);

  // Load countries (cached) and filter by available keys.
  useEffect(() => {
    let cancelled = false;
    const cached = localStorage.getItem(COUNTRIES_CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          setAllCountry(parsed);
        }
      } catch {}
    }

    // Only fetch once if not cached
    if (!cached) {
      const controller = new AbortController();
      (async () => {
        try {
          const req = await fetch(
            "https://countriesnow.space/api/v0.1/countries",
            {
              signal: controller.signal,
            }
          );
          const response = await req.json();
          if (!response?.data) return;
          // Normalize the structure we need: { iso2, country }
          const normalized = response.data
            .map((x) => ({
              iso2: (x.iso2 || "").toLowerCase(),
              country: x.country || x.name || "",
            }))
            .filter((c) => c.iso2); // remove invalid
          if (!cancelled) {
            setAllCountry(normalized);
            try {
              localStorage.setItem(
                COUNTRIES_CACHE_KEY,
                JSON.stringify(normalized)
              );
            } catch {}
          }
        } catch (err) {
          if (err.name === "AbortError") return;
          // ignore network errors silently for now
        }
      })();

      return () => {
        cancelled = true;
        controller.abort();
      };
    }

    // cleanup for cached path
    return () => {
      cancelled = true;
    };
  }, [MovieWatchProvidersDetails]); // we keep dependency so UI updates if results change

  // Filter countries by search + availability (we keep iso2 lowercase to match above)
  const filteredKeys = allCountry
    .filter((coun) => {
      const iso = coun.iso2?.toLowerCase();
      const isAvailable =
        keys.includes(iso) || keys.includes(iso.toUpperCase());
      const matchesSearch = coun.country
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return isAvailable && matchesSearch;
    })
    .map((c) => c.iso2);

  // If user selects a country key, set it (and close dropdown)
  const selectCountry = useCallback(
    (key) => {
      setSelectedCountry(key);
      setIsOpen(false);
    },
    [setSelectedCountry, setIsOpen]
  );

  return (
    <div className="container mx-8 md:mx-auto relative w-full md:w-1/2 min-h-fit z-[1] mt-6">
      {/* Header */}
      <div
        onClick={() => setIsOpen((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen((v) => !v)}
        className="flex items-center justify-between bg-[#111] rounded-xl p-3 cursor-pointer hover:bg-[#1b1b1b] transition-all"
        aria-expanded={isOpen}
        aria-controls="watch-providers-dropdown"
      >
        <div className="flex items-center gap-2">
          <GlobeAltIcon className="w-6 h-6 text-red-500" />
          <h3 className="text-lg font-semibold text-white">Where to Watch</h3>
        </div>
        {isOpen ? (
          <FaChevronUp className="text-gray-400" />
        ) : (
          <FaChevronDown className="text-gray-400" />
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <Card
          id="watch-providers-dropdown"
          className="scroll-indicator absolute left-0 top-full mt-2 w-full bg-[#0f0f0f] border border-gray-800 rounded-xl p-4 shadow-xl max-h-56 overflow-y-auto z-50"
        >
          <input
            type="text"
            placeholder="Search country (e.g. United States, Egypt)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3 p-2 w-full bg-[#1a1a1a] text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
            aria-label="Search country"
          />

          <div className="flex flex-col gap-2">
            {filteredKeys.length > 0 ? (
              filteredKeys.map((key) => {
                const displayCountry =
                  allCountry.find((c) => c.iso2 === key)?.country || key;
                return (
                  <label
                    key={key}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-[#1c1c1c] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 scroll-indicator">
                      <img
                        src={`https://flagsapi.com/${key.toUpperCase()}/flat/64.png`}
                        alt={key}
                        className="w-8 h-8 object-cover"
                        loading="lazy"
                      />
                      <Radio
                        name="country"
                        color="red"
                        value={key}
                        checked={selectedCountry === key}
                        onChange={() => selectCountry(key)}
                        aria-label={`Select ${displayCountry}`}
                      />
                      <span className="text-gray-300 capitalize">{key}</span>
                      <span className="text-gray-300"> - {displayCountry}</span>
                    </div>
                  </label>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm text-center">
                No results found
              </p>
            )}
          </div>
        </Card>
      )}

      {/* Selected Country Link */}
      {selectedCountry && (
        <div className="mt-3 flex items-center justify-between bg-[#111] rounded-xl p-3">
          <span className="text-gray-400 text-sm">
            Selected:{" "}
            <span className="text-white font-medium">
              {selectedCountry.toUpperCase()}
            </span>
          </span>

          <a
            href={
              MovieWatchProvidersDetails?.results?.[selectedCountry]?.link ||
              "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            className={`text-red-500 font-medium hover:underline ${
              !MovieWatchProvidersDetails?.results?.[selectedCountry]
                ? "pointer-events-none opacity-60"
                : ""
            }`}
          >
            Open on TMDB
          </a>
        </div>
      )}
    </div>
  );
};

export default MovieWatchProvidersSection;
