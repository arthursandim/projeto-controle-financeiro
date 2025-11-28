import express from 'express';
import ResetService from '../services/resetService.js';
import ResetController from '../controllers/resetController.js';

const router = express.Router();

// Injeção de dependências
const resetService = new ResetService();
const resetController = new ResetController(resetService);

// Rota de reset - Apenas em desenvolvimento
router.delete('/reset', (req, res, next) =>
  resetController.reset(req, res, next)
);

export default router;
