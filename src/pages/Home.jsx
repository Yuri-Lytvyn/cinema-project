import React from 'react';
import MovieList from '../components/MovieList';
import { movies } from '../data/movies';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-content">
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default Home;