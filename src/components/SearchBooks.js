import React, { useState } from "react";
import axios from "axios";
import "../css/SearchBooks.css";
import { FaSearch } from "react-icons/fa";

const API_KEY = "AIzaSyDFSg3zY0wnytGWSO4Ch91a0k5aiLNKgbk";

const BookSearch = ({ onSearch, selectedGenre, setSelectedGenre }) => {
  const [query, setQuery] = useState("");

  const genres = [
    "Aventuras",
    "Ciencia Ficción",
    "Histórica",
    "Novela Negra",
    "Romántica",
    "Terror",
    "Tecnología",
  ];

  const searchBooks = async () => {
    try {
      const baseQuery = query || "";
      const genreQuery = selectedGenre ? `+subject:${selectedGenre}` : "";
      const finalQuery = `${baseQuery}${genreQuery}` || "books";

      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${finalQuery}&key=${API_KEY}`
      );
      let books = response.data.items || [];

      books = books.slice(0, 5);
      let recentBooks = JSON.parse(localStorage.getItem("recentBooks")) || [];

      books.forEach((book) => {
        if (!recentBooks.some((b) => b.id === book.id)) {
          recentBooks.unshift(book); // agregamos nuevos libros al principio de la lista
        }
      });
      localStorage.removeItem("recentBooks"); //quitamos los antiguos 5
      recentBooks = recentBooks.slice(0,5);
      localStorage.setItem("recentBooks", JSON.stringify(recentBooks));

      onSearch(books);
    } catch (error) {
      console.error("Error al buscar libros:", error);
    }
  };

  return (
    <div className="search-container">
      <div>
        <select
          className="form-select"
          id="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Seleccionar género</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <input
        className="form-control"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar libros ..."
      />
      <button className="btn" onClick={searchBooks}>
        <FaSearch /> Buscar
      </button>
    </div>
  );
};

export default BookSearch;
