/**
 * Conta Adapter
 * Converte objetos Conta para formatos de requisição HTTP
 */
class ContaAdapter {
  /**
   * Adapta uma Conta para formato POST
   * @param {Conta} conta
   * @returns {Object} Payload para POST /api/contas
   */
  static adapterToPOST(conta) {
    return {
      categoria_id: conta.categoria_id,
      descricao: conta.descricao,
      valor: conta.valor,
      data_vencimento: conta.data_vencimento,
      status: conta.status,
      observacoes: conta.observacoes,
    };
  }

  /**
   * Adapta uma Conta para formato PUT
   * @param {Conta} conta
   * @returns {Object} Payload para PUT /api/contas/:id
   */
  static adapterToPUT(conta) {
    return this.adapterToPOST(conta);
  }
}

export default ContaAdapter;
