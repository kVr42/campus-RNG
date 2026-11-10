
import React from 'react';

import { useGame } from '../context/GameContext';
import { rarityLabel } from '../data/rarity';

export default function History() {
  const { game } = useGame();

  return (
    <div className="stack">

      <section className="section-title">
        <div>
          <small className="hand">
            CATATAN KEBERUNTUNGAN
          </small>

          <h2>Aktivitas undian</h2>
        </div>

        <span>{game.history.length} catatan</span>
      </section>

      {game.history.length ? (
        <div className="paper history">
          {game.history.map((x, i) => (
            <div
              className="history-row"
              key={x.uid || i}
            >
              <span>{x.emoji}</span>

              <div>
                <b>{x.name}</b>

                <small>
                  {x.type === '10x Pull'
                    ? 'Undi 10 Kali'
                    : 'Undi 1 Kali'}
                  {' · '}
                  {new Date(x.date).toLocaleString('id-ID', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </small>
              </div>

              <label
                className={`rarity ${x.rarity.toLowerCase()}`}
              >
                {rarityLabel(x.rarity)}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty paper">
          <div>📖</div>

          <h3>Belum ada catatan</h3>

          <p>
            Riwayat undianmu akan muncul di sini
            setelah undian pertama.
          </p>
        </div>
      )}

    </div>
  );
}
