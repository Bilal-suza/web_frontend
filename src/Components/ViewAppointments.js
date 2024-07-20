import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAppointments.css';

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/appointments');
        
        if (Array.isArray(response.data)) {
          setAppointments(response.data);
        } else {
          console.error('Expected array from API, received:', response.data);
          setAppointments([]); 
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setAppointments([]); 
      }
    };
    fetchAppointments();
  }, []); 

  return (
    <div className="appointment-list-container">
      <h2>Approved Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Staff Email</th>
            <th>Staff Names</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.staffEmail}</td>
              <td>{appointment.staffNames}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.appointmentTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAppointments;
