import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

function SearchBar({ setQuery, showFavorites, setShowFavorites }) {
  const [input, setInput] = useState("");

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(input);
    }, 500);
    return () => clearTimeout(timer);
  }, [input, setQuery]);

  return (
    <div className="search-bar">
      <div className="search-container">
        {/* Search icon */}
        <FaSearch className="search-icon" />

        {/* Input field */}
        <input
          aria-label="Search books"
          type="text"
          placeholder="Search books..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Clear button */}
        {input && (
          <FaTimes
            className="clear-btn"
            onClick={() => setInput("")}
            aria-label="Clear search"
          />
        )}
      </div>

      {/* Favorites toggle */}
      <button
        className={`fav-toggle ${showFavorites ? "active" : ""}`}
        onClick={() => setShowFavorites(!showFavorites)}
      >
        {showFavorites ? "⭐ Showing Favorites" : "Show Favorites Only"}
      </button>
    </div>
  );
}

export default SearchBar;
