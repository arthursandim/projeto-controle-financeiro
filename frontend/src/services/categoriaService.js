import api from './api';

export const categoriaService = {
  // Listar todas as categorias
  listar: async () => {
    const response = await api.get('/categorias');
    return response.data.dados;
  },

  // Buscar categoria por ID
  buscarPorId: async (id) => {
    const response = await api.get(`/categorias/${id}`);
    return response.data.dados;
  },

  // Criar nova categoria
  criar: async (categoria) => {
    const response = await api.post('/categorias', categoria);
    return response.data.dados;
  },

  // Atualizar categoria
  atualizar: async (id, categoria) => {
    const response = await api.put(`/categorias/${id}`, categoria);
    return response.data.dados;
  },

  // Deletar categoria
  deletar: async (id) => {
    await api.delete(`/categorias/${id}`);
  },

  // Listar contas de uma categoria
  listarContas: async (id) => {
    const response = await api.get(`/categorias/${id}/contas`);
    return response.data.dados;
  },

  // Obter total de uma categoria
  obterTotal: async (id) => {
    const response = await api.get(`/categorias/${id}/total`);
    return response.data.dados;
  }
};
