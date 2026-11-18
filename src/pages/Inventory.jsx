
import React, { useMemo, useState } from 'react';
import {
  Search,
  Coins,
  Recycle,
  Lock,
  Star,
  Plus,
  X,
} from 'lucide-react';

import { useGame } from '../context/GameContext';
import { ITEMS } from '../data/items';
import { rarityLabel } from '../data/rarity';
import ItemCard from '../components/ItemCard';
import Modal from '../components/Modal';

const filters = [
  'All',
  'Common',
  'Uncommon',
  'Rare',
  'Epic',
  'Legendary',
  'Mythical',
];

const tabs = [
  { id: 'collection', label: 'My Collection', icon: '🎒' },
  { id: 'codex', label: 'Item Codex', icon: '📖' },
  { id: 'showcase', label: 'My Showcase', icon: '⭐' },
];

const duplicateValues = {
  Common: 10,
  Uncommon: 20,
  Rare: 50,
  Epic: 100,
  Legendary: 250,
  Mythical: 500,
};

export default function Inventory() {
  const {
    game,
    sellDuplicate,
    sellAllDuplicates,
    setShowcase,
  } = useGame();

  const [activeTab, setActiveTab] = useState('collection');
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const owned = useMemo(
    () => new Map(
      game.inventory.map((item) => [item.id, item])
    ),
    [game.inventory]
  );

  const showcaseItems = useMemo(
    () =>
      game.showcase
        .map((id) => ITEMS.find((item) => item.id === id))
        .filter(Boolean),
    [game.showcase]
  );

  const list = ITEMS
    .filter((item) => owned.has(item.id))
    .map((item) => ({
      ...item,
      quantity: owned.get(item.id).quantity,
    }))
    .filter((item) => {
      const matchesFilter =
        filter === 'All' || item.rarity === filter;

      const matchesQuery = item.name
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesFilter && matchesQuery;
    });

  const codexList = ITEMS.filter((item) => {
    const matchesFilter =
      filter === 'All' || item.rarity === filter;

    const matchesQuery = item.name
      .toLowerCase()
      .includes(query.toLowerCase());

    return matchesFilter && matchesQuery;
  });

  const duplicateCount = game.inventory.reduce(
    (total, item) =>
      total +
      (game.showcase.includes(item.id)
        ? 0
        : Math.max(0, item.quantity - 1)),
    0
  );

  const duplicateCoins = game.inventory.reduce(
    (total, item) => {
      if (game.showcase.includes(item.id)) {
        return total;
      }

      const count = Math.max(0, item.quantity - 1);
      return total + count * (duplicateValues[item.rarity] || 10);
    },
    0
  );

  function handleSellAll() {
    if (duplicateCount === 0) return;

    const confirmed = window.confirm(
      `Tukar ${duplicateCount} duplikat menjadi ${duplicateCoins} koin?`
    );

    if (confirmed) {
      sellAllDuplicates();
      setSelected(null);
    }
  }

  function handleSellOne(item) {
    const confirmed = window.confirm(
      `Tukar 1 duplikat ${item.name} menjadi ${duplicateValues[item.rarity]} koin?`
    );

    if (confirmed) {
      sellDuplicate(item.id);
      setSelected(null);
    }
  }

  function handleShowcase(item) {
    setShowcase(item.id);
    setSelected(null);
  }

  function renderShowcaseSlot(item, index) {
    return (
      <div className="showcase-slot" key={index}>
        {item ? (
          <>
            <button
              className="showcase-remove"
              onClick={() => setShowcase(item.id)}
              title="Keluarkan dari Showcase"
            >
              <X size={15} />
            </button>

            <div className="showcase-emoji">
              {item.emoji}
            </div>

            <span className={`rarity ${item.rarity.toLowerCase()}`}>
              {rarityLabel(item.rarity)}
            </span>

            <h4>{item.name}</h4>
            <small>Slot {index + 1}</small>
          </>
        ) : (
          <>
            <div className="showcase-empty-icon">
              <Plus size={25} />
            </div>
            <h4>Slot Kosong</h4>
            <small>Slot {index + 1}</small>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="stack">
      <section className="paper collection">
        <div>
          <small className="hand">RAK HARTA KARUNMU</small>
          <h2>
            {game.inventory.length}
            <small> / {ITEMS.length}</small>
          </h2>
          <p>Jenis barang yang sudah ditemukan</p>
        </div>
        <span>🗂️</span>
      </section>

      <div className="collection-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={
              activeTab === tab.id ? 'collection-tab active' : 'collection-tab'
            }
            onClick={() => {
              setActiveTab(tab.id);
              setFilter('All');
              setQuery('');
              setSelected(null);
            }}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'collection' && (
        <>
          <section className="paper duplicate-panel">
            <div>
              <small className="hand">PENUKARAN DUPLIKAT</small>
              <h3>{duplicateCount} duplikat tersedia</h3>
              <p>
                Tukarkan barang berlebih menjadi {duplicateCoins} koin.
                Item yang dipamerkan akan tetap terlindungi.
              </p>
            </div>

            <button
              className="btn dark"
              onClick={handleSellAll}
              disabled={duplicateCount === 0}
            >
              <Recycle size={15} />
              Tukar Semua
            </button>
          </section>

          <div className="search">
            <Search size={17} />
            <input
              placeholder="Cari barang..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="filters">
            {filters.map((item) => (
              <button
                className={filter === item ? 'chosen' : ''}
                onClick={() => setFilter(item)}
                key={item}
              >
                {item === 'All' ? 'Semua' : rarityLabel(item)}
              </button>
            ))}
          </div>

          {list.length ? (
            <div className="items">
              {list.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  quantity={item.quantity}
                  onClick={setSelected}
                />
              ))}
            </div>
          ) : (
            <div className="empty paper">
              <div>🎒</div>
              <h3>Belum ada barang di sini</h3>
              <p>
                Coba filter lain atau kunjungi Gacha untuk menemukan barang baru.
              </p>
            </div>
          )}
        </>
      )}

      {activeTab === 'codex' && (
        <>
          <section className="paper codex-intro">
            <div>
              <small className="hand">ENCYCLOPEDIA CAMPUS RNG</small>
              <h3>Item Codex</h3>
              <p>
                Temukan dan lengkapi seluruh koleksi item Campus RNG.
                Item yang belum kamu dapatkan masih terkunci.
              </p>
            </div>
            <div className="codex-progress">
              <strong>
                {game.inventory.length}/{ITEMS.length}
              </strong>
              <small>Item ditemukan</small>
              <div className="codex-progress-track">
                <div
                  style={{
                    width: `${(game.inventory.length / ITEMS.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </section>

          <div className="search">
            <Search size={17} />
            <input
              placeholder="Cari item dalam Codex..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="filters">
            {filters.map((item) => (
              <button
                className={filter === item ? 'chosen' : ''}
                onClick={() => setFilter(item)}
                key={item}
              >
                {item === 'All' ? 'Semua' : rarityLabel(item)}
              </button>
            ))}
          </div>

          <div className="items">
            {codexList.map((item) => {
              const isOwned = owned.has(item.id);
              const isSpecial = Boolean(item.special);

              return (
                <button
                  key={item.id}
                  className={`item-card codex-card ${!isOwned ? 'locked' : ''}`}
                  onClick={() => {
                    if (isOwned) {
                      setSelected({
                        ...item,
                        quantity: owned.get(item.id).quantity,
                      });
                    }
                  }}
                >
                  <div className="item-category">
                    {item.category}
                  </div>

                  <div className="item-emoji">
                    {isOwned ? item.emoji : <Lock size={30} />}
                  </div>

                  <span className={`rarity ${item.rarity.toLowerCase()}`}>
                    {rarityLabel(item.rarity)}
                  </span>

                  <h3>{isOwned ? item.name : '???'}</h3>

                  <p>
                    {isOwned
                      ? item.flavor
                      : isSpecial
                        ? 'Item khusus event atau achievement.'
                        : 'Belum ditemukan. Coba keberuntunganmu di Gacha.'}
                  </p>

                  {isOwned && (
                    <b className="qty">
                      <Star size={12} /> Dimiliki
                    </b>
                  )}

                  {!isOwned && (
                    <span className="codex-lock-label">
                      <Lock size={11} /> Terkunci
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}

      {activeTab === 'showcase' && (
        <>
          <section className="paper showcase-intro">
            <small className="hand">PAMERKAN KOLEKSI TERBAIKMU</small>
            <h3>My Showcase</h3>
            <p>
              Pilih maksimal tiga item dari koleksimu untuk dipamerkan.
              Item yang dipasang tidak bisa ditukar menjadi koin.
            </p>
            <strong>{game.showcase.length} / 3 slot terisi</strong>
          </section>

          <div className="showcase-grid">
            {[0, 1, 2].map((index) =>
              renderShowcaseSlot(showcaseItems[index], index)
            )}
          </div>

          <section className="showcase-picker">
            <div className="section-title">
              <div>
                <small className="hand">PILIH DARI INVENTORY</small>
                <h2>Koleksimu</h2>
              </div>
            </div>

            {game.inventory.length ? (
              <div className="items">
                {ITEMS.filter((item) => owned.has(item.id)).map((item) => {
                  const isShown = game.showcase.includes(item.id);
                  const isFull = game.showcase.length >= 3;

                  return (
                    <div className="showcase-picker-card" key={item.id}>
                      <ItemCard
                        item={item}
                        quantity={owned.get(item.id).quantity}
                        onClick={setSelected}
                      />

                      <button
                        className={`btn ${isShown ? '' : 'dark'} showcase-action`}
                        onClick={() => setShowcase(item.id)}
                        disabled={!isShown && isFull}
                      >
                        {isShown ? (
                          <>
                            <X size={14} /> Keluarkan
                          </>
                        ) : (
                          <>
                            <Star size={14} /> Pamerkan
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty paper">
                <div>⭐</div>
                <h3>Belum ada item untuk dipamerkan</h3>
                <p>Dapatkan item melalui Gacha terlebih dahulu.</p>
              </div>
            )}
          </section>
        </>
      )}

      {selected && (
        <Modal
          title={selected.name}
          onClose={() => setSelected(null)}
        >
          <div className="detail-emoji">{selected.emoji}</div>

          <span className={`rarity ${selected.rarity.toLowerCase()}`}>
            {rarityLabel(selected.rarity)}
          </span>

          <p>{selected.description}</p>
          <p><i>{selected.flavor}</i></p>

          <b>Jumlah dimiliki: {selected.quantity}</b>

          {selected.special && (
            <p className="keep-note">
              Item spesial: {selected.obtainMethod === 'event'
                ? 'Diperoleh melalui event.'
                : 'Diperoleh melalui achievement.'}
            </p>
          )}

          {game.showcase.includes(selected.id) ? (
            <button
              className="btn"
              onClick={() => handleShowcase(selected)}
            >
              <X size={15} />
              Keluarkan dari Showcase
            </button>
          ) : (
            <button
              className="btn dark"
              disabled={game.showcase.length >= 3}
              onClick={() => handleShowcase(selected)}
            >
              <Star size={15} />
              Pamerkan Item
            </button>
          )}

          {selected.quantity > 1 &&
            !game.showcase.includes(selected.id) && (
              <div className="duplicate-detail">
                <p>
                  Kamu memiliki {selected.quantity - 1} duplikat.
                  Setiap duplikat bernilai{' '}
                  {duplicateValues[selected.rarity]} koin.
                </p>

                <button
                  className="btn dark"
                  onClick={() => handleSellOne(selected)}
                >
                  <Coins size={15} />
                  Tukar 1 Duplikat
                </button>
              </div>
            )}

          {game.showcase.includes(selected.id) && (
            <p className="keep-note">
              Item ini sedang dipamerkan dan dilindungi dari penukaran.
              Keluarkan dari Showcase jika ingin menukarnya.
            </p>
          )}

          {selected.quantity <= 1 && (
            <p className="keep-note">
              Barang utama tidak bisa ditukar agar koleksimu tetap lengkap.
            </p>
          )}
        </Modal>
      )}
    </div>
  );
}
