import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import EditProfileModal from './EditProfile';
import StaffOfficial from '../Assets/Images/StaffOfficial.jpg';
import './Header.css';
import ChangePassword from './Changepassword';

const Header = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
 
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };


  const handleSignOut = () => {
    
    console.log('Sign out');
  };

  const openEditProfileModal = (e) => {
    e.preventDefault();
    setEditProfileModalOpen(true);
    setProfileMenuOpen(false);
  };

  const closeEditProfileModal = () => {
    setEditProfileModalOpen(false);
  };

  const openChangePasswordModal = (e) => {
    e.preventDefault();
    setChangePasswordModalOpen(true);
    setProfileMenuOpen(false);
  };

  const closeChangePasswordModal = () => {
    setChangePasswordModalOpen(false);
  };

  return (
    <div className="header">
      <div className="header-left">
        <img src={StaffOfficial} alt="Staff Photo" className="logo" />
      </div>
      <div className="header-center">
        <h1>STAFF LOCATE MANAGEMENT SYSTEM</h1>
      </div>
      <div className="header-right">
       
        <div className="profile-icon" onClick={toggleProfileMenu}>
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
        </div>
        {profileMenuOpen && (
          <div className="profile-menu">
            <div className="profile-menu-header">
              <button className="close-button" onClick={toggleProfileMenu}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <a href="#edit-profile" onClick={openEditProfileModal}>
              <FontAwesomeIcon icon={faUserCircle} className="profile-menu-icon" /> Edit Profile
            </a>
            <a href="#settings" onClick={openChangePasswordModal}>
              <FontAwesomeIcon icon={faCog} className="profile-menu-icon" /> Settings
            </a>
            <a href="/" onClick={handleSignOut}>
              <FontAwesomeIcon icon={faSignOutAlt} className="profile-menu-icon" /> Sign Out
            </a>
          </div>
        )}
      </div>
      <EditProfileModal isOpen={editProfileModalOpen} onClose={closeEditProfileModal} />
      <ChangePassword isOpen={changePasswordModalOpen} onClose={closeChangePasswordModal} />
    </div>
  );
};

export default Header;
