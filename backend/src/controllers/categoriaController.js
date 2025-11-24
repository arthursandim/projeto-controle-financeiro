class CategoriaController {
  constructor(categoriaService) {
    this.categoriaService = categoriaService;
  }

  async listar(req, res, next) {
    try {
      const categorias = await this.categoriaService.listarCategorias();
      res.json({
        sucesso: true,
        dados: categorias
      });
    } catch (error) {
      next(error);
    }
  }

  async buscarPorId(req, res, next) {
    try {
      const { id } = req.params;
      const categoria = await this.categoriaService.buscarCategoriaPorId(id);
      res.json({
        sucesso: true,
        dados: categoria
      });
    } catch (error) {
      next(error);
    }
  }

  async criar(req, res, next) {
    try {
      const categoria = await this.categoriaService.criarCategoria(req.body);
      res.status(201).json({
        sucesso: true,
        mensagem: 'Categoria criada com sucesso',
        dados: categoria
      });
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req, res, next) {
    try {
      const { id } = req.params;
      const categoria = await this.categoriaService.atualizarCategoria(id, req.body);
      res.json({
        sucesso: true,
        mensagem: 'Categoria atualizada com sucesso',
        dados: categoria
      });
    } catch (error) {
      next(error);
    }
  }

  async deletar(req, res, next) {
    try {
      const { id } = req.params;
      await this.categoriaService.deletarCategoria(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async listarContas(req, res, next) {
    try {
      const { id } = req.params;
      const contas = await this.categoriaService.listarContasCategoria(id);
      res.json({
        sucesso: true,
        dados: contas
      });
    } catch (error) {
      next(error);
    }
  }

  async obterTotal(req, res, next) {
    try {
      const { id } = req.params;
      const total = await this.categoriaService.obterTotalCategoria(id);
      res.json({
        sucesso: true,
        dados: total
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CategoriaController;
