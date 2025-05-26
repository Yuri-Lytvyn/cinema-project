import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <div className="header-container">
            <div className="logo-container">
              <div className="logo">404</div>
              <h1>Кінотеатр №404</h1>
            </div>
            <nav className="main-nav">
              <ul>
                <li><a href="/" className="active">Афіша</a></li>
                <li><a href="/">Розклад</a></li>
                <li><a href="/">Акції</a></li>
                <li><a href="/">Контакти</a></li>
              </ul>
            </nav>
          </div>
          <div className="header-banner">
            <h2>Найкращі фільми у нашому кінотеатрі</h2>
            <p>Оберіть фільм для незабутнього перегляду</p>
          </div>
        </header>
        
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking/:id" element={<Booking />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <div className="footer-container">
            <div className="footer-section">
              <h3>Кінотеатр №404</h3>
              <p>Найкращі фільми, сучасні зали та незабутні враження</p>
              <div className="social-links">
                <a href="#" className="social-icon">FB</a>
                <a href="#" className="social-icon">IG</a>
                <a href="#" className="social-icon">TG</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h3>Інформація</h3>
              <ul>
                <li><a href="#">Про нас</a></li>
                <li><a href="#">Новини</a></li>
                <li><a href="#">Бронювання</a></li>
                <li><a href="#">Правила</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Контакти</h3>
              <address>
                <p>м. Львів, вул. Кінематографічна, 404</p>
                <p>Тел: +380 12 345 6789</p>
                <p>Email: info@cinema404.ua</p>
              </address>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;   