import React, { useState, useEffect } from 'react';
import { contaService } from '../../services/contaService';
import { categoriaService } from '../../services/categoriaService';
import ContaCard from './ContaCard';
import ContaForm from './ContaForm';
import './ContaList.css';

function ContaList() {
  const [contas, setContas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtros, setFiltros] = useState({
    categoria_id: '',
    status: ''
  });
  const [loading, setLoading] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [contaEditando, setContaEditando] = useState(null);

  useEffect(() => {
    carregarDados();
  }, [filtros]);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [contasData, categoriasData] = await Promise.all([
        contaService.listar(filtros),
        categoriaService.listar()
      ]);
      setContas(contasData);
      setCategorias(categoriasData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCriar = () => {
    setContaEditando(null);
    setMostrarFormulario(true);
  };

  const handleEditar = (conta) => {
    setContaEditando(conta);
    setMostrarFormulario(true);
  };

  const handleDeletar = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar esta conta?')) {
      return;
    }

    try {
      await contaService.deletar(id);
      carregarDados();
      alert('Conta deletada com sucesso!');
    } catch (err) {
      alert(`Erro ao deletar: ${err.message}`);
    }
  };

  const handleMarcarPaga = async (id) => {
    try {
      await contaService.marcarComoPaga(id);
      carregarDados();
      alert('Conta marcada como paga!');
    } catch (err) {
      alert(`Erro: ${err.message}`);
    }
  };

  const handleSalvar = () => {
    setMostrarFormulario(false);
    setContaEditando(null);
    carregarDados();
  };

  const calcularTotal = () => {
    return contas.reduce((total, conta) => total + parseFloat(conta.valor), 0);
  };

  return (
    <div className="conta-list">
      <div className="conta-list-header">
        <h2>Contas a Pagar</h2>
        <button className="btn-primary" onClick={handleCriar}>
          + Nova Conta
        </button>
      </div>

      {/* Filtros */}
      <div className="conta-filtros">
        <select
          name="categoria_id"
          value={filtros.categoria_id}
          onChange={handleFiltroChange}
        >
          <option value="">Todas as categorias</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
          ))}
        </select>

        <select
          name="status"
          value={filtros.status}
          onChange={handleFiltroChange}
        >
          <option value="">Todos os status</option>
          <option value="PENDENTE">Pendente</option>
          <option value="PAGA">Paga</option>
          <option value="ATRASADA">Atrasada</option>
        </select>
      </div>

      {/* Resumo */}
      <div className="conta-resumo">
        <p>Total de contas: {contas.length}</p>
        <p>Valor total: R$ {calcularTotal().toFixed(2)}</p>
      </div>

      {mostrarFormulario && (
        <ContaForm
          conta={contaEditando}
          categorias={categorias}
          onSalvar={handleSalvar}
          onCancelar={() => setMostrarFormulario(false)}
        />
      )}

      {/* Lista de contas */}
      <div className="conta-grid">
        {loading ? (
          <p>Carregando...</p>
        ) : contas.length === 0 ? (
          <p>Nenhuma conta encontrada</p>
        ) : (
          contas.map(conta => (
            <ContaCard
              key={conta.id}
              conta={conta}
              onEditar={handleEditar}
              onDeletar={handleDeletar}
              onMarcarPaga={handleMarcarPaga}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ContaList;
