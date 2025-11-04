import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';


import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get('/api/current_user');
        setAuth(res.data || false);
      } catch (err) {
        setAuth(false);
      }
    }
    checkAuth();
  }, []);

  if (auth === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={!auth ? <LoginPage /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/dashboard"
        element={auth ? <DashboardPage user={auth} /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;