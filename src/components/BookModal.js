import React, { useState, useEffect } from "react";

function BookModal({ book, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`https://openlibrary.org${book.key}.json`);
      const data = await res.json();
      setDetails(data);
    };
    fetchDetails();
  }, [book]);

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose} aria-label="Close modal">
          ✖
        </button>
        <h2>{book.title}</h2>
        <p><strong>Author(s):</strong> {book.author_name?.join(", ")}</p>
        <p><strong>First Published:</strong> {book.first_publish_year || "N/A"}</p>
        {details ? (
          <>
            <p><strong>Description:</strong> {details.description?.value || details.description || "No description available"}</p>
            <p><strong>Subjects:</strong> {details.subjects?.slice(0, 5).join(", ")}</p>
          </>
        ) : (
          <p>Loading details...</p>
        )}
      </div>
    </div>
  );
}

export default BookModal;
