import React from 'react';
import PropTypes from 'prop-types';
import { rarityLabel } from '../data/rarity';

export default function ItemCard({ item, quantity = 0, onClick }) {
  return (
    <button className="item-card" onClick={() => onClick?.(item)}>
      <div className="item-category">{item.category}</div>
      <div className="item-emoji">{item.emoji}</div>
      <span className={`rarity ${item.rarity.toLowerCase()}`}>
        {rarityLabel(item.rarity)}
      </span>
      <h3>{item.name}</h3>
      <p>{item.flavor}</p>
      {quantity > 0 && <b className="qty">×{quantity}</b>}
    </button>
  );
}

ItemCard.propTypes = {
  item: PropTypes.object.isRequired,
  quantity: PropTypes.number,
  onClick: PropTypes.func,
};
