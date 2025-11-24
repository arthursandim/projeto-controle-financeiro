class CategoriaService {
  constructor(categoriaRepository) {
    this.categoriaRepository = categoriaRepository;
  }

  async listarCategorias() {
    return await this.categoriaRepository.findAll();
  }

  async buscarCategoriaPorId(id) {
    const categoria = await this.categoriaRepository.findById(id);
    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }
    return categoria;
  }

  async criarCategoria(dados) {
    // Validações de negócio
    if (!dados.nome || dados.nome.trim() === '') {
      throw new Error('Nome da categoria é obrigatório');
    }

    if (dados.nome.length > 100) {
      throw new Error('Nome da categoria deve ter no máximo 100 caracteres');
    }

    // Verificar se já existe categoria com esse nome
    const categoriaExistente = await this.categoriaRepository.findByNome(dados.nome);
    if (categoriaExistente) {
      throw new Error('Já existe uma categoria com este nome');
    }

    // Validar cor (formato hexadecimal)
    if (dados.cor && !/^#[0-9A-F]{6}$/i.test(dados.cor)) {
      throw new Error('Cor inválida. Use formato hexadecimal (#RRGGBB)');
    }

    return await this.categoriaRepository.create(dados);
  }

  async atualizarCategoria(id, dados) {
    // Verificar se categoria existe
    const categoriaExistente = await this.categoriaRepository.findById(id);
    if (!categoriaExistente) {
      throw new Error('Categoria não encontrada');
    }

    // Validar nome se fornecido
    if (dados.nome) {
      if (dados.nome.trim() === '') {
        throw new Error('Nome da categoria não pode ser vazio');
      }

      // Verificar duplicidade de nome (exceto a própria categoria)
      const categoriaComMesmoNome = await this.categoriaRepository.findByNome(dados.nome);
      if (categoriaComMesmoNome && categoriaComMesmoNome.id !== parseInt(id)) {
        throw new Error('Já existe uma categoria com este nome');
      }
    }

    // Validar cor se fornecida
    if (dados.cor && !/^#[0-9A-F]{6}$/i.test(dados.cor)) {
      throw new Error('Cor inválida. Use formato hexadecimal (#RRGGBB)');
    }

    return await this.categoriaRepository.update(id, dados);
  }

  async deletarCategoria(id) {
    // Verificar se categoria existe
    const categoria = await this.categoriaRepository.findWithContas(id);
    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }

    // Verificar se tem contas associadas
    if (categoria.contas && categoria.contas.length > 0) {
      throw new Error(
        `Não é possível deletar categoria com ${categoria.contas.length} conta(s) associada(s)`
      );
    }

    return await this.categoriaRepository.delete(id);
  }

  async listarContasCategoria(id) {
    const categoria = await this.categoriaRepository.findWithContas(id);
    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }
    return categoria.contas || [];
  }

  async obterTotalCategoria(id) {
    const categoria = await this.categoriaRepository.findById(id);
    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }

    const total = await this.categoriaRepository.getTotalContas(id);
    return {
      categoria_id: id,
      categoria_nome: categoria.nome,
      total: parseFloat(total).toFixed(2)
    };
  }
}

export default CategoriaService;
