import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  response => response,
  error => {
    const mensagem = error.response?.data?.mensagem || 'Erro ao processar requisição';
    return Promise.reject(new Error(mensagem));
  }
);

export default api;
