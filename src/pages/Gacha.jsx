
import React, { useState } from 'react';
import { Info, Coins } from 'lucide-react';

import { useGame } from '../context/GameContext';
import { RARITIES } from '../data/rarity';
import ItemCard from '../components/ItemCard';
import Modal from '../components/Modal';

export default function Gacha() {
  const { game, pull } = useGame();

  const [results, setResults] = useState(null);
  const [rolling, setRolling] = useState(false);

  function go(n) {
    if (rolling) {
      return;
    }

    const r = pull(n);

    if (!r) {
      return;
    }

    setRolling(true);

    setTimeout(() => {
      setResults(r);
      setRolling(false);
    }, 650);
  }

  return (
    <div className="stack">

      <section className="gacha-hero paper">
        <div>
          <small className="hand">
            ✳ KOTAK MISTERI KAMPUS
          </small>

          <h2>
            Apa isi
            <br />
            <em>kotaknya?</em>
          </h2>

          <p>
            Setiap undian membawa kejutan. Kumpulkan barang
            biasa, cari barang absurd, dan mungkin temukan
            legenda kampus.
          </p>

          <span className="coin-pill">
            <Coins size={15} />
            {game.coins.toLocaleString('id-ID')} koin tersedia
          </span>
        </div>

        <div className={`mystery ${rolling ? 'shake' : ''}`}>
          ✳
          <b>📦</b>
          <small>BARANG MISTERI</small>
        </div>
      </section>

      <div className="pulls">
        <button
          className="pull-btn"
          onClick={() => go(1)}
          disabled={rolling}
        >
          <b>×1</b>

          <span>
            <strong>UNDI 1 KALI</strong>
            <small>100 koin</small>
          </span>
        </button>

        <button
          className="pull-btn second"
          onClick={() => go(10)}
          disabled={rolling}
        >
          <b>×10</b>

          <span>
            <strong>UNDI 10 KALI</strong>
            <small>900 koin · hemat 100</small>
          </span>
        </button>
      </div>

      <section className="paper pity">
        <div>
          <small className="hand">
            PELACAK KEBERUNTUNGAN
          </small>

          <h3>Jaminan Legendaris</h3>

          <p>
            Barang Legendaris dijamin pada undian ke-80
            jika belum mendapatkannya.
          </p>
        </div>

        <div>
          <b>{game.pity}/80</b>

          <div className="bar">
            <span
              style={{
                width: `${Math.min(100, game.pity / 80 * 100)}%`
              }}
            />
          </div>
        </div>
      </section>

      <section className="paper odds">
        <small className="hand">PELUANG</small>

        <h3>Peluang kelangkaan</h3>

        {RARITIES.map((r) => (
          <div className="odd" key={r.name}>
            <span
              className={`dot ${r.name.toLowerCase()}`}
            />

            <b>{r.label}</b>

            <div>
              <span
                style={{
                  width: `${r.chance}%`
                }}
              />
            </div>

            <strong>{r.chance}%</strong>
          </div>
        ))}
      </section>

      {results && (
        <Modal
          title={
            results.length === 10
              ? 'Sepuluh kejutan untukmu!'
              : 'Satu kejutan untukmu!'
          }
          onClose={() => setResults(null)}
        >
          <p className="muted">
            Lihat barang yang dikirim semesta kampus untukmu.
          </p>

          <div className="items result-items">
            {results.map((x, i) => (
              <ItemCard
                key={x.uid || i}
                item={x}
              />
            ))}
          </div>

          <button
            className="btn dark"
            onClick={() => setResults(null)}
          >
            MANTAP! KEMBALI KE KAMPUS
          </button>
        </Modal>
      )}

    </div>
  );
}
