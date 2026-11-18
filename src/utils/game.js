
import { ITEMS } from '../data/items';

// Mengambil item berdasarkan rarity.
// Item spesial tidak dimasukkan ke Gacha reguler.
function pick(rarity) {
  const availableItems = ITEMS.filter(
    (item) =>
      item.rarity === rarity &&
      !item.special
  );

  if (availableItems.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(
    Math.random() * availableItems.length
  );

  return availableItems[randomIndex];
}

// Sistem Gacha dengan pity.
export function draw(pity = 0) {
  let weights = [45, 25, 15, 9, 5, 1];

  // Peningkatan peluang Legendary setelah pity 48.
  if (pity >= 49) {
    weights[4] += Math.min(
      75,
      (pity - 48) * 3
    );
  }

  // Legendary dijamin pada pity 79.
  if (pity >= 79) {
    return pick('Legendary');
  }

  const totalWeight = weights.reduce(
    (total, weight) => total + weight,
    0
  );

  let random = Math.random() * totalWeight;
  let index = 0;

  for (; index < weights.length; index++) {
    random -= weights[index];

    if (random <= 0) {
      break;
    }
  }

  const rarities = [
    'Common',
    'Uncommon',
    'Rare',
    'Epic',
    'Legendary',
    'Mythical'
  ];

  return pick(
    rarities[Math.min(index, rarities.length - 1)]
  );
}

// Menyimpan data permainan.
export function save(data) {
  try {
    localStorage.setItem(
      'campus-rng-v1',
      JSON.stringify(data)
    );
  } catch (error) {
    console.error('Gagal menyimpan data:', error);
  }
}

// Mengambil data permainan.
export function load() {
  try {
    return (
      JSON.parse(
        localStorage.getItem('campus-rng-v1')
      ) || null
    );
  } catch (error) {
    console.error('Gagal memuat data:', error);
    return null;
  }
}
