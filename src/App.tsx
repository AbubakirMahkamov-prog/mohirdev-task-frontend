import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';

function App() {
  // Equivalent to data() in Vue, manages local component state
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Function to handle login, updates the state
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {/* Similar to Vue's <router-view>, but defines all routes here */}
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        {/* Protected routes */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/about" element={isAuthenticated ? <About /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
