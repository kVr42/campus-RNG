import React from 'react';
import PropTypes from 'prop-types';
export default function Modal({ title, onClose, children }) {
  return (
    <div
      className="overlay"
      onMouseDown={e => e.target === e.currentTarget && onClose()}
    >
      <section className="modal">
        <button className="close" onClick={onClose}>
          ×
        </button>
        <small>✳ HARTA KARUN KAMPUS</small>
        <h2>{title}</h2>
        {children}
      </section>
    </div>
  );
}
Modal.propTypes = { title: PropTypes.string.isRequired, onClose: PropTypes.func.isRequired, children: PropTypes.node.isRequired };
