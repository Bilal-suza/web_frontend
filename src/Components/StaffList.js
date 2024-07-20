import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './StaffList.css';

const StaffList = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('position');

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/staff');
        if (Array.isArray(response.data)) {
          setStaffMembers(response.data);
        } else {
          console.error('Invalid data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching staff members:', error);
      }
    };
    fetchStaffMembers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortKey(event.target.value);
  };

  const sortedStaffMembers = staffMembers
    .filter((staff) => 
      staff.fullName && staff.position && 
      (staff.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1;
      if (a[sortKey] > b[sortKey]) return 1;
      return 0;
    });

  return (
    <div className="staff-list-container">
      <div className="staff-list-header">
        <input
        className='search'
          type="text"
          placeholder="Search staff..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select className='select' value={sortKey} onChange={handleSortChange}>
          <option value="position">Sort by Role</option>
          <option value="fullName">Sort by Name</option>
        </select>
      </div>
      <ul className="staff-list">
        {sortedStaffMembers.map((staff) => (
          <li key={staff.id}>
            <Link to={`/staff/${staff.id}`}>{staff.fullName} - {staff.position}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffList;
