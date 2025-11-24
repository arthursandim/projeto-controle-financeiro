import express from 'express';
import ContaRepository from '../repositories/contaRepository.js';
import CategoriaRepository from '../repositories/categoriaRepository.js';
import ContaService from '../services/contaService.js';
import ContaController from '../controllers/contaController.js';

const router = express.Router();

// Injeção de dependências
const contaRepository = new ContaRepository();
const categoriaRepository = new CategoriaRepository();
const contaService = new ContaService(contaRepository, categoriaRepository);
const contaController = new ContaController(contaService);

// Rotas
router.get('/', (req, res, next) => contaController.listar(req, res, next));
router.get('/relatorio', (req, res, next) => contaController.obterRelatorio(req, res, next));
router.get('/:id', (req, res, next) => contaController.buscarPorId(req, res, next));
router.post('/', (req, res, next) => contaController.criar(req, res, next));
router.put('/:id', (req, res, next) => contaController.atualizar(req, res, next));
router.delete('/:id', (req, res, next) => contaController.deletar(req, res, next));
router.patch('/:id/pagar', (req, res, next) => contaController.marcarComoPaga(req, res, next));

export default router;
