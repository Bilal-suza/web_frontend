import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faKey, faUsers, faAngleDown, faAngleRight, faCog, faSignOutAlt, faQuestionCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import './Sidenav.css';
import { Link } from 'react-router-dom';
import ChangePassword from './Changepassword'; 

const Sidenav = () => {
  const [isAdvancedOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false); 

 

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleSignOut = () => {
   
    console.log('Sign out');
  };

  const toggleChangePasswordModal = () => {
    setChangePasswordOpen(!changePasswordOpen);
  };

  return (
    <div className="sidenav">
      <Link to="/dashboard">
        <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
        <span>Dashboard</span>
      </Link>

      <Link to="/staff">
        <FontAwesomeIcon icon={faUsers} className="icon" />
        <span>Staff Members</span>
      </Link>

      <Link to="/view-requests">
        <FontAwesomeIcon icon={faEye} className="icon" />
        <span>View Requests</span>
      </Link>

      <Link to="/view-appointments">
        <FontAwesomeIcon icon={faEye} className="icon" />
         <span>View Appointments</span>
      </Link>

      {isAdvancedOpen && (
        <div className="submenu">
          {}
        </div>
      )}

      <Link to="/help">
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
          {}
        </div>
      )}

      <div className="menu-item sign-out" onClick={handleSignOut}>
        <Link to="/">
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
          <span>Sign Out</span>
        </Link>
      </div>

      {}
      {changePasswordOpen && <ChangePassword isOpen={changePasswordOpen} onClose={toggleChangePasswordModal} />}
    </div>
  );
};

export default Sidenav;
