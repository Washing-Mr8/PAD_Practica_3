import React, { useState, useEffect } from "react";
import "./css/App.css";
import BookSearch from "./components/SearchBooks.js";
import BookList from "./components/BookList.js";
import logo from "./pad_icon.svg";

const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  //registrar Service Worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Service Worker registrado correctamente."))
        .catch((error) =>
          console.error("Error al registrar el Service Worker:", error)
        );
    }
  }, []);

  return (
    <div className="App">
      <div className="title-container">
        <img src={logo} className="pad-logo" alt="Logo de la App"></img>
        <h1 className="title">
        Buscador de Libros
        </h1>
      </div>
      <BookSearch
        onSearch={setBooks}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <BookList books={books} />
    </div>
  );
};

export default App;
