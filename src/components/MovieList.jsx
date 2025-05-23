import React, { useState } from 'react';
import MovieCard from './MovieCard';
import '../styles/MovieList.css';

const MovieList = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movie-list-container">
      <div className="search-container">
        <input 
          type="text"
          placeholder="Пошук фільмів..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <div className="no-movies">
            <p>Фільмів не знайдено</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;