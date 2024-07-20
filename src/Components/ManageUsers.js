import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageStudents.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ email: '', password: '', role: '' });
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/login');
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error('Expected array from API, received:', response.data);
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/login/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
  };

  const handleSaveUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/login/${selectedUser.id}`, selectedUser);
      setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)));
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', newUser);
      setUsers([...users, response.data]);
      setNewUser({ email: '', password: '', role: '' });
      setIsAddFormOpen(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="manage-student-container">
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Password</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
             
              <td>
                <button className="update-button" onClick={() => handleUpdate(user)}>Update</button>
                <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="update-form-container">
          <h3>Update User</h3>
          <input
            type="email"
            placeholder="User Name"
            value={selectedUser.email}
            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Password"
            value={selectedUser.password}
            onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            value={selectedUser.role}
            onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
          />
         
          <div className="form-buttons">
            <button className="save-button" onClick={handleSaveUpdate}>Save</button>
            <button className="cancel-button" onClick={() => setSelectedUser(null)}>Cancel</button>
          </div>
        </div>
      )}

      <button className="open-add-form-button" onClick={() => setIsAddFormOpen(true)}>Add User</button>

      {isAddFormOpen && (
        <div className="add-form-container">
          <h3>Add New User</h3>
          <input
            type="email"
            placeholder="User Name"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          />
         
          <div className="form-buttons">
            <button className="add-button" onClick={handleAddUser}>Add User</button>
            <button className="cancel-button" onClick={() => setIsAddFormOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
