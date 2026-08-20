// src/pages/AccountPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AccountInfo,
  getWatchlist,
  getFavorites,
  getRated,
  removeFromWatchlist,
  removeFromFavorites,
  removeRating,
  signOut,
} from "../../redux/AuthSlices/AccountInfo";

import { Card, button, Avatar, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Star, List, LogOut, Edit3, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

function StatCard({ icon, value, label }) {
  return (
    <div className="bg-white/5 border border-background-muted rounded-2xl p-4 flex items-center gap-4 shadow-sm">
      <div className="p-3 rounded-xl bg-accent-primary/20 text-accent-primary flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-text-primary font-semibold text-lg">{value}</div>
        <div className="text-text-secondary text-sm">{label}</div>
      </div>
    </div>
  );
}

function MovieCard({ item, onRemove, removeLabel }) {
  const title = item.title || item.name || "Untitled";
  const date = item.release_date || item.first_air_date || "—";
  const posterPath = item.poster_path
    ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
    : "https://via.placeholder.com/300x450";

  return (
    <div className="bg-background-elevated rounded-xl overflow-hidden shadow-lg group">
      <img src={posterPath} alt={title} className="w-full h-56 object-cover" />
      <div className="p-3 flex flex-col gap-2">
        <div className="text-text-primary font-medium">{title}</div>
        <div className="text-text-secondary text-sm">{date}</div>
        {item.rating && (
          <div className="text-accent-secondary font-semibold">
            Rated: {item.rating}
          </div>
        )}
        <div className="mt-2 flex gap-2">
          <button
            size="sm"
            className="!bg-accent-primary !hover:bg-accent-hover text-text-primary flex items-center gap-2 px-3 py-1 rounded-lg"
            onClick={() => onRemove(item)}
          >
            <Trash2 size={14} />
            {removeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const dispatch = useDispatch();
  const {
    AccountInfoDetails,
    watchlist,
    favorites,
    rated,
    isLogged,
    loadingWatchlist,
    loadingFavorites,
    loadingRated,
  } = useSelector((state) => state.AccountInfoSliceReducer);

  useEffect(() => {
    dispatch(AccountInfo()).then((res) => {
      if (res.payload?.id) {
        const id = res.payload.id;
        dispatch(getWatchlist(id));
        dispatch(getFavorites(id));
        dispatch(getRated(id));
      }
    });
  }, [dispatch]);

  if (!isLogged) {
    return (
      <div className="p-6 text-text-primary bg-background-primary min-h-screen">
        Loading account...
      </div>
    );
  }

  const handleRemoveFromWatchlist = async (item) => {
    const accountId = AccountInfoDetails.id;
    try {
      await dispatch(
        removeFromWatchlist({
          accountId,
          media_type: item.media_type,
          media_id: item.id,
        })
      ).unwrap();
      Swal.fire({
        icon: "success",
        title: "Removed",
        text: "Item removed from watchlist",
        confirmbuttonColor: "#dc2626",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: String(err),
        confirmbuttonColor: "#dc2626",
      });
    }
  };

  const handleRemoveFromFavorites = async (item) => {
    const accountId = AccountInfoDetails.id;
    try {
      await dispatch(
        removeFromFavorites({
          accountId,
          media_type: item.media_type,
          media_id: item.id,
        })
      ).unwrap();
      Swal.fire({
        icon: "success",
        title: "Removed",
        text: "Item removed from favorites",
        confirmbuttonColor: "#dc2626",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: String(err),
        confirmbuttonColor: "#dc2626",
      });
    }
  };

  const handleRemoveRating = async (item) => {
    try {
      await dispatch(
        removeRating({ media_type: item.media_type, media_id: item.id })
      ).unwrap();
      Swal.fire({
        icon: "success",
        title: "Removed",
        text: "Rating removed",
        confirmbuttonColor: "#dc2626",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: String(err),
        confirmbuttonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background-primary p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="bg-background-elevated border border-background-muted rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col items-center gap-4">
              <Avatar
                size="xxl"
                src={
                  AccountInfoDetails?.avatar?.tmdb?.avatar_path
                    ? `https://image.tmdb.org/t/p/w500${AccountInfoDetails.avatar.tmdb.avatar_path}`
                    : undefined
                }
                className="ring-2 ring-accent-primary"
              />
              <div className="text-center">
                <div className="text-text-primary font-extrabold text-2xl">
                  {AccountInfoDetails.username}
                </div>
                <div className="text-text-secondary text-sm">
                  ID: {AccountInfoDetails.id}
                </div>
              </div>

              <div className="mt-4 w-full grid grid-cols-1 gap-3">
                <StatCard
                  icon={<List size={18} />}
                  value={watchlist.length}
                  label="Watchlist"
                />
                <StatCard
                  icon={<Star size={18} />}
                  value={favorites.length}
                  label="Favorites"
                />
                <StatCard
                  icon={<Star size={18} />}
                  value={rated.length}
                  label="Ratings"
                />
              </div>

              <div className="mt-6 w-full flex flex-col gap-2">
                <button className="!bg-accent-primary !hover:bg-accent-hover w-full flex items-center gap-2 justify-center py-2 rounded-xl">
                  <Edit3 size={16} /> Edit Profile
                </button>
                <button
                  className="!bg-red-600 !hover:bg-red-700 w-full flex items-center gap-2 justify-center py-2 rounded-xl"
                  onClick={() => dispatch(signOut())}
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs & Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <Card className="bg-background-elevated border border-background-muted rounded-2xl p-6 shadow-xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                "overview",
                "watchlist",
                "favorites",
                "ratings",
                "settings",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium !shadow-none
                    ${
                      activeTab === tab
                        ? "!bg-accent-primary text-text-primary"
                        : "!bg-white/10 text-text-secondary hover:!bg-accent-primary/60 hover:text-text-primary"
                    }
                  `}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === "overview" && (
              <div className="text-text-primary">
                <Typography variant="h6" className="text-text-primary mb-3">
                  Welcome back, {AccountInfoDetails.username}!
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {watchlist.slice(0, 3).map((it) => (
                    <MovieCard
                      key={`ov-${it.media_type}-${it.id}`}
                      item={it}
                      onRemove={() => handleRemoveFromWatchlist(it)}
                      removeLabel="Remove"
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "watchlist" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loadingWatchlist ? (
                  <div className="text-text-secondary p-4">
                    Loading watchlist...
                  </div>
                ) : watchlist.length ? (
                  watchlist.map((it) => (
                    <MovieCard
                      key={`w-${it.media_type}-${it.id}`}
                      item={it}
                      onRemove={handleRemoveFromWatchlist}
                      removeLabel="Remove"
                    />
                  ))
                ) : (
                  <div className="text-text-secondary p-4">
                    No items in watchlist
                  </div>
                )}
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loadingFavorites ? (
                  <div className="text-text-secondary p-4">
                    Loading favorites...
                  </div>
                ) : favorites.length ? (
                  favorites.map((it) => (
                    <MovieCard
                      key={`f-${it.media_type}-${it.id}`}
                      item={it}
                      onRemove={handleRemoveFromFavorites}
                      removeLabel="Remove"
                    />
                  ))
                ) : (
                  <div className="text-text-secondary p-4">
                    No favorites yet
                  </div>
                )}
              </div>
            )}

            {activeTab === "ratings" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loadingRated ? (
                  <div className="text-text-secondary p-4">
                    Loading rated items...
                  </div>
                ) : rated.length ? (
                  rated.map((it) => (
                    <MovieCard
                      key={`r-${it.media_type}-${it.id}`}
                      item={it}
                      onRemove={handleRemoveRating}
                      removeLabel="Remove Rating"
                    />
                  ))
                ) : (
                  <div className="text-text-secondary p-4">No rated items</div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div className="text-text-secondary">
                <div>
                  Language: <span className="text-text-primary">EN</span>
                </div>
                <div>
                  Country: <span className="text-text-primary">US</span>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
