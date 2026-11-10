import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import Sidebar from './Sidebar';

const titles = {
  '/': ['Dashboard', 'Sedikit keberuntungan untuk kehidupan kampusmu.'],
  '/gacha': [
    'Gacha',
    'Coba keberuntunganmu. Barang apa yang akan kamu dapatkan hari ini?',
  ],
  '/inventory': ['Koleksi', 'Semua barang unik yang berhasil kamu temukan.'],
  '/history': ['Riwayat', 'Catatan setiap keberuntungan yang pernah kamu dapatkan.'],
  '/shop': ['Toko', 'Kumpulkan koin untuk kesempatan Gacha berikutnya.'],
  '/profile': ['Profil', 'Lihat perjalanan petualangan kampusmu.'],
};

export default function Layout() {
  const { game, toast } = useGame();
  const loc = useLocation();
  const [title, sub] = titles[loc.pathname] || titles['/'];

  return (
    <div className="shell">
      <Sidebar coins={game.coins} />

      <main className="main">
        <header className="topbar">
          <div>
            <small>✳ CAMPUS RNG / KEHIDUPAN MAHASISWA</small>
            <h1>{title}</h1>
            <p>{sub}</p>
          </div>

          <div className="top-coins">
            🪙 {game.coins.toLocaleString('id-ID')} <small>KOIN</small>
          </div>
        </header>

        <div className="content">
          <Outlet />
        </div>

        <footer>
          Dibuat dengan sedikit keberuntungan dan banyak kopi <span>✎</span>
        </footer>
      </main>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
