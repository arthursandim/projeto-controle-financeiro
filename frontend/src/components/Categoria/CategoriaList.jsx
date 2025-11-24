import React, { useState, useEffect } from 'react';
import { categoriaService } from '../../services/categoriaService';
import CategoriaCard from './CategoriaCard';
import CategoriaForm from './CategoriaForm';
import './CategoriaList.css';

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);

  // Carregar categorias ao montar componente
  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    try {
      setLoading(true);
      const dados = await categoriaService.listar();
      setCategorias(dados);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCriar = () => {
    setCategoriaEditando(null);
    setMostrarFormulario(true);
  };

  const handleEditar = (categoria) => {
    setCategoriaEditando(categoria);
    setMostrarFormulario(true);
  };

  const handleDeletar = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar esta categoria?')) {
      return;
    }

    try {
      await categoriaService.deletar(id);
      carregarCategorias();
      alert('Categoria deletada com sucesso!');
    } catch (err) {
      alert(`Erro ao deletar: ${err.message}`);
    }
  };

  const handleSalvar = async () => {
    setMostrarFormulario(false);
    setCategoriaEditando(null);
    await carregarCategorias();
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setCategoriaEditando(null);
  };

  if (loading) {
    return <div className="loading">Carregando categorias...</div>;
  }

  if (error) {
    return <div className="error">Erro: {error}</div>;
  }

  return (
    <div className="categoria-list">
      <div className="categoria-list-header">
        <h2>Categorias</h2>
        <button className="btn-primary" onClick={handleCriar}>
          + Nova Categoria
        </button>
      </div>

      {mostrarFormulario && (
        <CategoriaForm
          categoria={categoriaEditando}
          onSalvar={handleSalvar}
          onCancelar={handleCancelar}
        />
      )}

      <div className="categoria-grid">
        {categorias.length === 0 ? (
          <p>Nenhuma categoria cadastrada</p>
        ) : (
          categorias.map(categoria => (
            <CategoriaCard
              key={categoria.id}
              categoria={categoria}
              onEditar={handleEditar}
              onDeletar={handleDeletar}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CategoriaList;
