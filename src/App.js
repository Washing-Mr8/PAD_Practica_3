import React, { useState, useEffect } from "react";
import './css/App.css';
import BookSearch from'./components/SearchBooks.js';
import BookList from './components/BookList.js';
import { FaBookReader } from "react-icons/fa";


const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <div className="App">
      <h1 className="title" ><FaBookReader/>  Buscador de Libros</h1>
      <BookSearch onSearch={setBooks}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}/>

      <BookList books={books} />
    </div>
  );
};
export default App;

  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */


  /* POSIBLE IDEA
    const App = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  //estado ids libros favs
  const [favorites, setFavorites] = useState([]);

  //favoritos de localstorage al cargar
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  //me guardo favs cuando cambie
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  //agregar libro a fav
  const addToFavorites = (bookId) => {
    setFavorites([...favorites, bookId]);
  };

  return (
    <div className="App">
      <h1 className="title"><FaBookReader />  Buscador de Libros</h1>
      <BookSearch onSearch={setBooks} selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
      <BookList books={books} favorites={favorites} addToFavorites={addToFavorites} />
    </div>
  );
};

export default App;
  */

