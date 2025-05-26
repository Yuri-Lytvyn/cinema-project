import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import { movies } from '../data/movies';
import '../styles/Booking.css'; 

const Booking = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const foundMovie = movies.find(movie => movie.id === parseInt(id));
    
    if (foundMovie) {
      setMovie(foundMovie);
    }
    
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return <div className="loading">Завантаження...</div>;
  }
  
  if (!movie) {
    return (
      <div className="movie-not-found">
        <h2>Фільм не знайдено</h2>
        <p>На жаль, фільм з ID {id} не знайдено.</p>
        <Link to="/" className="back-link">Повернутися до списку фільмів</Link>
      </div>
    );
  }
  
  return (
    <div className="booking-page">
      <div className="booking-header">
        <Link to="/" className="back-link">
          &larr; Повернутися до списку фільмів
        </Link>
        <h1>Бронювання квитків</h1>
      </div>
      
      <div className="movie-details">
        <div className="movie-poster">
          <img src={movie.poster} alt={`Постер фільму ${movie.title}`} />
        </div>
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p className="movie-genre">{movie.genre}</p>
          <p className="movie-description">{movie.description}</p>
          <p className="movie-datetime">
            <strong>Сеанс:</strong> {movie.dateTime}
          </p>
        </div>
      </div>
      
      <CinemaHall movieId={movie.id} />
    </div>
  );
};

export default Booking;