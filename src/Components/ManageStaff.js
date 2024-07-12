import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageStaff.css';

const ManageStaff = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [newStaff, setNewStaff] = useState({ fullName: '', position: '', departmentName: '', staffEmail: '', officeLocation: '', officeHours: '', officeAddress: '' });
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/staff');
      if (Array.isArray(response.data)) {
        setStaffMembers(response.data);
      } else {
        console.error('Expected array from API, received:', response.data);
        setStaffMembers([]);
      }
    } catch (error) {
      console.error('Error fetching staff members:', error);
    }
  };

  const handleDelete = async (staffId) => {
    try {
      await axios.delete(`http://localhost:8080/api/staff/${staffId}`);
      setStaffMembers(staffMembers.filter((staff) => staff.id !== staffId));
    } catch (error) {
      console.error('Error deleting staff member:', error);
    }
  };

  const handleUpdate = (staff) => {
    setSelectedStaff(staff);
  };

  const handleSaveUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/staff/${selectedStaff.id}`, selectedStaff);
      setStaffMembers(staffMembers.map((staff) => (staff.id === selectedStaff.id ? response.data : staff)));
      setSelectedStaff(null);
    } catch (error) {
      console.error('Error updating staff member:', error);
    }
  };

  const handleAddStaff = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/staff', newStaff);
      setStaffMembers([...staffMembers, response.data]);
      setNewStaff({ fullName: '', position: '', departmentName: '', staffEmail: '', officeLocation: '', officeHours: '', officeAddress: '' });
      setIsAddFormOpen(false);
    } catch (error) {
      console.error('Error adding new staff member:', error);
    }
  };

  return (
    <div className="manage-staff-container">
      <h2>Manage Staff</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Contact</th>
            <th>Office Location</th>
            <th>Office Hours</th>
            <th>Office Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staffMembers.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.fullName}</td>
              <td>{staff.position}</td>
              <td>{staff.departmentName}</td>
              <td>{staff.staffEmail}</td>
              <td>{staff.officeLocation}</td>
              <td>{staff.officeHours}</td>
              <td>{staff.officeAddress}</td>
              <td>
                <button className="update-button" onClick={() => handleUpdate(staff)}>Update</button>
                <button className="delete-button" onClick={() => handleDelete(staff.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStaff && (
        <div className="update-form-container">
          <h3>Update Staff</h3>
          <input
            type="text"
            placeholder="Full Name"
            value={selectedStaff.fullName}
            onChange={(e) => setSelectedStaff({ ...selectedStaff, fullName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Position"
            value={selectedStaff.position}
            onChange={(e) => setSelectedStaff({ ...selectedStaff, position: e.target.value })}
          />
          <input
            type="text"
            placeholder="Department"
            value={selectedStaff.departmentName}
            onChange={(e) => setSelectedStaff({ ...selectedStaff, departmentName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contact"
            value={selectedStaff.staffEmail}
            onChange={(e) => setSelectedStaff({ ...selectedStaff, staffEmail: e.target.value })}
          />
          <input
            type="text"
            placeholder="Office Location"
            value={selectedStaff.officeLocation}
            onChange={(e) => setSelectedStaff({ ...selectedStaff, officeLocation: e.target.value })}
          />
          <input
            type="text"
            placeholder="Office Hours"
            value={selectedStaff.officeHours}
            onChange={(e) => setSelectedStaff({ ...selectedStaff, officeHours: e.target.value })}
          />
          <input
            type="text"
            placeholder="Office Address"
            value={selectedStaff.officeAddress}
            onChange={(e) => setSelectedStaff({ ...selectedStaff, officeAddress: e.target.value })}
          />
          <div className="form-buttons">
            <button className="save-button" onClick={handleSaveUpdate}>Save</button>
            <button className="cancel-button" onClick={() => setSelectedStaff(null)}>Cancel</button>
          </div>
        </div>
      )}

      <button className="open-add-form-button" onClick={() => setIsAddFormOpen(true)}>Add Staff</button>

      {isAddFormOpen && (
        <div className="add-form-container">
          <h3>Add New Staff</h3>
          <input
            type="text"
            placeholder="Full Name"
            value={newStaff.fullName}
            onChange={(e) => setNewStaff({ ...newStaff, fullName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Position"
            value={newStaff.position}
            onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })}
          />
          <input
            type="text"
            placeholder="Department"
            value={newStaff.departmentName}
            onChange={(e) => setNewStaff({ ...newStaff, departmentName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contact"
            value={newStaff.staffEmail}
            onChange={(e) => setNewStaff({ ...newStaff, staffEmail: e.target.value })}
          />
          <input
            type="text"
            placeholder="Office Location"
            value={newStaff.officeLocation}
            onChange={(e) => setNewStaff({ ...newStaff, officeLocation: e.target.value })}
          />
          <input
            type="text"
            placeholder="Office Hours"
            value={newStaff.officeHours}
            onChange={(e) => setNewStaff({ ...newStaff, officeHours: e.target.value })}
          />
          <input
            type="text"
            placeholder="Office Address"
            value={newStaff.officeAddress}
            onChange={(e) => setNewStaff({ ...newStaff, officeAddress: e.target.value })}
          />
          <div className="form-buttons">
            <button className="add-button" onClick={handleAddStaff}>Add Staff</button>
            <button className="cancel-button" onClick={() => setIsAddFormOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStaff;
