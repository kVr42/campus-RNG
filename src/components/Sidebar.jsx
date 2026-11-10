import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  House,
  Box,
  Package,
  BookOpen,
  ShoppingBag,
  UserRound,
  Coins,
} from 'lucide-react';

const links = [
  ['/', 'Dashboard', House],
  ['/gacha', 'Gacha', Box],
  ['/inventory', 'Koleksi', Package],
  ['/history', 'Riwayat', BookOpen],
  ['/shop', 'Toko', ShoppingBag],
  ['/profile', 'Profil', UserRound],
];

export default function Sidebar({ coins }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">✨</span>
        <div>
          CAMPUS RNG
          <small>KLUB BARANG KAMPUS</small>
        </div>
      </div>

      <p className="side-caption">BUKU CATATANMU</p>

      <nav>
        {links.map(([to, label, Icon]) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="wallet">
        <Coins size={18} />
        <div>
          <small>DOMPETMU</small>
          <b>{coins.toLocaleString('id-ID')} koin</b>
        </div>
      </div>

      <div className="side-note">💸Gacha sampai rungkad!</div>
    </aside>
  );
}

Sidebar.propTypes = {
  coins: PropTypes.number.isRequired,
};
