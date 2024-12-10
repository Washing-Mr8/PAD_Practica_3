import React, { useState } from "react";
import axios from "axios";

const API_KEY = 'AIzaSyDFSg3zY0wnytGWSO4Ch91a0k5aiLNKgbk';

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
            const baseQuery = query || ""; // Si query está vacío, usa una cadena vacía
            const genreQuery = selectedGenre ? `+subject:${selectedGenre}` : "";
            const finalQuery = `${baseQuery}${genreQuery}` || "books"; // Si ambas están vacías, usa "books"

            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${finalQuery}&key=${API_KEY}`
            );
            const books = response.data.items || [];
            onSearch(books);
            // Guardar últimos 5 libros consultados en localStorage
            const recentBooks = JSON.parse(localStorage.getItem("recentBooks")) || [];
            const updatedBooks = [query, ...recentBooks].slice(0, 5);
            localStorage.setItem("recentBooks", JSON.stringify(updatedBooks));
        } catch (error) {
            console.error("Error al buscar libros:", error);
        }
    };

    return (
        <div>
            <div>
                <label htmlFor="genre">Seleccionar género: </label>
                <select
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
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar libros..."
            />
            <button onClick={searchBooks}>Buscar</button>
        </div>
    );
};

export default BookSearch;
