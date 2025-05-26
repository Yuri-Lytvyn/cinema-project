import React, { useState } from 'react';
import '../styles/BookingForm.css';

const BookingForm = ({ selectedSeats, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '', 
    email: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', phone: '', email: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Ім\'я є обов\'язковим полем';
      valid = false;
    }

    const phoneRegex = /^\+?\d{10,13}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон є обов\'язковим полем';
      valid = false;
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Введіть коректний номер телефону (10-13 цифр)';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email є обов\'язковим полем';
      valid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Введіть коректний email';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        seats: selectedSeats
      });
    }
  };

  return (
    <div className="booking-form-container">
      <h2 className="form-title">Інформація для бронювання</h2>
      
      <div className="selected-seats-info">
        <p>Вибрані місця:</p>
        <ul className="seats-list">
          {selectedSeats.map(seatId => {
            const [row, seat] = seatId.split('-');
            return (
              <li key={seatId}>Ряд {row}, Місце {seat}</li>
            );
          })}
        </ul>
      </div>
      
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="name">Ім'я</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Телефон</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+380XXXXXXXXX"
            className={errors.phone ? 'input-error' : ''}
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Скасувати
          </button>
          <button type="submit" className="submit-button">
            Підтвердити бронювання
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;