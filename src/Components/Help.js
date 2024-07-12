import React from 'react';
import './Help.css';
import { faBuilding,   faEnvelope,   faLocationDot, faPhone} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Help = () => {
  return (
    <div className="contact-info-container">
      <h2>How can we help you?</h2>
      <p>
        We can help you by contact with us through different way, Also you can give help and support in physical way if you attend in our
        office or stations. 
      </p>
      <div className="contact-cards1">
        <div className="contact-card">
          <FontAwesomeIcon icon={faLocationDot} className="icon" />
          <h3>OUR MAIN OFFICE</h3>
          <p>Mazizini, Sheria House Unguja (Zanzibar) </p>
        </div>
        <div className="contact-card">
          <FontAwesomeIcon icon={faPhone} className="icon" />
          <h3>PHONE NUMBER</h3>
          <p>+255-774-216-585<br/>+255-627-990-921</p>
        </div>
      </div>
      <div className="contact-cards2">
        <div className="contact-card">
          <FontAwesomeIcon icon={faBuilding} className="icon" />
          <h3>OUR STATIONS</h3>
          <p>Michenzani Mall</p>
          <p>Tunguu</p>
        </div>
        <div className="contact-card">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <h3>EMAIL</h3>
          <p>megaminddevelopers<br/>@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
