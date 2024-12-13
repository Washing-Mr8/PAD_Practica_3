import React, { useEffect, useState } from "react";
import "../css/BookList.css";
import { FaInfoCircle } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaUser } from "react-icons/fa";



const BookList = ({
  books,
  favorites,
  addToFavorites,
  removeFromFavorites,
}) => {
  const [recentBooks, setRecentBooks] = useState([]); //libros recientes

  useEffect(() => {
    //cargar libros recientes desde localStorage
    let storedBooks = JSON.parse(localStorage.getItem("recentBooks")) || [];
    if (books.length === 0 && storedBooks.length === 0) {
      storedBooks = [];
    }
    setRecentBooks(storedBooks);
  }, [books]);

  return (
    <div className="result-container">
      <h2>Resultados de la Búsqueda</h2>
      {books.length === 0 ? (
        <>
          <p>
            {" "}
            Sin resultados. Prueba a buscar un libro
          </p>
          {recentBooks.length === 0 ? (
            <p>No hay libros recientes.</p>
          ) : (
            <div className="card-container">
              <h2>Tu última búsqueda</h2>
              {recentBooks.map((book) => (
                <div className="card" key={book.id}>
                  <div className="card-body">
                    <h3 className="card-title">{book.volumeInfo.title}</h3>
                    {book.volumeInfo.authors && (
                      <p className="card-text">
                        <FaUser />
                        <strong> Autor(es):</strong>{" "}
                        {book.volumeInfo.authors.join(", ")}
                      </p>
                    )}
                    {book.volumeInfo.publishedDate && (
                      <p className="card-text">
                        <FaCalendar />
                        <strong> Año:</strong> {book.volumeInfo.publishedDate}
                      </p>
                    )}
                    {book.volumeInfo.description && (
                      <p className="card-text">
                        <strong>Descripción:</strong>{" "}
                        {book.volumeInfo.description}
                      </p>
                    )}
                    {book.volumeInfo.infoLink && (
                      <a
                        className="btn info"
                        href={book.volumeInfo.infoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInfoCircle /> Más información
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="card-container">
          {books.map((book) => (
            <div className="card" key={book.id}>
              <div className="card-body">
                <h3 className="card-title">{book.volumeInfo.title}</h3>
                {book.volumeInfo.authors && (
                  <p className="card-text">
                    <FaUser />
                    <strong> Autor(es):</strong>{" "}
                    {book.volumeInfo.authors.join(", ")}
                  </p>
                )}
                {book.volumeInfo.publishedDate && (
                  <p className="card-text">
                    <FaCalendar />
                    <strong> Año:</strong> {book.volumeInfo.publishedDate}
                  </p>
                )}
                {book.volumeInfo.description && (
                  <p className="card-text">
                    <strong>Descripción:</strong> {book.volumeInfo.description}
                  </p>
                )}
                {book.volumeInfo.infoLink && (
                  <a
                    className="btn info"
                    href={book.volumeInfo.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInfoCircle /> Más información
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
