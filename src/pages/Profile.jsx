
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Coins,
  Trophy,
  Zap,
  Lock,
  CheckCircle2,
  Award,
} from 'lucide-react';

import { useGame } from '../context/GameContext';
import { ITEMS } from '../data/items';
import { rarityLabel } from '../data/rarity';
import { ACHIEVEMENTS } from '../data/achievements';

export default function Profile() {
  const {
    game,
    rename,
    reset,
    expToNext,
  } = useGame();

  const [name, setName] = useState(game.name);
  const [confirm, setConfirm] = useState(false);

  const rare = game.inventory
    .filter((item) =>
      ['Legendary', 'Mythical'].includes(item.rarity)
    )
    .reduce((total, item) => total + item.quantity, 0);

  const showcaseItems = game.showcase
    .map((id) => ITEMS.find((item) => item.id === id))
    .filter(Boolean);

  const expProgress = Math.min(
    100,
    (game.exp / expToNext) * 100
  );

  const unlockedAchievements = game.achievements || [];

  const unlockedCount = ACHIEVEMENTS.filter((achievement) =>
    unlockedAchievements.some((item) => item.id === achievement.id)
  ).length;

  const achievementProgress =
    (unlockedCount / ACHIEVEMENTS.length) * 100;

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

      {/* PLAYER LEVEL */}
      <section className="paper level-panel">
        <div className="level-heading">
          <div className="level-icon">
            <Trophy size={28} />
          </div>

          <div>
            <small className="hand">PLAYER PROGRESSION</small>
            <h2>Level {game.level}</h2>
            <p>Terus tingkatkan kemampuanmu!</p>
          </div>

          <div className="level-badge">
            LV. {game.level}
          </div>
        </div>

        <div className="level-exp-info">
          <span>
            <Zap size={14} />
            EXP
          </span>

          <strong>
            {game.exp.toLocaleString('id-ID')} / {expToNext.toLocaleString('id-ID')}
          </strong>
        </div>

        <div
          className="level-progress-track"
          role="progressbar"
          aria-valuenow={game.exp}
          aria-valuemin={0}
          aria-valuemax={expToNext}
        >
          <div
            className="level-progress-fill"
            style={{ width: `${expProgress}%` }}
          />
        </div>

        <div className="level-footer">
          <span>{Math.round(expProgress)}% menuju level berikutnya</span>
          <span>
            Kurang {(expToNext - game.exp).toLocaleString('id-ID')} EXP
          </span>
        </div>

        <div className="level-reward-note">
          <Coins size={16} />
          <span>
            Hadiah naik level berikutnya:{' '}
            <b>
              {((game.level + 1) * 100).toLocaleString('id-ID')} koin
            </b>
          </span>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="paper achievement-panel">
        <div className="section-title">
          <div>
            <small className="hand">PENCAPAIAN PEMAIN</small>
            <h2>My Achievements</h2>
          </div>

          <div className="achievement-count">
            <Award size={20} />
            <strong>
              {unlockedCount}/{ACHIEVEMENTS.length}
            </strong>
          </div>
        </div>

        <div className="achievement-progress-info">
          <span>Achievement Progress</span>
          <strong>{Math.round(achievementProgress)}%</strong>
        </div>

        <div className="achievement-progress-track">
          <div
            className="achievement-progress-fill"
            style={{ width: `${achievementProgress}%` }}
          />
        </div>

        <div className="achievement-grid">
          {ACHIEVEMENTS.map((achievement) => {
            const unlocked = unlockedAchievements.find(
              (item) => item.id === achievement.id
            );

            return (
              <div
                className={`achievement-card ${
                  unlocked ? 'unlocked' : 'locked'
                }`}
                key={achievement.id}
              >
                <div className="achievement-icon">
                  {unlocked ? (
                    achievement.icon
                  ) : (
                    <Lock size={25} />
                  )}
                </div>

                <div className="achievement-info">
                  <div className="achievement-name">
                    <strong>{achievement.name}</strong>

                    {unlocked && (
                      <CheckCircle2 size={15} />
                    )}
                  </div>

                  <p>{achievement.description}</p>

                  <small>
                    {unlocked
                      ? `Terbuka: ${new Date(
                          unlocked.unlockedAt
                        ).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}`
                      : achievement.condition}
                  </small>
                </div>

                <span className="achievement-status">
                  {unlocked ? 'TERBUKA' : 'TERKUNCI'}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="paper profile-showcase">
        <div className="section-title">
          <div>
            <small className="hand">KOLEKSI PILIHAN</small>
            <h2>My Showcase</h2>
          </div>

          <Link to="/inventory" className="showcase-edit-link">
            Edit Showcase
          </Link>
        </div>

        <div className="profile-showcase-grid">
          {[0, 1, 2].map((index) => {
            const item = showcaseItems[index];

            return (
              <div className="profile-showcase-item" key={index}>
                {item ? (
                  <>
                    <div className="profile-showcase-emoji">
                      {item.emoji}
                    </div>

                    <span className={`rarity ${item.rarity.toLowerCase()}`}>
                      {rarityLabel(item.rarity)}
                    </span>

                    <b>{item.name}</b>
                  </>
                ) : (
                  <>
                    <div className="profile-showcase-empty">＋</div>
                    <b>Slot Kosong</b>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {!showcaseItems.length && (
          <p className="showcase-profile-note">
            Belum ada item yang dipamerkan. Pilih hingga tiga item
            dari halaman Collection.
          </p>
        )}
      </section>

      {/* RENAME */}
      <section className="paper settings">
        <small className="hand">PENGATURAN PEMAIN</small>
        <h3>Ubah nama panggilan</h3>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            rename(name);
          }}
        >
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength="24"
          />

          <button className="btn dark">
            SIMPAN NAMA
          </button>
        </form>
      </section>

      {/* RESET */}
      <section className="paper settings danger">
        <small className="hand">MULAI DARI AWAL?</small>
        <h3>Atur ulang data permainan</h3>

        <p>
          Tindakan ini akan menghapus koin, koleksi, riwayat,
          Showcase, Level, EXP, dan Achievement dari peramban ini.
        </p>

        <button
          className="btn danger-btn"
          onClick={() => setConfirm(true)}
        >
          ATUR ULANG SEMUA DATA
        </button>
      </section>

      {confirm && (
        <div className="overlay">
          <section className="modal">
            <h2>Mulai ulang?</h2>

            <p>
              Semua progres permainanmu akan dihapus dari peramban ini.
            </p>

            <div className="modal-actions">
              <button
                className="btn"
                onClick={() => setConfirm(false)}
              >
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
