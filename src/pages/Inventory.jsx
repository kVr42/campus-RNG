import React, { useMemo, useState } from 'react';
import { Search, Coins, Recycle } from 'lucide-react';
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
  } = useGame();

  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const owned = useMemo(
    () => new Map(game.inventory.map((item) => [item.id, item])),
    [game.inventory]
  );

  const list = ITEMS
    .filter((item) => owned.has(item.id))
    .map((item) => ({
      ...item,
      quantity: owned.get(item.id).quantity,
    }))
    .filter((item) => {
      const matchesFilter = filter === 'All' || item.rarity === filter;
      const matchesQuery = item.name
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesFilter && matchesQuery;
    });

  const duplicateCount = game.inventory.reduce(
    (total, item) => total + Math.max(0, item.quantity - 1),
    0
  );

  const duplicateCoins = game.inventory.reduce((total, item) => {
    const count = Math.max(0, item.quantity - 1);
    return total + count * (duplicateValues[item.rarity] || 10);
  }, 0);

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

  return (
    <div className="stack">
      <section className="paper collection">
        <div>
          <small className="hand">RAK HARTA KARUNMU</small>
          <h2>
            {game.inventory.length}
            <small> / {ITEMS.length}</small>
          </h2>
          <p>Barang unik ditemukan</p>
        </div>
        <span>🗂️</span>
      </section>

      <section className="paper duplicate-panel">
        <div>
          <small className="hand">PENUKARAN DUPLIKAT</small>
          <h3>{duplicateCount} duplikat tersedia</h3>
          <p>
            Tukarkan barang berlebih menjadi {duplicateCoins} koin.
            Satu barang dari setiap jenis akan tetap tersimpan.
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

      {selected && (
        <Modal
          title={selected.name}
          onClose={() => setSelected(null)}
        >
          <div className="detail-emoji">{selected.emoji}</div>
          <p>{selected.description}</p>
          <b>Jumlah dimiliki: {selected.quantity}</b>

          {selected.quantity > 1 && (
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
