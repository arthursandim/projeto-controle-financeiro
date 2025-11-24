import React from 'react';
import './CategoriaCard.css';

function CategoriaCard({ categoria, onEditar, onDeletar }) {
  return (
    <div
      className="categoria-card"
      style={{ borderLeftColor: categoria.cor || '#808080' }}
    >
      <div className="categoria-card-header">
        <h3>{categoria.nome}</h3>
        {categoria.icone && <span className="categoria-icone">{categoria.icone}</span>}
      </div>

      {categoria.descricao && (
        <p className="categoria-descricao">{categoria.descricao}</p>
      )}

      <div className="categoria-card-footer">
        <button
          className="btn-secondary"
          onClick={() => onEditar(categoria)}
        >
          Editar
        </button>
        <button
          className="btn-danger"
          onClick={() => onDeletar(categoria.id)}
        >
          Deletar
        </button>
      </div>
    </div>
  );
}

export default CategoriaCard;
