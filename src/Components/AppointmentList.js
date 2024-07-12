import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentList.css';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: '',
    time: '',
    fullName: '',
  });

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
      }
    };
    fetchAppointments();
  }, []);

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setAppointmentDetails({
      date: appointment.appointmentDate,
      time: appointment.appointmentTime,
      fullName: appointment.studentNames,
    });
  };

  const handleCancel = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/appointments/${appointmentId}`);
      setAppointments((prevAppointments) => prevAppointments.filter((app) => app.id !== appointmentId));
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/appointments/${selectedAppointment.id}`, {
        ...selectedAppointment,
        appointmentDate: appointmentDetails.date,
        appointmentTime: appointmentDetails.time,
      });

      setAppointments((prevAppointments) =>
        prevAppointments.map((app) =>
          app.id === selectedAppointment.id
            ? { ...app, appointmentDate: appointmentDetails.date, appointmentTime: appointmentDetails.time }
            : app
        )
      );
      setSelectedAppointment(null);
      setAppointmentDetails({
        date: '',
        time: '',
        fullName: '',
      });
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  const handleCancelAction = () => {
    setSelectedAppointment(null);
    setAppointmentDetails({
      date: '',
      time: '',
      fullName: '',
    });
  };

  return (
    <div className="appointment-list-container">
      <h2>Approved Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Full Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.studentEmail}</td>
              <td>{appointment.studentNames}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.appointmentTime}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(appointment)}>
                  Edit
                </button>
                <button className="cancel-button" onClick={() => handleCancel(appointment.id)}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAppointment && (
        <div className="appointment-form-container">
          <h3>Edit Appointment for {selectedAppointment.studentNames}</h3>
          <div className="form-group">
            <label htmlFor="appointmentDate">Date</label>
            <input
              type="date"
              id="appointmentDate"
              value={appointmentDetails.date}
              onChange={(e) => setAppointmentDetails({ ...appointmentDetails, date: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="appointmentTime">Time</label>
            <input
              type="time"
              id="appointmentTime"
              value={appointmentDetails.time}
              onChange={(e) => setAppointmentDetails({ ...appointmentDetails, time: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="appointmentFullName">Full Name</label>
            <input
              type="text"
              id="appointmentFullName"
              placeholder="Enter full name"
              value={appointmentDetails.fullName}
              onChange={(e) => setAppointmentDetails({ ...appointmentDetails, fullName: e.target.value })}
              disabled // Disable editing of full name
            />
          </div>
          <div className="appointment-form-buttons">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-action-button" onClick={handleCancelAction}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
