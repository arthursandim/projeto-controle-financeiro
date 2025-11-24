import React from 'react';
import './ContaCard.css';

function ContaCard({ conta, onEditar, onDeletar, onMarcarPaga }) {
  const formatarData = (data) => {
    if (!data) return '-';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const getStatusClass = (status) => {
    const classes = {
      'PENDENTE': 'status-pendente',
      'PAGA': 'status-paga',
      'ATRASADA': 'status-atrasada'
    };
    return classes[status] || '';
  };

  return (
    <div className={`conta-card ${getStatusClass(conta.status)}`}>
      <div className="conta-card-header">
        <h3>{conta.descricao}</h3>
        <span className={`badge ${getStatusClass(conta.status)}`}>
          {conta.status}
        </span>
      </div>

      <div className="conta-card-body">
        <p className="conta-valor">R$ {parseFloat(conta.valor).toFixed(2)}</p>

        {conta.categoria && (
          <p className="conta-categoria">
            📁 {conta.categoria.nome}
          </p>
        )}

        <div className="conta-datas">
          <p>Vencimento: {formatarData(conta.data_vencimento)}</p>
          {conta.data_pagamento && (
            <p>Pagamento: {formatarData(conta.data_pagamento)}</p>
          )}
        </div>

        {conta.observacoes && (
          <p className="conta-observacoes">{conta.observacoes}</p>
        )}
      </div>

      <div className="conta-card-footer">
        {conta.status !== 'PAGA' && (
          <button
            className="btn-success"
            onClick={() => onMarcarPaga(conta.id)}
          >
            ✓ Pagar
          </button>
        )}
        <button
          className="btn-secondary"
          onClick={() => onEditar(conta)}
        >
          Editar
        </button>
        <button
          className="btn-danger"
          onClick={() => onDeletar(conta.id)}
        >
          Deletar
        </button>
      </div>
    </div>
  );
}

export default ContaCard;
