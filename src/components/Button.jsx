import React from 'react';

/**
 * Komponen Button yang Reusable.
 * Mendukung status loading (dengan animasi spinner), status disabled,
 * dan varian styling yang dapat dikonfigurasi.
 */
const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  isLoading = false,
  disabled = false,
  onClick,
  fullWidth = true,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`btn btn-${variant} ${fullWidth ? 'btn-block' : ''} ${isLoading ? 'btn-loading' : ''} ${className}`}
    >
      {isLoading ? (
        <span className="btn-content-loading">
          {/* Animasi Spinner Putar */}
          <span className="spinner" aria-hidden="true"></span>
          <span>Memproses...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
