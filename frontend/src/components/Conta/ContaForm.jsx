import React, { useState, useEffect } from 'react';
import { contaService } from '../../services/contaService';
import './ContaForm.css';

function ContaForm({ conta, categorias, onSalvar, onCancelar }) {
  const [formData, setFormData] = useState({
    categoria_id: '',
    descricao: '',
    valor: '',
    data_vencimento: '',
    status: 'PENDENTE',
    observacoes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (conta) {
      setFormData({
        categoria_id: conta.categoria_id || '',
        descricao: conta.descricao || '',
        valor: conta.valor || '',
        data_vencimento: conta.data_vencimento || '',
        status: conta.status || 'PENDENTE',
        observacoes: conta.observacoes || ''
      });
    }
  }, [conta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Converter valor para número
      const dados = {
        ...formData,
        valor: parseFloat(formData.valor),
        categoria_id: parseInt(formData.categoria_id)
      };

      if (conta) {
        await contaService.atualizar(conta.id, dados);
        alert('Conta atualizada com sucesso!');
      } else {
        await contaService.criar(dados);
        alert('Conta criada com sucesso!');
      }
      onSalvar();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="conta-form-overlay">
      <div className="conta-form">
        <h3>{conta ? 'Editar Conta' : 'Nova Conta'}</h3>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Categoria *</label>
            <select
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Descrição *</label>
            <input
              type="text"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
              placeholder="Ex: Conta de luz, Aluguel"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Valor *</label>
              <input
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label>Vencimento</label>
              <input
                type="date"
                name="data_vencimento"
                value={formData.data_vencimento}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="PENDENTE">Pendente</option>
              <option value="PAGA">Paga</option>
              <option value="ATRASADA">Atrasada</option>
            </select>
          </div>

          <div className="form-group">
            <label>Observações</label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              rows={3}
              placeholder="Observações adicionais"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancelar}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContaForm;
