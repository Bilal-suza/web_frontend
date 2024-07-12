import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IncomingRequests.css';

const IncomingRequests = () => {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requestDetails, setRequestDetails] = useState({
    date: '',
    time: '',
  });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/requests');
        if (Array.isArray(response.data)) {
          setIncomingRequests(response.data);
        } else {
          console.error('Expected array from API, received:', response.data);
          setIncomingRequests([]);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleApprove = (request) => {
    setSelectedRequest({ ...request, action: 'approve' });
    setRequestDetails({ date: request.requestDate, time: request.requestTime });
  };

  const handleDeny = async (request) => {
    try {
      await axios.put(`http://localhost:8080/api/requests/${request.id}`, { ...request, status: 'Denied' });
      setIncomingRequests((prevRequests) => prevRequests.filter((req) => req.id !== request.id));
    } catch (error) {
      console.error('Error denying request:', error);
    }
  };

  const handleSendApproval = async () => {
    try {
      await axios.put(`http://localhost:8080/api/requests/${selectedRequest.id}`, {
        ...selectedRequest,
        status: 'Approved',
        requestDate: requestDetails.date,
        requestTime: requestDetails.time,
      });

      await axios.post('http://localhost:8080/api/appointments', {
        studentEmail: selectedRequest.studentEmail,
        studentNames: selectedRequest.studentNames,
        appointmentDate: requestDetails.date,
        appointmentTime: requestDetails.time,
        status: 'Approved',
      });

      setIncomingRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === selectedRequest.id
            ? { ...req, status: 'Approved', requestDate: requestDetails.date, requestTime: requestDetails.time }
            : req
        )
      );
      setSelectedRequest(null);
      setRequestDetails({ date: '', time: '' });
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleCancelAction = () => {
    setSelectedRequest(null);
    setRequestDetails({ date: '', time: '' });
  };

  return (
    <div className="appointments-container">
      <h2>Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Full Name</th>
            <th>Request Date</th>
            <th>Request Time</th>
            <th>Purpose</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {incomingRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.studentEmail}</td>
              <td>{request.studentNames}</td>
              <td>{request.requestDate}</td>
              <td>{request.requestTime}</td>
              <td>{request.purpose}</td>
              <td>
                <button className="approve-button" onClick={() => handleApprove(request)} disabled={request.status !== 'Pending'}>
                  Approve
                </button>
                <button className="deny-button" onClick={() => handleDeny(request)} disabled={request.status !== 'Pending'}>
                  Deny
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRequest && selectedRequest.action === 'approve' && (
        <div className="approval-form-container">
          <div className="approval-form-content">
            <h3>Approve Appointment for {selectedRequest.studentNames}</h3>
            <div className="form-group">
              <label htmlFor="studentEmail">Student Email</label>
              <input
                type="email"
                id="studentEmail"
                value={selectedRequest.studentEmail}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="studentNames">Full Name</label>
              <input
                type="text"
                id="studentNames"
                value={selectedRequest.studentNames}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="purpose">Request Purpose</label>
              <textarea
                id="purpose"
                value={selectedRequest.purpose}
                readOnly
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="requestDate">Date</label>
              <input
                type="date"
                id="requestDate"
                value={requestDetails.date}
                onChange={(e) => setRequestDetails({ ...requestDetails, date: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="requestTime">Time</label>
              <input
                type="time"
                id="requestTime"
                value={requestDetails.time}
                onChange={(e) => setRequestDetails({ ...requestDetails, time: e.target.value })}
              />
            </div>
          
            <div className="approval-form-buttons">
              <button className="send-approval-button" onClick={handleSendApproval}>
                Approve Request
              </button>
              <button className="cancel-action-button" onClick={handleCancelAction}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomingRequests;
