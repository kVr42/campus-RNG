
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Gift,
  Package,
  Target,
  Sparkles
} from 'lucide-react';

import { useGame } from '../context/GameContext';
import ItemCard from '../components/ItemCard';

export default function Dashboard() {
  const { game, daily } = useGame();

  const owned = game.inventory.reduce(
    (s, x) => s + x.quantity,
    0
  );

  const today = new Date().toLocaleDateString('en-CA');

  return (
    <div className="stack">

      <section className="hero paper">
        <div>
          <small className="hand">
            ✎ PETUALANGAN KAMPUSMU
          </small>

          <h2>
            Siap menemukan
            <br />
            <em>sesuatu yang acak?</em>
          </h2>

          <p>
            Mulai dari alat tulis hingga sandal legendaris
            yang kehilangan pasangannya. Harta karun kampus
            berikutnya hanya berjarak satu undian.
          </p>

          <Link className="btn dark" to="/gacha">
            BUKA GACHA
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="hero-art">
          <span>✳</span>
          <b>
            🎒
            <div className=""></div>
          </b>
          <i>ada apa di dalamnya?</i>
        </div>
      </section>

      <div className="stats">
        <Stat
          icon={<Sparkles />}
          label="TOTAL UNDIAN"
          value={game.pulls}
        />

        <Stat
          icon={<Package />}
          label="BARANG TERKUMPUL"
          value={owned}
        />

        <Stat
          icon={<Target />}
          label="PITY SAAT INI"
          value={`${game.pity}/80`}
        />

        <Stat
          icon={<Gift />}
          label="KOIN"
          value={game.coins.toLocaleString('id-ID')}
        />
      </div>

      <section className="section-title">
        <div>
          <small className="hand">
            HADIAH HARIAN
          </small>

          <h2>Ambil uang saku kampusmu</h2>
        </div>

        <button
          className="btn outline"
          onClick={daily}
          disabled={game.claimed === today}
        >
          {game.claimed === today
            ? 'SUDAH DIKLAIM HARI INI'
            : 'KLAIM +500 KOIN'}
        </button>
      </section>

      <div className="daily paper">
        <span>☕</span>

        <div>
          <b>Hadiah kecil untuk hari ini</b>
          <p>
            Klaim hadiah harian dan simpan untuk undian berikutnya.
          </p>
        </div>

        <strong>
          +500
          <br />
          KOIN
        </strong>
      </div>

      <section className="section-title">
        <div>
          <small className="hand">
            TEMUAN TERBARU
          </small>

          <h2>Barang yang baru kamu temukan</h2>
        </div>

        <Link to="/history">
          Lihat semua →
        </Link>
      </section>

      {game.history.length ? (
        <div className="items">
          {game.history.slice(0, 3).map((x, i) => (
            <ItemCard
              key={x.uid || i}
              item={x}
            />
          ))}
        </div>
      ) : (
        <div className="empty paper">
          <div>📝</div>

          <h3>Petualanganmu dimulai di sini</h3>

          <p>
            Belum ada barang. Kunjungi Gacha dan coba
            undian pertamamu!
          </p>

          <Link to="/gacha">
            Ayo mulai →
          </Link>
        </div>
      )}

    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="stat paper">
      <span>{icon}</span>

      <div>
        <small>{label}</small>
        <b>{value}</b>
      </div>
    </div>
  );
}
