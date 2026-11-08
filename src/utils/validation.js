/**
 * Utility functions untuk validasi form registrasi
 * Berisi aturan validasi tiap field dan pesan error dalam bahasa Indonesia
 */

// Regex untuk validasi format email standar
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validasi seluruh field pada form registrasi
 * @param {Object} values - Objek berisi nilai dari form { fullName, email, username, password, confirmPassword }
 * @returns {Object} errors - Objek berisi pesan error untuk tiap field jika tidak valid
 */
export const validateRegisterForm = (values) => {
  const errors = {};

  // 1. Validasi Nama Lengkap
  if (!values.fullName || !values.fullName.trim()) {
    errors.fullName = 'Nama lengkap wajib diisi';
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = 'Nama lengkap minimal 3 karakter';
  }

  // 2. Validasi Email
  if (!values.email || !values.email.trim()) {
    errors.email = 'Email wajib diisi';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Format email tidak valid (contoh: user@domain.com)';
  }

  // 3. Validasi Username
  if (!values.username || !values.username.trim()) {
    errors.username = 'Username wajib diisi';
  } else if (values.username.trim().length < 4) {
    errors.username = 'Username minimal 4 karakter';
  } else if (/\s/.test(values.username)) {
    // Memastikan tidak ada spasi di dalam username
    errors.username = 'Username tidak boleh mengandung spasi';
  }

  // 4. Validasi Password
  if (!values.password) {
    errors.password = 'Password wajib diisi';
  } else if (values.password.length < 8) {
    errors.password = 'Password minimal 8 karakter';
  }

  // 5. Validasi Konfirmasi Password
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Konfirmasi password wajib diisi';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Konfirmasi password tidak cocok dengan password';
  }

  return errors;
};
