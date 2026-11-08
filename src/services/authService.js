import axios from 'axios';

/**
 * Service untuk menangani komunikasi API autentikasi menggunakan Axios.
 * Base URL diambil dari environment variable (file .env) untuk menjaga keamanan.
 */

// Membaca Base URL dari .env (default fallback ke ReqRes jika env tidak diset)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://reqres.in/api';

// Membuat instance axios terpusat
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout 10 detik
});

/**
 * Fungsi untuk mendaftarkan pengguna baru (POST /register)
 * @param {Object} userData - Data pengguna yang didaftarkan
 * @param {string} userData.fullName - Nama lengkap
 * @param {string} userData.email - Alamat email
 * @param {string} userData.username - Username pengguna
 * @param {string} userData.password - Password pengguna
 * @returns {Promise<Object>} Data response dari server (token, id, atau pesan sukses)
 */
export const registerUser = async (userData) => {
  try {
    // Kirim data ke endpoint /register
    // Catatan untuk ReqRes: API publik ReqRes mensimulasikan registrasi sukses untuk email yang terdaftar di database ReqRes
    // (misal: eve.holt@reqres.in) dan mengembalikan 400 jika email tidak dikenali di database mereka.
    const response = await apiClient.post('/register', {
      name: userData.fullName,
      email: userData.email,
      username: userData.username,
      password: userData.password,
    });

    return response.data;
  } catch (error) {
    // Tangani error respons dari server atau koneksi jaringan
    if (error.response && error.response.data) {
      // Ambil pesan error dari respons API jika tersedia
      const serverMessage = error.response.data.error || error.response.data.message;
      throw new Error(serverMessage || 'Gagal melakukan registrasi pada server');
    } else if (error.request) {
      // Terjadi masalah koneksi / tidak ada response dari server
      throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
    } else {
      // Error lainnya
      throw new Error(error.message || 'Terjadi kesalahan sistem yang tidak terduga');
    }
  }
};

export default {
  registerUser,
};
