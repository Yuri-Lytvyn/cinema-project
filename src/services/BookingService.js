class BookingService {
  static getAllBookings() {
    const bookings = localStorage.getItem('bookings');
    return bookings ? JSON.parse(bookings) : [];
  }

  static getBookingsByMovieId(movieId) {
    const bookings = this.getAllBookings();
    return bookings.filter(booking => booking.movieId === movieId);
  }

  static getBookedSeatsByMovieId(movieId) {
    const bookings = this.getBookingsByMovieId(movieId);
    let bookedSeats = [];
     
    bookings.forEach(booking => {
      bookedSeats = [...bookedSeats, ...booking.seats];
    });
    
    return bookedSeats;
  }

  static saveBooking(bookingData) {
    try {
      const bookings = this.getAllBookings();
      
      const newBooking = {
        ...bookingData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('bookings', JSON.stringify([...bookings, newBooking]));
      
      return true;
    } catch (error) {
      console.error('Помилка при збереженні бронювання:', error);
      return false;
    }
  }

  static areSeatsAvailable(movieId, seats) {
    const bookedSeats = this.getBookedSeatsByMovieId(movieId);
    
    return !seats.some(seat => bookedSeats.includes(seat));
  }
}

export default BookingService;