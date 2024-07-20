import React from 'react'
import './dashboard.css' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCalendarPlus, faPaperPlane, faUserGraduate, faUsers } from '@fortawesome/free-solid-svg-icons';

function AdminDashboard() {
  return (
    <div className="dashboard">
      <div className="box" style={{ marginLeft: '50px' }}><h1 >
        Staff</h1>
        <FontAwesomeIcon icon={faUsers} className="icon-dashboard" />
        <p>72</p></div>
      <div className="box">
        <h1 >
        Students</h1>
        <FontAwesomeIcon icon={faUserGraduate} className="icon-dashboard" />
        <p>163</p>
         </div>
      <div className="box"><h1 >
        Requests</h1>
        <FontAwesomeIcon icon={faPaperPlane} className="icon-dashboard" />
        <p>24</p></div>
      <div className="box"><h1 >
        Appointments</h1>
        <FontAwesomeIcon icon={faCalendarPlus} className="icon-dashboard" />
        <p>23</p></div>
    </div>
  )
}
export default AdminDashboard
