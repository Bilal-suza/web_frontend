import React from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock ,faMars, faPhone, faLocation} from '@fortawesome/free-solid-svg-icons';

function RegistrationForm() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Add registration logic here (e.g., form validation, API call to register user)

    // After successful registration, navigate to the login page
    navigate('/');
  };

  return (
    <div className="registration-form-container">
      <form className="registration-form" onSubmit={handleRegister}>
        <p className="heading">Register</p>
        <div className="input-with-icon">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input type="text" placeholder="Full Name" className="inputField" />
        </div>
        <div className="input-with-icon">
          <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
          <input type="email" placeholder="Email" className="inputField" />
        </div>
        <div className="input-with-icon">
          <FontAwesomeIcon icon={faPhone} className="input-icon" />
          <input type="text" placeholder="Phone Number" className="inputField" />
        </div>
        <div className="input-with-icon">
          <FontAwesomeIcon icon={faMars} className="input-icon" />
          <input type="text" placeholder="Gender" className="inputField" />
        </div>
        <div className="input-with-icon">
          <FontAwesomeIcon icon={faLocation} className="input-icon" />
          <input type="text" placeholder="Address" className="inputField" />
        </div>
        <div className="input-with-icon">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input type="password" placeholder="Password" className="inputField" />
        </div>
        
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
