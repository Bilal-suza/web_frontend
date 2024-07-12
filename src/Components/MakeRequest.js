import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MakeRequest.css';

const MakeRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    studentNames: '',
    studentEmail: '',
    requestDate: '',
    requestTime: '',
    purpose: '',
    staffEmail: id || 'Staff Email',
    status: 'Pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/requests', request);
      navigate('/view-requests');
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <div className="request-form-container">
      <h2>Make Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="studentNames">Full Name</label>
            <input
              type="text"
              id="studentNames"
              name="studentNames"
              placeholder="Full Name"
              value={request.studentNames}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentEmail">Your Email</label>
            <input
              type="email"
              id="studentEmail"
              name="studentEmail"
              placeholder="Your Email"
              value={request.studentEmail}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="requestDate">Request Date</label>
            <input
              type="date"
              id="requestDate"
              name="requestDate"
              value={request.requestDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="requestTime">Request Time</label>
            <input
              type="time"
              id="requestTime"
              name="requestTime"
              value={request.requestTime}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="purpose">Request Purpose</label>
          <textarea
            id="purpose"
            name="purpose"
            placeholder="Request Purpose"
            value={request.purpose}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="button">
          <button type="button" className="back" onClick={() => navigate(`/staff/${id}`)}>
            Back to Staff
          </button>
          <button type="submit" className="send">
            Send Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeRequest;
