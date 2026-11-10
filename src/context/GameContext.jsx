import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { draw, load, save } from '../utils/game';

const C = createContext(null);
const initial = {
  name: 'Mahasiswa Baru',
  coins: 5000,
  pulls: 0,
  pity: 0,
  inventory: [],
  history: [],
  claimed: '',
};

export function GameProvider({ children }) {
  const [game, setGame] = useState(() => ({ ...initial, ...(load() || {}) }));
  const [toast, setToast] = useState('');

  useEffect(() => save(game), [game]);

  function notify(message) {
    setToast(message);
    setTimeout(() => setToast(''), 2400);
  }

  function pull(n) {
    const cost = n === 10 ? 900 : 100;

    if (game.coins < cost) {
      notify('Koin tidak cukup. Klaim hadiah harian terlebih dahulu!');
      return null;
    }

    let pity = game.pity;
    const results = [];

    for (let i = 0; i < n; i++) {
      const item = draw(pity);
      pity = ['Legendary', 'Mythical'].includes(item.rarity) ? 0 : pity + 1;
      results.push({
        ...item,
        uid: crypto.randomUUID?.() || `${Date.now()}-${i}-${Math.random()}`,
      });
    }

    const inventory = [...game.inventory];
    results.forEach((item) => {
      const old = inventory.find((x) => x.id === item.id);
      if (old) {
        old.quantity++;
      } else {
        inventory.push({ ...item, quantity: 1 });
      }
    });

    const date = new Date().toISOString();
    setGame((g) => ({
      ...g,
      coins: g.coins - cost,
      pulls: g.pulls + n,
      pity,
      inventory,
      history: [
        ...results.map((x) => ({
          ...x,
          date,
          type: n === 10 ? '10x Pull' : 'Single Pull',
        })),
        ...g.history,
      ].slice(0, 100),
    }));

    notify(`${n} barang berhasil didapatkan!`);
    return results;
  }

  const duplicateValues = {
    Common: 10,
    Uncommon: 20,
    Rare: 50,
    Epic: 100,
    Legendary: 250,
    Mythical: 500,
  };

  function sellDuplicate(itemId) {
    const item = game.inventory.find((entry) => entry.id === itemId);

    if (!item || item.quantity <= 1) {
      notify('Tidak ada duplikat yang bisa ditukar.');
      return 0;
    }

    const value = duplicateValues[item.rarity] || 10;

    setGame((current) => ({
      ...current,
      coins: current.coins + value,
      inventory: current.inventory.map((entry) =>
        entry.id === itemId
          ? { ...entry, quantity: entry.quantity - 1 }
          : entry
      ),
    }));

    notify(`1 duplikat berhasil ditukar menjadi ${value} koin!`);
    return value;
  }

  function sellAllDuplicates() {
    const duplicates = game.inventory.reduce(
      (total, item) => total + Math.max(0, item.quantity - 1),
      0
    );

    if (duplicates === 0) {
      notify('Belum ada duplikat yang bisa ditukar.');
      return 0;
    }

    const earned = game.inventory.reduce((total, item) => {
      const duplicateCount = Math.max(0, item.quantity - 1);
      const value = duplicateValues[item.rarity] || 10;
      return total + duplicateCount * value;
    }, 0);

    setGame((current) => ({
      ...current,
      coins: current.coins + earned,
      inventory: current.inventory.map((item) => ({
        ...item,
        quantity: 1,
      })),
    }));

    notify(`${duplicates} duplikat ditukar menjadi ${earned} koin!`);
    return earned;
  }

  function daily() {
    const today = new Date().toLocaleDateString('en-CA');

    if (game.claimed === today) {
      notify('Hadiah harian sudah diklaim.');
      return;
    }

    setGame((g) => ({ ...g, coins: g.coins + 500, claimed: today }));
    notify('Hadiah harian +500 koin berhasil diklaim!');
  }

  function rename(name) {
    setGame((g) => ({ ...g, name: name.trim() || 'Mahasiswa Baru' }));
    notify('Nama berhasil diperbarui.');
  }

  function reset() {
    localStorage.removeItem('campus-rng-v1');
    setGame(initial);
    notify('Data permainan berhasil diatur ulang.');
  }

  return (
    <C.Provider
      value={{
        game,
        toast,
        pull,
        daily,
        rename,
        reset,
        sellDuplicate,
        sellAllDuplicates,
      }}
    >
      {children}
    </C.Provider>
  );
}

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useGame() {
  return useContext(C);
}
