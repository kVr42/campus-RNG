
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { draw, load, save } from '../utils/game';
import { ACHIEVEMENTS } from '../data/achievements';

const GameContext = createContext(null);

const initial = {
  name: 'Mahasiswa Baru',
  coins: 5000,
  pulls: 0,
  pity: 0,
  inventory: [],
  history: [],
  claimed: '',
  showcase: [],
  level: 1,
  exp: 0,
  achievements: [],
  quizSessions: 0,
};

const DUPLICATE_VALUES = {
  Common: 10,
  Uncommon: 20,
  Rare: 50,
  Epic: 100,
  Legendary: 250,
  Mythical: 500,
};

export function GameProvider({ children }) {
  const [game, setGame] = useState(() => {
    const saved = load();

    return {
      ...initial,
      ...(saved || {}),
      inventory: saved?.inventory || [],
      history: saved?.history || [],
      showcase: saved?.showcase || [],
      achievements: saved?.achievements || [],
      level: saved?.level || 1,
      exp: saved?.exp || 0,
      quizSessions: saved?.quizSessions || 0,
    };
  });

  const [toast, setToast] = useState('');

  useEffect(() => {
    save(game);
  }, [game]);

  function notify(message) {
    setToast(message);
  }

  const expToNext = game.level * 100;

  // ================================
  // ACHIEVEMENT SYSTEM
  // ================================

  function unlockAchievement(id) {
    const achievement = ACHIEVEMENTS.find(
      (item) => item.id === id
    );

    if (!achievement) return;

    setGame((current) => {
      const alreadyUnlocked = current.achievements.some(
        (item) => item.id === id
      );

      if (alreadyUnlocked) return current;

      const reward = 100;

      return {
        ...current,
        coins: current.coins + reward,
        achievements: [
          ...current.achievements,
          {
            id,
            unlockedAt: new Date().toISOString(),
            reward,
          },
        ],
      };
    });

    notify(
      `Achievement ${achievement.name} terbuka! +100 koin!`
    );
  }

  // ================================
  // LEVEL DAN EXP
  // ================================

  function awardExp(amount) {
    const earned = Math.max(
      0,
      Math.floor(Number(amount) || 0)
    );

    if (earned <= 0) return;

    let currentLevel = game.level;
    let currentExp = game.exp + earned;
    let bonusCoins = 0;
    let levelUps = 0;

    while (currentExp >= currentLevel * 100) {
      currentExp -= currentLevel * 100;
      currentLevel += 1;
      levelUps += 1;
      bonusCoins += currentLevel * 100;
    }

    setGame((current) => ({
      ...current,
      level: currentLevel,
      exp: currentExp,
      coins: current.coins + bonusCoins,
    }));

    if (currentLevel >= 5) {
      unlockAchievement('rising-star');
    }

    if (levelUps > 0) {
      notify(
        `Naik ${levelUps} level! Bonus ${bonusCoins.toLocaleString('id-ID')} koin!`
      );
    } else {
      notify(`Kamu mendapatkan ${earned} EXP!`);
    }
  }

  // ================================
  // GACHA
  // ================================

  function pull(n) {
    const cost = n === 10 ? 900 : 100;

    if (game.coins < cost) {
      notify('Koin kamu tidak cukup!');
      return;
    }

    let pity = game.pity;
    const results = [];

    // Mengambil item dari fungsi draw()
    for (let i = 0; i < n; i++) {
      const item = draw(pity);

      if (!item || !item.id || !item.rarity) {
        notify('Gacha gagal! Periksa data item pada ITEMS.');
        return;
      }

      results.push(item);

      // Reset pity ketika mendapatkan Legendary
      if (item.rarity === 'Legendary') {
        pity = 0;
      } else {
        pity += 1;
      }
    }

    // Memperbarui Inventory
    const updatedInventory = game.inventory.map((item) => ({
      ...item,
    }));

    results.forEach((item) => {
      const existing = updatedInventory.find(
        (entry) => entry.id === item.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        updatedInventory.push({
          ...item,
          quantity: 1,
        });
      }
    });

    // Menyimpan History
    const newHistory = results.map((item) => ({
      ...item,
      date: new Date().toISOString(),
    }));

    // Menyimpan hasil Gacha
    setGame((current) => ({
      ...current,
      coins: current.coins - cost,
      pulls: current.pulls + n,
      pity,
      inventory: updatedInventory,
      history: [
        ...newHistory,
        ...current.history,
      ].slice(0, 100),
    }));

    // Achievement: First Pull
    unlockAchievement('first-pull');

    // Achievement: Collector
    if (updatedInventory.length >= 10) {
      unlockAchievement('collector');
    }

    // Achievement: Lucky Player
    if (
      results.some((item) => item.rarity === 'Legendary')
    ) {
      unlockAchievement('lucky-player');
    }

    // Achievement: Myth Hunter
    if (
      results.some((item) => item.rarity === 'Mythical')
    ) {
      unlockAchievement('myth-hunter');
    }

    notify(
      `Gacha berhasil! Kamu mendapatkan ${n} item.`
    );

    return results;
  }

  // ================================
  // MENJUAL DUPLIKAT
  // ================================

  function sellDuplicate(itemId) {
    const item = game.inventory.find(
      (entry) => entry.id === itemId
    );

    if (!item || item.quantity <= 1) return;

    if (game.showcase.includes(itemId)) {
      notify('Item yang ada di Showcase tidak bisa dijual!');
      return;
    }

    const value = DUPLICATE_VALUES[item.rarity] || 10;

    setGame((current) => ({
      ...current,
      coins: current.coins + value,
      inventory: current.inventory.map((entry) =>
        entry.id === itemId
          ? {
              ...entry,
              quantity: entry.quantity - 1,
            }
          : entry
      ),
    }));

    notify(`Item berhasil dijual seharga ${value} koin!`);
  }

  function sellAllDuplicates() {
    let totalCoins = 0;

    const updatedInventory = game.inventory.map((item) => {
      if (
        item.quantity > 1 &&
        !game.showcase.includes(item.id)
      ) {
        const duplicateCount = item.quantity - 1;
        const value = DUPLICATE_VALUES[item.rarity] || 10;

        totalCoins += duplicateCount * value;

        return {
          ...item,
          quantity: 1,
        };
      }

      return item;
    });

    if (totalCoins <= 0) {
      notify('Tidak ada duplikat yang bisa dijual!');
      return;
    }

    setGame((current) => ({
      ...current,
      coins: current.coins + totalCoins,
      inventory: updatedInventory,
    }));

    notify(
      `Semua duplikat berhasil dijual! +${totalCoins.toLocaleString('id-ID')} koin.`
    );
  }

  // ================================
  // SHOWCASE
  // ================================

  function setShowcase(itemId) {
    const updatedShowcase = game.showcase.includes(itemId)
      ? game.showcase.filter((id) => id !== itemId)
      : game.showcase.length < 3
        ? [...game.showcase, itemId]
        : game.showcase;

    if (
      updatedShowcase.length === 3 &&
      !game.showcase.includes(itemId)
    ) {
      unlockAchievement('showcase-master');
    }

    if (
      updatedShowcase.length === game.showcase.length &&
      updatedShowcase.every(
        (id, index) => id === game.showcase[index]
      )
    ) {
      return;
    }

    setGame((current) => ({
      ...current,
      showcase: updatedShowcase,
    }));
  }

  // ================================
  // DAILY REWARD
  // ================================

  function daily() {
    const today = new Date().toDateString();

    if (game.claimed === today) {
      notify('Hadiah harian sudah diambil hari ini!');
      return;
    }

    setGame((current) => ({
      ...current,
      coins: current.coins + 500,
      claimed: today,
    }));

    notify('Daily reward berhasil diklaim! +500 koin.');
  }

  // ================================
  // QUIZ ACHIEVEMENT
  // ================================

  function recordQuizResult(score, total) {
    const nextSessions = game.quizSessions + 1;

    setGame((current) => ({
      ...current,
      quizSessions: current.quizSessions + 1,
    }));

    if (nextSessions >= 10) {
      unlockAchievement('quiz-master');
    }

    if (total === 5 && score === 5) {
      unlockAchievement('perfect-score');
    }
  }

  // ================================
  // RENAME PLAYER
  // ================================

  function rename(name) {
    const newName = name.trim();

    if (!newName) {
      notify('Nama tidak boleh kosong!');
      return;
    }

    setGame((current) => ({
      ...current,
      name: newName,
    }));

    notify('Nama pemain berhasil diperbarui!');
  }

  // ================================
  // RESET GAME
  // ================================

  function reset() {
    localStorage.removeItem('campus-rng-v1');
    localStorage.removeItem('campus-rng-quiz-stats');

    setGame({
      ...initial,
      inventory: [],
      history: [],
      showcase: [],
      achievements: [],
      level: 1,
      exp: 0,
      quizSessions: 0,
    });

    notify('Seluruh data permainan berhasil diatur ulang.');
  }

  // ================================
  // PROVIDER
  // ================================

  return (
    <GameContext.Provider
      value={{
        game,
        toast,
        pull,
        daily,
        rename,
        reset,
        sellDuplicate,
        sellAllDuplicates,
        setShowcase,
        awardExp,
        expToNext,
        unlockAchievement,
        recordQuizResult,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      'useGame harus digunakan di dalam GameProvider'
    );
  }

  return context;
}
