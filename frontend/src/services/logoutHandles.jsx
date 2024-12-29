// LogoutHandler.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUserDetails } from '../actions/userActions';
import { logoutUser } from './authServices';

const LogoutHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    logoutUser();
    navigate('/');
    dispatch(clearUserDetails());
  }, [dispatch, navigate]);

  return null; 
};

export default LogoutHandler;
