import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewRequests.css';

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/requests');
        
        if (Array.isArray(response.data)) {
          setRequests(response.data);
        } else {
          console.error('Expected array from API, received:', response.data);
          setRequests([]); 
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
        setRequests([]); 
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="requests-container">
      <h2>Your Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table className="requests-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index}>
                <td>{request.requestDate}</td>
                <td>{request.requestTime}</td>
                <td className={`status-${request.status.toLowerCase()}`}>
                  {request.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewRequests;
