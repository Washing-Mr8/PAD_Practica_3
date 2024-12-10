import React from "react";
import "../css/BookList.css";

const BookList = ({ books }) => {
    return (
        <div className="result-container">
            <h2>Resultados de la Búsqueda</h2>
            {books.length === 0 ? (
                <p>No hay resultados. Intenta realizar una búsqueda.</p>
            ) : (
                <div className="card-container">
                    {books.map((book) => (

                        <div className="card" key={book.id}>
                            <div className="card-body">
                                <h3 className="card-title">{book.volumeInfo.title}</h3>
                                {book.volumeInfo.authors && (
                                    <p className="card-text"><strong>Autor(es):</strong> {book.volumeInfo.authors.join(", ")}</p>
                                )}
                                {book.volumeInfo.publishedDate && (
                                    <p className="card-text"><strong>Año:</strong> {book.volumeInfo.publishedDate}</p>
                                )}
                                {book.volumeInfo.description && (
                                    <p className="card-text"><strong>Descripción:</strong> {book.volumeInfo.description}</p>
                                )}
                                {book.volumeInfo.infoLink && (
                                    <a className="btn info" href={book.volumeInfo.infoLink}> Más información</a>
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
