import React from 'react';
import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigateToBooking = () => {
    window.location.href = `/booking/${movie.id}`;
  };

  return (
    <div className="movie-card" onClick={navigateToBooking}>
      <div className="movie-poster">
        <img src={movie.poster} alt={`Постер фільму ${movie.title}`} />
      </div>
      <div className="movie-info">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-genre">{movie.genre}</p>
        <p className="movie-description">{movie.description}</p>
        <p className="movie-datetime">
          <strong>Сеанс:</strong> {movie.dateTime}
        </p>
        <a 
          href={`/booking/${movie.id}`} 
          className="booking-button"
          onClick={(e) => e.stopPropagation()} 
        >
          Забронювати
        </a>
      </div>
    </div>
  );
};

export default MovieCard;