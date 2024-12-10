import React from "react";
import "../css/BookList.css"

const BookList = ({ books }) => {
  return (
    <div class="result-container">
    <h2>Resultados de la Búsqueda</h2>
    {books.length === 0 ? (
      <p>No hay resultados. Intenta realizar una búsqueda.</p>
    ) : (
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            {book.volumeInfo.authors && (
              <p><strong>Autor(es):</strong> {book.volumeInfo.authors.join(", ")}</p>
            )}
            {book.volumeInfo.publishedDate && (
              <p><strong>Año:</strong> {book.volumeInfo.publishedDate}</p>
            )}
            {book.volumeInfo.description && (
              <p><strong>Descripción:</strong> {book.volumeInfo.description.substring(0, 100)}...</p>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
  );
};

export default BookList;
