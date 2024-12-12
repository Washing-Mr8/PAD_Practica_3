import React, { useState, useEffect } from "react";
import './css/App.css';
import BookSearch from './components/SearchBooks.js';
import BookList from './components/BookList.js';
import { FaBookReader } from "react-icons/fa";

const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [favorites, setFavorites] = useState([]);

  //recuperar favs localStorage 
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  //guardar favs en localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  //agregar libro fav
  const addToFavorites = (bookId) => {
    if (!favorites.includes(bookId)) {
      setFavorites([...favorites, bookId]);
    }
  };

  //eliminar un fav
  const removeFromFavorites = (bookId) => {
    setFavorites(favorites.filter((id) => id !== bookId));
  };

  return (
    <div className="App">
      <h1 className="title"><FaBookReader /> Buscador de Libros</h1>
      <BookSearch
        onSearch={setBooks}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <BookList
        books={books}
        favorites={favorites}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
      />
    </div>
  );
};

export default App;
