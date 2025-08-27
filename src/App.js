import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import BookModal from "./components/BookModal";
import Filters from "./components/Filters";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [filters, setFilters] = useState({ author: "", yearStart: "", yearEnd: "" });
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFavorites, setShowFavorites] = useState(false);

  // Fetch books when query changes
  useEffect(() => {
    if (query.length < 3) return;
    const fetchBooks = async () => {
      const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      const data = await res.json();
      setBooks(data.docs || []);
    };
    fetchBooks();
  }, [query]);

  // Apply filters + sorting
  useEffect(() => {
    let results = showFavorites ? [...favorites] : [...books];

    if (filters.author) {
      results = results.filter(b =>
        b.author_name?.some(a => a.toLowerCase().includes(filters.author.toLowerCase()))
      );
    }

    if (filters.yearStart) {
      results = results.filter(b => b.first_publish_year >= parseInt(filters.yearStart));
    }

    if (filters.yearEnd) {
      results = results.filter(b => b.first_publish_year <= parseInt(filters.yearEnd));
    }

    if (sortOrder === "asc") {
      results.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
    } else {
      results.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
    }

    setFilteredBooks(results);
  }, [books, favorites, filters, sortOrder, showFavorites]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (book) => {
    if (favorites.find(fav => fav.key === book.key)) {
      setFavorites(favorites.filter(fav => fav.key !== book.key));
    } else {
      setFavorites([...favorites, book]);
    }
  };

  return (
    <div className="app">
      <h1>📚 Book Finder</h1>
      <SearchBar 
        setQuery={setQuery} 
        showFavorites={showFavorites} 
        setShowFavorites={setShowFavorites} 
      />
      <Filters filters={filters} setFilters={setFilters} setSortOrder={setSortOrder} />

      <h2>{showFavorites ? "⭐ Favorites Only" : "Results"}</h2>
      <div className="book-list" role="list">
        {filteredBooks.map((book, idx) => (
          <BookCard
            key={idx}
            book={book}
            onClick={() => setSelectedBook(book)}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.some(fav => fav.key === book.key)}
          />
        ))}
      </div>

      {/* Only show Favorites section if not in Favorites-only mode */}
      {!showFavorites && favorites.length > 0 && (
        <>
          <h2>⭐ Favorites</h2>
          <div className="book-list">
            {favorites.map((book, idx) => (
              <BookCard
                key={idx}
                book={book}
                onClick={() => setSelectedBook(book)}
                toggleFavorite={toggleFavorite}
                isFavorite={true}
              />
            ))}
          </div>
        </>
      )}

      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}

export default App;
