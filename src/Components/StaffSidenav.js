import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faKey, faAngleDown, faAngleRight, faCog, faSignOutAlt, faQuestionCircle, faEye, faListAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidenav.css';
import { Link } from 'react-router-dom';
import ChangePassword from './Changepassword'; // Adjust the path as per your project structure

const StaffSidenav = () => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false); // State for Change Password modal

  const toggleAdvanced = () => {
    setIsAdvancedOpen(!isAdvancedOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleSignOut = () => {
    // Handle sign out logic here, for example, clearing auth tokens, redirecting to login page, etc.
    console.log('Sign out');
  };

  const toggleChangePasswordModal = () => {
    setChangePasswordOpen(!changePasswordOpen);
  };

  return (
    <div className="sidenav">
      <Link to="/StaffDashboard">
        <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
        <span> Staff Dashboard</span>
      </Link>

      <Link to="/incomingrequests">
        <FontAwesomeIcon icon={faEye} className="icon" />
        <span>Incoming Requests</span>
      </Link>

      <Link to="/appointmentslist">
        <FontAwesomeIcon icon={faListAlt} className="icon" />
        <span>Appointments List</span>
      </Link>

      {isAdvancedOpen && (
        <div className="submenu">
          {/* Add links to appointment-related features here */}
        </div>
      )}

      <Link to="/helpstaff">
        <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
        <span>Help & Supports</span>
      </Link>

      <div className="menu-item" onClick={toggleSettings}>
        <FontAwesomeIcon icon={faCog} className="icon" />
        <span>Settings</span>
        {isSettingsOpen ? <FontAwesomeIcon icon={faAngleDown} className="icon-arrow-setting" /> : <FontAwesomeIcon icon={faAngleRight} className="icon-arrow-setting" />}
      </div>

      {isSettingsOpen && (
        <div className="submenu">
          <div className="submenu-item" onClick={toggleChangePasswordModal}>
            <FontAwesomeIcon icon={faKey} className="icon" />
            <span>Change Password</span>
          </div>
          {/* Add more settings links here */}
        </div>
      )}

      <div className="menu-item sign-out" onClick={handleSignOut}>
        <Link to="/">
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
          <span>Sign Out</span>
        </Link>
      </div>

      {/* Render ChangePassword modal if open */}
      {changePasswordOpen && <ChangePassword isOpen={changePasswordOpen} onClose={toggleChangePasswordModal} />}
    </div>
  );
};

export default StaffSidenav;
