
import React from 'react';
import PropTypes from 'prop-types';
import { rarityLabel } from '../data/rarity';

export default function ItemCard({
  item,
  quantity = 0,
  onClick,
}) {
  // Mencegah error jika item kosong
  if (!item) return null;

  // Nilai cadangan jika properti tidak tersedia
  const rarity = item.rarity || 'Common';
  const category = item.category || 'Barang Kampus';
  const emoji = item.emoji || '📦';
  const name = item.name || 'Item Tidak Dikenal';
  const flavor = item.flavor || 'Tidak ada deskripsi item.';

  return (
    <button
      className="item-card"
      onClick={() => onClick?.(item)}
      type="button"
    >
      <div className="item-category">
        {category}
      </div>

      <div className="item-emoji">
        {emoji}
      </div>

      <span className={`rarity ${rarity.toLowerCase()}`}>
        {rarityLabel(rarity)}
      </span>

      <h3>{name}</h3>

      <p>{flavor}</p>

      {quantity > 0 && (
        <b className="qty">×{quantity}</b>
      )}
    </button>
  );
}

ItemCard.propTypes = {
  item: PropTypes.object,
  quantity: PropTypes.number,
  onClick: PropTypes.func,
};
