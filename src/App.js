import React, { useState, useEffect } from "react";
import './css/App.css';
import BookSearch from './components/SearchBooks.js';
import BookList from './components/BookList.js';
import { FaBookReader } from "react-icons/fa";

const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [favorites, setFavorites] = useState([]);

  //registrar Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker registrado correctamente.'))
        .catch((error) => console.error('Error al registrar el Service Worker:', error));
    }
  }, []);

  //recuperar favoritos del Service Worker al cargar
  useEffect(() => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'GET_FAVORITES' });
      navigator.serviceWorker.onmessage = (event) => {
        if (event.data.type === 'FAVORITES') {
          setFavorites(event.data.payload);
        }
      };
    }
  }, []);

  //enviar favoritos al Service Worker cuando cambien
  useEffect(() => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SAVE_FAVORITES',
        payload: favorites
      });
    }
  }, [favorites]);

  //agregar libro a favs
  const addToFavorites = (bookId) => {
    if (!favorites.includes(bookId)) {
      setFavorites([...favorites, bookId]);
    }
  };

  //eliminar libro de favs
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
