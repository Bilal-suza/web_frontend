import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './Pages/signup';
import RegistrationForm from './Pages/register';
import MainDashboard from './Pages/dashboard';
import ForgetPassword from './Pages/forgetpassword';
import Sidenav from './Components/Sidenav';
import Header from './Components/Header';
import StaffList from './Components/StaffList';
import StaffProfile from './Components/StaffProfile';
import MakeRequest from './Components/MakeRequest';
import Help from './Components/Help';
import ViewRequests from './Components/ViewRequests';
import AdminSidenav from './Components/AdminSidnav';
import AdminDashboard from './Pages/AdminDashboard';
import StaffDashboard from './Pages/StaffDashboard';
import StaffSidenav from './Components/StaffSidenav';
import IncomingRequests from './Components/IncomingRequests';
import AppointmentList from './Components/AppointmentList';
import ManageStaff from './Components/ManageStaff';
import ManageStudent from './Components/ManageStudents';
import ManageAppointments from './Components/ManageAppointments';
import ViewAppointments from './Components/ViewAppointments';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<FullDashboard />} />
        <Route path="/staff" element={<StaffListWithHeaderAndSidenav />} />
        <Route path="/staff/:id" element={<StaffProfileWithHeaderAndSidenav />} />
        <Route path="/make-appointment/:id?" element={<RequestWithHeaderAndSidenav />} />
        <Route path="/help" element={<HelpWithHeaderAndSidenav />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/view-requests" element={<ViewWithHeaderAndSidenav />} />
        <Route path="/AdminDashboard" element={<FullAdminDashboard />} />
        <Route path="/StaffDashboard" element={<FullStaffDashboard />} />
        <Route path="/incomingrequests" element={<StaffViewWithHeaderAndSidenav />} />
        <Route path="/appointmentslist" element={<StaffAppointmentList />} />
        <Route path="/helpstaff" element={<StaffHelp />} />
        <Route path="/managestaff" element={<FullManageStaff />} />
        <Route path="/managestudent" element={<FullManageStudents/>} />
        <Route path="/manageappointments" element={<FullManageAppointments/>} />
        <Route path="/adminhelp" element={<FullAdminHelp />} />
        <Route path="/view-appointments" element={<FullViewAppointments />} />
        

        

      </Routes>
    </Router>
  );
}

const FullDashboard = () => (
  <div className="app-container">
    <Header />
    <div className="main-content">
      <Sidenav />
      <MainDashboard />
    </div>
  </div>
);

const StaffListWithHeaderAndSidenav = () => (
  <div className="app-container">
    <Header />
    <div className="main-content">
      <Sidenav />
      <StaffList />
    </div>
  </div>
);

const StaffProfileWithHeaderAndSidenav = () => (
  <div className="app-container">
    <Header />
    <div className="main-content">
      <Sidenav />
      <StaffProfile />
    </div>
  </div>
);

const RequestWithHeaderAndSidenav = () => (
  <div className="app-container">
    <Header />
    <div className="main-content">
      <Sidenav />
      <MakeRequest />
    </div>
  </div>
);

const FullViewAppointments = () => (
  <div className="app-container">
    <Header />
    <div className="main-content">
      <Sidenav />
      <ViewAppointments />
    </div>
  </div>
);

const HelpWithHeaderAndSidenav = () => (
  <div className="app-container">
    <Header />
    <div className="main-content">
      <Sidenav />
      <Help />
    </div>
  </div>
);

const ViewWithHeaderAndSidenav = () => (
  <div className="app-container">
    <Header />
    <div className="main-content">
      <Sidenav />
      <ViewRequests />
    </div>
  </div>
);

const FullAdminDashboard = () => (
<div className="app-container">
    <Header/>
  <div className="main-content"> 
  <AdminSidenav/>
  <AdminDashboard/>
  </div>
 </div>

);

const FullStaffDashboard = () => (
  <div className="app-container">
      <Header/>
    <div className="main-content"> 
    <StaffSidenav/>
    <StaffDashboard/>
    </div>
   </div>
  
  );
  const StaffViewWithHeaderAndSidenav = () => (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <StaffSidenav />
        <IncomingRequests />
      </div>
    </div>
  );

  const StaffAppointmentList = () => (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <StaffSidenav />
        <AppointmentList />
      </div>
    </div>
  );

  const StaffHelp = () => (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <StaffSidenav />
        <Help />
      </div>
    </div>
  );

  const FullManageStaff = () => (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <AdminSidenav />
        <ManageStaff />
        
      </div>
    </div>
  );
  const FullManageStudents = () => (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <AdminSidenav />
        <ManageStudent/>
        
        
      </div>
    </div>
  );
  const FullManageAppointments = () => (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <AdminSidenav />
        <ManageAppointments/>
        
        
      </div>
    </div>
  );

  const FullAdminHelp = () => (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <AdminSidenav />
        <Help  />
        
      </div>
    </div>
  );

export default App;
