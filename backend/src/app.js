import express from 'express';
import cors from 'cors';
import categoriaRoutes from './routes/categoriaRoutes.js';
import contaRoutes from './routes/contaRoutes.js';
import resetRoutes from './routes/resetRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/categorias', categoriaRoutes);
app.use('/api/contas', contaRoutes);

// Rota de reset (apenas em desenvolvimento)
if (process.env.NODE_ENV !== 'production') {
  app.use('/api', resetRoutes);
}

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API de Controle de Gastos',
    versao: '1.0.0',
    endpoints: {
      categorias: '/api/categorias',
      contas: '/api/contas'
    }
  });
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Tratamento de rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    sucesso: false,
    mensagem: 'Rota não encontrada'
  });
});

export default app;
