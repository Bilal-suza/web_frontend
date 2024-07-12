import React from 'react';
import './register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';



function ForgetPassword() {
  return (
    <div className="registration-form-container">
      
    <form className="registration-form">
      <p className="heading">New password</p>
      
      <div className="input-with-icon">
      <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
        <input type="email"placeholder="Email" className="inputField"/>
      </div>
     
      <div className="input-with-icon">
        <FontAwesomeIcon icon={faLock} className="input-icon" />
        <input type="password"placeholder="New Password" className="inputField"/>
      </div>
      <div className="input-with-icon">
        <FontAwesomeIcon icon={faLock} className="input-icon" />
        <input type="password"placeholder="Confirm Password" className="inputField"/>
      </div>
     
      <button type="submit" className="register-button">
        Update Password
      </button>
    </form>
  </div>
  )
}

export default ForgetPassword