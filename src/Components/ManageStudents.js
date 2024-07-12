import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageStudents.css';

const ManageStudent = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({ email: '', name: '', gender: '', phone: '', address: '' });
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/students');
      if (Array.isArray(response.data)) {
        setStudents(response.data);
      } else {
        console.error('Expected array from API, received:', response.data);
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/students/${studentId}`);
      setStudents(students.filter((student) => student.id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleUpdate = (student) => {
    setSelectedStudent(student);
  };

  const handleSaveUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/students/${selectedStudent.id}`, selectedStudent);
      setStudents(students.map((student) => (student.id === selectedStudent.id ? selectedStudent : student)));
      setSelectedStudent(null);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleAddStudent = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/students', newStudent);
      setStudents([...students, response.data]);
      setNewStudent({ email: '', name: '', gender: '', phone: '', address: '' });
      setIsAddFormOpen(false);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div className="manage-student-container">
      <h2>Manage Students</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Student Name</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.studentEmail}</td>
              <td>{student.studentNames}</td>
              <td>{student.gender}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.address}</td>
              <td>
                <button className="update-button" onClick={() => handleUpdate(student)}>Update</button>
                <button className="delete-button" onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <div className="update-form-container">
          <h3>Update Student</h3>
          <input
            type="email"
            placeholder="Email"
            value={selectedStudent.studentEmail}
            onChange={(e) => setSelectedStudent({ ...selectedStudent, studentEmail: e.target.value })}
          />
          <input
            type="text"
            placeholder="Student Name"
            value={selectedStudent.studentNames}
            onChange={(e) => setSelectedStudent({ ...selectedStudent, studentNames: e.target.value })}
          />
          <input
            type="text"
            placeholder="Gender"
            value={selectedStudent.gender}
            onChange={(e) => setSelectedStudent({ ...selectedStudent, gender: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={selectedStudent.phoneNumber}
            onChange={(e) => setSelectedStudent({ ...selectedStudent, phoneNumber: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            value={selectedStudent.address}
            onChange={(e) => setSelectedStudent({ ...selectedStudent, address: e.target.value })}
          />
          <div className="form-buttons">
            <button className="save-button" onClick={handleSaveUpdate}>Save</button>
            <button className="cancel-button" onClick={() => setSelectedStudent(null)}>Cancel</button>
          </div>
        </div>
      )}

      <button className="open-add-form-button" onClick={() => setIsAddFormOpen(true)}>Add Student</button>

      {isAddFormOpen && (
        <div className="add-form-container">
          <h3>Add New Student</h3>
          <input
            type="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Student Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Gender"
            value={newStudent.gender}
            onChange={(e) => setNewStudent({ ...newStudent, gender: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={newStudent.phone}
            onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            value={newStudent.address}
            onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
          />
          <div className="form-buttons">
            <button className="add-button" onClick={handleAddStudent}>Add Student</button>
            <button className="cancel-button" onClick={() => setIsAddFormOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudent;
