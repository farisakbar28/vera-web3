import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import RecipientApplicationPage from './pages/RecipientApplicationPage';
import RecipientDashboard from './pages/RecipientDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root ke form aplikasi */}
        <Route path="/" element={<Navigate to="/recipient/apply" />} />

        {/* Formulir Pengajuan */}
        <Route path="/recipient/apply" element={<RecipientApplicationPage />} />

        {/* Dashboard Penerima */}
        <Route path="/recipient/dashboard" element={<RecipientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;