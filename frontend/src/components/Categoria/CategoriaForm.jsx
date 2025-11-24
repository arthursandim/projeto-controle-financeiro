import React, { useState, useEffect } from 'react';
import { categoriaService } from '../../services/categoriaService';
import './CategoriaForm.css';

function CategoriaForm({ categoria, onSalvar, onCancelar }) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    cor: '#808080',
    icone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Preencher formulário se estiver editando
  useEffect(() => {
    if (categoria) {
      setFormData({
        nome: categoria.nome || '',
        descricao: categoria.descricao || '',
        cor: categoria.cor || '#808080',
        icone: categoria.icone || ''
      });
    }
  }, [categoria]);

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
      if (categoria) {
        // Atualizar
        await categoriaService.atualizar(categoria.id, formData);
        alert('Categoria atualizada com sucesso!');
      } else {
        // Criar
        await categoriaService.criar(formData);
        alert('Categoria criada com sucesso!');
      }
      onSalvar();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="categoria-form-overlay">
      <div className="categoria-form">
        <h3>{categoria ? 'Editar Categoria' : 'Nova Categoria'}</h3>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome *</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              maxLength={100}
              placeholder="Ex: Moradia, Alimentação"
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={3}
              placeholder="Descrição opcional da categoria"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Cor</label>
              <input
                type="color"
                name="cor"
                value={formData.cor}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Ícone</label>
              <input
                type="text"
                name="icone"
                value={formData.icone}
                onChange={handleChange}
                placeholder="Ex: 🏠, 🍔, 🚗"
                maxLength={10}
              />
            </div>
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

export default CategoriaForm;
