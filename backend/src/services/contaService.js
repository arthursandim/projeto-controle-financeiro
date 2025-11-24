class ContaService {
  constructor(contaRepository, categoriaRepository) {
    this.contaRepository = contaRepository;
    this.categoriaRepository = categoriaRepository;
  }

  async listarContas(filtros = {}) {
    return await this.contaRepository.findAll(filtros);
  }

  async buscarContaPorId(id) {
    const conta = await this.contaRepository.findById(id);
    if (!conta) {
      throw new Error('Conta não encontrada');
    }
    return conta;
  }

  async criarConta(dados) {
    // Validações de negócio
    if (!dados.categoria_id) {
      throw new Error('Categoria é obrigatória');
    }

    if (!dados.descricao || dados.descricao.trim() === '') {
      throw new Error('Descrição da conta é obrigatória');
    }

    if (!dados.valor || dados.valor <= 0) {
      throw new Error('Valor deve ser maior que zero');
    }

    // Verificar se categoria existe
    const categoria = await this.categoriaRepository.findById(dados.categoria_id);
    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }

    // Validar datas
    if (dados.data_vencimento) {
      const dataVencimento = new Date(dados.data_vencimento);
      if (isNaN(dataVencimento.getTime())) {
        throw new Error('Data de vencimento inválida');
      }
    }

    // Definir status como PENDENTE se não fornecido
    if (!dados.status) {
      dados.status = 'PENDENTE';
    }

    return await this.contaRepository.create(dados);
  }

  async atualizarConta(id, dados) {
    // Verificar se conta existe
    const contaExistente = await this.contaRepository.findById(id);
    if (!contaExistente) {
      throw new Error('Conta não encontrada');
    }

    // Validar categoria se fornecida
    if (dados.categoria_id) {
      const categoria = await this.categoriaRepository.findById(dados.categoria_id);
      if (!categoria) {
        throw new Error('Categoria não encontrada');
      }
    }

    // Validar valor se fornecido
    if (dados.valor !== undefined && dados.valor <= 0) {
      throw new Error('Valor deve ser maior que zero');
    }

    // Validar descrição se fornecida
    if (dados.descricao !== undefined && dados.descricao.trim() === '') {
      throw new Error('Descrição não pode ser vazia');
    }

    return await this.contaRepository.update(id, dados);
  }

  async deletarConta(id) {
    const conta = await this.contaRepository.findById(id);
    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    return await this.contaRepository.delete(id);
  }

  async marcarComoPaga(id, dataPagamento = null) {
    const conta = await this.contaRepository.findById(id);
    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    if (conta.status === 'PAGA') {
      throw new Error('Conta já está marcada como paga');
    }

    const data = dataPagamento ? new Date(dataPagamento) : new Date();
    return await this.contaRepository.marcarComoPaga(id, data);
  }

  async obterRelatorio() {
    const totais = await this.contaRepository.getTotais();
    const contas = await this.contaRepository.findAll();

    // Agrupar por categoria
    const porCategoria = {};
    contas.forEach(conta => {
      const categoriaId = conta.categoria_id;
      const categoriaNome = conta.categoria ? conta.categoria.nome : 'Sem categoria';

      if (!porCategoria[categoriaId]) {
        porCategoria[categoriaId] = {
          categoria_id: categoriaId,
          categoria_nome: categoriaNome,
          total: 0,
          quantidade: 0
        };
      }

      porCategoria[categoriaId].total += parseFloat(conta.valor);
      porCategoria[categoriaId].quantidade += 1;
    });

    return {
      totais,
      por_categoria: Object.values(porCategoria)
    };
  }
}

export default ContaService;
