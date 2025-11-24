import express from 'express';
import CategoriaRepository from '../repositories/categoriaRepository.js';
import CategoriaService from '../services/categoriaService.js';
import CategoriaController from '../controllers/categoriaController.js';

const router = express.Router();

// Injeção de dependências
const categoriaRepository = new CategoriaRepository();
const categoriaService = new CategoriaService(categoriaRepository);
const categoriaController = new CategoriaController(categoriaService);

// Rotas
router.get('/', (req, res, next) => categoriaController.listar(req, res, next));
router.get('/:id', (req, res, next) => categoriaController.buscarPorId(req, res, next));
router.post('/', (req, res, next) => categoriaController.criar(req, res, next));
router.put('/:id', (req, res, next) => categoriaController.atualizar(req, res, next));
router.delete('/:id', (req, res, next) => categoriaController.deletar(req, res, next));
router.get('/:id/contas', (req, res, next) => categoriaController.listarContas(req, res, next));
router.get('/:id/total', (req, res, next) => categoriaController.obterTotal(req, res, next));

export default router;
