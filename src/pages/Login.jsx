import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Alert from '../components/Alert';

/**
 * Halaman Login sederhana sebagai tujuan pengalihan (redirect)
 * setelah registrasi pengguna berhasil.
 */
const Login = () => {
  const location = useLocation();

  // Menerima data state dari redirect registrasi jika ada
  const registeredEmail = location.state?.registeredEmail || '';
  const initialSuccessMsg = location.state?.successMessage || '';

  const [formData, setFormData] = useState({
    identifier: registeredEmail,
    password: '',
  });

  const [alert, setAlert] = useState(
    initialSuccessMsg
      ? { type: 'success', message: initialSuccessMsg }
      : null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!formData.identifier || !formData.password) {
      setAlert({
        type: 'error',
        message: 'Silakan isi username/email dan password.',
      });
      return;
    }

    setAlert({
      type: 'info',
      message: 'Simulasi login berhasil! Fitur login siap dikembangkan lebih lanjut.',
    });
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <header className="auth-header">
          <span className="auth-badge">Selamat Datang</span>
          <h1 className="auth-title">Masuk ke Akun</h1>
          <p className="auth-subtitle">Masukkan kredensial Anda untuk melanjutkan</p>
        </header>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <form onSubmit={handleLoginSubmit} className="auth-form">
          <InputField
            id="identifier"
            name="identifier"
            label="Email atau Username"
            type="text"
            placeholder="Masukkan email atau username"
            value={formData.identifier}
            onChange={handleChange}
            required
            autoComplete="username"
          />

          <InputField
            id="loginPassword"
            name="password"
            label="Password"
            type="password"
            placeholder="Masukkan password Anda"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />

          <Button type="submit" variant="primary" fullWidth>
            Masuk
          </Button>
        </form>

        <footer className="auth-footer">
          <p>
            Belum punya akun?{' '}
            <Link to="/register" className="auth-link">
              Daftar di sini
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
