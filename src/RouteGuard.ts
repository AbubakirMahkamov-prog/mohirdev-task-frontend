import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RouteGuard = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token);
  }, []);

  useEffect(() => {
    if (!isAuth && location.pathname !== '/login') {
      // Redirect to login page if not authenticated
      navigate('/login', { replace: true });
    }
  }, [isAuth, location, navigate]);

  return isAuth || location.pathname === '/login' ? children : null;
};

export default RouteGuard;
