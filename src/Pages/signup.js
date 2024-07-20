import React, { useState } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

const Signup = () => {
  const[username, setUserName] = useState('')
  const[password, setPassword] = useState('')

  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();   

    // const user = {username, password};
    

    navigate('/AdminDashboard');
  };

  return (
    <div className="signup-container">
      
      <form onSubmit={handleSubmit} className="form_main" action="">
        <p className="heading">Login</p>
        <div className="inputContainer">

          <FontAwesomeIcon icon={faUser} className='input-icon' />
          <input placeholder="Username" id="username" className="inputField" type="text"  required/>

        </div>
        
        <div className="inputContainer">
        
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input placeholder="Password" id="password" className="inputField" type="password"  required/>

        </div>
        <div className='forget-password'>

        
        <Link to="/forgetpassword"><p>Forget password?</p></Link>
        
        </div>
        
        
        <button id="button" type="submit">Login</button>
        
        <div className="signupContainer">
          <p>Don't have any account?</p>
          <Link to="/register">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;

