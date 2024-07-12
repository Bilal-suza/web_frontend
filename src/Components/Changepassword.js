import React, { useState } from 'react';
import './Changepassword.css';

const ChangePassword = ({ isOpen, onClose }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    // Add logic to handle password change
    console.log('New Password:', newPassword);
    console.log('Confirm New Password:', confirmNewPassword);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" />
      <div className="change-password-modal">
        <h2>Change Password</h2>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
