import React, { useState } from 'react';

/**
 * Komponen InputField yang Reusable.
 * Mendukung berbagai tipe input (text, email, password),
 * tombol toggle show/hide password, label aksesibel, dan pesan validasi error.
 */
const InputField = ({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  autoComplete = 'off',
  disabled = false,
}) => {
  // State untuk toggle visibilitas password
  const [showPassword, setShowPassword] = useState(false);

  // Cek apakah field ini merupakan input password
  const isPasswordField = type === 'password';

  // Tentukan tipe aktual yang digunakan pada tag <input>
  const actualType = isPasswordField && showPassword ? 'text' : type;

  // ID unik untuk elemen pesan error (aksesibilitas aria-describedby)
  const errorId = `${id}-error`;

  return (
    <div className={`form-group ${error ? 'has-error' : ''}`}>
      {/* Label dengan relasi htmlFor ke id input */}
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="required-star" aria-hidden="true"> *</span>}
      </label>

      {/* Kontainer input dengan tombol toggle password jika tipe password */}
      <div className="input-wrapper">
        <input
          id={id}
          name={name}
          type={actualType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`form-input ${isPasswordField ? 'input-with-toggle' : ''}`}
        />

        {/* Tombol Toggle Show/Hide Password */}
        {isPasswordField && (
          <button
            type="button"
            className="toggle-password-btn"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            title={showPassword ? 'Sembunyikan' : 'Tampilkan'}
            tabIndex={0}
          >
            {showPassword ? (
              // SVG Icon Mata Terbuka
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="eye-icon"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              // SVG Icon Mata Dicoret (Tertutup)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="eye-icon"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Pesan Error Aksesibel yang tampil saat ada error validasi */}
      {error && (
        <p id={errorId} className="error-message" role="alert" aria-live="polite">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="error-icon"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
