import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import './styles/register.css';

/**
 * Komponen utama App untuk routing halaman
 * Mengatur rute aplikasi antara halaman Register dan Login
 */
function App() {
  return (
    <Routes>
      {/* Rute default dialihkan ke /register */}
      <Route path="/" element={<Navigate to="/register" replace />} />

      {/* Halaman registrasi utama */}
      <Route path="/register" element={<Register />} />

      {/* Halaman login setelah redirect */}
      <Route path="/login" element={<Login />} />

      {/* Rute fallback untuk URL yang tidak dikenali */}
      <Route path="*" element={<Navigate to="/register" replace />} />
    </Routes>
  );
}

export default App;
