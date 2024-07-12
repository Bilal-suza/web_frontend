import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StaffProfile.css';

const StaffProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/staff/${id}`);
        setStaff(response.data);
      } catch (error) {
        console.error('There was an error fetching the staff details!', error);
      }
    };
    fetchStaffDetails();
  }, [id]);

  if (!staff) {
    return <div>Loading...</div>;
  }

  return (
    <div className="staff-profile-container">
      <div className="staff-profile-header">
        
        <h2>{staff.fullName}</h2>
      </div>
      <table className="staff-profile-table">
        <tbody>
          <tr>
            <td><strong>Position:</strong></td>
            <td>{staff.position}</td>
          </tr>
          <tr>
            <td><strong>Department:</strong></td>
            <td>{staff.departmentName}</td>
          </tr>
          <tr>
            <td><strong>Contact:</strong></td>
            <td>{staff.staffEmail}</td>
          </tr>
          <tr>
            <td><strong>Office Location:</strong></td>
            <td>{staff.officeLocation}</td>
          </tr>
          <tr>
            <td><strong>Office Hours:</strong></td>
            <td>{staff.officeHours}</td>
          </tr>
          <tr>
            <td><strong>Office Address:</strong></td>
            <td>{staff.officeAddress}</td>
          </tr>
        </tbody>
      </table>
      <div className="staff-profile-buttons">
        <button className="back-button" onClick={() => navigate('/staff')}>
          Back to Staff List
        </button>
        <button>
          <Link to={`/make-appointment/${staff.id}`} className="appointment-button">
            Make Request
          </Link>
        </button>
      </div>
    </div>
  );
};

export default StaffProfile;
