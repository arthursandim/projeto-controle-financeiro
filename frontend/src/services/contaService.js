import api from './api';

export const contaService = {
  // Listar todas as contas (com filtros opcionais)
  listar: async (filtros = {}) => {
    const params = new URLSearchParams();

    if (filtros.categoria_id) params.append('categoria_id', filtros.categoria_id);
    if (filtros.status) params.append('status', filtros.status);
    if (filtros.data_inicio) params.append('data_inicio', filtros.data_inicio);
    if (filtros.data_fim) params.append('data_fim', filtros.data_fim);

    const response = await api.get(`/contas?${params.toString()}`);
    return response.data.dados;
  },

  // Buscar conta por ID
  buscarPorId: async (id) => {
    const response = await api.get(`/contas/${id}`);
    return response.data.dados;
  },

  // Criar nova conta
  criar: async (conta) => {
    const response = await api.post('/contas', conta);
    return response.data.dados;
  },

  // Atualizar conta
  atualizar: async (id, conta) => {
    const response = await api.put(`/contas/${id}`, conta);
    return response.data.dados;
  },

  // Deletar conta
  deletar: async (id) => {
    await api.delete(`/contas/${id}`);
  },

  // Marcar conta como paga
  marcarComoPaga: async (id, dataPagamento = null) => {
    const response = await api.patch(`/contas/${id}/pagar`, {
      data_pagamento: dataPagamento
    });
    return response.data.dados;
  },

  // Obter relatório
  obterRelatorio: async () => {
    const response = await api.get('/contas/relatorio');
    return response.data.dados;
  }
};
