import React from "react";

function BookCard({ book, onClick, toggleFavorite, isFavorite }) {
  return (
    <div className="book-card" role="listitem" tabIndex="0" onClick={onClick}>
      <img
        src={
          book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://via.placeholder.com/150"
        }
        alt={book.title}
      />
      <h3>{book.title}</h3>
      <p>{book.author_name?.join(", ")}</p>
      <p>{book.first_publish_year || "N/A"}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(book);
        }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "💖 Remove" : "🤍 Favorite"}
      </button>
    </div>
  );
}

export default BookCard;
