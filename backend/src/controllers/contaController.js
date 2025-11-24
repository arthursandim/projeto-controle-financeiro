class ContaController {
  constructor(contaService) {
    this.contaService = contaService;
  }

  async listar(req, res, next) {
    try {
      const filtros = {
        categoria_id: req.query.categoria_id,
        status: req.query.status,
        data_inicio: req.query.data_inicio,
        data_fim: req.query.data_fim
      };

      const contas = await this.contaService.listarContas(filtros);
      res.json({
        sucesso: true,
        dados: contas
      });
    } catch (error) {
      next(error);
    }
  }

  async buscarPorId(req, res, next) {
    try {
      const { id } = req.params;
      const conta = await this.contaService.buscarContaPorId(id);
      res.json({
        sucesso: true,
        dados: conta
      });
    } catch (error) {
      next(error);
    }
  }

  async criar(req, res, next) {
    try {
      const conta = await this.contaService.criarConta(req.body);
      res.status(201).json({
        sucesso: true,
        mensagem: 'Conta criada com sucesso',
        dados: conta
      });
    } catch (error) {
      next(error);
    }
  }

  async atualizar(req, res, next) {
    try {
      const { id } = req.params;
      const conta = await this.contaService.atualizarConta(id, req.body);
      res.json({
        sucesso: true,
        mensagem: 'Conta atualizada com sucesso',
        dados: conta
      });
    } catch (error) {
      next(error);
    }
  }

  async deletar(req, res, next) {
    try {
      const { id } = req.params;
      await this.contaService.deletarConta(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async marcarComoPaga(req, res, next) {
    try {
      const { id } = req.params;
      const { data_pagamento } = req.body;
      const conta = await this.contaService.marcarComoPaga(id, data_pagamento);
      res.json({
        sucesso: true,
        mensagem: 'Conta marcada como paga',
        dados: conta
      });
    } catch (error) {
      next(error);
    }
  }

  async obterRelatorio(req, res, next) {
    try {
      const relatorio = await this.contaService.obterRelatorio();
      res.json({
        sucesso: true,
        dados: relatorio
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ContaController;
