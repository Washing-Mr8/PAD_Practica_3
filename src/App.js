import React, { useState } from "react";
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

