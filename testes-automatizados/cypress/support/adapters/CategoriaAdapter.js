/**
 * Categoria Adapter
 * Converte objetos Categoria para formatos de requisição HTTP
 */
class CategoriaAdapter {
  /**
   * Adapta uma Categoria para formato POST
   * @param {Categoria} categoria
   * @returns {Object} Payload para POST /api/categorias
   */
  static adapterToPOST(categoria) {
    return {
      nome: categoria.nome,
      descricao: categoria.descricao,
      cor: categoria.cor,
      icone: categoria.icone,
    };
  }

  /**
   * Adapta uma Categoria para formato PUT
   * @param {Categoria} categoria
   * @returns {Object} Payload para PUT /api/categorias/:id
   */
  static adapterToPUT(categoria) {
    return this.adapterToPOST(categoria);
  }
}

export default CategoriaAdapter;
