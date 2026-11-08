import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { validateRegisterForm } from '../utils/validation';
import { registerUser } from '../services/authService';

/**
 * Halaman Registrasi Pengguna
 * Menangani form input pendaftaran, validasi client-side,
 * pengiriman data ke API menggunakan Axios, serta navigasi setelah registrasi berhasil.
 */
const Register = () => {
  const navigate = useNavigate();

  // 1. State controlled component untuk menampung seluruh nilai input form
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  // 2. State untuk menampung pesan error validasi per-field
  const [errors, setErrors] = useState({});

  // 3. State untuk status loading saat request API berjalan
  const [isLoading, setIsLoading] = useState(false);

  // 4. State untuk alert feedback (sukses / gagal)
  const [alert, setAlert] = useState(null);

  /**
   * Handler saat terjadi perubahan pada input field.
   * Mengupdate state formData sekaligus menghapus error pada field terkait jika pengguna mulai memperbaiki input.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Perbarui nilai field di state
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Hilangkan pesan error pada field yang sedang diketik jika sebelumnya ada error
    if (errors[name]) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  /**
   * Handler saat form di-submit
   */
  const handleSubmit = async (e) => {
    // Mencegah reload halaman bawaan browser
    e.preventDefault();

    // Reset alert sebelumnya
    setAlert(null);

    // Lakukan validasi form
    const validationErrors = validateRegisterForm(formData);

    // Jika terdapat error validasi, tampilkan pesan error dan hentikan proses
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setAlert({
        type: 'error',
        message: 'Mohon periksa kembali form, terdapat data yang belum sesuai.',
      });
      return;
    }

    // Jika validasi lolos, bersihkan error dan mulai proses request
    setErrors({});
    setIsLoading(true);

    try {
      // Panggil fungsi service untuk POST ke API
      const result = await registerUser(formData);

      // Tampilkan notifikasi sukses
      setAlert({
        type: 'success',
        message: 'Registrasi berhasil! Mengalihkan ke halaman login...',
      });

      // Beri jeda 1.8 detik agar pengguna sempat membaca pesan sukses sebelum di-redirect
      setTimeout(() => {
        navigate('/login', {
          state: {
            registeredEmail: formData.email,
            successMessage: 'Akun Anda berhasil didaftarkan. Silakan login.',
          },
        });
      }, 1800);
    } catch (error) {
      // Tangani error jika request API gagal
      setAlert({
        type: 'error',
        message: error.message || 'Terjadi kesalahan saat registrasi.',
      });
    } finally {
      // Matikan indikator loading
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        {/* Header Form */}
        <header className="auth-header">
          <span className="auth-badge">Tugas Praktikum</span>
          <h1 className="auth-title">Buat Akun Baru</h1>
          <p className="auth-subtitle">Lengkapi formulir di bawah untuk mendaftar</p>
        </header>

        {/* Notifikasi Alert Sukses / Gagal */}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Formulir Pendaftaran */}
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          {/* Field 1: Nama Lengkap */}
          <InputField
            id="fullName"
            name="fullName"
            label="Nama Lengkap"
            type="text"
            placeholder="Masukkan nama lengkap Anda"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            required
            autoComplete="name"
            disabled={isLoading}
          />

          {/* Field 2: Email */}
          <InputField
            id="email"
            name="email"
            label="Alamat Email"
            type="email"
            placeholder="contoh: user@mail.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            autoComplete="email"
            disabled={isLoading}
          />

          {/* Field 3: Username */}
          <InputField
            id="username"
            name="username"
            label="Username"
            type="text"
            placeholder="Minimal 4 karakter tanpa spasi"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            required
            autoComplete="username"
            disabled={isLoading}
          />

          {/* Field 4: Password (dengan toggle mata) */}
          <InputField
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="Minimal 8 karakter"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            autoComplete="new-password"
            disabled={isLoading}
          />

          {/* Field 5: Konfirmasi Password */}
          <InputField
            id="confirmPassword"
            name="confirmPassword"
            label="Konfirmasi Password"
            type="password"
            placeholder="Ulangi password Anda"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
            disabled={isLoading}
          />

          {/* Tombol Submit dengan indikator loading */}
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={isLoading}
            fullWidth
          >
            Daftar Sekarang
          </Button>
        </form>

        {/* Catatan / Panduan Pengujian API ReqRes */}
        <div className="auth-hint-box">
          <strong>💡 Tips Pengujian API:</strong>
          <br />
          API publik <code>reqres.in</code> membutuhkan email terdaftar (contoh: <code>eve.holt@reqres.in</code>) dan password minimal 8 karakter untuk menghasilkan respon sukses <code>200 OK</code>.
        </div>

        {/* Footer Link ke Halaman Login */}
        <footer className="auth-footer">
          <p>
            Sudah memiliki akun?{' '}
            <Link to="/login" className="auth-link">
              Masuk di sini
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Register;
