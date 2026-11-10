import React from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { useGame } from '../context/GameContext';

export default function Shop() {
  const { game, daily } = useGame();
  const claimed = game.claimed === new Date().toLocaleDateString('en-CA');

  return (
    <div className="stack">
      <section className="paper shop-hero">
        <small className="hand">SEDIKIT BANTUAN UNTUK KEBERUNTUNGANMU</small>
        <h2>
          Butuh lebih banyak
          <br />
          <em>koin kampus?</em>
        </h2>
        <p>
          Tidak ada uang sungguhan di sini. Hanya hadiah kecil untuk petualangan
          kampusmu.
        </p>
        <b>🪙 {game.coins.toLocaleString('id-ID')} koin</b>
      </section>

      <div className="shop-card paper">
        <div>🎁</div>
        <small className="hand">HADIAH HARIAN</small>
        <h3>Uang Saku Mahasiswa</h3>
        <p>Kembali setiap hari untuk mengumpulkan uang saku virtual.</p>
        <strong>+500 koin</strong>
        <button className="btn dark" onClick={daily} disabled={claimed}>
          <Gift size={15} />
          {claimed ? 'SUDAH DIKLAIM HARI INI' : 'KLAIM HADIAH'}
        </button>
      </div>

      <div className="note-box">
        <Sparkles size={16} /> Koin Kampus adalah poin virtual. Tidak ada transaksi
        menggunakan uang sungguhan.
      </div>
    </div>
  );
}
