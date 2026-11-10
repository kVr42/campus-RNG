import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="empty paper">
      <div>🧭</div>
      <h2>Ups, halaman catatan tidak ditemukan!</h2>
      <p>Halaman yang kamu cari tidak tersedia.</p>
      <Link className="btn dark" to="/">
        KEMBALI KE DASHBOARD
      </Link>
    </div>
  );
}
