import React, { useState, useEffect } from 'react';
import BookingService from '../services/BookingService';
import BookingForm from './BookingForm';
import Notification from './Notification';
import '../styles/CinemaHall.css';

const CinemaHall = ({ movieId }) => {
  const rows = 8;
  const seatsPerRow = 12;
  
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const [bookedSeats, setBookedSeats] = useState([]);
  
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  const [notification, setNotification] = useState(null);
  
  useEffect(() => {
    const booked = BookingService.getBookedSeatsByMovieId(parseInt(movieId));
    setBookedSeats(booked);
  }, [movieId]);

  const handleSeatClick = (row, seat) => {
    const seatId = `${row}-${seat}`;
    
    if (bookedSeats.includes(seatId)) {
      return;
    }
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatClass = (row, seat) => {
    const seatId = `${row}-${seat}`;
    
    if (bookedSeats.includes(seatId)) {
      return 'seat booked';
    }
    
    if (selectedSeats.includes(seatId)) {
      return 'seat selected';
    }
    
    return 'seat';
  };

  const formatSelectedSeats = () => {
    if (selectedSeats.length === 0) {
      return 'Не вибрано жодного місця';
    }
    
    return selectedSeats
      .sort((a, b) => {
        const [rowA, seatA] = a.split('-').map(Number);
        const [rowB, seatB] = b.split('-').map(Number);
        return rowA === rowB ? seatA - seatB : rowA - rowB;
      })
      .map(seatId => {
        const [row, seat] = seatId.split('-');
        return `Ряд ${row}, Місце ${seat}`;
      })
      .join('; ');
  };

  const totalPrice = selectedSeats.length * 180; 
  
  const handleBookButtonClick = () => {
    if (selectedSeats.length > 0) {
      setShowBookingForm(true);
    }
  };
  
  const handleCancelBooking = () => {
    setShowBookingForm(false);
  };
  
  const handleBookingSubmit = (formData) => {
    const bookingData = {
      movieId: parseInt(movieId),
      seats: selectedSeats,
      user: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      },
      totalPrice: totalPrice
    };
    
    const success = BookingService.saveBooking(bookingData);
    
    if (success) {
      setBookedSeats([...bookedSeats, ...selectedSeats]);
      setSelectedSeats([]);
      setShowBookingForm(false);
      setNotification({
        type: 'success',
        message: 'Бронювання успішно завершено! Інформація про бронювання надіслана на вашу електронну пошту.'
      });
    } else {
      setNotification({
        type: 'error',
        message: 'На жаль, сталася помилка при бронюванні. Будь ласка, спробуйте ще раз.'
      });
    }
  };
  
  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className="cinema-hall">
      <h2>Виберіть місця</h2>
      
      {}
      {notification && (
        <Notification 
          type={notification.type} 
          message={notification.message} 
          onClose={handleCloseNotification} 
        />
      )}
      
      {}
      {showBookingForm ? (
        <BookingForm 
          selectedSeats={selectedSeats} 
          onSubmit={handleBookingSubmit} 
          onCancel={handleCancelBooking} 
        />
      ) : (
        <>
          <div className="screen-container">
            <div className="screen">ЕКРАН</div>
          </div>
          
          <div className="seats-legend">
            <div className="legend-item">
              <div className="seat"></div>
              <span>Вільне</span>
            </div>
            <div className="legend-item">
              <div className="seat selected"></div>
              <span>Вибране</span>
            </div>
            <div className="legend-item">
              <div className="seat booked"></div>
              <span>Заброньоване</span>
            </div>
          </div>
          
          <div className="seats-container">
            {Array.from({ length: rows }, (_, rowIndex) => (
              <div key={rowIndex} className="seat-row">
                <div className="row-number">{rowIndex + 1}</div>
                {Array.from({ length: seatsPerRow }, (_, seatIndex) => (
                  <div
                    key={seatIndex}
                    className={getSeatClass(rowIndex + 1, seatIndex + 1)}
                    onClick={() => handleSeatClick(rowIndex + 1, seatIndex + 1)}
                  >
                    {seatIndex + 1}
                  </div>
                ))}
                <div className="row-number">{rowIndex + 1}</div>
              </div>
            ))}
          </div>
          
          <div className="selection-info">
            <div className="selected-seats">
              <h3>Вибрані місця:</h3>
              <p>{formatSelectedSeats()}</p>
            </div>
            
            <div className="total-price">
              <h3>Загальна вартість:</h3>
              <p>{totalPrice} грн</p>
            </div>
            
            {selectedSeats.length > 0 && (
              <button 
                className="book-button"
                onClick={handleBookButtonClick}
              >
                Забронювати квитки
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CinemaHall;  