import { ITEMS } from '../data/items';
export function draw(pity = 0) {
  let weights = [45, 25, 15, 9, 5, 1]; if (pity >= 49)
    weights[4] += Math.min(75, (pity - 48) * 3); if (pity >= 79)
    return pick('Legendary'); let total = weights.reduce((a, b) => a + b, 0), r = Math.random() * total, idx = 0; for (; idx < weights.length; idx++) {
      r -= weights[idx];
      if (r <= 0)
        break;
    } return pick(['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythical'][Math.min(idx, 5)]);
}
function pick(r) { const a = ITEMS.filter(x => x.rarity === r); return a[Math.floor(Math.random() * a.length)]; }
export function save(data) {
  try {
    localStorage.setItem('campus-rng-v1', JSON.stringify(data));
  }
  catch { }
}
export function load() {
  try {
    return JSON.parse(localStorage.getItem('campus-rng-v1')) || null;
  }
  catch {
    return null;
  }
}
