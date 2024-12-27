// LogoutHandler.jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserDetails } from '../actions/userActions'; // Assuming you have this action for Redux

const LogoutHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');

    // Clear user data from Redux (you can adjust this if you need to dispatch your action)
    dispatch(clearUserDetails());

    // Redirect to the Home page (or Login page)
    navigate('/'); // Or '/login' if you prefer
  }, [dispatch, navigate]);

  return null; // No UI needs to be rendered for this route
};

export default LogoutHandler;
