export const RARITIES = [
  { name: 'Common', label: 'Umum', chance: 45 },
  { name: 'Uncommon', label: 'Tidak Umum', chance: 25 },
  { name: 'Rare', label: 'Langka', chance: 15 },
  { name: 'Epic', label: 'Epik', chance: 9 },
  { name: 'Legendary', label: 'Legendaris', chance: 5 },
  { name: 'Mythical', label: 'Mitologis', chance: 1 },
];
export const rarityLabel = (rarity) => RARITIES.find((item) => item.name === rarity)?.label || rarity;
