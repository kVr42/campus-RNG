import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

export default function Profile() {
  const { game, rename, reset } = useGame(),
    [name, setName] = useState(game.name),
    [confirm, setConfirm] = useState(false),
    rare = game.inventory
      .filter((x) => ['Legendary', 'Mythical'].includes(x.rarity))
      .reduce((s, x) => s + x.quantity, 0);

  return (
    <div className="stack">
      <section className="paper profile">
        <div className="avatar">🎒</div>
        <small className="hand">PEMAIN CAMPUS RNG</small>
        <h2>{game.name}</h2>
        <p>Pengumpul Barang Kampus</p>
        <div className="profile-stats">
          <span>
            <b>{game.pulls}</b>
            <small>Total undian</small>
          </span>
          <span>
            <b>{rare}</b>
            <small>Temuan Legendaris+</small>
          </span>
          <span>
            <b>{game.inventory.length}</b>
            <small>Barang unik</small>
          </span>
        </div>
      </section>

      <section className="paper settings">
        <small className="hand">PENGATURAN PEMAIN</small>
        <h3>Ubah nama panggilan</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            rename(name);
          }}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength="24"
          />
          <button className="btn dark">SIMPAN NAMA</button>
        </form>
      </section>

      <section className="paper settings danger">
        <small className="hand">MULAI DARI AWAL?</small>
        <h3>Atur ulang data permainan</h3>
        <p>
          Tindakan ini akan menghapus koin, koleksi, riwayat, dan progres dari
          peramban ini.
        </p>
        <button className="btn danger-btn" onClick={() => setConfirm(true)}>
          ATUR ULANG SEMUA DATA
        </button>
      </section>

      {confirm && (
        <div className="overlay">
          <section className="modal">
            <h2>Mulai ulang?</h2>
            <p>Semua progres permainanmu akan dihapus dari peramban ini.</p>
            <div className="modal-actions">
              <button className="btn" onClick={() => setConfirm(false)}>
                BATAL
              </button>
              <button
                className="btn danger-btn"
                onClick={() => {
                  reset();
                  setName('Mahasiswa Baru');
                  setConfirm(false);
                }}
              >
                YA, ATUR ULANG
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
