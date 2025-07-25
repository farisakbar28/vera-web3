import React from 'react';
// 1. Impor semua komponen yang dibutuhkan dari react-router-dom
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// 2. Impor semua halaman yang sudah Anda buat
import RecipientApplicationPage from './pages/RecipientApplicationPage';
import RecipientDashboard from './pages/RecipientDashboard';
import PublicTransparencyPage from './pages/PublicTransparencyPage';

// Komponen Navigasi Sederhana untuk berpindah halaman
const Navigation = () => (
  <nav style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    gap: '1.5rem', 
    padding: '1rem', 
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
    borderRadius: '8px'
  }}>
    <Link to="/recipient/apply" style={{textDecoration: 'none', color: '#007bff', fontWeight: '500'}}>Formulir</Link>
    <Link to="/recipient/dashboard" style={{textDecoration: 'none', color: '#007bff', fontWeight: '500'}}>Dashboard</Link>
    <Link to="/transparency" style={{textDecoration: 'none', color: '#007bff', fontWeight: '500'}}>Transparansi</Link>
  </nav>
);

function App() {
  return (
    <Router>
      {/* Tambahkan navigasi di atas semua halaman */}
      <Navigation />

      <Routes>
        {/* Atur halaman default ke dashboard untuk saat ini */}
        <Route path="/" element={<Navigate to="/recipient/dashboard" />} />

        {/* Route untuk Formulir Pengajuan */}
        <Route path="/recipient/apply" element={<RecipientApplicationPage />} />

        {/* Route untuk Dashboard Penerima */}
        <Route path="/recipient/dashboard" element={<RecipientDashboard />} />

        {/* Route untuk Halaman Transparansi Publik */}
        <Route path="/transparency" element={<PublicTransparencyPage />} />
      </Routes>
    </Router>
  );
}

export default App;