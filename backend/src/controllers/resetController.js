/**
 * ResetController
 * Controlador para resetar o banco de dados
 */
class ResetController {
  constructor(resetService) {
    this.resetService = resetService;
  }

  async reset(req, res, next) {
    try {
      const resultado = await this.resetService.resetDatabase();
      res.json({
        sucesso: true,
        mensagem: 'Banco de dados resetado com sucesso',
        dados: resultado
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ResetController;
