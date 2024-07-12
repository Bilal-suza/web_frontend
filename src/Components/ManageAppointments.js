import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageAppointments.css';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

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
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/appointments/${appointmentId}`);
      setAppointments(appointments.filter((appointment) => appointment.id !== appointmentId));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      const updatedAppointment = { status: 'Cancelled' };
      await axios.put(`http://localhost:8080/api/appointments/${appointmentId}`, updatedAppointment);
      setAppointments(appointments.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, status: 'Cancelled' } : appointment
      ));
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  return (
    <div className="manage-appointments-container">
      <h2>Manage Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student Email</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.studentNames}</td>
              <td>{appointment.studentEmail}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.appointmentTime}</td>
              <td>{appointment.status}</td>
              <td>
                <button className="cancel-button" onClick={() => handleCancel(appointment.id)}>Cancel</button>
                <button className="delete-button" onClick={() => handleDelete(appointment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAppointments;
